import React from 'react';
import { motion } from 'framer-motion';
import { Play, Compass, Activity } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

function HeroBackground() {
  const nodes = [
    { x: 10, y: 20 }, { x: 25, y: 10 }, { x: 40, y: 25 }, { x: 55, y: 12 }, { x: 70, y: 22 }, { x: 85, y: 15 },
    { x: 15, y: 50 }, { x: 35, y: 45 }, { x: 50, y: 55 }, { x: 65, y: 45 }, { x: 80, y: 52 },
    { x: 20, y: 80 }, { x: 38, y: 72 }, { x: 55, y: 85 }, { x: 72, y: 75 }, { x: 88, y: 82 },
  ];
  const links: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[2,7],[3,8],[4,9],[5,10],[6,7],[7,8],[8,9],[9,10],[6,11],[7,12],[8,13],[9,14],[10,15],[11,12],[12,13],[13,14],[14,15]];
  return (
    <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="g1" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#g1)" />
      {links.map(([a, b], i) => (
        <g key={i}>
          <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#22d3ee" strokeOpacity="0.18" strokeWidth="0.2" />
          <line x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#38bdf8" strokeWidth="0.25" strokeDasharray="1 3" className="animate-dash" style={{ animationDuration: `${3 + (i % 4)}s` }} />
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="1.2" fill="#22d3ee" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={n.x} cy={n.y} r="0.5" fill="#e0f2fe" />
        </g>
      ))}
    </svg>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-slate-950 grid-bg" />
      <HeroBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/60 to-slate-950" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <Activity size={14} /> {tr(lang, t.hero.status)}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {tr(lang, t.hero.title)}
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 md:text-xl">
          {tr(lang, t.hero.subtitle)}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button onClick={() => go('solution')} className="group flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400">
            <Compass size={18} /> {tr(lang, t.hero.ctaExplore)}
          </button>
          <button onClick={() => go('lab')} className="group flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-slate-900/60 px-6 py-3 font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-slate-800/80">
            <Play size={18} /> {tr(lang, t.hero.ctaLab)}
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[{l:'Routers',v:'R'}, {l:'Switches',v:'S'}, {l:'Servers',v:'SV'}, {l:'Clients',v:'PC'}].map((x,i)=>(
            <div key={i} className="glass rounded-xl p-3 text-sm text-slate-300">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/80 text-cyan-400 ring-1 ring-cyan-500/30 glow-cyan">{x.v}</div>
              {x.l}
              <div className="mt-1 text-xs text-emerald-400">● Online</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
