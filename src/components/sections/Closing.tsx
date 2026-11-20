import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

export default function Closing() {
  const { lang } = useLang();
  const go = () => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-cyan-950/20 to-slate-950" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">{tr(lang, t.closing.title)}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">{tr(lang, t.closing.subtitle)}</p>
        <button onClick={go} className="mt-10 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400">
          {tr(lang, t.closing.cta)} <ArrowRight size={18} className={lang==='ar'?'rotate-180':''} />
        </button>
      </motion.div>
    </section>
  );
}
