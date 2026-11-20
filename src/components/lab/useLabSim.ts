import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addEdge, applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange } from '@xyflow/react';
import { DeviceKind, DeviceStatus, LogEntry, LogLevel, ScenarioId } from '../../types';

export interface DevData extends Record<string, unknown> {
  kind: DeviceKind;
  label: string;
  status: DeviceStatus;
  [key: string]: unknown;
}
export type DevNode = Node<DevData>;
export type DevEdge = Edge & { data?: { status?: 'up' | 'down' | 'suspicious' } };

let idc = 1;
const nid = (p: string) => `${p}-${idc++}`;
const now = () => {
  const d = new Date();
  return d.toLocaleTimeString('en-GB', { hour12: false });
};

const kindLabel: Record<DeviceKind, string> = {
  router: 'Router', switch: 'Switch', firewall: 'Firewall', server: 'Server', client: 'Client PC', database: 'DB Server', accessPoint: 'Access Point'
};

function makeNode(kind: DeviceKind, x: number, y: number, label?: string): DevNode {
  const id = nid(kind.slice(0,2));
  return { id, type: 'device', position: { x, y }, data: { kind, label: label || `${kindLabel[kind]} ${id.split('-')[1]}`, status: 'operational' } };
}

function initialTopology() {
  idc = 1;
  const r = makeNode('router', 400, 40, 'Router R1');
  const fw = makeNode('firewall', 400, 160, 'Firewall FW1');
  const sw = makeNode('switch', 400, 280, 'Switch SW1');
  const s1 = makeNode('server', 200, 420, 'Server S1');
  const db = makeNode('database', 400, 420, 'DB Server DB1');
  const c1 = makeNode('client', 600, 420, 'Client PC1');
  const ap = makeNode('accessPoint', 650, 280, 'Access Point AP1');
  const nodes = [r, fw, sw, s1, db, c1, ap];
  const e = (a: string, b: string): DevEdge => ({ id: `e-${a}-${b}`, source: a, target: b, animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 }, data: { status: 'up' } });
  const edges = [e(r.id, fw.id), e(fw.id, sw.id), e(sw.id, s1.id), e(sw.id, db.id), e(sw.id, c1.id), e(sw.id, ap.id)];
  return { nodes, edges };
}

