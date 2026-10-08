import React, { useState } from 'react';
import { IconCloud } from './IconCloud';
import { Cpu, Film, Wand2, Code2, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TechRadarSectionProps {
  isDark: boolean;
}

export const TechRadarSection: React.FC<TechRadarSectionProps> = ({ isDark }) => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'video' | 'web' | 'media'>('all');

  const skillsData = [
    {
      category: 'ai',
      name: t('Generative AI & LLM Modelleri', 'Generative AI & LLM Models'),
      icon: <Wand2 className="w-4 h-4 text-purple-500" />,
      items: [
        {
          name: 'ComfyUI',
          level: t('Uzman', 'Expert'),
          years: t('2+ yıl', '2+ yrs'),
          desc: t(
            'Node tabanlı görsel & video iş akışları, özel pipeline mimarileri',
            'Node-based visual & video workflows, custom pipeline architecture'
          ),
        },
        {
          name: 'Flux2 & Krea2',
          level: t('Uzman', 'Expert'),
          years: t('Aktif', 'Active'),
          desc: t(
            'Fotogerçekçi 8K görsel üretimi, LoRA ve stil kontrolü',
            'Photorealistic 8K image generation, LoRA training & style control'
          ),
        },
        {
          name: 'H3 (Hailuo) & Seedance',
          level: t('İleri', 'Advanced'),
          years: t('Aktif', 'Active'),
          desc: t(
            'Sinematik kamera hareketleri ve dinamik yapay zeka video üretimi',
            'Cinematic camera motion and dynamic generative AI video'
          ),
        },
        {
          name: 'Qwen LLM (2.5 & Coder)',
          level: t('İleri', 'Advanced'),
          years: t('Aktif', 'Active'),
          desc: t(
            'Yerel ve bulut LLM entegrasyonu, metin ve kod otomasyonu',
            'Local and cloud LLM integration, text & code automation'
          ),
        },
        {
          name: 'Synthesia AI',
          level: t('Uzman', 'Expert'),
          years: t('2+ yıl', '2+ yrs'),
          desc: t(
            'Kurumsal ürün eğitim videoları ve çok dilli yapay zeka avatarları',
            'Corporate product training videos & multilingual AI avatars'
          ),
        },
        {
          name: t('Yerel & Bulut AI Sistemleri', 'Local & Cloud AI Systems'),
          level: t('İleri', 'Advanced'),
          years: t('2+ yıl', '2+ yrs'),
          desc: t(
            'GPU bellek optimizasyonu, yerel model barındırma',
            'GPU VRAM memory optimization, local model inference & hosting'
          ),
        },
      ],
    },
    {
      category: 'video',
      name: t('Video Kurgu & Post-Prodüksiyon', 'Video Editing & Post-Production'),
      icon: <Film className="w-4 h-4 text-rose-500" />,
      items: [
        {
          name: 'Adobe Premiere Pro',
          level: t('Uzman', 'Expert'),
          years: t('4+ yıl', '4+ yrs'),
          desc: t(
            'İleri seviye kurgu, tempo, çoklu kamera ve şablon mimarisi',
            'Advanced post-production, multicam, pacing, and motion templates'
          ),
        },
        {
          name: 'Apple Final Cut Pro',
          level: t('Uzman', 'Expert'),
          years: t('3+ yıl', '3+ yrs'),
          desc: t(
            'Manyetik timeline, renk düzenleme, hızlı teslimat iş akışı',
            'Magnetic timeline, color correction, and rapid delivery workflows'
          ),
        },
        {
          name: 'Movavi Video Suite',
          level: t('Uzman', 'Expert'),
          years: t('3+ yıl', '3+ yrs'),
          desc: t(
            'Hızlı kurgu, eğitim içerikleri ve dinamik ekran kayıtları',
            'Rapid editing, product tutorials, and dynamic screen captures'
          ),
        },
        {
          name: t('Senaryo & Metin Yazımı', 'Scriptwriting & Storyboarding'),
          level: t('Uzman', 'Expert'),
          years: t('3+ yıl', '3+ yrs'),
          desc: t(
            'Ürün eğitim senaryoları, anlatım dili ve storyboard kurgusu',
            'Product tutorial scripts, engaging narrative tone, and storyboards'
          ),
        },
        {
          name: t('Çekim, Işık & Ses Yönetimi', 'Cinematography & Audio'),
          level: t('İleri', 'Advanced'),
          years: t('3+ yıl', '3+ yrs'),
          desc: t(
            'Stüdyo ve saha çekimleri, mikrofon ve aydınlatma kurulumları',
            'Studio & field shooting, multi-point lighting, and lavalier audio'
          ),
        },
      ],
    },
    {
      category: 'web',
      name: t('Web Arayüzleri & AI Eklentileri', 'Web Interfaces & AI Plugins'),
      icon: <Code2 className="w-4 h-4 text-blue-500" />,
      items: [
        {
          name: t('Modern Web Arayüzleri (UI)', 'Modern Web UIs (UI/UX)'),
          level: t('İleri', 'Advanced'),
          years: t('3+ yıl', '3+ yrs'),
          desc: t(
            'Kullanıcı dostu, hızlı ve responsive web sayfaları',
            'Performant, clean, and responsive interfaces'
          ),
        },
        {
          name: 'React & Next.js',
          level: t('İleri', 'Advanced'),
          years: t('3 yıl', '3 yrs'),
          desc: t(
            'Bileşen mimarisi, interaktif paneller ve modern web siteleri',
            'Component architecture, interactive dashboards, and modern apps'
          ),
        },
        {
          name: 'Tailwind CSS',
          level: t('Uzman', 'Expert'),
          years: t('3 yıl', '3 yrs'),
          desc: t(
            'Özel tasarım sistemleri, responsive düzenler ve dark mode',
            'Design systems, bespoke responsive layouts, and dark mode'
          ),
        },
        {
          name: t('Özel AI Eklenti (Plugin) Geliştirme', 'Custom AI Plugin Dev'),
          level: t('Geliştirici', 'Developer'),
          years: t('Aktif', 'Active'),
          desc: t(
            'Kurgu araçlarını hızlandıran özel AI otomasyon eklentileri',
            'Custom AI automation tools accelerating post-production workflows'
          ),
        },
      ],
    },
    {
      category: 'media',
      name: t('Süreç & Sosyal Medya Yönetimi', 'Operations & Social Media'),
      icon: <Share2 className="w-4 h-4 text-emerald-500" />,
      items: [
        {
          name: t('Arçelik / Beko / Grundig Süreçleri', 'Arçelik / Beko Video Operations'),
          level: t('Yönetici', 'Lead'),
          years: t('Aktif Görev', 'Active Role'),
          desc: t(
            'Eğitim videolarının üretimi, onayı, son kullanıcıya iletimi ve takibi',
            'Tutorial video production, brand approvals, and user delivery tracking'
          ),
        },
        {
          name: t('Sosyal Medya Yönetimi', 'Social Media Strategy'),
          level: t('Yetkin', 'Proficient'),
          years: t('2+ yıl', '2+ yrs'),
          desc: t(
            'Dikey video formatları (Reels, Shorts), kitle etkileşimi ve dağıtım',
            'Short-form vertical video (Reels, Shorts) and audience engagement'
          ),
        },
        {
          name: t('Son Kullanıcı Takibi & Analitik', 'User Tracking & Analytics'),
          level: t('Yetkin', 'Proficient'),
          years: t('2+ yıl', '2+ yrs'),
          desc: t(
            'İzlenme oranları, geri bildirim analitiği ve süreç iyileştirme',
            'Retention metrics, completion rates, and feedback analysis'
          ),
        },
      ],
    },
  ];

  const filteredCategories = skillsData.filter((cat) => {
    if (activeCategory === 'all') return true;
    return cat.category === activeCategory;
  });

  return (
    <section id="radar" className="py-16 sm:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t('Yetenekler & Teknoloji Dünyası', 'Skills & Tech World')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {t('Yetenekler, Araçlar & 3D Teknoloji Küresi', 'Skills, Tools & 3D Tech Sphere')}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            {t(
              "ComfyUI, Flux2 ve Synthesia'dan Premiere Pro, Final Cut ve modern web arayüzlerine kadar aktif kullanılan üretim cephaneliği.",
              'Creative production arsenal ranging from ComfyUI, Flux2, and Synthesia to Premiere Pro, Final Cut, and modern web interfaces.'
            )}
          </p>
        </div>

        {/* Filter Controls - Single Row */}
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-x-auto max-w-full no-scrollbar shrink-0">
          {[
            { id: 'all', label: t('Tümü', 'All') },
            { id: 'ai', label: 'AI & ComfyUI' },
            { id: 'video', label: t('Video & Kurgu', 'Video & Editing') },
            { id: 'web', label: t('Web & Eklenti', 'Web & Plugins') },
            { id: 'media', label: t('Medya & Takip', 'Media & Analytics') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`whitespace-nowrap shrink-0 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === tab.id
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2x2 Grid: Top Row (AI & Video), Bottom Row (Web & Media) */}
      <div className={`grid grid-cols-1 ${filteredCategories.length > 1 ? 'lg:grid-cols-2' : 'max-w-4xl mx-auto'} gap-6`}>
        {filteredCategories.map((catGroup) => (
          <div
            key={catGroup.name}
            className="p-5 sm:p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-4 text-sm font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
                {catGroup.icon}
                <span>{catGroup.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {catGroup.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-700/60 flex flex-col justify-between hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-medium">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-neutral-200/40 dark:border-neutral-700/40 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>{t('Deneyim Durumu', 'Experience')}</span>
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        {item.years}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Interactive Rotating Sphere Centered at the Bottom */}
      <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center">
        <IconCloud isDark={isDark} />
      </div>
    </section>
  );
};
