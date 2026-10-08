export interface Project {
  title: string;
  category: 'AI Video & Prodüksiyon' | 'Generative AI & ComfyUI' | 'Web Arayüzleri' | 'AI Eklenti & Araçlar' | 'Sosyal Medya';
  dates: string;
  description: string;
  descriptionEn: string;
  technologies: string[];
  image?: string;
  badgeText?: string;
  links: {
    type: 'Website' | 'Source';
    href: string;
    icon?: string;
  }[];
  featured: boolean;
  mockupType: 'analytics' | 'ecommerce' | 'workspace' | 'community' | 'monitoring' | 'componentKit';
  caseStudy?: {
    overview: string;
    overviewEn: string;
    problem: string;
    problemEn: string;
    solution: string;
    solutionEn: string;
    highlights: string[];
    highlightsEn: string[];
  };
}

export interface WorkExperience {
  company: string;
  href: string;
  badges: string[];
  location: string;
  title: string;
  titleEn: string;
  start: string;
  end: string;
  description: string;
  descriptionEn: string;
  technologies: string[];
}

export interface Education {
  school: string;
  href: string;
  degree: string;
  degreeEn?: string;
  start: string;
  end: string;
  description: string;
  descriptionEn?: string;
}

export interface Milestone {
  title: string;
  titleEn?: string;
  dates: string;
  location: string;
  description: string;
  descriptionEn?: string;
  tag: string;
}

export interface ResumeData {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationEn: string;
  locationLink: string;
  title: string;
  titleEn: string;
  statusText: string;
  statusTextEn: string;
  description: string;
  descriptionEn: string;
  summary: string;
  summaryEn: string;
  skills: {
    generativeAi: string[];
    videoAndEditing: string[];
    webInterfaces: string[];
    mediaAndStrategy: string[];
  };
  contact: {
    email: string;
    tel: string;
    social: {
      name: string;
      url: string;
      icon: string;
    }[];
  };
  work: WorkExperience[];
  education: Education[];
  projects: Project[];
  hackathons: Milestone[];
}

