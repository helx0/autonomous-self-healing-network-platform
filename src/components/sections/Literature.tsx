import React from 'react';
import Section from '../shared/Section';
import { motion } from 'framer-motion';
import { BookOpen, Shield, FileSearch } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

export default function Literature() {
  const { lang } = useLang();
  const { literature } = t;

  const blocks = [
    { key: 'idps', data: literature.idps, icon: Shield },
    { key: 'gap', data: literature.gap, icon: FileSearch },
  ];

  return (
    <Section id="literature" title={tr(lang, literature.title)} subtitle={tr(lang, literature.subtitle)}>
      <div className="space-y-6">
        {blocks.map(({ key, data, icon: Icon }, idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300 ring-1 ring-cyan-400/20">
                <Icon size={22} />
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-400/80">
                  <BookOpen size={14} />
                  <span>{data.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-white md:text-2xl">{tr(lang, data.title)}</h3>
              </div>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              {data.paragraphs.map((p, i) => (
                <p key={i} className="text-sm md:text-base">
                  {tr(lang, p)}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