export function useLabSim() {
  const init = useMemo(() => initialTopology(), []);
  const [nodes, setNodes] = useState<DevNode[]>(init.nodes);
  const [edges, setEdges] = useState<DevEdge[]>(init.edges);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeIncidents, setActiveIncidents] = useState(0);
  const [recoveryEvents, setRecoveryEvents] = useState(0);
  const [traffic, setTraffic] = useState(20);
  const [scenario, setScenario] = useState<ScenarioId>(null);
  const [scenarioStep, setScenarioStep] = useState(0);
  const [scenarioResult, setScenarioResult] = useState<string | null>(null);
  const [chart, setChart] = useState<{ t: string; health: number; traffic: number }[]>([]);
  const timers = useRef<number[]>([]);
  const tickRef = useRef<number | null>(null);

  const clearTimers = () => { timers.current.forEach(t => window.clearTimeout(t)); timers.current = []; };

  const log = useCallback((level: LogLevel, message: string) => {
    setLogs(l => [{ id: `${Date.now()}-${Math.random()}`, time: now(), level, message }, ...l].slice(0, 200));
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const t = window.setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  const setNodeStatus = useCallback((id: string, status: DeviceStatus) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, data: { ...n.data, status } } : n));
  }, []);
  const setEdgeByNode = useCallback((nodeId: string, status: 'up' | 'down' | 'suspicious') => {
    setEdges(es => es.map(e => (e.source === nodeId || e.target === nodeId) ? { ...e, data: { status }, animated: status !== 'down', style: { stroke: status === 'down' ? '#f87171' : status === 'suspicious' ? '#f59e0b' : '#22d3ee', strokeWidth: 2 } } : e));
  }, []);

  const failedCount = nodes.filter(n => n.data.status === 'failed' || n.data.status === 'isolated').length;
  const activeCount = nodes.filter(n => n.data.status === 'operational' || n.data.status === 'warning' || n.data.status === 'recovering').length;
  const health = nodes.length ? Math.max(0, Math.round(((nodes.length - failedCount) / nodes.length) * 100)) : 100;

  useEffect(() => {
    if (!running || paused) return;
    tickRef.current = window.setInterval(() => {
      setTraffic(tr => Math.max(5, Math.min(95, tr + (Math.random() * 10 - 5))));
      setChart(c => [...c, { t: now(), health: Math.max(0, Math.round(((nodes.length - nodes.filter(n=>n.data.status==='failed'||n.data.status==='isolated').length) / Math.max(1,nodes.length)) * 100)), traffic: Math.round(20 + Math.random()*40) }].slice(-20));
    }, 2000);
    return () => { if (tickRef.current) window.clearInterval(tickRef.current); };
  }, [running, paused, nodes]);

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes(ns => applyNodeChanges(changes, ns) as DevNode[]), []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges(es => applyEdgeChanges(changes, es) as DevEdge[]), []);
  const onConnect = useCallback((conn: Connection) => setEdges(es => addEdge({ ...conn, animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 }, data: { status: 'up' } }, es) as DevEdge[]), []);

  const addDevice = (kind: DeviceKind) => {
    const n = makeNode(kind, 120 + Math.random()*500, 80 + Math.random()*320);
    setNodes(ns => [...ns, n]);
    log('info', `Device added: ${n.data.label} (${kindLabel[kind]}).`);
  };
  const removeSelected = () => {
    if (!selectedId) return;
    setNodes(ns => ns.filter(n => n.id !== selectedId));
    setEdges(es => es.filter(e => e.source !== selectedId && e.target !== selectedId));
    log('warning', `Device removed: ${selectedId}.`);
    setSelectedId(null);
  };

  const startSim = () => {
    if (!running) {
      setRunning(true); setPaused(false);
      log('info', 'Network simulation started.');
      nodes.forEach(n => log('info', `${n.data.label} operational.`));
    } else {
      setPaused(false);
      log('info', 'Simulation resumed.');
    }
  };
  const pauseSim = () => { setPaused(true); clearTimers(); log('warning', 'Simulation paused.'); };
  const resetSim = () => {
    clearTimers();
    if (tickRef.current) window.clearInterval(tickRef.current);
    const fresh = initialTopology();
    setNodes(fresh.nodes); setEdges(fresh.edges);
    setSelectedId(null); setRunning(false); setPaused(false);
    setLogs([]); setActiveIncidents(0); setRecoveryEvents(0); setTraffic(20);
    setScenario(null); setScenarioStep(0); setScenarioResult(null); setChart([]);
  };

  const findByKind = (kind: DeviceKind) => nodes.find(n => n.data.kind === kind);

  const runSelfHealing = (targetId: string, label: string, kind: 'failure' | 'security', onDone?: () => void) => {
    setActiveIncidents(x => x + 1);
    setScenarioStep(1);
    schedule(() => { log('warning', `Abnormal condition detected on ${label}.`); setScenarioStep(2); }, 700);
    schedule(() => { log('info', `Analyzing collected information for ${label}...`); setScenarioStep(3); }, 1600);
    schedule(() => { log(kind === 'security' ? 'error' : 'warning', `Incident classified: ${kind === 'security' ? 'Suspicious traffic / security incident' : 'Network failure'}.`); setScenarioStep(4); }, 2600);
    schedule(() => { log('info', 'Decision engine selecting an appropriate predefined response...'); setScenarioStep(5); }, 3400);
    schedule(() => {
      log('info', kind === 'security' ? 'Simulated isolation/blocking action initiated.' : 'Simulated recovery action initiated.');
      setNodeStatus(targetId, kind === 'security' ? 'isolated' : 'recovering');
      setScenarioStep(6);
    }, 4300);
    schedule(() => {
      if (kind === 'security') {
        log('success', `Security response applied. ${label} isolated (simulated).`);
        setEdgeByNode(targetId, 'up');
      } else {
        setNodeStatus(targetId, 'operational');
        setEdgeByNode(targetId, 'up');
        log('success', `Connectivity restored for ${label}.`);
        setRecoveryEvents(x => x + 1);
      }
      log('info', 'System verification completed. Event recorded.');
      setActiveIncidents(x => Math.max(0, x - 1));
      setScenarioStep(7);
      if (onDone) onDone();
    }, 5600);
  };

  const ensureRunning = () => { if (!running) { setRunning(true); setPaused(false); log('info', 'Network simulation started.'); } };

  const simulateRouterFailure = () => {
    ensureRunning(); clearTimers(); setScenario('router_failure'); setScenarioResult(null); setScenarioStep(0);
    const r = findByKind('router') || nodes[0]; if (!r) return;
    log('error', `Router ${r.data.label} failure simulated.`);
    setNodeStatus(r.id, 'failed'); setEdgeByNode(r.id, 'down');
    runSelfHealing(r.id, r.data.label, 'failure', () => setScenarioResult('Router failure detected and simulated recovery workflow completed.'));
  };
  const simulateServerDown = () => {
    ensureRunning(); clearTimers(); setScenario('server_failure'); setScenarioResult(null); setScenarioStep(0);
    const s = nodes.find(n=>n.data.kind==='server') || nodes[0]; if (!s) return;
    log('error', `${s.data.label} connection lost (server unreachable).`);
    setNodeStatus(s.id, 'failed'); setEdgeByNode(s.id, 'down');
    runSelfHealing(s.id, s.data.label, 'failure', () => setScenarioResult('Server unreachable incident handled and connectivity restored (simulated).'));
  };
  const simulateConnectionLoss = () => {
    ensureRunning(); clearTimers(); setScenario(null); setScenarioResult(null); setScenarioStep(0);
    const sw = nodes.find(n=>n.data.kind==='switch') || nodes[0]; if (!sw) return;
    log('error', `Connection loss detected near ${sw.data.label}.`);
    setEdgeByNode(sw.id, 'down'); setNodeStatus(sw.id, 'warning');
    runSelfHealing(sw.id, sw.data.label, 'failure', () => setScenarioResult('Connection loss handled (simulated).'));
  };
  const simulateSuspicious = () => {
    ensureRunning(); clearTimers(); setScenario('suspicious_traffic'); setScenarioResult(null); setScenarioStep(0);
    const target = nodes.find(n=>n.data.kind==='client' || n.data.kind==='server') || nodes[0]; if (!target) return;
    log('error', `Unusual traffic activity observed involving ${target.data.label}.`);
    setTraffic(90);
    setNodeStatus(target.id, 'warning'); setEdgeByNode(target.id, 'suspicious');
    runSelfHealing(target.id, target.data.label, 'security', () => { setTraffic(35); setScenarioResult('Suspicious traffic detected, classified, and simulated isolation applied.'); });
  };
  const runNormal = () => {
    ensureRunning(); clearTimers(); setScenario('normal'); setScenarioResult(null); setScenarioStep(0);
    nodes.forEach(n => { setNodeStatus(n.id, 'operational'); setEdgeByNode(n.id, 'up'); });
    log('success', 'Normal network scenario: all monitored devices operational.');
    setScenarioStep(7); setScenarioResult('Network operating normally. No incidents detected.');
  };

  const runScenario = (id: ScenarioId) => {
    resetSim();
    window.setTimeout(() => {
      if (id === 'normal') runNormal();
      else if (id === 'router_failure') simulateRouterFailure();
      else if (id === 'server_failure') simulateServerDown();
      else if (id === 'suspicious_traffic') simulateSuspicious();
    }, 200);
  };

  return {
    nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect,
    selectedId, setSelectedId, running, paused, logs, activeIncidents, recoveryEvents, traffic, health,
    total: nodes.length, activeCount, failedCount, chart,
    scenario, scenarioStep, scenarioResult,
    addDevice, removeSelected, startSim, pauseSim, resetSim,
    simulateRouterFailure, simulateServerDown, simulateSuspicious, simulateConnectionLoss, runNormal, runScenario
  };
}
