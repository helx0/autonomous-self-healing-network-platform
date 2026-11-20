import React from 'react';
import Section from '../shared/Section';
import { motion } from 'framer-motion';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

function badge(lang: 'en'|'ar', s: string) {
  if (s === 'implemented') return <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300 ring-1 ring-emerald-500/30">{tr(lang, t.statusLabels.implemented)}</span>;
  if (s === 'consideration') return <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs text-amber-300 ring-1 ring-amber-500/30">{tr(lang, t.statusLabels.consideration)}</span>;
  return <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-xs text-cyan-300 ring-1 ring-cyan-500/30">{tr(lang, t.statusLabels.proposed)}</span>;
}

export default function Technologies() {
  const { lang } = useLang();
  return (
    <Section id="technologies" title={tr(lang, t.tech.title)} subtitle={tr(lang, t.tech.note)}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {t.tech.categories.map((c, i) => (
          <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.04}}
            className="glass rounded-2xl p-5">
            <h3 className="mb-4 text-lg font-semibold text-cyan-300">{tr(lang, c.cat)}</h3>
            <ul className="space-y-3">
              {c.items.map((it: any, j) => (
                <li key={j} className="flex flex-col gap-1.5 border-b border-slate-800/70 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-slate-100">{it.name}</span>
                  {it.desc && <p className="text-xs leading-relaxed text-slate-400">{tr(lang, it.desc)}</p>}
                  <div>{badge(lang, it.status)}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
