import React, { useState } from 'react';
import { WorkExperience } from '../data/resume';
import {
  Briefcase,
  ChevronDown,
  Calendar,
  Building2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VoyageSectionProps {
  work: WorkExperience[];
}

export const VoyageSection: React.FC<VoyageSectionProps> = ({ work }) => {
  const { lang, t } = useLanguage();
  const [expandedWork, setExpandedWork] = useState<number | null>(0); // first item open by default

  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('Deneyim & Kariyer Yolculuğu', 'Experience & Career Journey')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {t('Kariyer Yolculuğu & Görevler', 'Career Journey & Roles')}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            {t(
              'Arçelik/Beko/Grundig video süreçlerinden üretici yapay zeka ve web arayüzlerine uzanan profesyonel yolculuk.',
              'From Arçelik/Beko/Grundig video production to generative AI pipelines and modern web interfaces.'
            )}
          </p>
        </div>
      </div>

      {/* Timeline List of Professional Roles */}
      <div className="space-y-4">
        {work.map((item, index) => {
          const isExpanded = expandedWork === index;
          const title = lang === 'en' && item.titleEn ? item.titleEn : item.title;
          const desc = lang === 'en' && item.descriptionEn ? item.descriptionEn : item.description;

          return (
            <div
              key={item.company + item.start}
              className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              {/* Header row / clickable accordion trigger */}
              <div
                onClick={() => setExpandedWork(isExpanded ? null : index)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 font-bold font-mono text-sm">
                    {item.company[0]}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                        {title}
                      </h3>
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono mt-1">
                      <span className="flex items-center gap-1 text-neutral-800 dark:text-neutral-200 font-medium">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{item.company}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
                  <span className="text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.start} — {item.end === 'Günümüz' ? t('Günümüz', 'Present') : item.end}</span>
                  </span>
                  <div
                    className={`p-1 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 animate-in fade-in duration-200">
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
                    {desc}
                  </p>

                  {/* Technologies used */}
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-neutral-400 mr-1">
                      {t('Araçlar & Yetenekler:', 'Tools & Technologies:')}
                    </span>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
