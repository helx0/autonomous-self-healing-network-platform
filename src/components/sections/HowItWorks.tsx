import React, { useEffect, useState } from 'react';
import Section from '../shared/Section';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

export default function HowItWorks() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % 8), 2200);
    return () => clearInterval(id);
  }, []);
  const status = [
    { label: 'Network', ok: active !== 1 && active < 7 },
    { label: 'Server S1', ok: active < 1 || active >= 7 },
    { label: 'Monitoring', ok: active >= 2 },
    { label: 'Recovery', ok: active >= 6 },
  ];
  return (
    <Section id="how" title={tr(lang, t.how.title)} subtitle={tr(lang, t.how.scenario)}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          {t.how.steps.map((s, i) => (
            <motion.div key={i} animate={{ scale: active === i ? 1.02 : 1, opacity: active === i ? 1 : 0.75 }}
              className={`flex items-start gap-4 rounded-xl border p-4 transition ${active === i ? 'border-cyan-500/50 bg-cyan-950/20 glow-cyan' : 'border-slate-800 bg-slate-900/40'}`}>
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${i < active ? 'bg-emerald-500/20 text-emerald-300' : active === i ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                {i < active ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">Step {i + 1}</div>
                <p className="text-slate-200">{tr(lang, s)}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="glass rounded-2xl p-6">
          <h4 className="mb-4 text-center font-semibold text-cyan-300">{lang==='en'?'Live Status Visualization':'تصور الحالة الحية'}</h4>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {status.map((st, i) => (
              <div key={i} className={`rounded-xl border p-3 text-center ${st.ok ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-red-500/30 bg-red-950/20'}`}>
                <div className="text-xs text-slate-400">{st.label}</div>
                <div className={`mt-1 font-semibold ${st.ok ? 'text-emerald-300' : 'text-red-300'}`}>{st.ok ? (lang==='en'?'OK':'سليم') : (lang==='en'?'Issue':'مشكلة')}</div>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 100 60" className="w-full">
            <line x1="10" y1="30" x2="35" y2="30" stroke={active>=1 && active<7 ? '#f87171':'#34d399'} strokeWidth="1.5" className={active>=1 && active<7?'':'animate-dash'} strokeDasharray="2 2" />
            <line x1="35" y1="30" x2="60" y2="30" stroke="#22d3ee" strokeWidth="1.5" className="animate-dash" strokeDasharray="2 2" />
            <line x1="60" y1="30" x2="85" y2="30" stroke="#22d3ee" strokeWidth="1.5" className="animate-dash" strokeDasharray="2 2" />
            <g>
              <rect x="2" y="23" width="16" height="14" rx="2" fill="#0f172a" stroke="#22d3ee" />
              <text x="10" y="32" textAnchor="middle" fontSize="5" fill="#e2e8f0">R1</text>
            </g>
            <g>
              <rect x="27" y="23" width="16" height="14" rx="2" fill="#0f172a" stroke={active>=1 && active<7 ? '#f87171':'#22d3ee'} />
              <text x="35" y="32" textAnchor="middle" fontSize="4.5" fill="#e2e8f0">SW</text>
            </g>
            <g>
              <rect x="52" y="23" width="16" height="14" rx="2" fill="#0f172a" stroke={active>=1 && active<7 ? '#f87171':'#34d399'} />
              <text x="60" y="32" textAnchor="middle" fontSize="4.5" fill="#e2e8f0">S1</text>
              {active>=1 && active<7 && <text x="60" y="20" textAnchor="middle" fontSize="4" fill="#f87171">!</text>}
              {active>=7 && <text x="60" y="20" textAnchor="middle" fontSize="4" fill="#34d399">✓</text>}
            </g>
            <g>
              <rect x="77" y="23" width="16" height="14" rx="2" fill="#0f172a" stroke="#22d3ee" />
              <text x="85" y="32" textAnchor="middle" fontSize="4.5" fill="#e2e8f0">PC</text>
            </g>
            {active>=2 && <text x="50" y="50" textAnchor="middle" fontSize="4" fill="#38bdf8">{active<4?'Detecting...':active<6?'Responding...':'Verifying...'}</text>}
          </svg>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500" animate={{ width: `${((active+1)/8)*100}%` }} />
          </div>
        </div>
      </div>
    </Section>
  );
}
