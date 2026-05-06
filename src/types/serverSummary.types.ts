export interface ServerSummaryStats {
  totalServers: number;
  bladeServers: number;
  bladePercent: number;
  rackServers: number;
  rackPercent: number;
  inMaintenance: number;
  maintenancePercent: number;
  unassignedServers: number;
  unassignedPercent: number;
}

export interface ServerByLocation {
  location: string;
  blade: number;
  rack: number;
  total: number;
  maintenance: number;
  healthPercent: number;
}

export interface ServerByDomain {
  domain: string;
  location: string;
  servers: number;
  clusters: number;
  status: 'Healthy' | 'Warning' | 'Maintenance';
}

export interface ServerByType {
  modelFamily: string;
  type: 'Blade' | 'Rack' | 'Blade (X-Series)';
  count: number;
  avgCpuCores: number;
  avgMemoryGB: number;
  location: string;
}

export interface ServerAssigned {
  modelFamily: string;
  type: 'Blade' | 'Rack' | 'Blade (X-Series)';
  location: string;
  total: number;
  assigned: number;
  unassigned: number;
  assignedPercent: number;
}
