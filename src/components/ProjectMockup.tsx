import React from 'react';
import {
  Wand2,
  Video,
  Film,
  Sliders,
  Scissors,
  CheckCircle2,
  Layers,
  Sparkles,
  Play,
  Volume2,
  Terminal,
  ExternalLink,
} from 'lucide-react';

interface ProjectMockupProps {
  type: 'analytics' | 'ecommerce' | 'workspace' | 'community' | 'monitoring' | 'componentKit';
  title: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ type, title }) => {
  return (
    <div className="w-full h-48 md:h-52 bg-neutral-950 text-neutral-100 rounded-t-xl overflow-hidden relative select-none flex flex-col border-b border-neutral-800 group">
      {/* Browser / Video Editor Top Chrome Bar */}
      <div className="h-7 px-3 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-[11px] font-mono tracking-tight text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded truncate max-w-[200px]">
          {type === 'workspace' && 'arcelik-beko-training.mp4 · Synthesia'}
          {type === 'analytics' && 'comfyui_flux2_pipeline.graph'}
          {type === 'monitoring' && 'premiere_ai_cut_plugin.py'}
          {type === 'componentKit' && 'h3_seedance_cinematic.render'}
          {type === 'ecommerce' && 'modern-web-ui.react'}
          {type === 'community' && 'social-video-metrics.analytics'}
        </div>
        <div className="w-4" />
      </div>

      {/* Screen Content Render based on Samet's real domain */}
      <div className="flex-1 p-3.5 overflow-hidden relative font-sans">
        {/* 1. Arçelik - Beko - Grundig Eğitim Videosu & Synthesia */}
        {type === 'workspace' && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-900">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <Video className="w-3.5 h-3.5 text-blue-400" />
                <span>Arçelik · Beko · Grundig Video Hattı</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                Synthesia Avatar: Aktif
              </span>
            </div>

            {/* Video preview timeline mockup */}
            <div className="my-auto grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4 h-16 rounded bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden group/vid">
                <div className="w-6 h-6 rounded-full bg-blue-600/80 flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span className="text-[9px] font-mono text-neutral-400 mt-1">Eğitim Çekimi</span>
              </div>

              <div className="col-span-8 space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Modül: Beko No-Frost Çamaşır / Kurutma</span>
                  <span className="text-white">1080p · 24fps</span>
                </div>
                <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500 w-1/3" title="Stüdyo Çekimi" />
                  <div className="bg-purple-500 w-1/3" title="Synthesia Avatar" />
                  <div className="bg-emerald-500 w-1/3" title="Ürün Demosu & Kurgu" />
                </div>
                <div className="flex items-center justify-between text-[9px] text-neutral-500">
                  <span>Senaryo: Onaylandı</span>
                  <span>Son Kullanıcı: Dağıtımda</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1 border-t border-neutral-900">
              <span>Premiere Pro & Final Cut Kurgusu</span>
              <span className="text-emerald-400">● 150+ Video Tamamlandı</span>
            </div>
          </div>
        )}

        {/* 2. ComfyUI & Flux2 / Krea2 Node İş Akışı */}
        {type === 'analytics' && (
          <div className="h-full flex flex-col justify-between font-mono">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-900">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400">
                <Wand2 className="w-3.5 h-3.5" /> ComfyUI Node Graph
              </div>
              <span className="text-[10px] text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                Flux2 + Krea2 8K
              </span>
            </div>

            {/* Simulated Node graph boxes */}
            <div className="grid grid-cols-3 gap-2 my-auto text-[10px]">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                <span className="text-neutral-500 text-[9px]">LOAD CHECKPOINT</span>
                <span className="text-purple-300 font-bold truncate">Flux2-Dev.fp8</span>
                <span className="text-emerald-400 text-[9px]">✓ VAE Loaded</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                <span className="text-neutral-500 text-[9px]">KSAMPLER (NODE)</span>
                <span className="text-white font-bold">Steps: 28 · CFG: 3.5</span>
                <span className="text-blue-400 text-[9px]">Denoise: 1.0</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
                <span className="text-neutral-500 text-[9px]">KREA2 UPSCALE</span>
                <span className="text-emerald-300 font-bold">8K Ultra Render</span>
                <span className="text-amber-400 text-[9px]">Detail Clarity +4</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 border-t border-neutral-900 pt-1">
              <span>Yerel GPU / Cloud GPU</span>
              <span className="text-purple-400">Özel LoRA & ControlNet</span>
            </div>
          </div>
        )}

        {/* 3. AI Kurgu Eklentisi (Premiere Pro / Final Cut Plugin) */}
        {type === 'monitoring' && (
          <div className="h-full flex flex-col justify-between font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-1">
              <span className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-rose-400" /> AI Video Edit Plugin
              </span>
              <span className="text-[9px] text-emerald-400">Qwen LLM + Whisper</span>
            </div>

            <div className="space-y-1.5 my-auto text-[10px]">
              <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-400">Sessizlik & Hata Tespiti</span>
                <span className="text-emerald-400 font-bold">142 Sessizlik Kesildi (-48 dk)</span>
              </div>
              <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-400">Otomatik Türkçe Altyazı</span>
                <span className="text-blue-400 font-bold">%99.4 Kelime Doğruluğu</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-neutral-500 border-t border-neutral-900 pt-1">
              <span>Premiere & Final Cut Timeline XML</span>
              <span className="text-rose-400">3x Kurgu Hızı</span>
            </div>
          </div>
        )}

        {/* 4. H3 & Seedance AI Video Üretimi */}
        {type === 'componentKit' && (
          <div className="h-full flex flex-col justify-between font-mono">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-900">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-amber-400" /> H3 & Seedance AI Video
              </span>
              <span className="text-[10px] text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                Kinetik Kamera
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-auto text-[10px]">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-500 block text-[9px]">KAMERA HAREKETİ</span>
                <span className="text-white font-bold">Dolly-in · 35mm Lens</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-500 block text-[9px]">MODEL FİZİĞİ</span>
                <span className="text-emerald-400 font-bold">Hailuo H3 · 60fps</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 border-t border-neutral-900 pt-1">
              <span>Prompt Mühendisliği</span>
              <span className="text-amber-400">Final Cut Post-Prodüksiyon</span>
            </div>
          </div>
        )}

        {/* 5. Modern Web Arayüzleri (React, Next.js, Tailwind UI) */}
        {type === 'ecommerce' && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-900">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" /> Modern Web Arayüzleri
              </span>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-950/40 px-2 py-0.5 rounded">
                React · Next.js · Tailwind
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-auto">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
                <div className="w-full h-6 rounded bg-neutral-800 mb-1 flex items-center justify-center text-[9px] font-mono text-neutral-400">
                  Responsive
                </div>
                <span className="text-[10px] text-neutral-300">Mobil & Web</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
                <div className="w-full h-6 rounded bg-neutral-800 mb-1 flex items-center justify-center text-[9px] font-mono text-neutral-400">
                  60 FPS
                </div>
                <span className="text-[10px] text-neutral-300">Akıcı Animasyon</span>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
                <div className="w-full h-6 rounded bg-neutral-800 mb-1 flex items-center justify-center text-[9px] font-mono text-neutral-400">
                  Dark Mode
                </div>
                <span className="text-[10px] text-neutral-300">Özel Tasarım</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono border-t border-neutral-900 pt-1">
              <span>Temiz Kod Mimarisi</span>
              <span className="text-blue-400">Kullanıcı Odaklı UI</span>
            </div>
          </div>
        )}

        {/* 6. Sosyal Medya & Dikey Video Dağıtım */}
        {type === 'community' && (
          <div className="h-full flex flex-col justify-between font-mono">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-900">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Sosyal Medya & Video Analitiği
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                Dikey Format
              </span>
            </div>

            <div className="space-y-1.5 my-auto text-[10px]">
              <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-300">Reels & Shorts Kanca (Hook)</span>
                <span className="text-emerald-400 font-bold">İlk 3 Saniye Tutundurma</span>
              </div>
              <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <span className="text-neutral-300">Eğitim & Tanıtım Dağıtımı</span>
                <span className="text-blue-400 font-bold">Çok Kanallı Paylaşım</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 border-t border-neutral-900 pt-1">
              <span>Etkileşim Optimizasyonu</span>
              <span>İzlenme Takibi</span>
            </div>
          </div>
        )}
      </div>

      {/* Hover preview indicator badge */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800/90 backdrop-blur-sm text-neutral-200 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-700 shadow-md">
        <span>İncele</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </div>
    </div>
  );
};
