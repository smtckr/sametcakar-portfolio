// ================= AYARLAR =================
// Mesajların gideceği adres. FormSubmit bu adrese e-posta olarak iletir.
const ALICI_EPOSTA = 'sametcakar@gmail.com';

// YouTube kanal adresinizi buraya yazın; boş kalırsa iletişimde YouTube satırı görünmez.
const YOUTUBE_ADRESI = 'https://www.youtube.com/@sametcakar.a%C4%B1';
// ===========================================

(function () {
  const kok = document.documentElement;
  const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fareVar = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const sinirla = (v, a, b) => Math.min(b, Math.max(a, v));

  // ---------- Tema ----------
  document.getElementById('temaBtn').addEventListener('click', () => {
    const yeni = kok.getAttribute('data-tema') === 'koyu' ? 'acik' : 'koyu';
    kok.setAttribute('data-tema', yeni);
    try { localStorage.setItem('tema', yeni); } catch (e) {}
    document.querySelector('meta[name="theme-color"]').setAttribute('content', yeni === 'koyu' ? '#11171B' : '#F4F6F7');
  });

  // ---------- Mobil menü ----------
  const menu = document.getElementById('menu');
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', () => {
    const acik = menu.classList.toggle('acik');
    menuBtn.setAttribute('aria-expanded', String(acik));
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('acik');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  document.getElementById('yil').textContent = new Date().getFullYear();
  if (YOUTUBE_ADRESI) {
    document.getElementById('youtubeLink').href = YOUTUBE_ADRESI;
    document.getElementById('youtubeLink').textContent = '@sametcakar.aı';
    document.querySelector('.youtube-satir').hidden = false;
  }

  // ---------- Sayaçlar ----------
  const say = (el) => {
    const hedef = Number(el.dataset.say);
    if (azHareket) { el.textContent = hedef; return; }
    const sure = 1100, bas = performance.now();
    const adim = (t) => {
      const p = sinirla((t - bas) / sure, 0, 1);
      el.textContent = Math.round(hedef * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(adim);
    };
    el.textContent = '0';
    requestAnimationFrame(adim);
  };
  setTimeout(() => document.querySelectorAll('.donanim [data-say]').forEach(say), 1000);

  // ---------- Kaydırınca belirme ----------
  // Aynı gruptaki öğeler sırayla gelsin
  document.querySelectorAll('.yetkinlikler, .isler, .alanlar, .zaman').forEach((grup) => {
    [...grup.querySelectorAll(':scope > .belir')].forEach((el, i) => el.style.setProperty('--sira', i));
  });
  const gozcu = new IntersectionObserver((girdiler) => {
    girdiler.forEach((g) => {
      if (!g.isIntersecting) return;
      g.target.classList.add('gorundu');
      g.target.querySelectorAll('[data-say]').forEach(say);
      gozcu.unobserve(g.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  document.querySelectorAll('.belir').forEach((el) => gozcu.observe(el));

  // ---------- Kaydırma: ilerleme çubuğu, üst bar, zaman çizelgesi ----------
  const ust = document.getElementById('ust');
  const ilerleme = document.getElementById('ilerleme');
  const zaman = document.getElementById('zaman');
  const zamanDolu = document.getElementById('zamanDolu');
  const duraklar = [...document.querySelectorAll('.durak')];
  let kaydirmaBekliyor = false;
  const kaydirmaGuncelle = () => {
    kaydirmaBekliyor = false;
    const y = window.scrollY;
    const toplam = document.documentElement.scrollHeight - window.innerHeight;
    ilerleme.style.transform = `scaleX(${toplam > 0 ? y / toplam : 0})`;
    ust.classList.toggle('kaydi', y > 8);

    const vh = window.innerHeight;
    const r = zaman.getBoundingClientRect();
    const p = sinirla((vh * 0.65 - r.top) / r.height, 0, 1);
    zamanDolu.style.transform = `scaleY(${p})`;
    duraklar.forEach((d) => d.classList.toggle('gecildi', d.getBoundingClientRect().top < vh * 0.65));
  };
  window.addEventListener('scroll', () => {
    if (!kaydirmaBekliyor) { kaydirmaBekliyor = true; requestAnimationFrame(kaydirmaGuncelle); }
  }, { passive: true });
  window.addEventListener('resize', kaydirmaGuncelle);
  kaydirmaGuncelle();

  // ---------- Fareyi takip eden ışık ----------
  if (fareVar) {
    document.addEventListener('pointermove', (e) => {
      const kart = e.target.closest && e.target.closest('.isik');
      if (!kart) return;
      const r = kart.getBoundingClientRect();
      kart.style.setProperty('--mx', `${e.clientX - r.left}px`);
      kart.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  // ---------- Giriş görseli: 3B eğilme ----------
  const egim = document.getElementById('egim');
  if (fareVar && !azHareket && egim) {
    const ic = egim.querySelector('.egim-ic');
    const donanim = egim.querySelector('.donanim');
    egim.addEventListener('pointermove', (e) => {
      const r = egim.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ic.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`;
      ic.style.setProperty('--px', `${(x + 0.5) * 100}%`);
      ic.style.setProperty('--py', `${(y + 0.5) * 100}%`);
      donanim.style.transform = `translate(${x * -18}px, ${y * -14}px)`;
    });
    egim.addEventListener('pointerleave', () => {
      ic.style.transform = '';
      donanim.style.transform = '';
    });
  }

  // ---------- Mıknatıs butonlar ----------
  if (fareVar && !azHareket) {
    document.querySelectorAll('.miknatis').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        b.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  // ---------- Görünürken çalışan döngü yardımcısı ----------
  const gorunurkenCalistir = (el, kare) => {
    let calisiyor = false, id = 0, bas = 0, birikmis = 0;
    const dongu = (t) => { kare((birikmis + t - bas) / 1000); id = requestAnimationFrame(dongu); };
    new IntersectionObserver(([g]) => {
      if (g.isIntersecting && !calisiyor) { calisiyor = true; bas = performance.now(); id = requestAnimationFrame(dongu); }
      else if (!g.isIntersecting && calisiyor) { calisiyor = false; birikmis += performance.now() - bas; cancelAnimationFrame(id); }
    }).observe(el);
  };

  // ---------- Canlı kurgu ekranı ----------
  const kurgu = document.getElementById('kurgu');
  if (kurgu) {
    kurgu.querySelectorAll('.klip').forEach((k, i) => k.style.setProperty('--i', i));
    const v1 = [...kurgu.querySelectorAll('#v1 .klip')];
    const hat = kurgu.querySelector('.kurgu-hat');
    const oynatma = document.getElementById('oynatma');
    const tc = document.getElementById('kurguTc');
    const monitor = document.getElementById('monitor');
    const etiket = document.getElementById('monitorEtiket');
    const alt = document.getElementById('monitorAlt');
    const renkler = {
      'Senaryo': ['#1E5A50', '#0B1A20'], 'Çekim': ['#5A3E1E', '#1A120B'], 'Kurgu': ['#1E3A5A', '#0B1220'],
      'B-roll': ['#3D2A5E', '#130B20'], 'Yayında': ['#1E5A3A', '#0B2014'],
    };
    const araliklar = v1.map((k) => {
      const b = parseFloat(k.style.getPropertyValue('--b')) / 100;
      const g = parseFloat(k.style.getPropertyValue('--g')) / 100;
      return { k, b, s: b + g };
    });
    let aktif = null;
    const SURE = 14; // saniye
    const ciz = (sn) => {
      const p = (sn % SURE) / SURE;
      const genislik = hat.clientWidth - 40 - 10;
      oynatma.style.transform = `translateX(${p * genislik}px)`;
      const toplamKare = Math.floor(p * 60 * 25);
      const s = Math.floor(toplamKare / 25), k = toplamKare % 25;
      tc.textContent = `00:00:${String(s).padStart(2, '0')}:${String(k).padStart(2, '0')}`;
      const bulunan = araliklar.find((a) => p >= a.b && p < a.s) || araliklar[araliklar.length - 1];
      if (bulunan !== aktif) {
        if (aktif) aktif.k.classList.remove('oynuyor');
        aktif = bulunan;
        aktif.k.classList.add('oynuyor');
        etiket.textContent = aktif.k.dataset.ad;
        alt.textContent = aktif.k.dataset.alt;
        const [m1, m2] = renkler[aktif.k.dataset.ad] || renkler.Senaryo;
        monitor.style.setProperty('--m1', m1);
        monitor.style.setProperty('--m2', m2);
        monitor.classList.remove('degis'); void monitor.offsetWidth; monitor.classList.add('degis');
      }
    };
    if (azHareket) ciz(5); else gorunurkenCalistir(kurgu, ciz);
  }

  // ---------- Yapay zekâ düğüm ağı ----------
  const adimEl = document.getElementById('adim');
  if (adimEl) {
    const adimBar = document.getElementById('adimBar');
    const vramBar = document.getElementById('vramBar');
    const vramYazi = document.getElementById('vramYazi');
    const pano = document.querySelector('.dugum-pano');
    const DONGU = 7;
    const ciz = (sn) => {
      const p = (sn % DONGU) / DONGU;
      const uret = sinirla(p / 0.8, 0, 1); // %80 üretim, %20 bekleme
      const adim = Math.round(uret * 30);
      adimEl.textContent = adim;
      adimBar.setAttribute('width', (102 * uret).toFixed(1));
      const vram = p < 0.8 ? 6 + 9.2 * Math.min(1, uret * 3) + Math.sin(sn * 6) * 0.25 : 3.1;
      vramBar.style.width = `${(vram / 16) * 100}%`;
      vramYazi.textContent = `${vram.toFixed(1)} / 16 GB`;
    };
    if (azHareket) ciz(5); else gorunurkenCalistir(pano, ciz);
  }

  // ---------- Yetenek sekmeleri ----------
  const sekmeler = [...document.querySelectorAll('.sekme')];
  const isaret = document.getElementById('sekmeIsaret');
  const beceriler = [...document.querySelectorAll('.beceri')];
  const isaretiTasi = (s) => {
    isaret.style.width = `${s.offsetWidth}px`;
    isaret.style.transform = `translateX(${s.offsetLeft}px)`;
    isaret.style.top = `${s.offsetTop}px`;
    isaret.style.height = `${s.offsetHeight}px`;
  };
  const cubuklariDoldur = (liste) => {
    liste.forEach((b) => b.classList.remove('dolu'));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      liste.forEach((b, i) => setTimeout(() => {
        b.classList.add('dolu');
        b.querySelectorAll('[data-say]').forEach(say);
      }, i * 60));
    }));
  };
  sekmeler.forEach((s) => s.addEventListener('click', () => {
    sekmeler.forEach((x) => { x.classList.toggle('aktif', x === s); x.setAttribute('aria-selected', String(x === s)); });
    isaretiTasi(s);
    const f = s.dataset.filtre;
    const gorunecek = beceriler.filter((b) => f === 'hepsi' || b.dataset.kat === f);
    beceriler.forEach((b) => b.classList.add('cikis'));
    setTimeout(() => {
      beceriler.forEach((b) => b.classList.toggle('gizli', !gorunecek.includes(b)));
      requestAnimationFrame(() => gorunecek.forEach((b, i) => setTimeout(() => b.classList.remove('cikis'), i * 45)));
      cubuklariDoldur(gorunecek);
    }, azHareket ? 0 : 250);
  }));
  const ilkSekme = document.querySelector('.sekme.aktif');
  const sekmeKur = () => isaretiTasi(document.querySelector('.sekme.aktif') || ilkSekme);
  window.addEventListener('resize', sekmeKur);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sekmeKur);
  sekmeKur();
  new IntersectionObserver(([g], o) => {
    if (g.isIntersecting) { cubuklariDoldur(beceriler.filter((b) => !b.classList.contains('gizli'))); o.disconnect(); }
  }, { threshold: 0.15 }).observe(document.getElementById('beceriler'));

  // ---------- İletişim formu ----------
  const form = document.getElementById('form');
  const durum = document.getElementById('formDurum');
  const btn = form.querySelector('.btn-gonder');
  const btnYazi = btn.querySelector('.gonder-yazi');

  const hataYaz = (ad, mesaj) => {
    const kutu = form.querySelector(`[data-hata="${ad}"]`);
    kutu.textContent = mesaj || '';
    kutu.closest('.girdi').classList.toggle('hatali', Boolean(mesaj));
  };
  const dogrula = (v) => {
    let tamam = true;
    hataYaz('name'); hataYaz('email'); hataYaz('message');
    if (!v.name) { hataYaz('name', 'Lütfen adınızı yazın.'); tamam = false; }
    if (!v.email) { hataYaz('email', 'Size dönebilmem için e-posta adresi gerekli.'); tamam = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) { hataYaz('email', 'Bu e-posta adresi geçerli görünmüyor.'); tamam = false; }
    if (v.message.length < 5) { hataYaz('message', 'Mesajınız biraz kısa kaldı.'); tamam = false; }
    return tamam;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const veri = new FormData(form);
    const v = {
      name: String(veri.get('name') || '').trim(),
      email: String(veri.get('email') || '').trim(),
      subject: String(veri.get('subject') || 'Diğer'),
      message: String(veri.get('message') || '').trim(),
      honey: String(veri.get('_honey') || ''),
    };
    if (!dogrula(v)) {
      const ilk = form.querySelector('.hatali input, .hatali textarea');
      if (ilk) ilk.focus();
      return;
    }
    if (v.honey) return;

    btn.disabled = true;
    btnYazi.textContent = 'Gönderiliyor…';
    durum.className = 'form-durum';
    durum.textContent = '';

    // Mail servisi bazen yavaş yanıt veriyor: kullanıcıyı bilgilendir, 30 sn'de vazgeç
    const bekleme = setTimeout(() => { btnYazi.textContent = 'Gönderiliyor… birkaç saniye sürebilir'; }, 4000);
    const iptal = new AbortController();
    const zamanAsimi = setTimeout(() => iptal.abort(), 30000);
    try {
      const yanit = await fetch(`https://formsubmit.co/ajax/${ALICI_EPOSTA}`, {
        signal: iptal.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: v.name, email: v.email, subject: v.subject, message: v.message,
          _subject: `[sametcakar.com] ${v.subject} · ${v.name}`,
          _replyto: v.email, _template: 'table', _captcha: 'false', _honey: '',
        }),
      });
      const sonuc = await yanit.json().catch(() => ({}));
      if (!yanit.ok || String(sonuc.success) === 'false') throw new Error(sonuc.message || 'gonderilemedi');
      form.reset();
      durum.className = 'form-durum basarili';
      durum.textContent = `Teşekkürler ${v.name.split(' ')[0]}, mesajınız bana ulaştı. En kısa sürede dönüş yapacağım.`;
    } catch (hata) {
      const konu = encodeURIComponent(`${v.subject} · ${v.name}`);
      const govde = encodeURIComponent(`${v.message}\n\n${v.name}\n${v.email}`);
      durum.className = 'form-durum hatali';
      durum.innerHTML = `Mesaj şu an gönderilemedi. Yazdıklarınız silinmedi; tekrar deneyebilir ya da doğrudan
        <a href="mailto:${ALICI_EPOSTA}?subject=${konu}&body=${govde}">${ALICI_EPOSTA}</a> adresine yazabilirsiniz.`;
    } finally {
      clearTimeout(bekleme);
      clearTimeout(zamanAsimi);
      btn.disabled = false;
      btnYazi.textContent = 'Mesajı gönder';
    }
  });
})();
