import React, { useState, useMemo } from 'react';
import {
  ArrowDownRight,
  Mail,
  Video,
  Wand2,
  User,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getHeroImageCandidates } from '../utils/imageCandidates';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const { lang, t } = useLanguage();
  const firstName = 'Samet';
  const lastName = 'Çakar';

  const heroCandidates = useMemo(() => getHeroImageCandidates(), []);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  const heroImage = !imageFailed && heroCandidates.length > 0 ? heroCandidates[candidateIndex] : '';

  const handleHeroError = () => {
    if (candidateIndex + 1 < heroCandidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

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

          {/* Signature Handwritten Name (Rock Salt Cursive - 100% Static & Single-Line) */}
          <div className="my-4 sm:my-6 select-none overflow-visible py-2 sm:py-4 pl-1 sm:pl-3 pr-2">
            <h1
              className="font-script text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] tracking-tight sm:tracking-wider text-neutral-900 dark:text-neutral-100 flex flex-nowrap whitespace-nowrap items-baseline gap-x-3 sm:gap-x-6 leading-normal"
              aria-label="Samet Çakar"
            >
              <span>{firstName}</span>
              <span className="text-blue-600 dark:text-blue-400">{lastName}</span>
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

        {/* Right Column: 9:16 Aspect Ratio Portrait Area */}
        <div className="shrink-0 w-48 sm:w-56 md:w-60 lg:w-64 mx-auto lg:mx-0 self-center lg:self-start lg:sticky lg:top-24">
          <div className="relative aspect-[9/16] w-full rounded-3xl overflow-hidden border-2 border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-100/70 dark:bg-neutral-900/60 backdrop-blur-md shadow-2xl group transition-all duration-300 hover:border-blue-500/50">
            {/* Ambient backlight glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10 pointer-events-none" />

            {heroImage ? (
              <img
                key={heroImage}
                src={heroImage}
                alt="Samet Çakar"
                onError={handleHeroError}
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
                <span className="mt-4 text-[10px] font-mono text-neutral-400">
                  Samet Çakar
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
