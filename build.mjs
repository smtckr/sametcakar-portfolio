// Vercel için basit derleme: site dosyalarını dist/ klasörüne kopyalar.
// Hiçbir paket kurulmaz; Node'un kendisi yeterli.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const dosyalar = ['index.html', 'styles.css', 'script.js', 'favicon.svg', 'images'];
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const d of dosyalar) cpSync(d, `dist/${d}`, { recursive: true });
console.log('Site dist/ klasörüne hazırlandı.');
