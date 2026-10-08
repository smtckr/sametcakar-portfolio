import React, { useEffect } from 'react';
import { X, Clock, Calendar, BookOpen, Share2, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface Article {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  dateEn?: string;
  readTime: string;
  summary: string;
  summaryEn?: string;
  tags?: string[];
  content: string;
  contentEn?: string;
}

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedReadTime =
    lang === 'en'
      ? article.readTime.replace('dk okuma', 'min read')
      : article.readTime;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-article-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-y-auto flex flex-col text-neutral-900 dark:text-neutral-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span>{t('Yazılar & Düşünceler', 'Essays & Thoughts')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={t('Bağlantıyı Kopyala', 'Copy Link')}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={t('Kapat', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {lang === 'en' && article.dateEn ? article.dateEn : article.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {formattedReadTime}
            </span>
          </div>

          <h1 id="modal-article-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
            {lang === 'en' && article.titleEn ? article.titleEn : article.title}
          </h1>

          {/* Abstract callout */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
            {lang === 'en' && article.summaryEn ? article.summaryEn : article.summary}
          </div>

          {/* Full content parsed */}
          <div className="prose dark:prose-invert prose-neutral max-w-none text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4">
            {(lang === 'en' && article.contentEn ? article.contentEn : article.content).split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg font-bold text-neutral-900 dark:text-neutral-100 pt-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                return (
                  <pre key={index} className="p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800">
                    <code>{code}</code>
                  </pre>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Author signoff */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>{t('Yazar: Samet Çakar', 'Author: Samet Çakar')}</span>
            <span>{t('İstanbul, Türkiye', 'Istanbul, Turkey')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
