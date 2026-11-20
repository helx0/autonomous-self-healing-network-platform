import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import { Play, Pause, RotateCcw, Plus, Trash2, Router, Network, Shield, Server, Monitor, Database, Wifi, AlertTriangle, Activity, Bug, Unplug, ShieldAlert } from 'lucide-react';
import Section from '../shared/Section';
import DeviceNode from './DeviceNode';
import LabDashboard from './LabDashboard';
import LabLogs from './LabLogs';
import { useLabSim } from './useLabSim';
import { useLang } from '../../context/LangContext';
import { tr, t } from '../../data/i18n';
import { DeviceKind } from '../../types';

const nodeTypes = { device: DeviceNode } as any;

const kinds: { kind: DeviceKind; label: string; icon: any }[] = [
  { kind: 'router', label: 'Router', icon: Router },
  { kind: 'switch', label: 'Switch', icon: Network },
  { kind: 'firewall', label: 'Firewall', icon: Shield },
  { kind: 'server', label: 'Server', icon: Server },
  { kind: 'client', label: 'Client PC', icon: Monitor },
  { kind: 'database', label: 'DB Server', icon: Database },
  { kind: 'accessPoint', label: 'Access Point', icon: Wifi },
];

const stepLabels = (lang: 'en'|'ar') => lang==='en'
  ? ['Idle','Detection','Analysis','Classification','Decision','Response','Recovery/Action','Verification']
  : ['خمول','اكتشاف','تحليل','تصنيف','قرار','استجابة','استعادة/إجراء','تحقق'];

