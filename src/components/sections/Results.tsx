import React from 'react';
import Section from '../shared/Section';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { t, tr } from '../../data/i18n';
import { useLang } from '../../context/LangContext';

export default function Results() {
  const { lang } = useLang();
  const data = t.results.dims.map(d => ({
    name: tr(lang, d),
    [tr(lang, t.results.traditional)]: d.t,
    [tr(lang, t.results.automated)]: d.a,
  }));
  return (
    <Section id="results" title={tr(lang, t.results.title)} subtitle={tr(lang, t.results.note)}>
      <div className="glass rounded-2xl p-4 md:p-6">
        <div className="h-[360px] w-full md:h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0,100]} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              <Bar dataKey={tr(lang, t.results.traditional)} fill="#64748b" radius={[4,4,0,0]} />
              <Bar dataKey={tr(lang, t.results.automated)} fill="#22d3ee" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-center text-xs text-amber-300/90">
          {lang==='en' ? '* Illustrative conceptual values only (simulated). Not measured experimental results.' : '* قيم توضيحية تصورية فقط (محاكاة). ليست نتائج تجريبية مقاسة.'}
        </p>
      </div>
    </Section>
  );
}
