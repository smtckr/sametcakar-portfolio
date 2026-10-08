import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  categoryEn?: string;
  desc: string;
  descEn?: string;
  color: string;
  svg: string;
}

export const toolsList: ToolItem[] = [
  // 1. Adobe Premiere Pro
  {
    id: 'premiere-pro',
    name: 'Adobe Premiere Pro',
    category: 'Video Kurgu & Montaj',
    categoryEn: 'Video Editing & Post-Production',
    desc: 'Kurumsal eğitim videoları, çoklu kamera, ritim kurgusu ve şablon mimarisi',
    descEn: 'Corporate training videos, multicam editing, pacing, and motion templates',
    color: '#9999ff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#00005b"/>
      <rect x="5" y="5" width="118" height="118" rx="22" fill="none" stroke="#9999ff" stroke-width="8"/>
      <text x="28" y="86" fill="#9999ff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="56">Pr</text>
    </svg>`,
  },

  // 2. Apple Final Cut Pro
  {
    id: 'final-cut-pro',
    name: 'Apple Final Cut Pro',
    category: 'Hızlı Video Prodüksiyonu',
    categoryEn: 'Rapid Video Production',
    desc: 'Manyetik timeline, renk düzeltme ve yüksek tempolu video kurguları',
    descEn: 'Magnetic timeline, color correction, and rapid delivery workflows',
    color: '#00b4d8',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#0f172a" stroke="#00b4d8" stroke-width="6"/>
      <path d="M20 26 l19 0 l-8 24 l-19 0 z" fill="#38bdf8"/>
      <path d="M44 26 l19 0 l-8 24 l-19 0 z" fill="#f43f5e"/>
      <path d="M68 26 l19 0 l-8 24 l-19 0 z" fill="#fbbf24"/>
      <path d="M92 26 l19 0 l-8 24 l-19 0 z" fill="#a855f7"/>
      <polygon points="40,68 96,86 40,104" fill="#00b4d8"/>
      <circle cx="76" cy="86" r="7" fill="#ffffff"/>
    </svg>`,
  },

  // 3. Movavi Video Suite
  {
    id: 'movavi',
    name: 'Movavi Video Suite',
    category: 'Seri Ekran Kaydı & Kurgu',
    categoryEn: 'Rapid Screen Capture & Edit',
    desc: 'Eğitim ekran kayıtları, pratik kesimler ve dinamik eğitim modülleri',
    descEn: 'Product tutorials, practical screen captures, and rapid editing',
    color: '#ef4444',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#ef4444"/>
      <path d="M28 88 L46 40 L64 74 L82 40 L100 88" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 4. Adobe Photoshop
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'Görsel Tasarım & Kapak',
    categoryEn: 'Visual Design & Thumbnails',
    desc: 'Video kapak tasarımları (thumbnail), afişler ve katmanlı grafik düzenlemeleri',
    descEn: 'Video thumbnails, posters, cover art, and layered graphic assets',
    color: '#31a8ff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#001e36"/>
      <rect x="5" y="5" width="118" height="118" rx="22" fill="none" stroke="#31a8ff" stroke-width="8"/>
      <text x="25" y="86" fill="#31a8ff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="56">Ps</text>
    </svg>`,
  },

  // 5. ComfyUI
  {
    id: 'comfyui',
    name: 'ComfyUI (Generative Pipeline)',
    category: 'Üretici Yapay Zeka Hattı',
    categoryEn: 'Generative AI Pipelines',
    desc: 'Düğüm (node) tabanlı Flux, Stable Diffusion ve video üretim mimarileri',
    descEn: 'Node-based Flux, Stable Diffusion, and generative video architecture',
    color: '#ec4899',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#130924" stroke="#ec4899" stroke-width="5"/>
      <path d="M36 44 C 54 26, 74 34, 92 48" stroke="#f43f5e" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M36 44 C 38 82, 54 90, 64 94" stroke="#06b6d4" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M92 48 C 90 84, 76 92, 64 94" stroke="#10b981" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="36" cy="44" r="14" fill="#f43f5e"/>
      <circle cx="36" cy="44" r="6" fill="#ffffff"/>
      <circle cx="92" cy="48" r="14" fill="#06b6d4"/>
      <circle cx="92" cy="48" r="6" fill="#ffffff"/>
      <circle cx="64" cy="94" r="16" fill="#10b981"/>
      <circle cx="64" cy="94" r="7" fill="#ffffff"/>
    </svg>`,
  },

  // 6. Flux (Black Forest Labs)
  {
    id: 'flux',
    name: 'Flux (Flux.1 / Flux2)',
    category: '8K Fotogerçekçi AI Görsel',
    categoryEn: 'Photorealistic 8K AI Image',
    desc: 'Black Forest Labs 8K fotogerçekçi görsel üretimi ve özel LoRA stilleri',
    descEn: 'Black Forest Labs 8K photorealistic image generation and LoRA styling',
    color: '#06b6d4',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#051923" stroke="#06b6d4" stroke-width="5"/>
      <polygon points="64,22 104,46 104,82 64,106 24,82 24,46" fill="none" stroke="#06b6d4" stroke-width="7" stroke-linejoin="round"/>
      <polygon points="64,38 90,53 90,75 64,90 38,75 38,53" fill="#06b6d4" opacity="0.85"/>
      <circle cx="64" cy="64" r="10" fill="#ffffff"/>
    </svg>`,
  },

  // 7. Synthesia AI
  {
    id: 'synthesia',
    name: 'Synthesia AI',
    category: 'Yapay Zeka Eğitim Avatarları',
    categoryEn: 'AI Training Avatars',
    desc: 'Eğitim videolarında fotogerçekçi yapay zeka sunucuları ve çoklu dil senkronu',
    descEn: 'Photorealistic AI presenters and multilingual lip-sync for training',
    color: '#8b5cf6',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#100b2b" stroke="#8b5cf6" stroke-width="5"/>
      <polygon points="64,24 102,46 102,82 64,104 26,82 26,46" fill="none" stroke="#a78bfa" stroke-width="6"/>
      <path d="M78 44 C 64 38, 48 48, 48 60 C 48 76, 80 68, 80 84 C 80 94, 66 98, 50 90" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round"/>
    </svg>`,
  },

  // 8. Krea AI
  {
    id: 'krea-ai',
    name: 'Krea AI',
    category: 'Gerçek Zamanlı AI Üretimi',
    categoryEn: 'Real-time AI Generation',
    desc: 'Gerçek zamanlı görsel üretimi, fırça kontrolü ve ultra-detay yükseltme',
    descEn: 'Real-time visual generation, live canvas, and ultra-detail upscaling',
    color: '#f43f5e',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#18040a" stroke="#f43f5e" stroke-width="5"/>
      <path d="M64 24 Q 64 64 104 64 Q 64 64 64 104 Q 64 64 24 64 Q 64 64 64 24 Z" fill="#f43f5e"/>
      <circle cx="64" cy="64" r="8" fill="#ffffff"/>
    </svg>`,
  },

  // 9. Hailuo AI (H3 / MiniMax)
  {
    id: 'hailuo-ai',
    name: 'Hailuo AI (H3)',
    category: 'Sinematik AI Video',
    categoryEn: 'Cinematic AI Video',
    desc: 'Sinematik kamera hareketleri ve dinamik yapay zeka video üretimi',
    descEn: 'Cinematic camera movement and high-fidelity generative AI video',
    color: '#6366f1',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#0d0f2b" stroke="#6366f1" stroke-width="5"/>
      <circle cx="64" cy="64" r="38" fill="none" stroke="#818cf8" stroke-width="6"/>
      <path d="M64 26 C 85 26, 102 43, 102 64 C 102 85, 85 102, 64 102 C 43 102, 38 88, 52 74 C 62 64, 76 68, 76 60 C 76 54, 70 48, 64 48" fill="none" stroke="#6366f1" stroke-width="7" stroke-linecap="round"/>
      <circle cx="64" cy="64" r="8" fill="#ffffff"/>
    </svg>`,
  },

  // 10. Qwen LLM (Alibaba)
  {
    id: 'qwen',
    name: 'Qwen LLM (2.5 & Coder)',
    category: 'Akıllı Dil & Kod Asistanı',
    categoryEn: 'Intelligent LLM & Code Assistant',
    desc: 'Yerel ve bulut LLM otomasyonu, metin ve senaryo desteği',
    descEn: 'Local and cloud LLM automation, scriptwriting, and reasoning',
    color: '#10b981',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#061f18" stroke="#10b981" stroke-width="5"/>
      <polygon points="64,24 88,38 98,64 88,90 64,104 40,90 30,64 40,38" fill="none" stroke="#34d399" stroke-width="6"/>
      <polygon points="64,40 78,50 84,64 78,78 64,88 50,78 44,64 50,50" fill="#10b981" opacity="0.9"/>
      <circle cx="64" cy="64" r="7" fill="#ffffff"/>
    </svg>`,
  },

  // 11. Runway
  {
    id: 'runway',
    name: 'Runway ML (Gen-3 Alpha)',
    category: 'Yapay Zeka Video Prodüksiyonu',
    categoryEn: 'Generative Video Production',
    desc: 'Metinden ve görselden sinematik video üretimi, kamera kontrolü',
    descEn: 'Text-to-video and image-to-video cinematic rendering and camera control',
    color: '#ffffff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#000000" stroke="#404040" stroke-width="4"/>
      <path d="M42 34 h26 c14 0 24 8 24 20 c0 10 -7 18 -18 20 l20 20 h-16 l-18 -18 h-6 v18 h-12 z M54 46 v18 h14 c6 0 10 -3 10 -9 c0 -6 -4 -9 -10 -9 z" fill="#ffffff"/>
    </svg>`,
  },

  // 12. ElevenLabs
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Yapay Zeka Ses & Dublaj',
    categoryEn: 'AI Voice & Dubbing',
    desc: 'Doğal Türkçe/İngilizce seslendirme ve eğitim videoları için ses üretimi',
    descEn: 'Natural voice cloning, Turkish/English narration, and corporate dubbing',
    color: '#ffffff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#0a0a0a" stroke="#404040" stroke-width="4"/>
      <rect x="42" y="28" width="16" height="72" rx="8" fill="#ffffff"/>
      <rect x="70" y="28" width="16" height="72" rx="8" fill="#ffffff"/>
    </svg>`,
  },

  // 13. React
  {
    id: 'react',
    name: 'React 19',
    category: 'Modern Arayüz Kütüphanesi',
    categoryEn: 'Modern UI Library',
    desc: 'Bileşen tabanlı reaktif web arayüzleri ve portfolyo mimarisi',
    descEn: 'Component hierarchy, state management, and interactive UI architecture',
    color: '#61dafb',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" stroke-width="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>`,
  },

  // 14. Next.js
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Full-Stack Web Çerçevesi',
    categoryEn: 'Full-Stack Web Framework',
    desc: 'Sunucu taraflı işleme (SSR) ve yüksek hızlı web performansı',
    descEn: 'Server-side rendering, static generation, and optimized web performance',
    color: '#ffffff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <circle cx="64" cy="64" r="64" fill="#000000"/>
      <path fill="#ffffff" d="M85.5 89.5L50.5 44H41v40h8.5V56.2l31.5 39.8c1.5-2 3-4.2 4.5-6.5z"/>
      <path fill="#ffffff" d="M78.5 44H87v26.5h-8.5z"/>
    </svg>`,
  },

  // 15. Tailwind CSS
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Modern UI Tasarım Sistemi',
    categoryEn: 'Modern UI Styling System',
    desc: 'Hızlı, duyarlı ve temiz CSS tasarım sistemi',
    descEn: 'Bespoke design systems, responsive layouts, and dark mode styling',
    color: '#38bdf8',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <path fill="#38bdf8" d="M64 36c-16 0-26 8-30 24 6-8 13.5-11 22.5-9 5.1 1.1 8.8 4.9 12.8 9.1C75.9 66.8 84.1 75 104 75c16 0 26-8 30-24-6 8-13.5 11-22.5 9-5.1-1.1-8.8-4.9-12.8-9.1C92.1 44.2 83.9 36 64 36zm-40 28c-16 0-26 8-30 24 6-8 13.5-11 22.5-9 5.1 1.1 8.8 4.9 12.8 9.1C35.9 94.8 44.1 103 64 103c16 0 26-8 30-24-6 8-13.5 11-22.5 9-5.1-1.1-8.8-4.9-12.8-9.1C52.1 72.2 43.9 64 24 64z"/>
    </svg>`,
  },

  // 16. TypeScript
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Tip Güvenli Kodlama',
    categoryEn: 'Type-Safe Programming',
    desc: 'Hatasız ve sağlam arayüz kodlama altyapısı',
    descEn: 'Type-safe, robust, and clean frontend architecture',
    color: '#3178c6',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#3178c6"/>
      <path fill="#ffffff" d="M30 46h38v12H54v46H42V58H30V46zm44 42.5c0 4.5 1.5 8 4.5 10.5s7.2 3.8 12.8 3.8c4.2 0 8.2-.8 12-2.5v-10c-3.5 2-7.2 3-11 3-2.5 0-4.5-.6-5.8-1.8s-2-2.8-2-4.8c0-1.8.8-3.2 2.2-4.5s4-2.5 7.8-3.8c5.5-1.8 9.5-3.8 12-6s3.8-5.5 3.8-9.8c0-4.5-1.5-8-4.5-10.5s-7.2-3.8-12.5-3.8c-4 0-7.8.8-11.5 2.2v9.8c3.5-1.8 7-2.8 10.5-2.8 2.2 0 4 .5 5.2 1.5s1.8 2.5 1.8 4.2c0 1.8-.8 3.2-2.2 4.2s-4 2.2-7.8 3.5c-5.5 1.8-9.5 3.8-12 6s-3.8 5.5-3.8 9.8z"/>
    </svg>`,
  },

  // 17. JavaScript
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Temel Web Dili',
    categoryEn: 'Core Web Language',
    desc: 'Dinamik etkileşimler, API bağlantıları ve frontend mantığı',
    descEn: 'Asynchronous logic, dynamic interactions, and browser API integrations',
    color: '#f7df1e',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#f7df1e"/>
      <path fill="#000000" d="M35 88c2 3.5 5 6 9.5 6 5 0 8.5-2.5 8.5-8.5V46h12v40c0 12.5-7.5 18-19.5 18-10.5 0-16.5-5.5-19.5-13.5l9-2.5zm47-1.5c2.5 4 6 7 11.5 7 5 0 8-2.5 8-6 0-4-3.5-5.5-9.5-8-8.5-3.5-14-7.5-14-16.5 0-8 6.5-14.5 16-14.5 7 0 12 2.5 15.5 8.5l-8.5 5.5c-2-3-4.5-4.5-7.5-4.5-3.5 0-5.5 2-5.5 4.5 0 3 2.5 4.5 8 6.5 10 4.5 15.5 8.5 15.5 18 0 10-8 16-19.5 16-11 0-17.5-5.5-21-13.5l11-4z"/>
    </svg>`,
  },

  // 18. Figma
  {
    id: 'figma',
    name: 'Figma',
    category: 'Arayüz Tasarımı & Prototip',
    categoryEn: 'UI/UX & Prototyping',
    desc: 'UI/UX tasarımı, renk paletleri ve tasarım sistemi hazırlığı',
    descEn: 'Design systems, prototyping, typography layouts, and visual assets',
    color: '#a259ff',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#1e1e1e"/>
      <path fill="#0acf83" d="M42 108 a17 17 0 0 0 17 -17 V74 H42 a17 17 0 0 0 0 34 z"/>
      <path fill="#a259ff" d="M42 74 h17 V40 H42 a17 17 0 0 0 0 34 z"/>
      <path fill="#f24e1e" d="M42 40 h17 V20 H42 a17 17 0 0 0 0 20 z"/>
      <path fill="#ff7262" d="M59 20 h27 a17 17 0 0 1 0 34 H59 V20 z"/>
      <path fill="#1abcfe" d="M86 54 a17 17 0 1 1 -17 17 17 17 0 0 1 17 -17 z"/>
    </svg>`,
  },

  // 19. YouTube
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Video Yayıncılığı & Dağıtım',
    categoryEn: 'Video Publishing & Distribution',
    desc: 'Eğitim videoları, geniş kitlelere yayın ve video performansı analitiği',
    descEn: 'Video tutorials, corporate playlists, Shorts, and analytics tracking',
    color: '#ff0000',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#18181b"/>
      <path d="M106 42 c-1 -4 -4 -7 -8 -8 C90 32 64 32 64 32 s-26 0 -34 2 c-4 1 -7 4 -8 8 C20 50 20 64 20 64 s0 14 2 22 c1 4 4 7 8 8 c8 2 34 2 34 2 s26 0 34 -2 c4 -1 7 -4 8 -8 c2 -8 2 -22 2 -22 s0 -14 -2 -22 z" fill="#ff0000"/>
      <polygon points="56,50 78,64 56,78" fill="#ffffff"/>
    </svg>`,
  },

  // 20. Instagram
  {
    id: 'instagram',
    name: 'Instagram & Reels',
    category: 'Dikey Video & Sosyal Medya',
    categoryEn: 'Vertical Video & Reels',
    desc: 'Dikey video kurguları, Reels içerik stratejisi ve etkileşim takibi',
    descEn: 'Short-form vertical video (Reels), visual hooks, and audience engagement',
    color: '#e1306c',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <defs>
        <radialGradient id="igGrad" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stop-color="#ffdc80"/>
          <stop offset="25%" stop-color="#fd1d1d"/>
          <stop offset="50%" stop-color="#e1306c"/>
          <stop offset="100%" stop-color="#833ab4"/>
        </radialGradient>
      </defs>
      <rect width="128" height="128" rx="26" fill="url(#igGrad)"/>
      <rect x="30" y="30" width="68" height="68" rx="20" fill="none" stroke="#ffffff" stroke-width="8"/>
      <circle cx="64" cy="64" r="16" fill="none" stroke="#ffffff" stroke-width="8"/>
      <circle cx="82" cy="46" r="4.5" fill="#ffffff"/>
    </svg>`,
  },

  // 21. TikTok
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Kısa Format Video',
    categoryEn: 'Short-Form Video',
    desc: 'İlk 3 saniye kancası (hook), tempolu montaj ve trend ses kurguları',
    descEn: 'First 3-second visual hooks, rapid rhythm editing, and viral short pacing',
    color: '#25f4ee',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
      <rect width="128" height="128" rx="26" fill="#000000"/>
      <path d="M74 30 C 78 39, 87 45, 98 46 v16 c-7 0 -15 -2 -21 -6 v32 c0 15 -12 26 -27 26 C35 114 24 103 24 88 c0 -15 12 -27 27 -27 c3 0 6 .5 9 1.5 v16 C57 78 54 77 51 77 c-6 0 -11 5 -11 11 s5 11 11 11 c7 0 13 -5 13 -13 V30 h10 z" fill="#25f4ee"/>
      <path d="M78 30 C 82 39, 91 45, 102 46 v16 c-7 0 -15 -2 -21 -6 v32 c0 15 -12 26 -27 26 C39 114 28 103 28 88 c0 -15 12 -27 27 -27 c3 0 6 .5 9 1.5 v16 C61 78 58 77 55 77 c-6 0 -11 5 -11 11 s5 11 11 11 c7 0 13 -5 13 -13 V30 h10 z" fill="#fe2c55" opacity="0.85"/>
      <path d="M76 30 C 80 39, 89 45, 100 46 v16 c-7 0 -15 -2 -21 -6 v32 c0 15 -12 26 -27 26 C37 114 26 103 26 88 c0 -15 12 -27 27 -27 c3 0 6 .5 9 1.5 v16 C59 78 56 77 53 77 c-6 0 -11 5 -11 11 s5 11 11 11 c7 0 13 -5 13 -13 V30 h10 z" fill="#ffffff" opacity="0.95"/>
    </svg>`,
  },
];

