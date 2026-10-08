import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  name: string;
  lang: 'tr' | 'en';
}

export const Navbar: React.FC<NavbarProps> = ({ name, lang }) => {
  const isTr = lang === 'tr';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          {name}
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#about"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            {isTr ? 'Hakkımda' : 'About'}
          </a>
          <a
            href="#experience"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            {isTr ? 'Deneyim' : 'Experience'}
          </a>
          <a
            href="#skills"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            {isTr ? 'Yetenekler' : 'Skills'}
          </a>
          <a
            href="#projects"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            {isTr ? 'Projeler' : 'Projects'}
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap"
          >
            {isTr ? 'İletişim' : 'Contact'}
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{isTr ? 'İletişime Geç' : 'Get in Touch'}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
