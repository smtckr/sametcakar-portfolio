import React from 'react';

interface AvatarIllustrationProps {
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
}

export const AvatarIllustration: React.FC<AvatarIllustrationProps> = ({
  initials = 'SÇ',
  size = 'lg',
  showStatus = true,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 md:w-28 md:h-28 text-2xl md:text-3xl',
    xl: 'w-32 h-32 md:w-36 md:h-36 text-3xl md:text-4xl',
  };

  const statusSizeClasses = {
    sm: 'w-3 h-3 right-0 bottom-0 ring-2',
    md: 'w-3.5 h-3.5 right-0.5 bottom-0.5 ring-2',
    lg: 'w-5 h-5 right-1.5 bottom-1.5 ring-4',
    xl: 'w-6 h-6 right-2 bottom-2 ring-4',
  };

  return (
    <div className="relative inline-block select-none">
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 text-white shadow-xl ring-2 ring-neutral-200 dark:ring-neutral-800 transition-all duration-300 hover:scale-[1.02]`}
      >
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />

        {/* Developer Avatar Vector Silhouette Illustration */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full text-neutral-400 opacity-90 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>

          {/* Background Ambient Glow */}
          <circle cx="50" cy="50" r="48" fill="url(#avatarGrad)" fillOpacity="0.15" />

          {/* Shoulders & Hoodie Body */}
          <path
            d="M18 96 C 22 75, 32 68, 50 68 C 68 68, 78 75, 82 96 Z"
            fill="currentColor"
            className="text-neutral-700 dark:text-neutral-600"
          />
          {/* Inner Shirt Collar */}
          <path d="M42 68 L 50 80 L 58 68 Z" fill="#2563eb" fillOpacity="0.8" />

          {/* Neck */}
          <rect x="44" y="52" width="12" height="18" rx="2" fill="url(#faceGrad)" />

          {/* Head & Face Contour */}
          <ellipse cx="50" cy="42" rx="20" ry="24" fill="url(#faceGrad)" />

          {/* Modern Haircut */}
          <path
            d="M30 40 C 30 20, 70 20, 70 40 C 66 26, 36 26, 30 40 Z"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-950"
          />
          <path
            d="M29 36 C 36 21, 64 21, 71 36 C 68 28, 54 22, 40 25 Z"
            fill="currentColor"
            className="text-neutral-900 dark:text-neutral-950"
          />

          {/* Modern Minimal Glasses */}
          <rect x="35" y="38" width="12" height="9" rx="3" stroke="#1e293b" strokeWidth="2.2" fill="none" />
          <rect x="53" y="38" width="12" height="9" rx="3" stroke="#1e293b" strokeWidth="2.2" fill="none" />
          <path d="M47 42 L 53 42" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
          {/* Glasses Frame temples */}
          <path d="M35 41 L 30 40" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <path d="M65 41 L 70 40" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

          {/* Confident Smile */}
          <path
            d="M44 54 Q 50 59 56 54"
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Floating Monogram Initials Badge */}
        <span className="relative z-10 text-white font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-95">
          {initials}
        </span>
      </div>

      {/* Online / Active Availability Status Ring */}
      {showStatus && (
        <span
          className={`absolute ${statusSizeClasses[size]} bg-emerald-500 rounded-full ring-white dark:ring-neutral-900 flex items-center justify-center shadow-md`}
          title="Yeni projelere açık / Available for opportunities"
        >
          <span className="w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75" />
        </span>
      )}
    </div>
  );
};
