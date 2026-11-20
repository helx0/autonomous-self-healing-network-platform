export type Lang = 'en' | 'ar';

export type LogLevel = 'info' | 'warning' | 'error' | 'success';

export interface LogEntry {
  id: string;
  time: string;
  level: LogLevel;
  message: string;
}

export type DeviceKind = 'router' | 'switch' | 'firewall' | 'server' | 'client' | 'database' | 'accessPoint';
export type DeviceStatus = 'operational' | 'warning' | 'failed' | 'isolated' | 'recovering';

export interface SimDevice {
  id: string;
  kind: DeviceKind;
  label: string;
  status: DeviceStatus;
  x: number;
  y: number;
}

export interface SimEdge {
  id: string;
  source: string;
  target: string;
  status: 'up' | 'down' | 'suspicious';
}

export type ScenarioId = 'normal' | 'router_failure' | 'server_failure' | 'suspicious_traffic' | null;
