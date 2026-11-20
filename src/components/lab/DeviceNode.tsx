import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Router, Network, Shield, Server, Monitor, Database, Wifi } from 'lucide-react';
import { DevData } from './useLabSim';

const icons = { router: Router, switch: Network, firewall: Shield, server: Server, client: Monitor, database: Database, accessPoint: Wifi };

function DeviceNode({ data, selected }: NodeProps) {
  const d = data as unknown as DevData;
  const Icon = icons[d.kind] || Server;
  const color = d.status === 'operational' ? 'border-cyan-400/60 text-cyan-300' : d.status === 'warning' ? 'border-amber-400/70 text-amber-300' : d.status === 'failed' ? 'border-red-500/70 text-red-300' : d.status === 'isolated' ? 'border-orange-500/70 text-orange-300' : 'border-blue-400/70 text-blue-300';
  const glow = d.status === 'operational' ? 'shadow-cyan-500/10' : d.status === 'failed' ? 'shadow-red-500/20 glow-red' : d.status === 'warning' || d.status === 'isolated' ? 'shadow-amber-500/20' : 'shadow-blue-500/20';
  const dot = d.status === 'operational' ? 'bg-emerald-400' : d.status === 'warning' ? 'bg-amber-400' : d.status === 'failed' ? 'bg-red-500' : d.status === 'isolated' ? 'bg-orange-500' : 'bg-blue-400';
  return (
    <div className={`relative min-w-[120px] rounded-xl border bg-slate-900/90 px-3 py-2 shadow-lg backdrop-blur ${color} ${glow} ${selected ? 'ring-2 ring-cyan-400/60' : ''}`}>
      <Handle type="target" position={Position.Top} className="!h-2.5 !w-2.5 !border-slate-900 !bg-cyan-400" />
      <div className="flex items-center gap-2">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80">
          <Icon size={16} />
          <span className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ${dot} ring-2 ring-slate-900`} />
        </span>
        <div className="leading-tight">
          <div className="text-[11px] font-semibold text-slate-100">{d.label}</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-400">{d.status}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!h-2.5 !w-2.5 !border-slate-900 !bg-cyan-400" />
    </div>
  );
}

export default memo(DeviceNode);
