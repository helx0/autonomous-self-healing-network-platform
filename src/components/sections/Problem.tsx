import React from 'react';
import Section from '../shared/Section';
import { motion } from 'framer-motion';
import { UserCog, Unplug, Radar, ShieldAlert, Timer, Eye } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

const icons = [UserCog, Unplug, Radar, ShieldAlert, Timer, Eye];
const colors = ['text-amber-400','text-red-400','text-orange-400','text-rose-400','text-yellow-400','text-cyan-400'];

export default function Problem() {
  const { lang } = useLang();
  return (
    <Section id="problem" title={tr(lang, t.problem.title)}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.problem.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass group rounded-2xl p-6 transition hover:border-cyan-500/30">
              <div className={`mb-4 inline-flex rounded-xl bg-slate-800/80 p-3 ${colors[i]}`}>
                <Icon size={22} />
              </div>
              <p className="text-slate-200">{tr(lang, item)}</p>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-950/10 p-5 text-sm text-amber-100/90">
        {lang === 'en'
          ? 'These challenges motivate an integrated framework that connects monitoring, detection, classification, and controlled automated response within a single workflow.'
          : 'تدفع هذه التحديات نحو إطار متكامل يربط المراقبة والاكتشاف والتصنيف والاستجابة الآلية المضبوطة ضمن سير عمل واحد.'}
      </div>
    </Section>
  );
}
