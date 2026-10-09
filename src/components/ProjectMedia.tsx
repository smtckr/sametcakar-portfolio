import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Video,
  Wand2,
  Scissors,
  Film,
  Layers,
} from 'lucide-react';
import { getProjectImageCandidates } from '../utils/imageCandidates';

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
  const candidates = useMemo(
    () => getProjectImageCandidates(title, initialImage),
    [title, initialImage]
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  useEffect(() => {
    setCandidateIndex(0);
    setAllFailed(false);
  }, [candidates]);

  const handleImgError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const currentSrc = !allFailed && candidates.length > 0 ? candidates[candidateIndex] : '';
  const showImage = Boolean(currentSrc) && !allFailed;

  // Determine category theme colors & icons
  const getCategoryTheme = () => {
    if (title.includes('Arçelik') || title.includes('Beko')) {
      return {
        gradient: 'from-blue-950 via-slate-900 to-indigo-950',
        badge: 'Arçelik / Beko Video Ekosistemi',
        badgeColor: 'text-blue-400 bg-blue-950/80 border-blue-800/80',
        icon: <Video className="w-5 h-5 text-blue-400" />,
        pattern: 'studio',
      };
    }
    if (title.includes('ComfyUI') || category.includes('Generative')) {
      return {
        gradient: 'from-purple-950 via-neutral-900 to-pink-950',
        badge: 'ComfyUI & Flux2 / Krea2',
        badgeColor: 'text-pink-400 bg-pink-950/80 border-pink-800/80',
        icon: <Wand2 className="w-5 h-5 text-pink-400" />,
        pattern: 'nodes',
      };
    }
    if (title.includes('Eklenti') || title.includes('Plugin')) {
      return {
        gradient: 'from-emerald-950 via-neutral-900 to-teal-950',
        badge: 'Premiere / FCP AI Eklentisi',
        badgeColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-800/80',
        icon: <Scissors className="w-5 h-5 text-emerald-400" />,
        pattern: 'timeline',
      };
    }
    if (title.includes('H3') || title.includes('Seedance')) {
      return {
        gradient: 'from-amber-950 via-neutral-900 to-orange-950',
        badge: 'H3 & Seedance AI Sinema',
        badgeColor: 'text-amber-400 bg-amber-950/80 border-amber-800/80',
        icon: <Film className="w-5 h-5 text-amber-400" />,
        pattern: 'cinema',
      };
    }
    return {
      gradient: 'from-neutral-900 via-slate-950 to-neutral-950',
      badge: category,
      badgeColor: 'text-neutral-300 bg-neutral-900/80 border-neutral-700/80',
      icon: <Layers className="w-5 h-5 text-neutral-400" />,
      pattern: 'default',
    };
  };

  const theme = getCategoryTheme();

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800/90 bg-neutral-900 shadow-lg group">
      {showImage ? (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={title}
          onError={handleImgError}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        /* Rich Themed Creative Studio Visual Mockup */
        <div
          className={`relative w-full h-full bg-gradient-to-br ${theme.gradient} flex flex-col justify-between p-5 text-white select-none overflow-hidden`}
        >
          {/* Subtle Grid / Node Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff18_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Top Bar with Badge & Category Icon */}
          <div className="relative z-10 flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border ${theme.badgeColor} backdrop-blur-md shadow-sm`}
            >
              {theme.icon}
              <span>{theme.badge}</span>
            </span>

            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm" />
          </div>

          {/* Center Play Glyph */}
          <div className="relative z-10 self-center my-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Play className="w-5 h-5 fill-white/80 translate-x-0.5" />
            </div>
          </div>

          {/* Bottom Bar: Title & Technology Note */}
          <div className="relative z-10 bg-black/40 backdrop-blur-md -mx-5 -mb-5 p-3.5 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-100 font-mono truncate max-w-[85%]">
              {title}
            </span>
            <span className="text-[10px] text-neutral-400 font-mono shrink-0">
              4K · 60fps
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
