import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, User, X, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAdmin();
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      closeLoginModal();
      setUsername('');
      setPassword('');
    } else {
      setError(
        t(
          'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.',
          'Incorrect username or password. Please try again.'
        )
      );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={closeLoginModal}
    >
      <div
        className="w-full max-w-sm bg-neutral-900 border border-neutral-700/80 rounded-2xl p-6 shadow-2xl text-neutral-100 flex flex-col space-y-4 animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white transition-colors"
          aria-label={t('Kapat', 'Close')}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {t('Yönetici Girişi', 'Admin Login')}
            </h3>
            <p className="text-xs text-neutral-400 font-mono">
              {t('Görsel & İçerik Yönetimi', 'Media & Content Management')}
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 mb-1">
              {t('Kullanıcı Adı', 'Username')}
            </label>
            <div className="relative">
              <input
                autoFocus
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('örn. admin', 'e.g. admin')}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-700 bg-neutral-800/90 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <User className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 mb-1">
              {t('Şifre', 'Password')}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-700 bg-neutral-800/90 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-98"
            >
              <span>{t('Giriş Yap ve Yönetici Modunu Aç', 'Login and Enable Admin Mode')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500 text-center">
          {t(
            'Giriş yaptıktan sonra kartlardaki görselleri değiştirip "Yayınla" butonu ile canlıya alabilirsiniz.',
            'After logging in, modify project card images and click "Publish" to push them live.'
          )}
        </div>
      </div>
    </div>
  );
};
