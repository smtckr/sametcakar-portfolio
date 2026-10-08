import React from 'react';
import {
  ArrowDownRight,
  Mail,
  Video,
  Wand2,
  Camera,
  User,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();
  const { isAdmin, heroImage, openHeroImageModal } = useAdmin();
  const firstName = 'Samet';
  const lastName = 'Çakar';

  return (
    <section id="hero" className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
        {/* Left Column: Heading, Pitch, Narrative, Action Buttons */}
        <div className="flex-1 min-w-0">
          {/* Intro Subtitle Pitch */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl font-mono leading-relaxed mb-4">
            {t(
              'Web arayüzleri, yerel/bulut üretici yapay zeka (ComfyUI, Flux2, Krea2, H3, Seedance, Qwen) ve kurumsal video prodüksiyonunu (Premiere Pro, Final Cut, Synthesia) birleştiren dijital üretici.',
              'Digital creator bridging modern web interfaces, local/cloud generative AI (ComfyUI, Flux2, Krea2, H3, Seedance, Qwen), and corporate video production (Premiere Pro, Final Cut, Synthesia).'
            )}
          </p>

          {/* Massive Signature Handwritten Name (Rock Salt Cursive with kinetic staggered letters) */}
          <div className="my-4 sm:my-8 select-none overflow-visible py-2 pl-3 sm:pl-6 pr-3">
            <h1
              className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-neutral-900 dark:text-neutral-100 flex flex-wrap items-center gap-x-6 sm:gap-x-10 leading-normal"
              aria-label="Samet Çakar"
            >
              {/* First Name: Samet with initial safe padding for cursive 'S' flourish */}
              <span className="inline-flex pl-2 sm:pl-3">
                {firstName.split('').map((char, index) => (
                  <span
                    key={`first-${index}`}
                    className="landing-hero-char landing-hero-char-first"
                    style={{ '--landing-char-delay': `${0.1 + index * 0.06}s` } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </span>

              {/* Last Name: Çakar */}
              <span className="inline-flex text-blue-600 dark:text-blue-400">
                {lastName.split('').map((char, index) => (
                  <span
                    key={`last-${index}`}
                    className="landing-hero-char landing-hero-char-last"
                    style={{
                      '--landing-char-delay': `${0.1 + (firstName.length + index) * 0.06}s`,
                    } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {/* Expanded Authentic Persona Narrative */}
          <div className="max-w-2xl space-y-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {lang === 'tr' ? (
              <>
                <p>
                  Şu an <strong>Arçelik – Beko – Grundig</strong> markaları için ürün eğitim video süreçlerini yönetiyorum: Eğitim senaryolarının yazımı, stüdyo ve saha çekimleri, montaj/kurgu (Premiere Pro, Final Cut, Movavi) ve <strong>Synthesia</strong> ile AI avatar eğitim videoları oluşturarak son kullanıcıya gönderim ve takip görevlerini yürütüyorum.
                </p>
                <p>
                  Aynı zamanda <strong>ComfyUI</strong> üzerinde yerel ve bulut GPU'larda ileri düzey üretici yapay zeka hatları tasarlıyor (Flux2, Krea2, H3, Seedance, Qwen LLM), kurgu süreçlerimi hızlandırmak için özel <strong>AI eklentileri (plugin)</strong> geliştiriyor, modern web arayüzleri kodluyor ve sosyal medya içeriklerini yönetiyorum.
                </p>
              </>
            ) : (
              <>
                <p>
                  Currently managing product training video workflows for <strong>Arçelik – Beko – Grundig</strong>: Scriptwriting, studio & on-site shooting, post-production editing (Premiere Pro, Final Cut, Movavi), and producing AI avatar training videos via <strong>Synthesia</strong> with distribution and user engagement tracking.
                </p>
                <p>
                  Simultaneously designing advanced generative AI pipelines on <strong>ComfyUI</strong> across local and cloud GPUs (Flux2, Krea2, H3, Seedance, Qwen LLM), developing custom <strong>AI plugins</strong> to accelerate editing workflows, coding modern web interfaces, and managing social media content.
                </p>
              </>
            )}
          </div>

          {/* Quick Action Buttons & Socials */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Video className="w-4 h-4 text-purple-400 dark:text-purple-600" />
              <span>{t('Projelerimi & Çalışmalarımı Keşfet', 'Explore Projects & Work')}</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all backdrop-blur-sm active:scale-95"
            >
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>{t('İletişime Geç', 'Get in Touch')}</span>
            </a>

            <a
              href="#radar"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
            >
              <Wand2 className="w-4 h-4 text-purple-400" />
              <span>{t('3D Yetenek & Araç Küresi', '3D Tech & Skills Sphere')}</span>
            </a>
          </div>
        </div>

        {/* Right Column: 9:16 Aspect Ratio Portrait Area (Next to Samet Çakar on Desktop) */}
        <div className="shrink-0 w-full sm:w-56 md:w-60 lg:w-64 mx-auto lg:mx-0 self-center lg:self-start lg:sticky lg:top-24">
          <div className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden border-2 border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-2xl group transition-all duration-300 hover:border-blue-500/50">
            {/* Ambient backlight glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 pointer-events-none" />

            {heroImage ? (
              <img
                src={heroImage}
                alt="Samet Çakar"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-neutral-200/70 dark:bg-neutral-800/70 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-3 text-blue-500 shadow-inner">
                  <User className="w-8 h-8 opacity-80" />
                </div>
                <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
                  {t('Portre Görseli', 'Portrait Image')}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 mt-1">
                  9:16 Dikey Format
                </span>
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={openHeroImageModal}
                    className="mt-4 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center gap-1"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{t('Görsel Yükle', 'Upload Image')}</span>
                  </button>
                ) : (
                  <span className="mt-4 text-[10px] font-mono text-neutral-400">
                    Samet Çakar
                  </span>
                )}
              </div>
            )}

            {/* Admin ONLY: Upload / Change Image Overlay */}
            {isAdmin && heroImage && (
              <div className="absolute inset-x-3 bottom-3 z-20">
                <button
                  type="button"
                  onClick={openHeroImageModal}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold backdrop-blur-md shadow-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-blue-400/40"
                  title={t('Hero görselini değiştir', 'Change hero image')}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{t('Görseli Değiştir (9:16)', 'Change Image (9:16)')}</span>
                </button>
              </div>
            )}

            {/* Visitor Badge (when not admin and image is present) */}
            {!isAdmin && heroImage && (
              <div className="absolute bottom-3 left-3 right-3 z-20 py-1.5 px-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center justify-between">
                <span className="font-semibold truncate">Samet Çakar</span>
                <span className="text-[10px] text-blue-400 font-bold shrink-0">9:16</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
