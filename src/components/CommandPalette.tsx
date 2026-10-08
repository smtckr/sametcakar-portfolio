import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  FileCode2,
  FolderGit2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Briefcase,
  Cpu,
  Mail,
  Moon,
  Sun,
  Video,
  Wand2,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (title: string) => void;
  onSelectArticle: (id: string) => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

interface CommandItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectArticle,
  onToggleTheme,
  isDark,
}) => {
  const { lang, t } = useLanguage();
  const { isAdmin, openLoginModal, openHeroImageModal } = useAdmin();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  const navigateTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const allItems: CommandItem[] = [
    // Sections
    {
      id: 'sec-hero',
      category: t('Sayfa Bölümleri', 'Page Sections'),
      title: t('Ana Sayfa & Giriş', 'Home & Introduction'),
      description: t('Samet Çakar portfolyo başlangıç noktası', 'Portfolio starting point'),
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => navigateTo('#hero'),
    },
    {
      id: 'sec-craft',
      category: t('Sayfa Bölümleri', 'Page Sections'),
      title: t('Projeler & Çalışmalar', 'Projects & Production'),
      description: t(
        'Arçelik/Beko videoları, ComfyUI, AI eklentileri ve web işleri',
        'Arçelik/Beko videos, ComfyUI, AI plugins, and web projects'
      ),
      icon: <FolderGit2 className="w-4 h-4 text-emerald-500" />,
      action: () => navigateTo('#projects'),
    },
    {
      id: 'sec-voyage',
      category: t('Sayfa Bölümleri', 'Page Sections'),
      title: t('Deneyim & Kariyer Yolculuğu', 'Experience & Career'),
      description: t(
        'Arçelik/Beko süreçleri, AI video ve web deneyimi',
        'Arçelik/Beko roles, AI video, and modern UI experience'
      ),
      icon: <Briefcase className="w-4 h-4 text-purple-500" />,
      action: () => navigateTo('#experience'),
    },
    {
      id: 'sec-radar',
      category: t('Sayfa Bölümleri', 'Page Sections'),
      title: t('Yetenekler & 3D Teknoloji Küresi', 'Skills & 3D Tech Sphere'),
      description: t(
        'ComfyUI, Synthesia, Premiere Pro, Final Cut ve web',
        'ComfyUI, Synthesia, Premiere Pro, Final Cut, and web'
      ),
      icon: <Cpu className="w-4 h-4 text-cyan-500" />,
      action: () => navigateTo('#radar'),
    },
    {
      id: 'sec-essays',
      category: t('Sayfa Bölümleri', 'Page Sections'),
      title: t('Yazılar & Notlar', 'Essays & Insights'),
      description: t(
        'ComfyUI, Synthesia, AI video ve eklenti makaleleri',
        'ComfyUI, Synthesia, AI video, and plugin development articles'
      ),
      icon: <BookOpen className="w-4 h-4 text-rose-500" />,
      action: () => navigateTo('#essays'),
    },
    {
      id: 'sec-contact',
      category: t('Sayfa Bölümleri', 'Page Sections'),
      title: t('İletişim & Mesaj Gönder', 'Contact & Message'),
      description: t(
        'Doğrudan mesaj gönderin veya e-posta atın',
        'Send a direct message or get in touch'
      ),
      icon: <Mail className="w-4 h-4 text-amber-500" />,
      action: () => navigateTo('#contact'),
    },

    // Projects
    {
      id: 'proj-arcelik',
      category: t('Projeler', 'Projects'),
      title: t(
        'Arçelik – Beko – Grundig Eğitim Videoları',
        'Arçelik – Beko – Grundig Training Videos'
      ),
      description: t(
        'Stüdyo çekimi, senaryo, Premiere/Final Cut ve Synthesia AI avatar kurgusu',
        'Studio filming, scriptwriting, Premiere/FCP, and Synthesia AI avatars'
      ),
      icon: <Video className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        onSelectProject('Arçelik – Beko – Grundig Eğitim Video Ekosistemi');
      },
    },
    {
      id: 'proj-comfyui',
      category: t('Projeler', 'Projects'),
      title: t(
        'ComfyUI & Flux2 / Krea2 İş Akışı',
        'ComfyUI & Flux2 / Krea2 Pipeline'
      ),
      description: t(
        'Yerel/bulut node tabanlı 8K fotogerçekçi görsel üretim hattı',
        'Local/cloud node-based 8K photorealistic image pipeline'
      ),
      icon: <Wand2 className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        onSelectProject('ComfyUI Generative Workflow Hattı (Flux2 & Krea2)');
      },
    },
    {
      id: 'proj-plugin',
      category: t('Projeler', 'Projects'),
      title: t(
        'AI Video Kurgu Eklentisi (Edit Plugin)',
        'AI Video Editing Plugin'
      ),
      description: t(
        'Premiere Pro ve kurgu araçları için sessizlik kesme & Qwen LLM asistanı',
        'Silence remover & Qwen LLM assistant for Premiere Pro'
      ),
      icon: <FileCode2 className="w-4 h-4 text-rose-400" />,
      action: () => {
        onClose();
        onSelectProject('AI Destekli Video Kurgu Eklentisi (Edit Plugin)');
      },
    },
    {
      id: 'proj-video-ai',
      category: t('Projeler', 'Projects'),
      title: t(
        'H3 & Seedance AI Video Prodüksiyonu',
        'H3 & Seedance AI Video Production'
      ),
      description: t(
        'Sinematik kamera hareketleri ve dinamik video üretimleri',
        'Cinematic camera movements and dynamic video generation'
      ),
      icon: <Video className="w-4 h-4 text-amber-400" />,
      action: () => {
        onClose();
        onSelectProject('H3 & Seedance ile Sinematik AI Video Prodüksiyonu');
      },
    },
    {
      id: 'proj-web-ui',
      category: t('Projeler', 'Projects'),
      title: t('Modern Web Arayüzleri', 'Modern Web Interfaces'),
      description: t(
        'React, Next.js ve Tailwind CSS ile responsive web arayüzleri',
        'Responsive web interfaces built with React, Next.js, and Tailwind CSS'
      ),
      icon: <FileCode2 className="w-4 h-4 text-blue-400" />,
      action: () => {
        onClose();
        onSelectProject('Modern Web Arayüzleri & Portfolyo Deneyimleri');
      },
    },

    // Quick Actions
    {
      id: 'act-theme',
      category: t('Hızlı İşlemler', 'Quick Actions'),
      title: isDark ? t('Açık Temaya Geç', 'Switch to Light Mode') : t('Koyu Temaya Geç', 'Switch to Dark Mode'),
      description: t('Arayüz temasını anında değiştir', 'Toggle visual theme immediately'),
      icon: isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />,
      action: () => {
        onToggleTheme();
        onClose();
      },
    },

    {
      id: 'act-admin',
      category: t('Yönetim', 'Admin'),
      title: isAdmin
        ? t('Hero Görseli Yükle (9:16)', 'Upload Hero Image (9:16)')
        : t('Yönetici Girişi (Admin)', 'Admin Login'),
      description: isAdmin
        ? t('Hero portre fotoğrafını düzenle', 'Edit hero portrait photo')
        : t('Görsel ve içerik yönetim modunu aç', 'Open visual management mode'),
      icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
      action: () => {
        onClose();
        if (isAdmin) {
          openHeroImageModal();
        } else {
          openLoginModal();
        }
      },
    },
  ];

  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-neutral-900 dark:text-neutral-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder={t(
              'Arayın... (Arçelik, ComfyUI, Synthesia, Premiere, Web, Yazılar)',
              'Search... (Arçelik, ComfyUI, Synthesia, Premiere, Web, Articles)'
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm placeholder:text-neutral-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200 dark:border-neutral-700">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
            aria-label={t('Kapat', 'Close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400 font-mono">
              {t('Sonuç bulunamadı.', 'No results found.')}
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800/90 text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold truncate text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-opacity ${
                      isSelected ? 'opacity-100 text-blue-500' : 'opacity-0'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>{t('Gezinmek için ↑↓, seçmek için Enter', 'Navigate ↑↓, Select Enter')}</span>
          <span>{t('Kapatmak için ESC', 'ESC to close')}</span>
        </div>
      </div>
    </div>
  );
};
