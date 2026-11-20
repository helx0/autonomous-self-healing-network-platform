import React from 'react';
import Section from '../shared/Section';
import { motion } from 'framer-motion';
import { Activity, Search, Waves, GitBranch, Bot, RefreshCw, Clock, BadgeCheck } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

const icons = [Activity, Search, Waves, GitBranch, Bot, RefreshCw, Clock, BadgeCheck];

export default function Objectives() {
  const { lang } = useLang();
  return (
    <Section id="objectives" title={tr(lang, t.objectives.title)}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.objectives.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl p-5 text-center transition hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-300 ring-1 ring-cyan-400/20">
                <Icon size={22} />
              </div>
              <p className="font-medium text-slate-100">{tr(lang, item)}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
