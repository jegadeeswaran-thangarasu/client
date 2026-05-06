import type { DashboardStats } from '@/types/dashboard.types';

export const DASHBOARD_STATS_MOCK: DashboardStats = {
  totalServers: 1284,
  totalServersSubtitle: 'Blade + Rack',
  totalServersBadge: 'Active',
  ucsDomains: 18,
  ucsDomainsSubtitle: 'Across 4 data centers',
  ucsDomainsBadge: 'All Healthy',
  chassisSlotsUsedPercent: 74,
  chassisSlotsSubtitle: '943 / 1,272 slots',
  chassisSlotsBadge: 'Moderate',
  chassisSlotsBadgeVariant: 'yellow',
  pendingUpgrades: 23,
  pendingUpgradesSubtitle: '12 Critical · 11 High',
  pendingUpgradesBadge: 'Action needed',
  avgCpuUtilization: 61,
  avgCpuSubtitle: 'Cluster average',
  avgCpuBadge: 'Watch',
  avgCpuBadgeVariant: 'yellow',
  smartNetExpiring: 47,
  smartNetSubtitle: 'Within 90 days',
  smartNetBadge: 'Urgent',
};
