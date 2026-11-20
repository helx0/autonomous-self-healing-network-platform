import React from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import { LogEntry } from '../../types';
import { useLang } from '../../context/LangContext';

const meta = {
  info: { icon: Info, cls: 'text-cyan-300 border-cyan-500/20 bg-cyan-950/20' },
  warning: { icon: AlertTriangle, cls: 'text-amber-300 border-amber-500/20 bg-amber-950/20' },
  error: { icon: XCircle, cls: 'text-red-300 border-red-500/20 bg-red-950/20' },
  success: { icon: CheckCircle2, cls: 'text-emerald-300 border-emerald-500/20 bg-emerald-950/20' },
};

export default function LabLogs({ logs }: { logs: LogEntry[] }) {
  const { lang } = useLang();
  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">{lang==='en'?'Event Logs':'سجل الأحداث'}</h3>
      <div className="h-64 space-y-2 overflow-auto pr-1">
        {logs.length === 0 && <div className="text-sm text-slate-500">{lang==='en'?'No events yet. Start the simulation.':'لا توجد أحداث بعد. ابدأ المحاكاة.'}</div>}
        {logs.map(l => {
          const m = meta[l.level];
          const I = m.icon;
          return (
            <div key={l.id} className={`flex items-start gap-2 rounded-lg border p-2 text-xs ${m.cls}`}>
              <I size={14} className="mt-0.5 shrink-0" />
              <span className="font-mono text-slate-400">[{l.time}]</span>
              <span className="text-slate-100">{l.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
