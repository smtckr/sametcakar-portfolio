import React, { useState } from 'react';
import {
  Home,
  FolderGit2,
  Briefcase,
  Cpu,
  BookOpen,
  Mail,
  Search,
  Sun,
  Moon,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingDockProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  isDark,
  onToggleTheme,
  onOpenSearch,
}) => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const dockItems = [
    { id: 'hero', label: t('Ana Sayfa', 'Home'), icon: <Home className="w-4 h-4" />, href: '#hero' },
    { id: 'projects', label: t('Projeler', 'Projects'), icon: <FolderGit2 className="w-4 h-4" />, href: '#projects' },
    { id: 'experience', label: t('Deneyim', 'Experience'), icon: <Briefcase className="w-4 h-4" />, href: '#experience' },
    { id: 'radar', label: t('Yetenekler', 'Skills'), icon: <Cpu className="w-4 h-4" />, href: '#radar' },
    { id: 'essays', label: t('Yazılar', 'Essays'), icon: <BookOpen className="w-4 h-4" />, href: '#essays' },
    { id: 'contact', label: t('İletişim', 'Contact'), icon: <Mail className="w-4 h-4" />, href: '#contact' },
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] transition-transform duration-300 ease-out hover:scale-105 sm:hover:scale-110">
      <div className="flex items-center gap-0.5 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.18)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        {dockItems.map((item) => (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a
              href={item.href}
              className="p-1.5 sm:p-2.5 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-150 active:scale-90"
              aria-label={item.label}
            >
              <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4">
                {item.icon}
              </span>
            </a>

            {hoveredIndex === item.id && (
              <div className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-100 z-50">
                {item.label}
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900 dark:bg-neutral-100" />
              </div>
            )}
          </div>
        ))}

        {/* Separator */}
        <div className="w-[1px] h-4 sm:h-5 bg-neutral-200 dark:bg-neutral-800 mx-0.5 sm:mx-1" />

        {/* Search shortcut */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredIndex('search')}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2.5 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-90"
            aria-label={t('Arama yap (⌘K)', 'Search (⌘K)')}
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          {hoveredIndex === 'search' && (
            <div className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-100 z-50">
              {t('Arama yap (⌘K)', 'Search (⌘K)')}
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900 dark:bg-neutral-100" />
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="w-[1px] h-4 sm:h-5 bg-neutral-200 dark:bg-neutral-800 mx-0.5 sm:mx-1" />

        {/* Theme switch */}
        <div
          className="relative"
          onMouseEnter={() => setHoveredIndex('theme')}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2.5 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-90"
            aria-label={t('Tema', 'Theme')}
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700" />
            )}
          </button>
          {hoveredIndex === 'theme' && (
            <div className="hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-100 z-50">
              {isDark ? t('Açık Tema', 'Light Mode') : t('Koyu Tema', 'Dark Mode')}
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900 dark:bg-neutral-100" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
