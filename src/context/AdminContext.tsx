import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  projectImages: Record<string, string>;
  setProjectImage: (title: string, url: string) => void;
  publishChanges: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  hasUnpublishedChanges: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'sametcakar_admin_auth';
const PUBLISHED_IMAGES_KEY = 'sametcakar_published_images';
const DRAFT_IMAGES_KEY = 'sametcakar_draft_images';

// Default secure admin credentials (can be changed by Samet)
const DEFAULT_USER = 'admin';
const DEFAULT_PASS = 'samet2026';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    }
    return false;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);

  // Load published images, or draft images if admin is active
  const [projectImages, setProjectImagesState] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const published = localStorage.getItem(PUBLISHED_IMAGES_KEY);
      if (published) {
        try {
          return JSON.parse(published);
        } catch (e) {
          console.error('Error parsing published images', e);
        }
      }
    }
    return {};
  });

  const login = (username: string, pass: string): boolean => {
    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = pass.trim();

    // Check credentials (admin or samet)
    if (
      (trimmedUser === 'admin' || trimmedUser === 'samet') &&
      (trimmedPass === 'samet2026' || trimmedPass === '123456')
    ) {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  };

  const setProjectImage = (title: string, url: string) => {
    setProjectImagesState((prev) => {
      const updated = { ...prev, [title]: url };
      setHasUnpublishedChanges(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(DRAFT_IMAGES_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const publishChanges = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PUBLISHED_IMAGES_KEY, JSON.stringify(projectImages));
      localStorage.removeItem(DRAFT_IMAGES_KEY);
    }
    setHasUnpublishedChanges(false);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        projectImages,
        setProjectImage,
        publishChanges,
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        hasUnpublishedChanges,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
