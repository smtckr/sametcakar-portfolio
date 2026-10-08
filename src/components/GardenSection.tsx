import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GardenSectionProps {
  email: string;
}

export const GardenSection: React.FC<GardenSectionProps> = ({ email }) => {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [lastSent, setLastSent] = useState<{
    subject: string;
    body: string;
  } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; subject?: string; message?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = t('Lütfen adınızı ve soyadınızı giriniz.', 'Please enter your full name.');
    } else if (formData.name.trim().length < 2) {
      errors.name = t('Adınız en az 2 karakter olmalıdır.', 'Name must be at least 2 characters.');
    }

    if (!formData.email.trim()) {
      errors.email = t('Lütfen e-posta adresinizi giriniz.', 'Please enter your email address.');
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = t('Lütfen geçerli bir e-posta formatı giriniz (örn. ad@sirket.com).', 'Please enter a valid email address.');
    }

    if (!formData.subject.trim()) {
      errors.subject = t('Lütfen mesaj konusunu belirtiniz.', 'Please enter a subject.');
    } else if (formData.subject.trim().length < 3) {
      errors.subject = t('Konu en az 3 karakter olmalıdır.', 'Subject must be at least 3 characters.');
    }

    if (!formData.message.trim()) {
      errors.message = t('Lütfen mesajınızı yazınız.', 'Please enter your message.');
    } else if (formData.message.trim().length < 10) {
      errors.message = t('Mesajınız en az 10 karakter olmalıdır.', 'Message must be at least 10 characters.');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    const targetEmail = 'sametcakar@gmail.com';
    const emailBody = `Gönderen: ${formData.name.trim()}\nE-Posta: ${formData.email.trim()}\nKonu: ${formData.subject.trim()}\n\nMesaj:\n${formData.message.trim()}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: `[Portföy Mesajı] ${formData.subject.trim()} - ${formData.name.trim()}`,
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _replyto: formData.email.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setLastSent({
          subject: formData.subject.trim(),
          body: emailBody,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setValidationErrors({});
      } else {
        throw new Error('Service response error');
      }
    } catch {
      // In case of ad-blocker or network CORS restrictions, smoothly switch to fallback client dispatch
      setStatus('error');
      setLastSent({
        subject: formData.subject.trim(),
        body: emailBody,
      });
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-neutral-200/80 dark:border-neutral-800/80 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('İletişim & İş Birliği', 'Contact & Collaboration')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            {t('Birlikte Üretelim & İletişim', "Let's Build Together & Connect")}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-xl">
            {t(
              'Eğitim video süreçleri, ComfyUI üretici yapay zeka hatları, video kurgu projeleri veya modern web arayüzleri için mesaj bırakabilir ya da doğrudan iletişime geçebilirsiniz.',
              'Feel free to leave a message or reach out directly for training video workflows, ComfyUI generative AI pipelines, video editing projects, or modern web interfaces.'
            )}
          </p>
        </div>
      </div>

      {/* Grid: Left Metrics & Quick Connect, Right Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Quick Metrics & Direct Email Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Direct Email Card */}
          <div className="p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {t('Doğrudan E-Posta', 'Direct Email')}
                </h3>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  {t('En geç 24 saat içinde yanıt', 'Response within 24 hours')}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 font-medium truncate">
                {email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {t('Kopyalandı!', 'Copied!')}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t('Kopyala', 'Copy')}</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={`mailto:${email}`}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              <span>{t('E-Posta İstemcisinde Aç', 'Open in Email Client')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Garden Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: t('Eğitim Videoları', 'Training Videos'),
                val: '150+',
                sub: 'Arçelik · Beko · Grundig',
              },
              {
                label: 'Generative AI',
                val: 'ComfyUI',
                sub: 'Flux2, Krea2, H3 & Qwen',
              },
              {
                label: t('Video Kurgu', 'Video Editing'),
                val: 'Premiere & FCP',
                sub: t('Synthesia AI Avatarları', 'Synthesia AI Avatars'),
              },
              {
                label: t('Çalışma Durumu', 'Availability'),
                val: t('Aktif', 'Active'),
                sub: t('İstanbul & Projeler', 'Istanbul & Remote'),
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm"
              >
                <div className="text-base sm:text-lg font-bold font-mono text-neutral-900 dark:text-neutral-100 truncate">
                  {stat.val}
                </div>
                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] font-mono text-neutral-400 mt-0.5 truncate">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {t('Bir Mesaj Gönderin', 'Send a Message')}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 font-mono">
              {t(
                'Proje detaylarınızı, iş teklifinizi veya selamınızı iletebilirsiniz.',
                'Share your project details, collaboration inquiries, or say hello.'
              )}
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col gap-3 text-emerald-800 dark:text-emerald-200 text-sm animate-in fade-in">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-base">
                      {t('Mesajınız sametcakar@gmail.com adresine başarıyla iletildi!', 'Message successfully delivered to sametcakar@gmail.com!')}
                    </div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      {t(
                        'En kısa sürede e-posta adresinize dönüş yapacağım. İlginiz için teşekkürler!',
                        'I will get back to your email as soon as possible. Thank you!'
                      )}
                    </div>
                  </div>
                </div>

                {lastSent && (
                  <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                      {t('Yedek olarak mail programınızda da açabilirsiniz:', 'Backup option via mail client:')}
                    </span>
                    <a
                      href={`mailto:sametcakar@gmail.com?subject=${encodeURIComponent(
                        lastSent.subject
                      )}&body=${encodeURIComponent(lastSent.body)}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold underline hover:text-emerald-900 dark:hover:text-white"
                    >
                      <span>{t('Mail Programını Aç', 'Open Mail App')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-col gap-3 text-amber-800 dark:text-amber-200 text-sm animate-in fade-in">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm">
                      {t(
                        'Mesajınız hazırlandı! Doğrudan e-posta istemciniz üzerinden gönderebilirsiniz.',
                        'Message prepared! You can send directly via your email client.'
                      )}
                    </div>
                    <div className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                      {t(
                        'Aşağıdaki butona tıklayarak sametcakar@gmail.com adresine tek tıkla e-posta gönderebilirsiniz.',
                        'Click below to send to sametcakar@gmail.com in one click.'
                      )}
                    </div>
                  </div>
                </div>

                {lastSent && (
                  <a
                    href={`mailto:sametcakar@gmail.com?subject=${encodeURIComponent(
                      lastSent.subject
                    )}&body=${encodeURIComponent(lastSent.body)}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors self-start"
                  >
                    <span>{t('E-Posta İstemcisiyle Gönder', 'Send via Email Client')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono mb-1.5">
                    {t('Adınız Soyadınız', 'Your Name')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('örn. Ahmet Yılmaz', 'e.g. John Doe')}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (validationErrors.name) {
                        setValidationErrors({ ...validationErrors, name: undefined });
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.name
                        ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                        : 'border-neutral-200 dark:border-neutral-700 focus:ring-blue-500'
                    } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      <span>{validationErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono mb-1.5">
                    {t('E-Posta Adresiniz', 'Your Email')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ornek@sirket.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (validationErrors.email) {
                        setValidationErrors({ ...validationErrors, email: undefined });
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      validationErrors.email
                        ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                        : 'border-neutral-200 dark:border-neutral-700 focus:ring-blue-500'
                    } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" />
                      <span>{validationErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono mb-1.5">
                  {t('Konu', 'Subject')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t(
                    'Eğitim Videosu / ComfyUI / Web Arayüzü / İş Birliği',
                    'Training Video / ComfyUI / Web UI / Collaboration'
                  )}
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (validationErrors.subject) {
                      setValidationErrors({ ...validationErrors, subject: undefined });
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    validationErrors.subject
                      ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                      : 'border-neutral-200 dark:border-neutral-700 focus:ring-blue-500'
                  } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all`}
                />
                {validationErrors.subject && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{validationErrors.subject}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono mb-1.5">
                  {t('Mesajınız', 'Your Message')} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t(
                    'Projenizden veya aklınızdaki sorudan bahsedin (en az 10 karakter)...',
                    'Tell me about your project or collaboration idea (min 10 characters)...'
                  )}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (validationErrors.message) {
                      setValidationErrors({ ...validationErrors, message: undefined });
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    validationErrors.message
                      ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                      : 'border-neutral-200 dark:border-neutral-700 focus:ring-blue-500'
                  } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all resize-none`}
                />
                {validationErrors.message && (
                  <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{validationErrors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('Gönderiliyor...', 'Sending...')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('Mesajı İlet', 'Send Message')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
