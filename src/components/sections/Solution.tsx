import React, { useState } from 'react';
import Section from '../shared/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Database, ScanSearch, GitBranch, Cpu, Shield, RefreshCw, CheckCircle2, ChevronDown } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

const icons = [Activity, Database, ScanSearch, GitBranch, Cpu, Shield, RefreshCw, CheckCircle2];

export default function Solution() {
  const { lang } = useLang();
  const [open, setOpen] = useState<string | null>(t.solution.steps[0].id);
  return (
    <Section id="solution" title={tr(lang, t.solution.title)} subtitle={tr(lang, t.solution.desc)}>
      <div className="mx-auto max-w-4xl">
        <div className="relative space-y-3">
          {t.solution.steps.map((s, i) => {
            const Icon = icons[i];
            const active = open === s.id;
            return (
              <div key={s.id} className="relative">
                {i < t.solution.steps.length - 1 && (
                  <div className="absolute left-6 top-14 hidden h-6 w-px bg-gradient-to-b from-cyan-500/50 to-transparent md:block" style={{ [lang === 'ar' ? 'right' : 'left']: '1.5rem' } as any} />
                )}
                <button onClick={() => setOpen(active ? null : s.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${active ? 'glass border-cyan-500/40 glow-cyan' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon size={22} />
                    </span>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider text-slate-400">Step {i + 1}</div>
                      <div className="text-lg font-semibold text-white">{tr(lang, s)}</div>
                    </div>
                    <ChevronDown className={`text-slate-400 transition ${active ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {active && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="mt-4 border-t border-slate-700/60 pt-4 text-sm leading-relaxed text-slate-300">{tr(lang, s.detail)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
