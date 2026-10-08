import React from 'react';
import { Article } from './ArticleModal';
import { BookOpen, Calendar, Clock, ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EssaysSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const EssaysSection: React.FC<EssaysSectionProps> = ({ articles, onSelectArticle }) => {
  const { lang, t } = useLanguage();

  return (
    <section id="essays" className="py-16 sm:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('Yazılar & Notlar', 'Essays & Notes')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {t('Yazılar & Notlar', 'Essays & Insights')}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            {t(
              'ComfyUI iş akışları, kurumsal video eğitimi süreçleri, yapay zeka eklenti mimarisi ve prodüksiyon deneyimleri.',
              'ComfyUI workflows, corporate training video production, AI plugin architecture, and generative pipelines.'
            )}
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => {
          const formattedReadTime =
            lang === 'en'
              ? article.readTime.replace('dk okuma', 'min read')
              : article.readTime;

          return (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div>
                {/* Date & Time */}
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === 'en' && article.dateEn ? article.dateEn : article.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formattedReadTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-start justify-between gap-2">
                  <span>{lang === 'en' && article.titleEn ? article.titleEn : article.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </h3>

                {/* Summary */}
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {lang === 'en' && article.summaryEn ? article.summaryEn : article.summary}
                </p>
              </div>

              {/* Bottom read button (tags completely removed) */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-end">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{t('Oku', 'Read')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
