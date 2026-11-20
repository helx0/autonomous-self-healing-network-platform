import React from 'react';
import Section from '../shared/Section';
import { motion } from 'framer-motion';
import { ShieldCheck, Network, AlertTriangle, Zap, Brain } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

export default function Introduction() {
  const { lang } = useLang();
  const cards = [
    { icon: ShieldCheck, title: t.intro.what, desc: t.intro.whatDesc, color: 'text-cyan-400' },
    { icon: Network, title: t.intro.whyHard, desc: t.intro.whyHardDesc, color: 'text-blue-400' },
    { icon: AlertTriangle, title: t.intro.failures, desc: t.intro.failuresDesc, color: 'text-amber-400' },
    { icon: Zap, title: t.intro.automation, desc: t.intro.automationDesc, color: 'text-purple-400' },
    { icon: Brain, title: t.intro.intelligent, desc: t.intro.intelligentDesc, color: 'text-emerald-400' },
  ];
  return (
    <Section id="introduction" title={tr(lang, t.intro.title)}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className={`glass rounded-2xl p-6 ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
            <c.icon className={`mb-4 h-8 w-8 ${c.color}`} />
            <h3 className="mb-2 text-lg font-semibold text-white">{tr(lang, c.title)}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{tr(lang, c.desc)}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 glass rounded-2xl p-6">
        <h4 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-cyan-300">{lang === 'en' ? 'Manual vs. Self-Healing (Conceptual)' : 'يدوي مقابل ذاتي الإصلاح (تصوري)'}</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-4">
            <div className="mb-2 font-semibold text-red-300">{lang === 'en' ? 'Manual' : 'يدوي'}</div>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• {lang === 'en' ? 'Human detects issue' : 'اكتشاف بشري للمشكلة'}</li>
              <li>• {lang === 'en' ? 'Troubleshoot & diagnose' : 'استكشاف وتشخيص'}</li>
              <li>• {lang === 'en' ? 'Apply fix manually' : 'تطبيق الإصلاح يدوياً'}</li>
              <li>• {lang === 'en' ? 'Longer recovery window' : 'نافذة استعادة أطول'}</li>
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
            <div className="mb-2 font-semibold text-emerald-300">{lang === 'en' ? 'Self-Healing (Proposed)' : 'ذاتي الإصلاح (مقترح)'}</div>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• {lang === 'en' ? 'Continuous monitoring' : 'مراقبة مستمرة'}</li>
              <li>• {lang === 'en' ? 'Detect & classify incident' : 'اكتشاف وتصنيف الحادثة'}</li>
              <li>• {lang === 'en' ? 'Execute predefined response' : 'تنفيذ استجابة محددة مسبقاً'}</li>
              <li>• {lang === 'en' ? 'Verify & log outcome' : 'تحقق وتسجيل النتيجة'}</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