interface Point3D extends ToolItem {
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
}

export const IconCloud: React.FC<{ isDark?: boolean }> = ({ isDark = true }) => {
  const { lang, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const activeToolRef = useRef<ToolItem | null>(null);
  activeToolRef.current = activeTool;

  const [imagesReady, setImagesReady] = useState(false);
  const imageMapRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // 1. Preload all SVG images as Data URIs for crystal-clear vector rendering
  useEffect(() => {
    let loadedCount = 0;
    const total = toolsList.length;
    const map = new Map<string, HTMLImageElement>();

    toolsList.forEach((tool) => {
      const img = new Image();
      const svgUri = `data:image/svg+xml;utf8,${encodeURIComponent(tool.svg)}`;
      img.onload = () => {
        loadedCount++;
        map.set(tool.id, img);
        if (loadedCount >= total) {
          imageMapRef.current = map;
          setImagesReady(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= total) {
          imageMapRef.current = map;
          setImagesReady(true);
        }
      };
      img.src = svgUri;
    });
  }, []);

  // 2. Interactive 3D Sphere Canvas with Asymmetric Rotation & Hover Slowdown
  useEffect(() => {
    if (!imagesReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina High-DPI Display Scaling
    const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
    const displaySize = 440;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    canvas.style.width = `${displaySize}px`;
    canvas.style.height = `${displaySize}px`;

    let animationId: number;
    const radius = 155;
    const count = toolsList.length;

    // Generate Fibonacci Sphere coordinates for uniform spherical distribution
    const points: Point3D[] = toolsList.map((tool, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        ...tool,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        screenX: 0,
        screenY: 0,
        scale: 1,
      };
    });

    // Rotation kinematics:
    // Base asymmetric speed (deliberately slow, organic celestial tumbling)
    const baseVelY = 0.0022; // horizontal orbit
    const baseVelX = 0.0013; // vertical pitch
    const baseVelZ = 0.0007; // organic roll

    let currentSpeedFactor = 1.0;
    let isMouseOver = false;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let dragVelX = 0;
    let dragVelY = 0;
    let mouseHoverX = 0;
    let mouseHoverY = 0;
    let time = 0;

    // Mouse & Touch interaction handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      dragVelX = 0;
      dragVelY = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / (rect.width || 1)) * displaySize;
      const my = ((e.clientY - rect.top) / (rect.height || 1)) * displaySize;

      mouseHoverX = (mx - displaySize / 2) / (displaySize / 2);
      mouseHoverY = (my - displaySize / 2) / (displaySize / 2);
      isMouseOver = true;

      if (isDragging) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        dragVelX = dx * 0.00045;
        dragVelY = -dy * 0.00045;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      } else {
        // Find nearest front-facing icon
        let closest: ToolItem | null = null;
        let maxZ = 15;

        for (const p of points) {
          if (p.z > 0) {
            const dist = Math.hypot(mx - p.screenX, my - p.screenY);
            if (dist < 28 * p.scale && p.z > maxZ) {
              maxZ = p.z;
              closest = p;
            }
          }
        }

        if (closest !== activeToolRef.current) {
          setActiveTool(closest);
        }
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseEnter = () => {
      isMouseOver = true;
    };

    const onMouseLeave = () => {
      isDragging = false;
      isMouseOver = false;
      setActiveTool(null);
    };

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isMouseOver = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
        dragVelX = 0;
        dragVelY = 0;

        // Mobile tap selection
        const rect = canvas.getBoundingClientRect();
        const tx = ((e.touches[0].clientX - rect.left) / (rect.width || 1)) * displaySize;
        const ty = ((e.touches[0].clientY - rect.top) / (rect.height || 1)) * displaySize;
        let closest: ToolItem | null = null;
        let maxZ = 10;
        for (const p of points) {
          if (p.z > 0) {
            const dist = Math.hypot(tx - p.screenX, ty - p.screenY);
            if (dist < 32 * p.scale && p.z > maxZ) {
              maxZ = p.z;
              closest = p;
            }
          }
        }
        if (closest) {
          setActiveTool(closest);
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - lastMouseX;
        const dy = e.touches[0].clientY - lastMouseY;
        dragVelX = dx * 0.00045;
        dragVelY = -dy * 0.00045;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      isMouseOver = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseenter', onMouseEnter);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Main 60FPS animation loop
    const render = () => {
      time += 0.016;

      // Smooth deceleration on mouse hover (Slows down to 25%, keeps gently rotating as requested!)
      const targetSpeedFactor = isMouseOver ? 0.25 : 1.0;
      currentSpeedFactor += (targetSpeedFactor - currentSpeedFactor) * 0.08;

      // Multi-harmonic frequencies ensure the rotation is organic & never repeats the same loop
      const harmonicY = Math.sin(time * 0.38) * 0.0006 + Math.cos(time * 0.17) * 0.0004;
      const harmonicX = Math.cos(time * 0.31) * 0.0005 + Math.sin(time * 0.19) * 0.0003;
      const harmonicZ = Math.sin(time * 0.22) * 0.0004;

      // Mouse steering influence when hovering
      const mouseTiltX = isMouseOver && !isDragging ? mouseHoverY * 0.0009 : 0;
      const mouseTiltY = isMouseOver && !isDragging ? mouseHoverX * 0.0009 : 0;

      // Angular steps for full 3-axis asymmetric orbit
      const stepY = isDragging
        ? dragVelX
        : (baseVelY + harmonicY + mouseTiltY) * currentSpeedFactor + dragVelX;
      const stepX = isDragging
        ? dragVelY
        : (baseVelX + harmonicX - mouseTiltX) * currentSpeedFactor + dragVelY;
      const stepZ = (baseVelZ + harmonicZ) * currentSpeedFactor;

      // Friction decay for drag momentum
      dragVelX *= 0.94;
      dragVelY *= 0.94;

      // Trigonometric transformations
      const cosY = Math.cos(stepY);
      const sinY = Math.sin(stepY);
      const cosX = Math.cos(stepX);
      const sinX = Math.sin(stepX);
      const cosZ = Math.cos(stepZ);
      const sinZ = Math.sin(stepZ);

      // Rotate all 3D points
      for (const p of points) {
        // Y-axis (Yaw)
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // X-axis (Pitch)
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Z-axis (Celestial Roll / Asymmetric tilt)
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = y2 * cosZ + x1 * sinZ;

        p.x = x3;
        p.y = y3;
        p.z = z2;
      }

      // Clear Canvas
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.save();
      ctx.scale(dpr, dpr);

      // Painter's algorithm: sort points from back to front
      const sorted = [...points].sort((a, b) => a.z - b.z);
      const centerX = displaySize / 2;
      const centerY = displaySize / 2;

      for (const p of sorted) {
        // 3D Perspective Scaling & Opacity
        const depth = (p.z + radius * 1.5) / (radius * 2.5);
        const scale = Math.max(Math.min(depth, 1.25), 0.52);

        // Alpha calculation: Front items are 1.0 (vibrant), back items are ~0.35 (dimmed depth)
        const alpha = Math.min(Math.max((p.z + radius * 0.75) / (radius * 1.75), 0.32), 1.0);

        const isHovered = activeToolRef.current?.id === p.id;
        const activeScale = isHovered ? scale * 1.3 : scale;

        // Base icon size on 440px canvas
        const iconSize = Math.max(40 * activeScale, 20);

        const screenX = centerX + p.x;
        const screenY = centerY + p.y;
        p.screenX = screenX;
        p.screenY = screenY;
        p.scale = activeScale;

        const img = imageMapRef.current.get(p.id);
        if (!img) continue;

        ctx.save();
        ctx.globalAlpha = isHovered ? 1.0 : alpha;

        // Soft brand glow for front-facing and hovered icons
        if (p.z > 0 || isHovered) {
          ctx.shadowColor = isHovered ? p.color : isDark ? `${p.color}88` : 'rgba(0,0,0,0.15)';
          ctx.shadowBlur = isHovered ? 22 * scale : 9 * scale;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 2 * scale;
        }

        // Draw crisp official vector icon
        const drawX = screenX - iconSize / 2;
        const drawY = screenY - iconSize / 2;

        ctx.drawImage(img, drawX, drawY, iconSize, iconSize);

        ctx.restore();
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      cancelAnimationFrame(animationId);
    };
  }, [imagesReady, isDark]);

  return (
    <div className="relative flex flex-col items-center justify-center p-2 w-full max-w-lg mx-auto select-none">
      {/* Dynamic HUD Indicator */}
      <div className="min-h-14 w-full mb-3 flex items-center justify-center">
        {activeTool ? (
          <div className="w-full px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-neutral-900/95 border border-neutral-200 dark:border-neutral-800 backdrop-blur-md shadow-xl flex items-center gap-3 animate-in fade-in zoom-in-95 duration-150">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: activeTool.color }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  {activeTool.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 shrink-0">
                  {lang === 'en' && activeTool.categoryEn ? activeTool.categoryEn : activeTool.category}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                {lang === 'en' && activeTool.descEn ? activeTool.descEn : activeTool.desc}
              </p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-2 rounded-full border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-100/70 dark:bg-neutral-900/70 text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-2 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>
              {t(
                '3D Araç Küresi · Logoları incelemek için üzerine gelin veya sürükleyin',
                '3D Tech Sphere · Hover or drag to inspect technologies'
              )}
            </span>
          </div>
        )}
      </div>

      {/* 3D Sphere Interactive Canvas Container */}
      <div className="relative flex items-center justify-center rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 backdrop-blur-sm p-2 shadow-inner group overflow-hidden">
        {/* Ambient Center Glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-3xl" />
        </div>

        <canvas
          ref={canvasRef}
          className="cursor-grab active:cursor-grabbing max-w-[92vw] touch-none transition-transform duration-200"
          title={t('3D Araç Küresi - Döndürmek için sürükleyin', '3D Tech Sphere - Drag to rotate')}
        />

        {/* Interaction hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-white/85 dark:bg-neutral-900/85 px-3.5 py-1 rounded-full border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>↻</span>
          <span>
            {t(
              'Yavaş & Asimetrik 3D Dönüş · Fareyle hafifçe yavaşlar',
              'Slow & Organic 3D Orbit · Damps on hover'
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
