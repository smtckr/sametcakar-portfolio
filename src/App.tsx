import React, { useState, useEffect } from 'react';
import { FloatingParticles } from './components/FloatingParticles';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CraftSection } from './components/CraftSection';
import { VoyageSection } from './components/VoyageSection';
import { TechRadarSection } from './components/TechRadarSection';
import { EssaysSection } from './components/EssaysSection';
import { GardenSection } from './components/GardenSection';
import { Footer } from './components/Footer';
import { FloatingDock } from './components/FloatingDock';
import { ProjectModal } from './components/ProjectModal';
import { ArticleModal, Article } from './components/ArticleModal';
import { CommandPalette } from './components/CommandPalette';
import { AdminBar } from './components/AdminBar';
import { AdminLoginModal } from './components/AdminLoginModal';
import { HeroImageModal } from './components/HeroImageModal';
import { AdminProvider } from './context/AdminContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { initialResumeData, Project } from './data/resume';
import { initialArticles } from './data/articles';

function MainApp() {
  const { lang } = useLanguage();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync theme with document element and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Global shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProjectByName = (title: string) => {
    const found = initialResumeData.projects.find((p) => p.title.includes(title));
    if (found) {
      setSelectedProject(found);
    }
  };

  const handleSelectArticleById = (id: string) => {
    const found = initialArticles.find((a) => a.id === id);
    if (found) {
      setSelectedArticle(found);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden selection:bg-blue-500 selection:text-white ${isDark ? 'dark' : ''}`}>
      {/* Admin Mode Top Action Bar */}
      <AdminBar />

      {/* 3D Floating Particles Background Canvas */}
      <FloatingParticles isDark={isDark} />

      {/* Background Grid Pattern - 100% Thicker & Distinct */}
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-80 z-0" />

      {/* Top Header with Language Selector */}
      <Header />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* 1. Hero Section with Kinetic Staggered Name */}
        <HeroSection onOpenContact={scrollToContact} />

        {/* 2. Projeler & Üretimler */}
        <CraftSection
          projects={initialResumeData.projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 3. Deneyim & Kariyer Yolculuğu */}
        <VoyageSection
          work={initialResumeData.work}
        />

        {/* 4. Yetenekler & 3D Teknoloji Küresi */}
        <TechRadarSection isDark={isDark} />

        {/* 5. Yazılar & Notlar */}
        <EssaysSection
          articles={initialArticles}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* 6. Birlikte Üretelim & İletişim */}
        <GardenSection email={initialResumeData.contact.email} />
      </main>

      {/* Footer with Live City Clock, Minimalist Copyright and Secret Admin Trigger on "saklıdır" */}
      <Footer />

      {/* Floating Bottom Glass Dock */}
      <FloatingDock
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={handleSelectProjectByName}
        onSelectArticle={handleSelectArticleById}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        isDark={isDark}
      />

      {/* Secret Admin Login Modal */}
      <AdminLoginModal />

      {/* 9:16 Hero Image Admin Upload Modal */}
      <HeroImageModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <MainApp />
      </AdminProvider>
    </LanguageProvider>
  );
}
