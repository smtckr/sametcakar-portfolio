import React, { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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
    <footer className="relative border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white/95 dark:bg-neutral-950/95 text-neutral-900 dark:text-neutral-100 transition-colors overflow-hidden pb-20 sm:pb-10">
      {/* Ambient top highlight glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Location & Live Time Badge */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex h-[30px] items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 px-3 font-mono text-xs select-none backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {t('Türkiye / İstanbul', 'Turkey / Istanbul')}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100 tabular-nums flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-400" />
                <span>{timeStr || '--:--:--'}</span>
                <span className="text-[10px] text-neutral-400">{t('TSİ', 'TRT')}</span>
              </span>
            </div>
          </div>

          {/* Minimalist Copyright */}
          <div className="flex items-center justify-center sm:justify-end text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
            <span>© {new Date().getFullYear()} Samet Çakar. {t('Tüm hakları saklıdır.', 'All rights reserved.')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
