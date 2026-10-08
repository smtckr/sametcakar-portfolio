import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Upload, Link2, Trash2, CheckCircle2, Image as ImageIcon, AlertCircle } from 'lucide-react';

export const HeroImageModal: React.FC = () => {
  const {
    isAdmin,
    heroImage,
    setHeroImage,
    removeHeroImage,
    isHeroImageModalOpen,
    closeHeroImageModal,
    openLoginModal,
  } = useAdmin();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with current heroImage when modal opens
  useEffect(() => {
    if (isHeroImageModalOpen) {
      setPreviewUrl(heroImage || '');
      setUrlInput(heroImage || '');
      setErrorMsg('');
    }
  }, [isHeroImageModalOpen, heroImage]);

  if (!isHeroImageModalOpen) return null;

  // Security gate: only admin can use this modal
  if (!isAdmin) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
        onClick={closeHeroImageModal}
      >
        <div
          className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-center space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">
            {t('Yetki Gerekiyor', 'Admin Access Required')}
          </h3>
          <p className="text-xs text-neutral-400">
            {t(
              'Görsel yükleme ve düzenleme işlemlerini sadece yönetici yapabilir.',
              'Only administrators can upload and change the portrait image.'
            )}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                closeHeroImageModal();
                openLoginModal();
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              {t('Yönetici Girişi Yap', 'Admin Login')}
            </button>
            <button
              onClick={closeHeroImageModal}
              className="py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
            >
              {t('Kapat', 'Close')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg(t('Lütfen geçerli bir resim dosyası seçin.', 'Please select a valid image file.'));
      return;
    }

    // Check size limit: 8MB max
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg(t('Görsel boyutu en fazla 8MB olabilir.', 'Image size cannot exceed 8MB.'));
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setErrorMsg(t('Lütfen bir görsel URL adresi girin.', 'Please enter an image URL.'));
      return;
    }
    setErrorMsg('');
    setPreviewUrl(trimmed);
  };

  const handleSave = () => {
    if (!previewUrl) {
      setErrorMsg(t('Lütfen önce bir görsel yükleyin veya seçin.', 'Please choose or upload an image first.'));
      return;
    }
    setHeroImage(previewUrl);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      closeHeroImageModal();
    }, 1200);
  };

  const handleRemove = () => {
    removeHeroImage();
    setPreviewUrl('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      closeHeroImageModal();
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto"
      onClick={closeHeroImageModal}
    >
      <div
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl text-neutral-100 flex flex-col space-y-5 animate-in zoom-in-95 duration-150 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t('Hero Portre Görseli Yükle', 'Upload Hero Portrait Image')}
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                {t('9:16 Dikey En Boy Oranı (Admin)', '9:16 Vertical Aspect Ratio (Admin)')}
              </p>
            </div>
          </div>
          <button
            onClick={closeHeroImageModal}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label={t('Kapat', 'Close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successToast && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('Görsel başarıyla kaydedildi!', 'Image saved successfully!')}</span>
          </div>
        )}

        {/* Content Grid: Left Upload Controls, Right 9:16 Live Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
          {/* Controls Column */}
          <div className="sm:col-span-7 space-y-4">
            {/* Tabs: File Upload vs URL */}
            <div className="flex p-1 rounded-xl bg-neutral-800/90 border border-neutral-700/80 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'upload'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{t('Dosya Seç', 'Choose File')}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'url'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>{t('Web URL', 'Web URL')}</span>
              </button>
            </div>

            {/* Tab 1: File Upload */}
            {activeTab === 'upload' && (
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="hero-file-input"
                />
                <label
                  htmlFor="hero-file-input"
                  className="border-2 border-dashed border-neutral-700 hover:border-blue-500 bg-neutral-800/40 hover:bg-neutral-800/80 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all group text-center"
                >
                  <Upload className="w-8 h-8 text-neutral-400 group-hover:text-blue-400 mb-2 transition-colors" />
                  <span className="text-xs font-semibold text-neutral-200 group-hover:text-white">
                    {t('Görsel seçmek için tıklayın', 'Click to browse image')}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono mt-1">
                    PNG, JPG, WEBP · max 8MB
                  </span>
                </label>
              </div>
            )}

            {/* Tab 2: URL input */}
            {activeTab === 'url' && (
              <div className="space-y-2">
                <label className="block text-xs font-mono text-neutral-300">
                  {t('Görsel Bağlantısı (URL):', 'Image Link (URL):')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/portre.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-700 bg-neutral-800/90 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700"
                  >
                    {t('Önizle', 'Preview')}
                  </button>
                </div>
              </div>
            )}

            {/* Info hint */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-[11px] text-blue-200/80 leading-relaxed">
              💡 {t(
                '9:16 formatı (1080x1920 veya benzeri dikey portre) en iyi sonucu verir. Seçilen görsel doğrudan "Samet Çakar" başlığının yanında sergilenecektir.',
                'A 9:16 vertical ratio (e.g. 1080x1920) works best. The image will be shown alongside your name.'
              )}
            </div>
          </div>

          {/* Right: 9:16 Live Preview Container */}
          <div className="sm:col-span-5 flex flex-col items-center">
            <span className="text-xs font-mono text-neutral-400 mb-2">
              {t('9:16 Canlı Önizleme', '9:16 Live Preview')}
            </span>
            <div className="w-36 aspect-[9/16] rounded-2xl overflow-hidden border-2 border-blue-500/50 bg-neutral-950 shadow-xl relative flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Önizleme"
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="p-3 text-center text-neutral-500 text-[11px] font-mono">
                  <ImageIcon className="w-6 h-6 mx-auto mb-1 text-neutral-600" />
                  <span>{t('Görsel Yok', 'No Image')}</span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 right-2 py-0.5 px-1.5 rounded bg-black/60 backdrop-blur-sm text-[9px] font-mono text-center text-white/80">
                9:16 Portrait
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800">
          {heroImage ? (
            <button
              type="button"
              onClick={handleRemove}
              className="py-2.5 px-3.5 rounded-xl text-xs font-medium text-rose-400 hover:text-white hover:bg-rose-950/80 border border-rose-900/60 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('Mevcut Görseli Kaldır', 'Remove Image')}</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeHeroImageModal}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
            >
              {t('İptal', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg active:scale-95 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('Kaydet ve Yayınla', 'Save and Publish')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