export default function InteractiveLab() {
  const { lang } = useLang();
  const sim = useLabSim();
  const selected = sim.nodes.find(n => n.id === sim.selectedId);
  const steps = stepLabels(lang);

  const scenarioCards = [
    { id: 'normal' as const, title: lang==='en'?'Scenario 1: Normal Network':'السيناريو 1: شبكة طبيعية', desc: lang==='en'?'Demonstrate normal network operation.':'إظهار التشغيل الطبيعي للشبكة.', icon: Activity },
    { id: 'router_failure' as const, title: lang==='en'?'Scenario 2: Router Failure':'السيناريو 2: عطل الموجه', desc: lang==='en'?'Simulate a router failure and show detection and recovery workflow.':'محاكاة عطل موجه وإظهار سير عمل الاكتشاف والاستعادة.', icon: AlertTriangle },
    { id: 'server_failure' as const, title: lang==='en'?'Scenario 3: Server Failure':'السيناريو 3: عطل الخادم', desc: lang==='en'?'Simulate an unreachable server and demonstrate the framework response.':'محاكاة خادم غير متاح وإظهار استجابة الإطار.', icon: Server },
    { id: 'suspicious_traffic' as const, title: lang==='en'?'Scenario 4: Suspicious Traffic':'السيناريو 4: حركة مشبوهة', desc: lang==='en'?'Simulate abnormal traffic and demonstrate the security response.':'محاكاة حركة غير طبيعية وإظهار الاستجابة الأمنية.', icon: ShieldAlert },
  ];

  return (
    <Section id="lab" title={tr(lang, t.lab.title)} subtitle={tr(lang, t.lab.disclaimer)} className="bg-slate-950/50">
      {/* Controls & topology */}
      <div className="grid gap-6 xl:grid-cols-4">
        <div className="space-y-4 xl:col-span-1">
          <div className="glass rounded-2xl p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">{tr(lang, t.lab.addDevice)}</h3>
            <div className="grid grid-cols-2 gap-2">
              {kinds.map(k => (
                <button key={k.kind} onClick={() => sim.addDevice(k.kind)} className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-2 py-2 text-xs text-slate-200 hover:border-cyan-500/40 hover:text-cyan-300">
                  <k.icon size={14} /> <span className="truncate">{lang==='en'?k.label:({router:'موجه',switch:'مبدل',firewall:'جدار ناري',server:'خادم',client:'عميل',database:'قاعدة بيانات',accessPoint:'نقطة وصول'} as any)[k.kind]}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-500">{lang==='en'?'Drag to move, drag handles to connect, select and remove.':'اسحب للتحريك، صِل المقابض للربط، حدّد للحذف.'}</p>
          </div>

          <div className="glass rounded-2xl p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">{tr(lang, t.lab.controls)}</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={sim.startSim} className="flex items-center justify-center gap-1 rounded-lg bg-emerald-600/80 px-2 py-2 text-xs font-semibold text-white hover:bg-emerald-500"><Play size={14}/> {lang==='en'?'Start':'بدء'}</button>
              <button onClick={sim.pauseSim} className="flex items-center justify-center gap-1 rounded-lg bg-amber-600/80 px-2 py-2 text-xs font-semibold text-white hover:bg-amber-500"><Pause size={14}/> {lang==='en'?'Pause':'إيقاف مؤقت'}</button>
              <button onClick={sim.resetSim} className="col-span-2 flex items-center justify-center gap-1 rounded-lg bg-slate-700 px-2 py-2 text-xs font-semibold text-white hover:bg-slate-600"><RotateCcw size={14}/> {lang==='en'?'Reset Simulation':'إعادة الضبط'}</button>
              <button onClick={sim.runNormal} className="col-span-2 flex items-center justify-center gap-1 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-2 py-2 text-xs text-cyan-200 hover:bg-cyan-900/40"><Activity size={14}/> {lang==='en'?'Run Normal Scenario':'تشغيل سيناريو طبيعي'}</button>
              <button onClick={sim.simulateRouterFailure} className="flex items-center justify-center gap-1 rounded-lg border border-red-500/40 bg-red-950/30 px-2 py-2 text-xs text-red-200 hover:bg-red-900/40"><AlertTriangle size={14}/> {lang==='en'?'Network Failure':'عطل شبكة'}</button>
              <button onClick={sim.simulateServerDown} className="flex items-center justify-center gap-1 rounded-lg border border-red-500/40 bg-red-950/30 px-2 py-2 text-xs text-red-200 hover:bg-red-900/40"><Server size={14}/> {lang==='en'?'Server Down':'تعطل خادم'}</button>
              <button onClick={sim.simulateSuspicious} className="flex items-center justify-center gap-1 rounded-lg border border-amber-500/40 bg-amber-950/30 px-2 py-2 text-xs text-amber-200 hover:bg-amber-900/40"><Bug size={14}/> {lang==='en'?'Suspicious Traffic':'حركة مشبوهة'}</button>
              <button onClick={sim.simulateConnectionLoss} className="flex items-center justify-center gap-1 rounded-lg border border-orange-500/40 bg-orange-950/30 px-2 py-2 text-xs text-orange-200 hover:bg-orange-900/40"><Unplug size={14}/> {lang==='en'?'Connection Loss':'فقدان اتصال'}</button>
            </div>
            <div className="mt-3 text-xs text-slate-400">
              {lang==='en'?'Status:':'الحالة:'} <span className={sim.running ? (sim.paused?'text-amber-300':'text-emerald-300') : 'text-slate-400'}>{!sim.running ? (lang==='en'?'Stopped':'متوقف') : sim.paused ? (lang==='en'?'Paused':'موقوف مؤقتاً') : (lang==='en'?'Running':'يعمل')}</span>
            </div>
          </div>

          <div className="glass rounded-2xl p-4">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-300">{lang==='en'?'Device Inspector':'فاحص الأجهزة'}</h3>
            {selected ? (
              <div className="space-y-2 text-sm">
                <div><span className="text-slate-400">{lang==='en'?'Name':'الاسم'}:</span> <span className="text-slate-100">{selected.data.label}</span></div>
                <div><span className="text-slate-400">{lang==='en'?'Type':'النوع'}:</span> <span className="text-slate-100">{selected.data.kind}</span></div>
                <div><span className="text-slate-400">{lang==='en'?'Status':'الحالة'}:</span> <span className={selected.data.status==='operational'?'text-emerald-300':selected.data.status==='failed'?'text-red-300':'text-amber-300'}>{selected.data.status}</span></div>
                <div><span className="text-slate-400">ID:</span> <span className="text-slate-100 font-mono text-xs">{selected.id}</span></div>
                <button onClick={sim.removeSelected} className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-red-500/40 bg-red-950/30 px-2 py-2 text-xs text-red-200 hover:bg-red-900/40"><Trash2 size={14}/> {lang==='en'?'Remove Device':'إزالة الجهاز'}</button>
              </div>
            ) : <p className="text-sm text-slate-500">{lang==='en'?'Select a device on the canvas to inspect its properties.':'اختر جهازاً من مساحة العمل لعرض خصائصه.'}</p>}
          </div>
        </div>

        <div className="xl:col-span-3 space-y-4">
          <div className="glass rounded-2xl p-2">
            <div className="h-[420px] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 md:h-[520px]">
              <ReactFlow
                nodes={sim.nodes}
                edges={sim.edges as any}
                onNodesChange={sim.onNodesChange}
                onEdgesChange={sim.onEdgesChange}
                onConnect={sim.onConnect}
                onNodeClick={(_, n) => sim.setSelectedId(n.id)}
                onPaneClick={() => sim.setSelectedId(null)}
                nodeTypes={nodeTypes}
                fitView
                proOptions={{ hideAttribution: true }}
              >
                <Background color="#1e293b" gap={20} />
                <MiniMap nodeColor={(n: any) => n.data?.status === 'failed' ? '#f87171' : n.data?.status === 'warning' ? '#f59e0b' : '#22d3ee'} maskColor="rgba(2,6,23,0.7)" />
                <Controls />
                <Panel position="top-right" className="rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 ring-1 ring-slate-700">
                  {lang==='en'?'Interactive Topology — add, move, connect, inspect':'طوبولوجيا تفاعلية — أضف، حرّك، صِل، افحص'}
                </Panel>
              </ReactFlow>
            </div>
          </div>

          <LabDashboard total={sim.total} active={sim.activeCount} failed={sim.failedCount} incidents={sim.activeIncidents} health={sim.health} traffic={sim.traffic} recoveries={sim.recoveryEvents} chart={sim.chart} />
        </div>
      </div>

      {/* Scenarios & logs */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-4">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-300">{tr(lang, t.lab.scenarios)}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {scenarioCards.map(sc => (
              <div key={sc.id} className={`rounded-xl border p-4 ${sim.scenario===sc.id ? 'border-cyan-500/50 bg-cyan-950/20' : 'border-slate-800 bg-slate-900/50'}`}>
                <div className="mb-2 flex items-center gap-2 text-slate-100"><sc.icon size={16} className="text-cyan-400" /><span className="text-sm font-semibold">{sc.title}</span></div>
                <p className="mb-3 text-xs text-slate-400">{sc.desc}</p>
                <div className="flex gap-2">
                  <button onClick={() => sim.runScenario(sc.id)} className="rounded-md bg-cyan-600/80 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-500">{lang==='en'?'Start':'بدء'}</button>
                  <button onClick={sim.resetSim} className="rounded-md bg-slate-700 px-3 py-1.5 text-xs text-white hover:bg-slate-600">{lang==='en'?'Reset':'إعادة'}</button>
                </div>
                {sim.scenario === sc.id && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-slate-300">{lang==='en'?'Step-by-step progress:':'التقدم خطوة بخطوة:'}</div>
                    <div className="flex flex-wrap gap-1">
                      {steps.slice(1).map((s, i) => (
                        <span key={i} className={`rounded px-1.5 py-0.5 text-[10px] ${i < sim.scenarioStep ? 'bg-emerald-500/20 text-emerald-300' : i === sim.scenarioStep ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>{s}</span>
                      ))}
                    </div>
                    {sim.scenarioResult && <div className="rounded-md border border-emerald-500/30 bg-emerald-950/20 p-2 text-xs text-emerald-200">{lang==='en'?'Result: ':'النتيجة: '}{sim.scenarioResult}</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-900/60 p-3 text-xs text-slate-300">
            <span className="font-semibold text-cyan-300">{lang==='en'?'Self-healing workflow: ':'سير عمل الإصلاح الذاتي: '}</span>
            {lang==='en'?'Alert → Detection → Analysis → Classification → Decision → Simulated action → Recovery/Isolation → Verification → Log update. Network failure recovery and security incident response are handled as distinct scenarios.':'تنبيه ← اكتشاف ← تحليل ← تصنيف ← قرار ← إجراء محاكى ← استعادة/عزل ← تحقق ← تحديث السجل. يتم التمييز بين استعادة أعطال الشبكة والاستجابة للحوادث الأمنية.'}
          </div>
        </div>

        <LabLogs logs={sim.logs} />
      </div>
    </Section>
  );
}
