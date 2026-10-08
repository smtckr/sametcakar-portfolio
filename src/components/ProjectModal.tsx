import React, { useEffect } from 'react';
import { Project } from '../data/resume';
import { X, CheckCircle2, AlertCircle, Lightbulb, Sparkles } from 'lucide-react';
import { ProjectMedia } from './ProjectMedia';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: 'tr' | 'en';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isTr = lang === 'tr';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-y-auto flex flex-col text-neutral-900 dark:text-neutral-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {project.category} · {isTr ? project.dates : project.dates.replace('Günümüz', 'Present')}
            </span>
            <h2 id="modal-project-title" className="text-xl font-bold tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Kapat"
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Visual Media Banner */}
        <div className="w-full">
          <ProjectMedia
            title={project.title}
            category={project.category}
            initialImage={project.image}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Main Description */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 font-mono mb-2">
              {isTr ? 'Proje Özeti' : 'Project Summary'}
            </h3>
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {isTr ? project.description : project.descriptionEn}
            </p>
          </div>

          {/* Case Study Details if available */}
          {project.caseStudy && (
            <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              {/* Problem */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isTr ? 'Problem & İhtiyaç' : 'Problem & Challenge'}</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {isTr ? project.caseStudy.problem : project.caseStudy.problemEn}
                </p>
              </div>

              {/* Solution */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-1">
                  <Lightbulb className="w-4 h-4" />
                  <span>{isTr ? 'Mimari Çözüm & Yaklaşım' : 'Technical Solution'}</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {isTr ? project.caseStudy.solution : project.caseStudy.solutionEn}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isTr ? 'Öne Çıkan Başarılar' : 'Key Achievements & Impact'}</span>
                </div>
                <ul className="space-y-2">
                  {(isTr ? project.caseStudy.highlights : project.caseStudy.highlightsEn).map(
                    (highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 font-mono mb-2.5">
              {isTr ? 'Kullanılan Teknolojiler' : 'Technologies Used'}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
