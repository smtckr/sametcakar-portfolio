import React, { useState, useMemo } from 'react';
import { Sparkles, User, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getHeroImageCandidates } from '../utils/imageCandidates';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showStatus?: boolean;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'md',
  showStatus = true,
  className = '',
}) => {
  const { t } = useLanguage();
  const avatarCandidates = useMemo(() => getHeroImageCandidates(), []);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);

  const activeAvatar = !imageFailed && avatarCandidates.length > 0 ? avatarCandidates[candidateIndex] : '';

  const handleAvatarError = () => {
    if (candidateIndex + 1 < avatarCandidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-full',
    md: 'w-16 h-16 rounded-2xl',
    lg: 'w-24 h-24 rounded-3xl',
    hero: 'w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-3xl',
  };

  return (
    <>
      <div className={`relative group inline-block select-none shrink-0 ${className}`}>
        {/* Subtle Ambient Studio Glow for Hero size */}
        {size === 'hero' && (
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/25 via-purple-600/20 to-emerald-500/20 rounded-[32px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Outer Frame with Border & Glassmorphism */}
        <div
          className={`relative ${sizeClasses[size]} p-1 bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800/90 shadow-md backdrop-blur-md transition-all duration-300 group-hover:border-blue-500/50`}
        >
          {/* Inner Image Container */}
          <div
            className={`relative w-full h-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center ${
              activeAvatar ? 'cursor-zoom-in' : ''
            }`}
            onClick={() => {
              if (activeAvatar) {
                setShowZoomModal(true);
              }
            }}
          >
            {activeAvatar ? (
              <img
                key={activeAvatar}
                src={activeAvatar}
                alt="Samet Çakar"
                onError={handleAvatarError}
                // object-[center_18%] focuses on the face of the 9:16 portrait
                className="w-full h-full object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              /* Sleek Creator Fallback State */
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 text-white p-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <User className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Availability Status Badge (Green Pulsing Dot) */}
        {showStatus && size === 'hero' && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md text-[11px] font-medium text-neutral-700 dark:text-neutral-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{t('Yeni Projelere Açık', 'Open to Projects')}</span>
            </div>
          </div>
        )}

        {/* Top Role Badge */}
        {size === 'hero' && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md text-[10px] font-semibold tracking-wide uppercase">
              <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
              <span>{t('Creative Lead', 'Creative Lead')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Photo Zoom Modal */}
      {showZoomModal && activeAvatar && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowZoomModal(false)}
        >
          <div
            className="relative max-w-md max-h-[90vh] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950/80">
              <div className="text-white text-xs font-mono font-medium">
                Samet Çakar · Portre
              </div>
              <button
                type="button"
                onClick={() => setShowZoomModal(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black/50">
              <img
                src={activeAvatar}
                alt="Samet Çakar"
                className="max-h-[75vh] w-auto aspect-[9/16] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
