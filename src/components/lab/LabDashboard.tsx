import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Server, AlertTriangle, HeartPulse, Gauge, RotateCcw } from 'lucide-react';
import { useLang } from '../../context/LangContext';

interface Props {
  total: number; active: number; failed: number; incidents: number; health: number; traffic: number; recoveries: number;
  chart: { t: string; health: number; traffic: number }[];
}

export default function LabDashboard({ total, active, failed, incidents, health, traffic, recoveries, chart }: Props) {
  const { lang } = useLang();
  const cards = [
    { label: lang==='en'?'Total Devices':'إجمالي الأجهزة', v: total, icon: Server, c: 'text-cyan-300' },
    { label: lang==='en'?'Active Devices':'أجهزة نشطة', v: active, icon: Activity, c: 'text-emerald-300' },
    { label: lang==='en'?'Failed Devices':'أجهزة متعطلة', v: failed, icon: AlertTriangle, c: 'text-red-300' },
    { label: lang==='en'?'Active Incidents':'حوادث نشطة', v: incidents, icon: AlertTriangle, c: 'text-amber-300' },
    { label: lang==='en'?'Network Health':'صحة الشبكة', v: `${health}%`, icon: HeartPulse, c: health>70?'text-emerald-300':'text-amber-300' },
    { label: lang==='en'?'Simulated Traffic':'حركة محاكاة', v: `${Math.round(traffic)}%`, icon: Gauge, c: 'text-blue-300' },
    { label: lang==='en'?'Recovery Events':'أحداث الاستعادة', v: recoveries, icon: RotateCcw, c: 'text-purple-300' },
  ];
  const data = chart.length ? chart : [{ t: '--:--:--', health, traffic: Math.round(traffic) }];
  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">{lang==='en'?'Live Monitoring Dashboard':'لوحة المراقبة الحية'}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-center">
            <c.icon className={`mx-auto mb-1 h-4 w-4 ${c.c}`} />
            <div className="text-lg font-bold text-white">{c.v}</div>
            <div className="text-[10px] leading-tight text-slate-400">{c.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="ch" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient>
              <linearGradient id="ct" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a78bfa" stopOpacity={0.4}/><stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="t" tick={{fill:'#64748b', fontSize:10}} minTickGap={20} />
            <YAxis tick={{fill:'#64748b', fontSize:10}} domain={[0,100]} width={28} />
            <Tooltip contentStyle={{background:'#0f172a', border:'1px solid #334155', borderRadius:8, color:'#e2e8f0', fontSize:12}} />
            <Area type="monotone" dataKey="health" stroke="#22d3ee" fill="url(#ch)" name={lang==='en'?'Health %':'الصحة %'} />
            <Area type="monotone" dataKey="traffic" stroke="#a78bfa" fill="url(#ct)" name={lang==='en'?'Traffic %':'الحركة %'} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-[10px] text-slate-500">{lang==='en'?'Values update from simulation events (conceptual/simulated).':'القيم تتحدث من أحداث المحاكاة (تصورية/محاكاة).'}</p>
    </div>
  );
}
