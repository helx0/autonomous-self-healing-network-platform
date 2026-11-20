import React, { useState } from 'react';
import Section from '../shared/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

const layout = [
  { id: 'infra', x: 50, y: 8 },
  { id: 'mon', x: 20, y: 28 },
  { id: 'collect', x: 50, y: 28 },
  { id: 'detect', x: 80, y: 28 },
  { id: 'classify', x: 20, y: 52 },
  { id: 'decision', x: 50, y: 52 },
  { id: 'response', x: 80, y: 52 },
  { id: 'recover', x: 50, y: 75 },
  { id: 'dash', x: 50, y: 93 },
];
const links: [string,string][] = [['infra','mon'],['mon','collect'],['collect','detect'],['detect','classify'],['classify','decision'],['decision','response'],['response','recover'],['recover','dash'],['dash','mon'],['infra','collect']];

export default function Architecture() {
  const { lang } = useLang();
  const [sel, setSel] = useState<string>('infra');
  const selected = t.arch.components.find(c => c.id === sel)!;
  const get = (id: string) => layout.find(l=>l.id===id)!;

  return (
    <Section id="architecture" title={tr(lang, t.arch.title)} subtitle={tr(lang, t.arch.hint)}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-4 lg:col-span-2">
          <svg viewBox="0 0 100 100" className="h-[420px] w-full md:h-[520px]">
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L6,3 L0,6 z" fill="#22d3ee" />
              </marker>
            </defs>
            {links.map(([a,b],i)=>{
              const A=get(a), B=get(b);
              return (
                <g key={i}>
                  <line x1={A.x} y1={A.y+3} x2={B.x} y2={B.y-3} stroke="#334155" strokeWidth="0.6" markerEnd="url(#arrow)" />
                  <line x1={A.x} y1={A.y+3} x2={B.x} y2={B.y-3} stroke="#22d3ee" strokeWidth="0.7" strokeDasharray="2 3" className="animate-dash" style={{animationDuration:`${2.5+(i%3)*0.7}s`}} markerEnd="url(#arrow)" opacity="0.7" />
                </g>
              );
            })}
            {layout.map((n)=>{
              const c = t.arch.components.find(x=>x.id===n.id)!;
              const active = sel===n.id;
              return (
                <g key={n.id} onClick={()=>setSel(n.id)} className="cursor-pointer">
                  <rect x={n.x-14} y={n.y-4.5} width="28" height="9" rx="2.5" fill={active? '#083344':'#0f172a'} stroke={active? '#22d3ee':'#334155'} strokeWidth={active?0.8:0.5} />
                  {active && <rect x={n.x-14.5} y={n.y-5} width="29" height="10" rx="3" fill="none" stroke="#22d3ee" strokeOpacity="0.4" className="pulse-ring" />}
                  <text x={n.x} y={n.y+0.8} textAnchor="middle" fontSize="2.6" fill={active?'#cffafe':'#cbd5e1'} style={{pointerEvents:'none'}}>
                    {tr(lang,c).length>26 ? tr(lang,c).slice(0,24)+'…' : tr(lang,c)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="glass rounded-2xl p-6">
          <AnimatePresence mode="wait">
            <motion.div key={sel} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}}>
              <h3 className="text-xl font-semibold text-cyan-300">{tr(lang, selected)}</h3>
              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <div className="mb-1 font-semibold text-slate-200">{lang==='en'?'Responsibilities':'المسؤوليات'}</div>
                  <p className="text-slate-400">{tr(lang, selected.resp)}</p>
                </div>
                <div>
                  <div className="mb-1 font-semibold text-slate-200">{lang==='en'?'Input':'المدخلات'}</div>
                  <p className="text-slate-400">{tr(lang, selected.input)}</p>
                </div>
                <div>
                  <div className="mb-1 font-semibold text-slate-200">{lang==='en'?'Output':'المخرجات'}</div>
                  <p className="text-slate-400">{tr(lang, selected.output)}</p>
                </div>
                <div className="rounded-lg border border-slate-700/60 bg-slate-900/60 p-3 text-slate-400">
                  {lang==='en'?'Relationship: interacts with adjacent layers via logical data flow (monitoring → analysis → decision → response → verification → dashboard).':'العلاقة: يتفاعل مع الطبقات المجاورة عبر تدفق بيانات منطقي (مراقبة ← تحليل ← قرار ← استجابة ← تحقق ← لوحة).'}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
