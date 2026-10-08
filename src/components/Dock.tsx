import React, { useState } from 'react';
import {
  Home,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  Languages,
  SlidersHorizontal,
} from 'lucide-react';
import { ResumeData } from '../data/resume';

interface DockProps {
  data: ResumeData;
  isDark: boolean;
  onToggleTheme: () => void;
  lang: 'tr' | 'en';
  onToggleLang: () => void;
  onOpenEditModal: () => void;
}

interface DockItemProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  badge?: string;
  active?: boolean;
}

const DockItem: React.FC<DockItemProps> = ({
  label,
  icon,
  onClick,
  href,
  target,
  badge,
  active,
}) => {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      className="relative flex items-center justify-center p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-150 active:scale-95 group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Icon */}
      <div className="w-5 h-5 flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
        {icon}
      </div>

      {badge && (
        <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full text-[9px] font-mono font-bold bg-blue-600 text-white">
          {badge}
        </span>
      )}

      {/* Hover Tooltip */}
      {hovered && (
        <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium whitespace-nowrap shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-100 z-50">
          {label}
          <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900 dark:bg-neutral-100" />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noreferrer noopener' : undefined}
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" aria-label={label} className="focus:outline-none">
      {content}
    </button>
  );
};

export const Dock: React.FC<DockProps> = ({
  data,
  isDark,
  onToggleTheme,
  lang,
  onToggleLang,
  onOpenEditModal,
}) => {
  const isTr = lang === 'tr';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <div className="flex items-center gap-0.5 sm:gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Navigation Sections */}
        <DockItem
          label={isTr ? 'Başa Dön' : 'Home'}
          icon={<Home className="w-4 h-4 sm:w-5 sm:h-5" />}
          onClick={scrollToTop}
        />
        <DockItem
          label={isTr ? 'Hakkımda' : 'About'}
          icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="#about"
        />
        <DockItem
          label={isTr ? 'Deneyim' : 'Experience'}
          icon={<Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="#experience"
        />
        <DockItem
          label={isTr ? 'Eğitim' : 'Education'}
          icon={<GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="#education"
        />
        <DockItem
          label={isTr ? 'Projeler' : 'Projects'}
          icon={<FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="#projects"
        />
        <DockItem
          label={isTr ? 'Yetenekler' : 'Skills'}
          icon={<Cpu className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="#skills"
        />
        <DockItem
          label={isTr ? 'İletişim' : 'Contact'}
          icon={<Mail className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="#contact"
        />

        {/* Divider */}
        <div className="w-[1px] h-5 bg-neutral-200 dark:bg-neutral-800 mx-1" />

        {/* Social Links */}
        <DockItem
          label="GitHub"
          icon={<Github className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="https://github.com/sametcakar"
          target="_blank"
        />
        <DockItem
          label="LinkedIn"
          icon={<Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="https://linkedin.com/in/sametcakar"
          target="_blank"
        />
        <DockItem
          label="X (Twitter)"
          icon={<Twitter className="w-4 h-4 sm:w-5 sm:h-5" />}
          href="https://x.com/sametcakar"
          target="_blank"
        />

        {/* Divider */}
        <div className="w-[1px] h-5 bg-neutral-200 dark:bg-neutral-800 mx-1" />

        {/* Language Switcher */}
        <DockItem
          label={isTr ? 'English (EN)' : 'Türkçe (TR)'}
          icon={
            <div className="flex items-center gap-1 font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
              <Languages className="w-3.5 h-3.5" />
              <span>{isTr ? 'EN' : 'TR'}</span>
            </div>
          }
          onClick={onToggleLang}
        />

        {/* Theme Switcher */}
        <DockItem
          label={isDark ? (isTr ? 'Açık Tema' : 'Light Mode') : isTr ? 'Koyu Tema' : 'Dark Mode'}
          icon={
            isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
            )
          }
          onClick={onToggleTheme}
        />

        {/* Edit / Customize Profile Modal Trigger */}
        <DockItem
          label={isTr ? 'Profili Özelleştir' : 'Edit Profile'}
          icon={<SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />}
          onClick={onOpenEditModal}
        />
      </div>
    </div>
  );
};
