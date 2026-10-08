import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Turkish Time (Europe/Istanbul - UTC+3)
      const formatted = new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Live Location & Local Time Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-xs font-mono text-neutral-600 dark:text-neutral-400 select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-400" />
              <span>{t('İstanbul', 'Istanbul')}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-neutral-900 dark:text-neutral-200 font-medium tabular-nums">
              <Clock className="w-3 h-3 text-neutral-400" />
              <span>{timeStr || '--:--:--'}</span>
              <span className="text-[10px] text-neutral-400">{t('TSİ', 'TRT')}</span>
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#projects"
            className="hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            {t('Projeler', 'Projects')}
          </a>
          <a
            href="#experience"
            className="hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            {t('Deneyim', 'Experience')}
          </a>
          <a
            href="#radar"
            className="hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            {t('Yetenekler', 'Skills')}
          </a>
          <a
            href="#essays"
            className="hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            {t('Yazılar', 'Essays')}
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-950 dark:hover:text-white transition-colors"
          >
            {t('İletişim', 'Contact')}
          </a>
        </nav>

        {/* Right: Language Selector (TR / EN) */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center p-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-sm text-xs font-mono shadow-sm">
            <Globe className="w-3.5 h-3.5 text-neutral-400 ml-1.5 mr-1" />
            <button
              type="button"
              onClick={() => setLang('tr')}
              className={`px-2.5 py-1 rounded-lg transition-all text-xs font-semibold ${
                lang === 'tr'
                  ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
              aria-label="Türkçe"
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all text-xs font-semibold ${
                lang === 'en'
                  ? 'bg-white dark:bg-neutral-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