export const initialResumeData: ResumeData = {
  name: "Samet Çakar",
  initials: "SÇ",
  url: "https://sametcakar.dev",
  location: "İstanbul, Türkiye",
  locationEn: "Istanbul, Turkey",
  locationLink: "https://www.google.com/maps/place/Istanbul",
  title: "Creative Technologist · AI Video Prodüksiyonu & Web Arayüzleri",
  titleEn: "Creative Technologist · AI Video Production & Web Interfaces",
  statusText: "Arçelik – Beko – Grundig Video Süreçleri & Yeni Projelere Açık",
  statusTextEn: "Arçelik – Beko – Grundig Video Workflows & Open to Projects",
  description: "Web arayüzleri, yerel/bulut yapay zeka (ComfyUI, Flux2, Krea2, H3, Seedance, Qwen) ve video prodüksiyonunu (Premiere Pro, Final Cut, Synthesia) birleştiren dijital üretici.",
  descriptionEn: "Digital producer & creative technologist bridging web interfaces, local/cloud AI (ComfyUI, Flux2, Krea2, H3, Seedance, Qwen), and video editing (Premiere Pro, Final Cut, Synthesia).",
  summary: "Şu an Arçelik – Beko – Grundig markaları için ürün eğitim video süreçlerini yönetiyorum. Bu süreçte eğitim senaryoları yazımı, stüdyo ve saha çekimleri, kurgu/montaj (Premiere Pro, Final Cut, Movavi) ve Synthesia ile AI eğitim videoları oluşturarak son kullanıcıya gönderim ve takip operasyonlarını yürütüyorum. Eş zamanlı olarak modern web arayüzleri geliştiriyor, ComfyUI ile yerel/bulut üretici yapay zeka iş akışları tasarlıyor, kurgu süreçlerimi hızlandırmak için özel AI eklentileri (plugin) geliştiriyor ve sosyal medya içeriklerini yönetiyorum.",
  summaryEn: "Currently managing product training video workflows for Arçelik, Beko, and Grundig brands: scriptwriting, shooting, post-production editing (Premiere Pro, Final Cut, Movavi), Synthesia-driven AI avatar videos, and end-user distribution tracking. Simultaneously building modern web interfaces, designing local/cloud Generative AI pipelines in ComfyUI, developing proprietary AI editing plugins, and executing social media strategies.",
  skills: {
    generativeAi: [
      "ComfyUI (İleri Düzey Düğümler)",
      "Flux2 & Flux.1",
      "Krea2 (Görsel Üretim)",
      "H3 (Hailuo / MiniMax Video)",
      "Seedance & Kling Video",
      "Qwen LLM (Qwen 2.5 & Coder)",
      "Synthesia (AI Avatar Eğitim Videoları)",
      "Local & Cloud AI Mimarisi"
    ],
    videoAndEditing: [
      "Adobe Premiere Pro",
      "Apple Final Cut Pro",
      "Movavi Video Suite",
      "Video Çekim & Işık / Ses Prodüksiyonu",
      "Senaryo & Metin Yazımı",
      "Renk Düzenleme (Color Grading)",
      "Ses Tasarımı & Miksaj"
    ],
    webInterfaces: [
      "Modern Web Arayüzleri (UI/UX)",
      "React & Next.js",
      "Tailwind CSS",
      "TypeScript & JavaScript",
      "Özel AI Eklenti (Plugin) Geliştirme",
      "Responsive & Mobil Tasarım",
      "API Entegrasyonları"
    ],
    mediaAndStrategy: [
      "Sosyal Medya Yönetimi",
      "Kurumsal Eğitim Video Takibi",
      "Son Kullanıcı Dağıtım & Analitik",
      "İçerik Optimizasyonu",
      "Marka İletişimi"
    ]
  },
  contact: {
    email: "sametcakar@gmail.com",
    tel: "+90 555 123 4567",
    social: [
      {
        name: "E-Posta",
        url: "mailto:sametcakar@gmail.com",
        icon: "mail"
      }
    ]
  },
  work: [
    {
      company: "Arçelik – Beko – Grundig",
      href: "https://www.arcelik.com.tr",
      badges: ["Aktif Görev", "Kurumsal Marka Grubu"],
      location: "",
      title: "Ürün Eğitim Videoları Prodüksiyon & Süreç Yöneticisi",
      titleEn: "Product Training Video Production & Workflow Lead",
      start: "2022",
      end: "Günümüz",
      description: "Şu an Arçelik – Beko – Grundig markaları için ürün eğitim video süreçlerini yönetiyorum: Eğitim senaryolarının yazımı, stüdyo ve saha çekimleri, Premiere Pro, Final Cut ve Movavi ile post-prodüksiyon kurguları, Synthesia kullanarak yapay zeka avatarlarıyla eğitim videoları oluşturulması, videoların son kullanıcılara iletilmesi ve takip görevlerini yürütüyorum.",
      descriptionEn: "Managing product training video workflows for Arçelik, Beko, and Grundig brands: scriptwriting, studio shooting, post-production editing in Premiere Pro, Final Cut, and Movavi, Synthesia AI avatar training generation, and tracking end-user distribution metrics.",
      technologies: ["Synthesia AI", "Premiere Pro", "Final Cut Pro", "Movavi", "Senaryo Yazımı", "Video Prodüksiyon", "Süreç Yönetimi", "Analitik"]
    },
    {
      company: "AI & Creative Lab (Bağımsız)",
      href: "#",
      badges: ["Üretici Yapay Zeka", "Ar-Ge"],
      location: "",
      title: "Generative AI & Video Workflow Specialist",
      titleEn: "Generative AI & Video Workflow Specialist",
      start: "2025",
      end: "Günümüz",
      description: "ComfyUI üzerinde yerel ve bulut tabanlı karmaşık node iş akışları geliştirme. Flux2 ve Krea2 ile yüksek kaliteli görsel sentezi; H3 (Hailuo) ve Seedance ile sinematik AI video üretimleri. Video montaj yazılımları için kendi işlerimi hızlandıran özel AI eklentileri (plugin) geliştirme ve Qwen LLM modelleriyle içerik otomasyonu.",
      descriptionEn: "Engineering local and cloud generative pipelines in ComfyUI. Synthesizing hyper-detailed visuals with Flux2 & Krea2; generating cinematic AI video clips using H3 and Seedance. Building proprietary AI editing plugins for post-production software and automating text pipelines with Qwen LLM.",
      technologies: ["ComfyUI", "Flux2", "Krea2", "H3 (Hailuo)", "Seedance", "Qwen LLM", "Python", "Özel AI Eklentileri"]
    },
    {
      company: "Web Arayüz & Dijital İçerik",
      href: "#",
      badges: ["Frontend", "Sosyal Medya"],
      location: "",
      title: "Web Arayüz Geliştirici & Dijital İçerik Yöneticisi",
      titleEn: "Web Interface Developer & Digital Content Manager",
      start: "2026",
      end: "Günümüz",
      description: "Modern, duyarlı (responsive) web arayüzleri geliştirme (React, Next.js, Tailwind CSS). Sosyal medya hesapları için video içerik üretimi, etkileşim stratejileri ve çok kanallı görsel içerik yönetimi.",
      descriptionEn: "Building modern responsive web interfaces using React, Next.js, and Tailwind CSS. Producing social media video content, driving engagement strategies, and managing multi-channel distribution.",
      technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Sosyal Medya Yönetimi", "İçerik Stratejisi"]
    }
  ],
  education: [],
  projects: [
    {
      title: "Arçelik – Beko – Grundig Eğitim Video Ekosistemi",
      category: "AI Video & Prodüksiyon",
      dates: "2022 - Günümüz",
      description: "Marka grubu için stüdyo çekimleri, senaryo yazımı, Premiere Pro / Final Cut kurgusu ve Synthesia AI avatarlarıyla ürün eğitim video süreçlerinin yönetimi ve son kullanıcı izleme hattı.",
      descriptionEn: "Training video workflows for Arçelik, Beko, and Grundig: studio shooting, scriptwriting, Premiere/Final Cut editing, Synthesia AI avatar generation, and distribution tracking.",
      technologies: ["Synthesia AI", "Premiere Pro", "Final Cut Pro", "Movavi", "Senaryo Yazımı", "Video Prodüksiyon", "Süreç Yönetimi"],
      featured: true,
      mockupType: "workspace",
      links: [],
      caseStudy: {
        overview: "Üç büyük beyaz eşya ve tüketici elektroniği markasının yüzlerce yeni ürününü bayilere, servis ekiplerine ve son kullanıcılara hızla anlatacak dinamik bir video üretim ekosistemi kurmak.",
        overviewEn: "Building a scalable video production pipeline for three leading consumer electronics brands to train dealers, service teams, and end users on new products.",
        problem: "Geleneksel kamera çekimleriyle her ürün için haftalar süren prodüksiyon, revizyon ve çok dilli seslendirme süreçleri gecikmelere sebep oluyordu.",
        problemEn: "Traditional live shooting for every product took weeks for production, revisions, and multilingual dubbing.",
        solution: "Synthesia AI avatarları stüdyo çekimleriyle hibrit hale getirildi; senaryodan kurguya standart şablonlar ve otomatik altyazı akışları kurgulanarak süreler %70 kısaltıldı.",
        solutionEn: "Combined Synthesia AI avatars with live studio footage; standardized editing templates in Premiere Pro/Final Cut and automated distribution tracking.",
        highlights: [
          "Arçelik, Beko ve Grundig için 150+ tamamlanan eğitim videosu",
          "Synthesia AI ile %70 daha hızlı çok dilli video teslimatı",
          "Son kullanıcı ve bayi tarafında %90+ izlenme ve memnuniyet oranı"
        ],
        highlightsEn: [
          "150+ completed training videos across Arçelik, Beko, and Grundig",
          "70% faster multi-language video delivery via Synthesia AI",
          "90%+ completion and satisfaction rate across field teams"
        ]
      }
    },
    {
      title: "ComfyUI Generative Workflow Hattı (Flux2 & Krea2)",
      category: "Generative AI & ComfyUI",
      dates: "2025 - Günümüz",
      description: "Yerel ve bulut GPU sistemlerinde çalışan, Flux2 ve Krea2 motorlarını entegre eden node tabanlı görsel üretim hattı. Özel LoRA modelleri ve kontrol ağları ile fotogerçekçi çıktılar.",
      descriptionEn: "Node-based generative pipeline running on local and cloud GPUs, chaining Flux2 and Krea2 engines with custom LoRAs and ControlNets for photorealistic outputs.",
      technologies: ["ComfyUI", "Flux2", "Krea2", "SDXL", "ControlNet", "Local AI", "Cloud GPU"],
      featured: true,
      mockupType: "analytics",
      links: [],
      caseStudy: {
        overview: "Ticari ve yaratıcı projeler için tekrarlanabilir, tutarlı karakter ve ürün görselleri üretebilen modüler bir ComfyUI iş akışı tasarlamak.",
        overviewEn: "Designing a modular ComfyUI pipeline to generate consistent, brand-accurate product and character imagery.",
        problem: "Web tabanlı basit prompt arayüzleri tutarlı ışık, kompozisyon ve stil kontrolü sağlayamıyordu.",
        problemEn: "Standard web prompt UIs lacked deep control over latent noise, composition, and consistent identity.",
        solution: "ComfyUI özel düğümleri (custom nodes), Flux2 şablonları ve Krea2 görsel geliştirme adımları birleştirilerek tek tıkla yüksek çözünürlüklü çıktı hattı kuruldu.",
        solutionEn: "Integrated custom ComfyUI nodes with Flux2 models and Krea2 upscaling for automated high-fidelity batch generation.",
        highlights: [
          "Yerel GPU üzerinde 8K çözünürlükte fotogerçekçi görsel üretimi",
          "Ürün ve karakter tutarlılığı sağlayan özel LoRA iş akışları",
          "Tasarım süreçlerinde %80 zaman tasarrufu"
        ],
        highlightsEn: [
          "8K photorealistic generation on local GPU nodes",
          "Custom LoRA workflows ensuring brand and character consistency",
          "80% time saved during visual concept prototyping"
        ]
      }
    },
    {
      title: "AI Destekli Video Kurgu Eklentisi (Edit Plugin)",
      category: "AI Eklenti & Araçlar",
      dates: "2025 - Günümüz",
      description: "Premiere Pro ve kurgu araçları için geliştirdiğim, AI ile sessizlikleri kesen, otomatik altyazı üreten ve montaj hızını 3 katına çıkaran kişisel asistan eklentisi.",
      descriptionEn: "A proprietary editing plugin built for Premiere Pro and video workflows that cuts silence, generates smart subtitles, and triples post-production speed.",
      technologies: ["AI Plugins", "Premiere Pro API", "Python", "Qwen LLM", "Whisper", "FFmpeg"],
      featured: true,
      mockupType: "monitoring",
      links: [],
      caseStudy: {
        overview: "Eğitim ve tanıtım videolarındaki tekrarlayan kaba montaj (rough cut) ve altyazı iş yükünü yapay zeka ile otomatikleştirerek yaratıcı kurguya odaklanmak.",
        overviewEn: "Automating repetitive rough cuts and subtitle timing with AI to dedicate more time to creative storytelling.",
        problem: "Uzun ham video kayıtlarındaki hatalı çekimleri, esleri ve nefes seslerini manuel ayıklamak saatler alıyordu.",
        problemEn: "Manually cutting false takes, dead air, and syncing subtitles across hours of raw video was exhausting.",
        solution: "Ses tanıma (Whisper) ve Qwen LLM entegrasyonu ile metin tabanlı video kurgusu yapan, sessizlikleri tek tıkla temizleyen özel bir otomasyon eklentisi geliştirildi.",
        solutionEn: "Built a text-based video editing plugin powered by Whisper and Qwen LLM that cuts silence and formats XML timeline markers automatically.",
        highlights: [
          "Kaba kurgu süresinde %65 kısalma",
          "Otomatik Türkçe senkronize altyazı üretimi",
          "Premiere Pro ve Final Cut uyumlu timeline aktarımı"
        ],
        highlightsEn: [
          "65% reduction in rough-cut assembly time",
          "Automated synchronized Turkish subtitle generation",
          "Seamless XML timeline import for Premiere Pro & Final Cut"
        ]
      }
    },
    {
      title: "H3 & Seedance ile Sinematik AI Video Prodüksiyonu",
      category: "AI Video & Prodüksiyon",
      dates: "2025 - Günümüz",
      description: "H3 (Hailuo / MiniMax) ve Seedance video modelleri kullanılarak üretilen, dinamik kamera hareketleri ve gerçekçi fizik kurallarına sahip konsept video prodüksiyonları.",
      descriptionEn: "Cinematic concept video productions leveraging H3 (Hailuo / MiniMax) and Seedance models with realistic camera kinetics and motion physics.",
      technologies: ["H3 (Hailuo)", "Seedance", "Kling AI", "Prompt Mühendisliği", "Final Cut", "Ses Tasarımı"],
      featured: false,
      mockupType: "componentKit",
      links: []
    },
    {
      title: "Modern Web Arayüzleri & Portfolyo Deneyimleri",
      category: "Web Arayüzleri",
      dates: "2026 - Günümüz",
      description: "React, Next.js ve Tailwind CSS ile hazırlanan, 60fps akıcı canvas animasyonlarına ve kullanıcı dostu arayüzlere sahip modern web siteleri ve interaktif portfolyolar.",
      descriptionEn: "Modern websites and interactive portfolio experiences built with React, Next.js, and Tailwind CSS featuring 60fps canvas animations.",
      technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Canvas 3D", "UI/UX"],
      featured: false,
      mockupType: "ecommerce",
      links: []
    },
    {
      title: "Sosyal Medya Video İçerik & Dağıtım Stratejisi",
      category: "Sosyal Medya",
      dates: "2026 - Günümüz",
      description: "Reels, Shorts ve TikTok formatlarında dikey video optimizasyonu, ilgi çekici kanca (hook) yapıları, etkileşim analizleri ve marka sosyal medya yönetimi.",
      descriptionEn: "Short-form video optimization for Reels, Shorts, and TikTok with high-retention hooks, engagement analytics, and social media brand management.",
      technologies: ["Sosyal Medya", "Dikey Video", "Premiere Pro", "CapCut / Movavi", "Analitik", "Kitle Büyütme"],
      featured: false,
      mockupType: "community",
      links: []
    }
  ],
  hackathons: [
    {
      title: "Arçelik – Beko – Grundig Video Eğitim Dönüşümü",
      titleEn: "Arçelik – Beko – Grundig Video Training Transformation",
      dates: "2023 - 2024",
      location: "İstanbul, Türkiye",
      description: "Synthesia AI ve dijital video kurgu süreçleriyle 150'den fazla ürün eğitim videosunun başarıyla üretilip bayilere ve kullanıcılara ulaştırılması.",
      tag: "Kurumsal Başarı"
    },
    {
      title: "ComfyUI & Flux İleri Seviye İş Akışı Geliştirme",
      titleEn: "Advanced ComfyUI & Flux Workflow Architecture",
      dates: "2024",
      location: "Online / Topluluk",
      description: "Yerel ve bulut GPU ortamlarında fotogerçekçi görsel ve video üretim hatlarının optimize edilmesi, açık kaynak iş akışlarının paylaşımı.",
      tag: "AI & Üretici Sanat"
    },
    {
      title: "Video Kurgu İçin AI Eklenti (Plugin) Tasarımı",
      titleEn: "Proprietary AI Plugin for Video Editing",
      dates: "2024",
      location: "İstanbul, Türkiye",
      description: "Premiere Pro ve video montaj programları için sessizlik kesme, metin tabanlı kurgu ve otomatik altyazı motorunun hayata geçirilmesi.",
      tag: "Özel Yazılım"
    }
  ]
};
