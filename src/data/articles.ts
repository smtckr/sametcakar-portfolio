import { Article } from '../components/ArticleModal';

export const initialArticles: Article[] = [
  {
    id: 'comfyui-flux2-guide',
    title: 'ComfyUI ve Flux2 ile Yerel Donanımda Yüksek Kaliteli Görsel Üretim Rehberi',
    titleEn: 'High-Fidelity Generative Visuals on Local GPUs with ComfyUI & Flux2',
    date: '12 Şubat 2026',
    dateEn: 'February 12, 2026',
    readTime: '6 dk okuma',
    summary: 'Web tabanlı basit arayüzlerin ötesine geçerek ComfyUI düğüm (node) mimarisinde Flux2 ve Krea2 ile fotogerçekçi, tutarlı ve profesyonel görseller elde etmenin incelikleri.',
    summaryEn: 'Moving beyond simple web prompt boxes: mastering node-based ComfyUI workflows, Flux2 checkpoints, and Krea2 upscalers for consistent, photorealistic brand assets.',
    content: `Yapay zeka ile görsel üretiminde en sık karşılaşılan problem, basit web kutucuklarına yazılan prompt'ların tutarsız sonuçlar vermesidir. Profesyonel çalışmalarda kamera açısı, ışık sertliği, karakter tutarlılığı ve detay derinliği üzerinde tam kontrole sahip olmak zorundayız.

### 1. Neden ComfyUI? Düğüm (Node) Mimarisi

ComfyUI, görsel üretim sürecini adım adım (latent space, VAE encode/decode, LoRA ağırlıkları, CLIP conditioning) görsel bir grafik olarak yönetmemizi sağlar. Bir düğümün çıktısını dilediğimiz başka bir düğüme bağlayarak çok aşamalı iş akışları kurabiliyoruz.

\`\`\`text
[CheckPoint Loader: Flux2] 
    └──> [CLIP Text Encode: Prompt & Negatif]
            └──> [KSampler: Euler / Simple] 
                    └──> [VAE Decode] ──> [Krea2 Upscaler] ──> [Final Görsel]
\`\`\`

### 2. Flux2 ve Krea2 Entegrasyonu

Flux2 modeli insan anatomisi, eller ve karmaşık metin render etme konusunda devrim yarattı. Ürettiğimiz ham görseli doğrudan son çıktı olarak almak yerine, Krea2 tabanlı detaylandırma ve netlik artırma (upscale) katmanından geçirdiğimizde ticari kalitede 8K doku netliği elde ediyoruz.

### 3. Sonuç & Tavsiyeler

Yerel GPU üzerinde doğru bellek yönetimi (fp8 / lowvram ayarları) ile hem sıfır bulut maliyeti elde ediyor hem de kurumsal marka projelerimiz için sonsuz özelleştirme gücüne ulaşıyoruz.`,
    contentEn: `In generative imagery, the biggest roadblock is the inconsistency of standard web prompt boxes. In client and brand production, full creative control over camera focal lengths, lighting decay, character fidelity, and texture resolution is non-negotiable.

### 1. Why ComfyUI? Node-Based Execution

ComfyUI decouples the generative pipeline into explicit mathematical and visual nodes: latent tensors, VAE encode/decode, LoRA weights, and CLIP conditioning. Any node can branch into multiple samplers for multi-stage refining.

\`\`\`text
[CheckPoint Loader: Flux2] 
    └──> [CLIP Text Encode: Prompt & Negative]
            └──> [KSampler: Euler / Simple] 
                    └──> [VAE Decode] ──> [Krea2 Upscaler] ──> [Final Output]
\`\`\`

### 2. Pairing Flux2 with Krea2 Upscaling

Flux2 sets a new standard for anatomical accuracy and typographic fidelity in latents. Instead of accepting raw diffusion outputs, cascading into Krea2 for micro-texture refinement unlocks true 8K print-ready fidelity.

### 3. Key Takeaway

Calibrating fp8 precision and low-vram offloading on local hardware eliminates cloud inference costs while granting complete procedural freedom for enterprise visual assets.`
  },
  {
    id: 'synthesia-corporate-training-videos',
    title: 'Arçelik, Beko ve Grundig Eğitim Videolarında Synthesia ve AI Avatarları ile Prodüksiyon Dönüşümü',
    titleEn: 'Transforming Corporate Training Videos for Arçelik, Beko & Grundig with Synthesia AI',
    date: '18 Kasım 2025',
    dateEn: 'November 18, 2025',
    readTime: '8 dk okuma',
    summary: 'Yüzlerce yeni tüketici elektroniği ve beyaz eşya ürünü için eğitim videoları hazırlarken stüdyo çekimlerini Synthesia AI avatarlarıyla birleştirerek süreci nasıl %70 hızlandırdık?',
    summaryEn: 'How we accelerated training video production by 70% across consumer electronics and home appliances by pairing studio footage with Synthesia AI avatars.',
    content: `Büyük tüketici markaları için ürün eğitim videoları hazırlamak çok katmanlı bir süreçtir: Senaryoların yazımı, stüdyoda ürün çekimleri, ışık/ses ayarları, montaj ve ardından bayilerle son kullanıcılara ulaştırılıp izlenme performanslarının ölçülmesi gerekir.

### 1. Geleneksel Prodüksiyonun Sınırları

Her ürün revizyonunda veya teknik detay güncellemesinde stüdyoyu yeniden kurmak, seslendirmeni stüdyoya çağırmak ve kurguyu baştan yapmak hem haftalar süren gecikmelere hem de yüksek maliyetlere yol açıyordu.

### 2. Hibrit Model: Synthesia AI Avatarları + Gerçek Ürün Çekimleri

Bu sorunu çözmek için hibrit bir prodüksiyon standardı geliştirdim:
- **Ürün Yakın Planları & Kullanım Detayları:** Profesyonel kameralarla stüdyoda çekilir.
- **Anlatıcı & Sunum:** Synthesia'nın gerçekçi AI avatarları ile oluşturulur.
- **Kurgu & Montaj:** Adobe Premiere Pro ve Final Cut Pro üzerinde önceden hazırladığım dinamik şablonlarla (motion graphics) birleştirilir.

### 3. Son Kullanıcı Dağıtımı ve Analitik

Videolar tamamlandıktan sonra iş bitmiyor. Son kullanıcıların ve teknik ekiplerin videoları ne kadar izlediği, hangi noktalarda durakladığı gibi metrikleri takip ederek bir sonraki eğitim senaryolarını daha kısa ve etkili hale getiriyoruz.`,
    contentEn: `Crafting product training video ecosystems across major consumer electronics brands is an intricate operation: scriptwriting, studio lighting, voiceover recording, post-production editing, and deployment analytics for authorized dealers and technicians.

### 1. The Bottlenecks of Traditional Production

Whenever technical specs or localized features updated, re-booking studios, scheduling voice artists, and re-rendering timeline assemblies created severe delays and ballooning budgets.

### 2. The Hybrid Pipeline: Synthesia AI + Live Product B-Roll

To eliminate friction, I engineered a hybrid production methodology:
- **Product Macro Shots & Hands-on B-Roll:** Filmed with dedicated studio rigs.
- **Presenter & Narration:** Generated via realistic Synthesia AI avatars with dynamic script sync.
- **Post-Production Assembly:** Automated in Adobe Premiere Pro and Final Cut Pro with modular motion graphics templates.

### 3. Distribution & Engagement Tracking

Completed modules are tracked through completion analytics, identifying retention drop-offs to continually refine future script pacing and maximize field comprehension.`
  },
  {
    id: 'h3-seedance-cinematic-video',
    title: 'H3 (Hailuo) ve Seedance ile Sinematik AI Video Üretiminde Prompt ve Kamera Dinamikleri',
    titleEn: 'Cinematic AI Video Motion with H3 (Hailuo) & Seedance: Prompting Camera Physics',
    date: '28 Eylül 2025',
    dateEn: 'September 28, 2025',
    readTime: '5 dk okuma',
    summary: 'Video modellerinde gerçekçi fizik, kamera süzülüşleri ve dinamik ışık hareketlerini yönetmek için kullandığım prompt formülleri ve kurgu entegrasyonu.',
    summaryEn: 'Prompt engineering techniques and timeline post-production to control camera inertia, lighting kinematics, and physical realism in next-gen AI video models.',
    content: `Yapay zeka video modelleri hızla gelişiyor. H3 (Hailuo / MiniMax) ve Seedance gibi yeni nesil motorlar, artık sadece durağan fotoğrafları sallamak yerine gerçek 3D kamera açıları ve inandırıcı nesne fiziği üretebiliyor.

### 1. Kamera Hareketi Direktifleri

İyi bir yapay zeka videosu elde etmenin sırrı, modele hem sahneyi hem de sanal kamerayı tarif etmektir:
- \`Slow dolly-in with shallow depth of field, 35mm anamorphic lens\`
- \`Dynamic low-angle tracking shot, cinematic natural lighting, 4k 24fps\`

### 2. Final Cut ve Premiere Pro'da İnce Kurgu

AI tarafından üretilen 4-6 saniyelik ham video kliplerini tek başına bırakmıyoruz. Final Cut Pro veya Premiere Pro'ya aktararak hız rampalama (speed ramp), ses efektleri (foley) ve renk eşleme (color match) uyguladığımızda izleyici için büyüleyici bir prodüksiyon ortaya çıkıyor.`,
    contentEn: `Generative video engines are evolving at high velocity. Architectures like H3 (Hailuo / MiniMax) and Seedance don't simply morph 2D pixels; they simulate coherent 3D camera geometry and believable physical momentum.

### 1. Virtual Camera Directives

The secret to cinematic consistency is explicitly directing both spatial scene elements and the virtual lens:
- \`Slow dolly-in with shallow depth of field, 35mm anamorphic lens\`
- \`Dynamic low-angle tracking shot, cinematic natural lighting, 4k 24fps\`

### 2. Precision Timeline Post-Production

Raw 4-6 second AI generations must be shaped inside Final Cut Pro or Premiere Pro. Applying speed-ramping, foley sound design, and lumetri color harmonization bridges the gap into authentic cinematic storytelling.`
  },
  {
    id: 'ai-editing-plugin-development',
    title: 'Video Kurgu Süreçleri İçin Özel AI Eklentisi (Plugin) Geliştirme Yaklaşımım',
    titleEn: 'Engineering a Custom AI Video Editing Plugin with Whisper & Local LLMs',
    date: '14 Temmuz 2025',
    dateEn: 'July 14, 2025',
    readTime: '7 dk okuma',
    summary: 'Uzun ham çekimlerdeki sessizlikleri ayıklayan, Qwen LLM ile otomatik alt yazı üreten ve montaj süresini üçe katlayan kişisel kurgu eklentimin mimarisi.',
    summaryEn: 'Building an automated video editing plugin powered by Whisper and Qwen LLM that cuts silence, cleans filler speech, and triples rough-cut editing velocity.',
    content: `Bir video kurgucusunun mesaisinin en az %40'ı, ham kayıtlardaki hatalı tekrarları, sessizlikleri ve gereksiz "ııı" seslerini tek tek kesmekle geçer. Bu mekanik süreci ortadan kaldırmak için kendi kurgu eklentimi geliştirdim.

### 1. Mimarinin Temeli: Whisper + Qwen LLM

1. **Sesin Metne Dönüştürülmesi:** Ham videonun ses kanalı Whisper modeli ile milisaniye bazında zaman damgalarıyla (timestamps) metne dökülür.
2. **Akıllı Karar Mekanizması:** Qwen LLM modeli, metindeki tekrarları, anlamsız duraklamaları ve hatalı cümleleri tespit ederek kesilmesi gereken aralıkları belirler.
3. **XML / EDL Çıktısı:** Tespit edilen kesme noktaları Premiere Pro veya Final Cut Pro'nun anlayabileceği bir XML dizilimi olarak timeline'a tek tıkla aktarılır.

### 2. Elde Edilen Verim

Bu eklenti sayesinde saatler süren kaba montaj (rough cut) işlemi 5 dakikaya indi. Enerjimi sıkıcı kesme işlemlerine değil, videonun temposuna, ses tasarımına ve görsel estetiğine ayırabiliyorum.`,
    contentEn: `A video editor spends at least 40% of project time slicing through dead air, false starts, and filler stutters. To eliminate this cognitive drag, I engineered a dedicated workflow automation plugin.

### 1. Architecture: Whisper + Qwen LLM

1. **Precision Speech Transcription:** Video audio tracks are transcribed with millisecond timestamps via Whisper.
2. **Intelligent Cut Decisioning:** A quantized Qwen LLM identifies false takes, unnatural pauses, and verbal filler, computing optimal cut boundaries.
3. **XML / EDL Timeline Generation:** The cut intervals compile into a native XML sequence directly readable by Premiere Pro and Final Cut Pro.

### 2. Productivity Gains

Tedious multi-hour rough cuts are condensed down to 5 minutes, freeing creative focus for narrative rhythm, sound design, and color grading.`
  },
  {
    id: 'ai-storyboarding-commercials',
    title: 'Ticari Reklam ve Tanıtım Filmlerinde AI Destekli Storyboard ve Konsept Geliştirme',
    titleEn: 'AI-Powered Storyboarding & Concept Prototyping for Commercial Film Projects',
    date: '20 Mart 2026',
    dateEn: 'March 20, 2026',
    readTime: '6 dk okuma',
    summary: 'Müşteri sunumlarında geleneksel çizimlerin haftalar süren onay süreçlerini, tutarlı ComfyUI prompt şablonları ve LoRA modelleriyle birkaç saate indiren prodüksiyon formülü.',
    summaryEn: 'Accelerating commercial pitch decks and storyboard approvals from weeks to hours using tailored ComfyUI pipelines and character-consistent LoRA checkpoints.',
    content: `Reklam ve kurumsal tanıtım projelerinde müşteriye fikri doğru anlatabilmek projenin kaderini belirler. Ancak geleneksel storyboard çizimleri hem uzun zaman alır hem de revizyon maliyetleri yüksektir.

### 1. Karakter ve Mekan Tutarlılığını Sağlamak

Yapay zeka ile storyboard üretirken karşılaşılan en büyük handikap, sahneler arası karakterin veya ürünün değişmesidir. Bu sorunu çözmek için:
- Önceden eğitilmiş özel LoRA modelleri kullanıyorum.
- IP-Adapter ve ControlNet (OpenPose / Canny) ile kamera açısı ve beden dilini sahne sahne donduruyorum.
- Renk paletini ve ışık açısını prompt şablonları ile standartlaştırıyorum.

### 2. Müşteri Sunumlarında Sağlanan Hız

Bu iş akışı sayesinde müşteri senaryo taslağını ilettiği gün, yüksek çözünürlüklü ve sinematik ışıklandırmaya sahip 24 karelik profesyonel bir görsel storyboard sunumu teslim edebiliyorum. Revizyonlar dakikalar içinde işlenip son onaya ulaştırılıyor.`,
    contentEn: `In commercial advertising and corporate media, winning client buy-in hinges on communicating creative intent vividly. Traditional hand-drawn boards are slow to assemble and costly to iterate upon.

### 1. Locking Character & Environment Consistency

The critical hurdle in AI storyboard generation is character drift between sequential shots. I overcome this through:
- Custom-trained LoRA weights tailored to character and product references.
- IP-Adapter and ControlNet (OpenPose / Canny) to enforce strict camera blocking and actor poses.
- Rigid prompt anchors for lens perspective, color grading, and ambient lighting.

### 2. Rapid Turnaround for Client Pitches

With this pipeline, a 24-frame cinematic storyboard with volumetric lighting and cinematic framing is delivered the same day the treatment arrives, shrinking revision loops from days to minutes.`
  },
  {
    id: 'vertical-video-retention-hooks',
    title: 'Sosyal Medyada Dikey Video İzlenme Oranlarını Artıran İlk 3 Saniye ve Kurgu Dinamikleri',
    titleEn: 'Mastering the First 3 Seconds: Editing Dynamics & Retention Strategies for Short-Form Video',
    date: '08 Ocak 2026',
    dateEn: 'January 08, 2026',
    readTime: '5 dk okuma',
    summary: 'Reels, Shorts ve TikTok algoritmalarında izleyicinin kaydırmasını engelleyen görsel kancalar (hooks), dinamik ses miksajı ve tempolu geçiş stratejileri.',
    summaryEn: 'Techniques for capturing immediate viewer attention across Reels, Shorts, and TikTok: visual hooks, rhythmic sound pacing, and cognitive retention tactics.',
    content: `Kısa formatlı dikey videolarda başarıyı belirleyen yegane faktör ilk 3 saniyenin gücüdür. İzleyici ekranda bir saniyelik duraksama ya da belirsizlik hissettiği anda parmağını yukarı kaydırır.

### 1. Görsel Kanca (Visual Hook) Mimarisi

Videonun ilk karesinde mutlaka güçlü bir görsel merak unsuru ya da şaşırtıcı bir aksiyon olmalıdır:
- İlk 1.5 saniyede statik görüntü asla bırakılmamalı; hızlı bir yakınlaşma (whip zoom) veya nesne hareketi yer almalıdır.
- Büyük ve dikkat çekici tipografik başlık, video başlamadan ekranda hazır bulunmalıdır.

### 2. Ritim, Ses ve Nefes Kesici Kurgu

- **SFX (Ses Efektleri):** Her kurgu kesmesinde hafif bir ses efekti (whoosh, hit, pop) kullanarak izleyicinin dikkati uyanık tutulur.
- **Konuşma Boşluklarının Sıfırlanması:** Cümleler arasındaki tüm nefes ve bekleme payları milisaniye düzeyinde budanır.
- **Dinamik B-Roll Desteği:** Konuşmacının görüntüsü 2-3 saniyeden fazla sabit tutulmaz; konuyu destekleyen makro planlar ve animasyonlar devreye sokulur.`,
    contentEn: `In short-form vertical video, total engagement is decided in the opening 3 seconds. The millisecond a viewer encounters hesitation or visual stagnation, they swipe away.

### 1. Anatomy of the Visual Hook

The very first frame must establish immediate narrative momentum or visual curiosity:
- Never allow a static hold in the first 1.5 seconds; utilize dynamic zoom snaps or rapid kinetic action.
- Position high-contrast typographic headlines in the safe zone before audio playback begins.

### 2. Pacing, Sound Design, and Zero-Dead-Air Editing

- **Micro SFX Layering:** Subtle foley textures (whooshes, pops, risers) at cut points keep cognitive attention engaged.
- **Tight Gap Pruning:** Trimming sub-second breaths and vocal hesitation produces a continuous, frictionless cadence.
- **Rapid B-Roll Intercuts:** Alternating talking-head shots every 2-3 seconds with contextual macro footage sustains retention metrics across algorithmic review thresholds.`
  }
];
