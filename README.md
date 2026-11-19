# sametcakar.com

Sade, statik kişisel site. Derleme (build) adımı yok: Vercel dosyaları olduğu gibi yayınlar.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Sayfanın tüm metinleri burada. Bir yazıyı değiştirmek için bu dosyayı açın. |
| `styles.css` | Renkler ve görünüm. Renkler en üstteki `:root` bölümünde. |
| `script.js` | Tema düğmesi, mobil menü ve iletişim formu. En üstte e-posta ve YouTube ayarı var. |
| `images/` | Görseller (WebP, sıkıştırılmış). |
| `vercel.json` | Vercel ayarı (görsellerin önbelleğe alınması). |

## İletişim formu

Form, eski sitedeki gibi **FormSubmit** servisiyle `sametcakar@gmail.com` adresine e-posta gönderir.
Adresi değiştirmek için `script.js` içindeki `ALICI_EPOSTA` satırını düzenleyin.
Yeni bir adres kullanırsanız, ilk mesajda FormSubmit bir onay e-postası yollar; içindeki bağlantıya bir kez tıklamanız yeterli.

## Yayına alma (GitHub + Vercel)

1. GitHub'daki depoda eski dosyaların hepsini silin (`src`, `package.json`, `vite.config.ts` vb.).
2. Bu klasördeki dosyaları deponun köküne yükleyin ve kaydedin (commit).
3. Vercel'de proje ayarlarında **Framework Preset: Other** seçin; Build Command ve Output Directory boş kalsın.
4. Vercel her kayıttan sonra siteyi otomatik günceller.
