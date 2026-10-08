import React, { useState } from 'react';
import { Project } from '../data/resume';
import { ProjectMedia } from './ProjectMedia';
import { ArrowUpRight, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CraftSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const CraftSection: React.FC<CraftSectionProps> = ({ projects, onSelectProject }) => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('Tüm Çalışmalar', 'All Work') },
    { id: 'AI Video & Prodüksiyon', label: t('AI Video & Eğitim', 'AI Video & Training') },
    { id: 'Generative AI & ComfyUI', label: t('ComfyUI & Görsel', 'ComfyUI & Visuals') },
    { id: 'AI Eklenti & Araçlar', label: t('AI Eklentileri', 'AI Plugins') },
    { id: 'Web Arayüzleri', label: t('Web Arayüzleri', 'Web Interfaces') },
    { id: 'Sosyal Medya', label: t('Sosyal Medya', 'Social Media') },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('Projeler & Üretimler', 'Projects & Production')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {t('Öne Çıkan Projeler & Üretimler', 'Featured Projects & Creations')}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            {t(
              'Arçelik/Beko/Grundig eğitim videolarından ComfyUI iş akışlarına, video kurgu AI eklentilerinden modern web arayüzlerine.',
              'From Arçelik/Beko/Grundig training videos to ComfyUI pipelines, video editing AI plugins, and modern web interfaces.'
            )}
          </p>
        </div>

        {/* Filter Segmented Controls - Single Row */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-x-auto max-w-full no-scrollbar shrink-0 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                filter === cat.id
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const descriptionText =
            lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;

          return (
            <div
              key={project.title}
              className="group relative flex flex-col rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Visual Media or Real Image Banner */}
              <div
                className="cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <ProjectMedia
                  title={project.title}
                  category={project.category}
                  initialImage={project.image}
                />
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta details */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                    <span className="text-blue-600 dark:text-blue-400 font-medium truncate max-w-[200px]">
                      {project.category}
                    </span>
                    <span>{lang === 'en' ? project.dates.replace('Günümüz', 'Present') : project.dates}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="line-clamp-1">{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {descriptionText}
                  </p>
                </div>

                {/* Bottom Tech Pills & Actions */}
                <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[11px] font-mono rounded text-neutral-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>{t('Detaylı İncele', 'View Details')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
