import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, User, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showStatus?: boolean;
  allowUpload?: boolean;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'hero',
  showStatus = true,
  allowUpload = true,
  className = '',
}) => {
  const { t } = useLanguage();
  const { isAdmin, avatarUrl: adminAvatarUrl, openPhotoModal } = useAdmin();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);

  // Sync avatar with admin context and local storage
  useEffect(() => {
    const loadAvatar = () => {
      if (adminAvatarUrl) {
        setAvatarUrl(adminAvatarUrl);
        setImgError(false);
        return;
      }
      try {
        const saved = localStorage.getItem('samet_avatar');
        if (saved) {
          setAvatarUrl(saved);
          setImgError(false);
          return;
        }
      } catch {
        // ignore storage errors
      }
      // Fallback
      setAvatarUrl('/samet-cakar.jpg');
      setImgError(false);
    };

    loadAvatar();

    const handleAvatarUpdate = () => {
      loadAvatar();
    };

    window.addEventListener('avatar-updated', handleAvatarUpdate);
    return () => window.removeEventListener('avatar-updated', handleAvatarUpdate);
  }, [adminAvatarUrl]);

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-full',
    md: 'w-16 h-16 rounded-2xl',
    lg: 'w-24 h-24 rounded-3xl',
    hero: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl',
  };

  const hasPhoto = !!avatarUrl && !imgError;
  const canAdminEdit = isAdmin && allowUpload;

  return (
    <>
      <div className={`relative group inline-block select-none ${className}`}>
        {/* Subtle Ambient Studio Glow for Hero */}
        {size === 'hero' && (
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/25 via-purple-600/20 to-emerald-500/20 rounded-[32px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Outer Frame with Double-Border & Glassmorphism */}
        <div
          className={`relative ${sizeClasses[size]} p-1.5 sm:p-2 bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/90 dark:border-neutral-800/90 shadow-xl dark:shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:border-neutral-400 dark:group-hover:border-neutral-600`}
        >
          {/* Inner Image Container */}
          <div
            className={`relative w-full h-full rounded-[22px] overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center ${
              hasPhoto && !canAdminEdit ? 'cursor-zoom-in' : ''
            }`}
            onClick={() => {
              if (hasPhoto && !canAdminEdit) {
                setShowZoomModal(true);
              }
            }}
          >
            {hasPhoto ? (
              <img
                src={avatarUrl}
                alt="Samet Çakar"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Sleek Creator Fallback State with SÇ Monogram and Studio Mesh */
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 text-white p-4">
                {/* Subtle Grid Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:10px_10px] opacity-40 pointer-events-none" />
                
                {/* Creator Camera / Video Glyph */}
                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                
                {/* Initials & Title */}
                <span className="relative z-10 font-bold text-base sm:text-lg tracking-wider text-neutral-100">
                  SAMET ÇAKAR
                </span>
                <span className="relative z-10 text-[10px] sm:text-xs text-neutral-400 tracking-wide font-mono mt-0.5">
                  Video & AI
                </span>
              </div>
            )}

            {/* Admin-Only Overlay: Edit / Upload controls */}
            {canAdminEdit && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPhotoModal();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-semibold flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                  title={t('Profil Fotoğrafını Yönet (Yönetici)', 'Manage Photo (Admin)')}
                >
                  <Camera className="w-3.5 h-3.5 text-blue-600" />
                  <span>{hasPhoto ? t('Değiştir (Admin)', 'Change (Admin)') : t('Fotoğraf Ekle', 'Add Photo')}</span>
                </button>

                {hasPhoto && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowZoomModal(true);
                    }}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs transition-colors"
                    title={t('Büyük Görseli İncele', 'View Fullscreen')}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Normal Visitor Photo Zoom Hint (only if photo exists and NOT admin) */}
            {!canAdminEdit && hasPhoto && (
              <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/40 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>

        {/* Admin Editable Indicator Badge */}
        {canAdminEdit && (
          <button
            type="button"
            onClick={openPhotoModal}
            className="absolute -top-2 -right-2 z-30 p-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg border-2 border-white dark:border-neutral-900 transition-transform hover:scale-110 active:scale-95"
            title={t('Fotoğrafı Değiştir (Yönetici)', 'Change Photo (Admin)')}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Live Availability Status Badge (Green Pulsing Dot) */}
        {showStatus && size === 'hero' && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md text-[11px] font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{t('Yeni Projelere Açık', 'Open to Projects')}</span>
            </div>
          </div>
        )}

        {/* Top Role Badge */}
        {size === 'hero' && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md text-[10px] font-semibold tracking-wide uppercase">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
              <span>{t('Creative Lead', 'Creative Lead')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Photo Zoom Modal */}
      {showZoomModal && hasPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowZoomModal(false)}
        >
          <div
            className="relative max-w-2xl max-h-[90vh] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950/80">
              <div className="text-white text-xs font-mono font-medium">
                Samet Çakar · Portfolyo
              </div>
              <button
                type="button"
                onClick={() => setShowZoomModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 flex items-center justify-center bg-black/50">
              <img
                src={avatarUrl!}
                alt="Samet Çakar"
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
