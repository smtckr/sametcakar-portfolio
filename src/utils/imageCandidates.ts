/**
 * Resilient image candidate resolver for GitHub / Vercel deployments.
 * Solves 4 major real-world static file issues:
 * 1. Linux case sensitivity (.jpg vs .JPG vs .png vs .PNG vs .jpeg vs .webp)
 * 2. Directory location (/projects/folder vs root /public/)
 * 3. Windows double extension bug (.jpg.jpg, .png.png)
 * 4. Naming variations / slug differences
 */

export function getProjectImageCandidates(title: string, initialImage?: string): string[] {
  const candidates: string[] = [];
  const seen = new Set<string>();

  const add = (url: string) => {
    if (url && !seen.has(url)) {
      seen.add(url);
      candidates.push(url);
    }
  };

  // 1. Initial image exact path first
  if (initialImage) {
    add(initialImage);
  }

  // Extract base stem from initialImage if available
  const stems = new Set<string>();
  if (initialImage) {
    // Strip leading directories and extension
    const clean = initialImage.split('/').pop() || '';
    const stem = clean.replace(/\.(jpg|jpeg|png|webp|svg|gif)(\.(jpg|jpeg|png|webp))?$/i, '');
    if (stem) stems.add(stem.toLowerCase());
  }

  const lowerTitle = title.toLowerCase();

  // Add semantic slugs based on known project titles
  if (lowerTitle.includes('arçelik') || lowerTitle.includes('beko') || lowerTitle.includes('arcelik')) {
    ['arcelik-beko-video', 'arcelik-beko', 'arcelik', 'beko', 'project-arcelik', 'arcelik-video'].forEach((s) => stems.add(s));
  } else if (lowerTitle.includes('comfyui') || lowerTitle.includes('flux') || lowerTitle.includes('krea')) {
    ['comfyui-flux2', 'comfyui', 'flux2', 'comfyui-flux', 'comfy'].forEach((s) => stems.add(s));
  } else if (lowerTitle.includes('eklenti') || lowerTitle.includes('plugin') || lowerTitle.includes('kurgu')) {
    ['kurgu-plugin', 'ai-plugin', 'plugin', 'kurgu-eklentisi', 'edit-plugin'].forEach((s) => stems.add(s));
  } else if (lowerTitle.includes('h3') || lowerTitle.includes('seedance') || lowerTitle.includes('hailuo')) {
    ['h3-seedance', 'h3', 'seedance', 'seedance-ai', 'hailuo'].forEach((s) => stems.add(s));
  } else if (lowerTitle.includes('web') || lowerTitle.includes('arayüz') || lowerTitle.includes('arayuz')) {
    ['web-arayuz', 'web-arayuzleri', 'web', 'portfolio'].forEach((s) => stems.add(s));
  } else if (lowerTitle.includes('sosyal') || lowerTitle.includes('medya') || lowerTitle.includes('social')) {
    ['sosyal-medya', 'social-media', 'sosyal-medya-video', 'social'].forEach((s) => stems.add(s));
  }

  const extensions = [
    '.jpg',
    '.png',
    '.jpeg',
    '.webp',
    '.JPG',
    '.PNG',
    '.JPEG',
    '.WEBP',
    '.jpg.jpg',
    '.png.png',
  ];

  const folders = ['/projects/', '/'];

  stems.forEach((stem) => {
    folders.forEach((folder) => {
      extensions.forEach((ext) => {
        add(`${folder}${stem}${ext}`);
      });
    });
  });

  return candidates;
}

export function getHeroImageCandidates(): string[] {
  const candidates: string[] = [];
  const seen = new Set<string>();

  const add = (url: string) => {
    if (url && !seen.has(url)) {
      seen.add(url);
      candidates.push(url);
    }
  };

  const stems = [
    'hero-portrait',
    'hero',
    'portrait',
    'profile',
    'avatar',
    'samet-cakar',
    'sametcakar',
  ];

  const extensions = [
    '.jpg',
    '.png',
    '.jpeg',
    '.webp',
    '.JPG',
    '.PNG',
    '.JPEG',
    '.WEBP',
    '.jpg.jpg',
    '.png.png',
  ];

  const folders = ['/', '/projects/'];

  folders.forEach((folder) => {
    stems.forEach((stem) => {
      extensions.forEach((ext) => {
        add(`${folder}${stem}${ext}`);
      });
    });
  });

  return candidates;
}
