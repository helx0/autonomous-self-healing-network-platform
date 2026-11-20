import React from 'react';
import Section from '../shared/Section';
import { motion } from 'framer-motion';
import { Timer, Eye, Brain, LayoutDashboard, Blocks } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

const icons = [Timer, Eye, Brain, LayoutDashboard, Blocks];

export default function Motivation() {
  const { lang } = useLang();

  return (
    <Section id="motivation" title={tr(lang, t.motivation.title)}>
      <p className="mx-auto mb-8 max-w-3xl text-center text-slate-300">{tr(lang, t.motivation.intro)}</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {t.motivation.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`glass rounded-2xl p-6 ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-300 ring-1 ring-cyan-400/20">
                <Icon size={22} />
              </div>
              <p className="text-sm leading-relaxed text-slate-200 md:text-base">{tr(lang, item)}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
