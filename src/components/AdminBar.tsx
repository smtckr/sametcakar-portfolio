import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, LogOut, UploadCloud, Image as ImageIcon } from 'lucide-react';

export const AdminBar: React.FC = () => {
  const { isAdmin, logout, publishChanges, hasUnpublishedChanges, openHeroImageModal } = useAdmin();
  const { t } = useLanguage();
  const [publishedToast, setPublishedToast] = useState(false);

  if (!isAdmin) return null;

  const handlePublish = () => {
    publishChanges();
    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 4000);
  };

  return (
    <>
      {/* Toast Notification */}
      {publishedToast && (
        <div className="fixed top-16 right-4 sm:right-8 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500/80 text-emerald-100 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold text-sm">
              {t('Görseller Başarıyla Yayınlandı!', 'Images Published Successfully!')}
            </div>
            <div className="text-xs text-emerald-300">
              {t(
                'Yeni görselleriniz canlı sisteme kaydedildi ve tüm ziyaretçiler için aktif edildi.',
                'Your new images have been saved and are now live for all visitors.'
              )}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Floating Admin Bar */}
      <div className="sticky top-0 z-40 w-full bg-blue-950/95 text-blue-100 border-b border-blue-800/80 backdrop-blur-md px-4 py-2 text-xs font-mono select-none">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>{t('👑 Yönetici Modu Aktif', '👑 Admin Mode Active')}</span>
            </span>
            <span className="text-blue-300 hidden md:inline">
              ·{' '}
              {t(
                'Proje kartlarındaki "Görsel Değiştir" butonlarıyla yeni görselleri yükleyebilirsiniz.',
                'You can upload new images using the "Change Image" button on project cards.'
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openHeroImageModal}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-200 hover:text-white hover:bg-blue-900/60 transition-colors flex items-center gap-1.5 border border-blue-700/60"
              title={t('Hero portre görselini (9:16) yükle veya değiştir', 'Upload or change hero portrait image (9:16)')}
            >
              <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('Hero Görseli (9:16)', 'Hero Image (9:16)')}</span>
            </button>

            <button
              onClick={handlePublish}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                hasUnpublishedChanges
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
              title={t('Değiştirilen görselleri canlıya al', 'Publish changed images live')}
            >
              <UploadCloud className="w-4 h-4" />
              <span>
                {hasUnpublishedChanges
                  ? t('Değişiklikleri Yayınla *', 'Publish Changes *')
                  : t('Yayınla', 'Publish')}
              </span>
            </button>

            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-300 hover:text-white hover:bg-rose-900/60 transition-colors flex items-center gap-1 border border-rose-800/60"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('Çıkış', 'Log Out')}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
