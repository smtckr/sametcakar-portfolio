import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Upload,
  Play,
  Image as ImageIcon,
  X,
  Video,
  Wand2,
  Scissors,
  Film,
  Layers,
} from 'lucide-react';

interface ProjectMediaProps {
  title: string;
  category: string;
  initialImage?: string;
}

export const ProjectMedia: React.FC<ProjectMediaProps> = ({
  title,
  category,
  initialImage,
}) => {
  const { isAdmin, projectImages, setProjectImage } = useAdmin();

  // Use image from AdminContext published/draft map, fallback to initialImage
  const currentImage = projectImages[title] || initialImage || '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveImage = (newUrl: string) => {
    setProjectImage(title, newUrl);
    setIsModalOpen(false);
    setUrlInput('');
    setErrorMsg('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Lütfen geçerli bir görsel dosyası (JPG, PNG, WEBP) seçin.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Görsel boyutu 8MB\'tan küçük olmalıdır.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        handleSaveImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    handleSaveImage(urlInput.trim());
  };

  const handleRemoveImage = () => {
    setProjectImage(title, '');
    setIsModalOpen(false);
  };

  // Determine category theme colors & icons
  const getCategoryTheme = () => {
    if (title.includes('Arçelik') || title.includes('Beko')) {
      return {
        bg: 'from-blue-950 via-neutral-900 to-neutral-950',
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        icon: <Video className="w-4 h-4 text-blue-400" />,
        label: 'Ürün Eğitim Videosu · Synthesia & Premiere',
      };
    }
    if (title.includes('ComfyUI')) {
      return {
        bg: 'from-purple-950 via-neutral-900 to-neutral-950',
        badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        icon: <Wand2 className="w-4 h-4 text-purple-400" />,
        label: 'Generative AI · Flux2 & Krea2 8K',
      };
    }
    if (title.includes('Eklenti') || title.includes('Plugin')) {
      return {
        bg: 'from-rose-950 via-neutral-900 to-neutral-950',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        icon: <Scissors className="w-4 h-4 text-rose-400" />,
        label: 'Video Kurgu AI Eklentisi · Qwen LLM',
      };
    }
    if (title.includes('H3') || title.includes('Seedance')) {
      return {
        bg: 'from-amber-950 via-neutral-900 to-neutral-950',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        icon: <Film className="w-4 h-4 text-amber-400" />,
        label: 'Sinematik AI Video · Hailuo H3',
      };
    }
    return {
      bg: 'from-neutral-900 via-neutral-950 to-black',
      badgeBg: 'bg-neutral-800 text-neutral-300 border-neutral-700',
      icon: <Layers className="w-4 h-4 text-blue-400" />,
      label: category,
    };
  };

  const theme = getCategoryTheme();

  return (
    <div className="w-full h-48 sm:h-52 bg-neutral-950 text-neutral-100 rounded-t-xl overflow-hidden relative select-none flex flex-col border-b border-neutral-800 group">
      {/* Real Image Rendered */}
      {currentImage ? (
        <div className="relative w-full h-full overflow-hidden bg-neutral-900">
          <img
            src={currentImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Video Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </div>
          </div>

          {/* Admin-Only Change Image Button */}
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-[11px] font-mono border border-white/20 flex items-center gap-1 shadow-lg z-20"
              title="Görseli Değiştir (Yönetici)"
            >
              <Upload className="w-3 h-3" />
              <span>Görseli Değiştir</span>
            </button>
          )}
        </div>
      ) : (
        /* Professional Branded Fallback Poster Frame */
        <div
          className={`relative w-full h-full bg-gradient-to-br ${theme.bg} p-4 flex flex-col justify-between overflow-hidden`}
        >
          {/* Subtle geometric dot pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top category label & admin upload trigger */}
          <div className="relative z-10 flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono font-medium backdrop-blur-sm ${theme.badgeBg}`}
            >
              {theme.icon}
              <span className="truncate max-w-[190px]">{theme.label}</span>
            </div>

            {/* Quick Upload Button (Admin Only) */}
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-[11px] font-mono border border-white/20 flex items-center gap-1 shadow-md"
                title="Görsel Yükle (Yönetici)"
              >
                <Upload className="w-3 h-3" />
                <span>Görsel Yükle</span>
              </button>
            )}
          </div>

          {/* Center Play Icon & Title */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl mb-2 group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
            <span className="text-xs font-semibold text-white/90 line-clamp-1 drop-shadow-md">
              {title}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 mt-0.5">
              Video & Prodüksiyon İncelemesi
            </span>
          </div>

          {/* Bottom subtle bar */}
          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1 border-t border-white/10">
            <span>Video & AI Prodüksiyon</span>
            <span className="text-emerald-400">● 1080p Master</span>
          </div>
        </div>
      )}

      {/* Admin Image Upload & URL Dialog Modal */}
      {isAdmin && isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          <div
            className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-5 shadow-2xl text-neutral-100 flex flex-col space-y-4 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span>Proje Görselini Ayarla (Yönetici)</span>
                </h3>
                <p className="text-[11px] text-neutral-400 truncate max-w-[280px]">
                  {title}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Option 1: File Upload */}
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Seçenek 1: Bilgisayarından Görsel Seç (Dosya Yükle)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-neutral-700 hover:border-blue-500 bg-neutral-800/60 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white flex flex-col items-center justify-center gap-1 transition-all"
              >
                <Upload className="w-5 h-5 text-blue-400" />
                <span>Görsel Yüklemek İçin Tıklayın</span>
                <span className="text-[10px] text-neutral-500">
                  (PNG, JPG, WEBP - Max 8MB)
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-[1px] bg-neutral-800" />
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                veya
              </span>
              <div className="flex-1 h-[1px] bg-neutral-800" />
            </div>

            {/* Option 2: Image URL */}
            <form onSubmit={handleUrlSubmit} className="space-y-2">
              <label className="block text-xs font-mono font-medium text-neutral-300">
                Seçenek 2: Görsel Bağlantısı (URL) Gir
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://.../gorsel.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-700 bg-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Uygula
                </button>
              </div>
            </form>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-neutral-800 text-xs">
              {currentImage ? (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-rose-400 hover:text-rose-300 text-[11px] font-mono"
                >
                  Görseli Sıfırla
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
