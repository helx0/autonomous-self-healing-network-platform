import React, { useEffect, useState } from 'react';
import { Menu, X, Globe, Shield } from 'lucide-react';
import { navItems, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'glass border-b border-slate-800/60 shadow-lg' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button onClick={() => go('home')} className="flex items-center gap-2 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-400/30">
            <Shield size={18} />
          </span>
          <span className="hidden text-sm font-semibold leading-tight text-slate-100 sm:block">
            Self-Healing<br /><span className="text-cyan-400">Network</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`rounded-md px-3 py-2 text-sm transition ${active === n.id ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              {tr(lang, n)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 rounded-md border border-slate-700/60 bg-slate-900/60 px-3 py-1.5 text-sm text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300"
            aria-label="Switch language"
          >
            <Globe size={15} />
            <span>{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>
          <button className="rounded-md p-2 text-slate-200 hover:bg-slate-800 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass border-t border-slate-800/60 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`rounded-md px-3 py-2 text-left text-sm ${active === n.id ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-300'}`}
              >
                {tr(lang, n)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
