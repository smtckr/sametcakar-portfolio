import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Upload, Trash2, Check, Link as LinkIcon, Camera, User, Sparkles } from 'lucide-react';

export const AdminPhotoModal: React.FC = () => {
  const { isPhotoModalOpen, closePhotoModal, avatarUrl, setAvatar, publishChanges } = useAdmin();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync preview with current avatar when opened
  React.useEffect(() => {
    if (isPhotoModalOpen) {
      setPreviewUrl(avatarUrl);
      setUrlInput('');
      setErrorMessage('');
      setSaveSuccess(false);
    }
  }, [isPhotoModalOpen, avatarUrl]);

  if (!isPhotoModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage(t('Lütfen geçerli bir görsel dosyası seçin (PNG, JPG, WEBP).', 'Please select a valid image file.'));
      return;
    }

    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setPreviewUrl(urlInput.trim());
    setErrorMessage('');
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setErrorMessage('');
  };

  const handleSaveAndPublish = () => {
    setAvatar(previewUrl);
    publishChanges();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      closePhotoModal();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closePhotoModal}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-neutral-900 dark:text-neutral-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>{t('Profil Fotoğrafı Yönetimi', 'Profile Photo Management')}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-mono font-medium">
                  {t('Yönetici', 'Admin')}
                </span>
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {t('Portfolyoda gösterilecek fotoğrafınızı yükleyin veya güncelleyin.', 'Upload or update your portfolio showcase portrait.')}
              </p>
            </div>
          </div>
          <button
            onClick={closePhotoModal}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Live Preview Display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 shadow-md bg-neutral-200 dark:bg-neutral-800 shrink-0 flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Canlı Önizleme"
                  className="w-full h-full object-cover object-center"
                  onError={() => setErrorMessage(t('Görsel yüklenemedi. Lütfen geçerli bir dosya veya URL deneyin.', 'Failed to load image.'))}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-neutral-400 p-2 text-center">
                  <User className="w-8 h-8 mb-1 text-neutral-400" />
                  <span className="text-[11px] font-medium font-mono">SAMET ÇAKAR</span>
                  <span className="text-[9px] text-neutral-500">{t('Fotoğraf Yok', 'No Photo')}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="font-semibold text-sm">
                {previewUrl ? t('Canlı Görsel Önizlemesi', 'Live Photo Preview') : t('Varsayılan Baş Harfler', 'Default Monogram Display')}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {t(
                  'Bu fotoğraf Hero (giriş) bölümünde ve alt iletişim kartında ziyaretçilerinize yüksek kalitede gösterilecektir.',
                  'This photo will be displayed prominently in the Hero and Contact sections.'
                )}
              </p>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:underline pt-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('Fotoğrafı Kaldır (Varsayılana Dön)', 'Remove Photo (Reset)')}</span>
                </button>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Option 1: File Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
              {t('1. Bilgisayardan Fotoğraf Yükle', '1. Upload Photo from Device')}
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-5 text-center cursor-pointer transition-colors bg-white dark:bg-neutral-900/50 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                {t('Dosya seçmek için tıklayın veya sürükleyin', 'Click to choose or drag an image')}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                PNG, JPG, WEBP (Önerilen kare / portre oranı)
              </div>
            </div>
          </div>

          {/* Option 2: Image URL */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
              {t('2. Veya Fotoğraf Bağlantısı (URL)', '2. Or Image Web URL')}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="url"
                  placeholder="https://... (Örn: LinkedIn / Drive direkt resim linki)"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              >
                {t('Önizle', 'Preview')}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80">
          <button
            type="button"
            onClick={closePhotoModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
          >
            {t('Vazgeç', 'Cancel')}
          </button>

          <button
            type="button"
            onClick={handleSaveAndPublish}
            disabled={saveSuccess}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md active:scale-95 transition-all flex items-center gap-2"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{t('Kaydedildi & Yayınlandı!', 'Saved & Published!')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>{t('Kaydet ve Canlıya Al', 'Save & Publish Live')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
