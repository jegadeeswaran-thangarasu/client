export interface DashboardStats {
  totalServers: number;
  totalServersSubtitle: string;
  totalServersBadge: string;
  ucsDomains: number;
  ucsDomainsSubtitle: string;
  ucsDomainsBadge: string;
  chassisSlotsUsedPercent: number;
  chassisSlotsSubtitle: string;
  chassisSlotsBadge: string;
  chassisSlotsBadgeVariant: string;
  pendingUpgrades: number;
  pendingUpgradesSubtitle: string;
  pendingUpgradesBadge: string;
  avgCpuUtilization: number;
  avgCpuSubtitle: string;
  avgCpuBadge: string;
  avgCpuBadgeVariant: string;
  smartNetExpiring: number;
  smartNetSubtitle: string;
  smartNetBadge: string;
}

export interface ClusterUtilization {
  cluster: string;
  location: string;
  domain: string;
  vms: number;
  cpuUtil: number;
  memoryUtil: number;
  storageUtil: number;
  health: 'Critical' | 'Healthy' | 'Warning';
}

export interface RecentActivity {
  id: string;
  timestamp: string;
  type: string;
  vmServer: string;
  change: string;
  requester: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}
