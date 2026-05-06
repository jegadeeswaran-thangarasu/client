import type { DashboardStats, ClusterUtilization, RecentActivity } from '@/types/dashboard.types';
import type { ServerByLocation } from '@/types/serverSummary.types';
import { DASHBOARD_STATS_MOCK } from '@/mocks/dashboardStats.mock';
import { CLUSTER_UTILIZATION_MOCK } from '@/mocks/dashboardClusterUtilization.mock';
import { RECENT_ACTIVITY_MOCK } from '@/mocks/dashboardRecentActivity.mock';
import { SERVER_BY_LOCATION_MOCK } from '@/mocks/serverSummaryByLocation.mock';

// TODO: replace with apiClient.get('/dashboard/stats')
export function fetchDashboardStats(): Promise<DashboardStats> {
  return Promise.resolve(DASHBOARD_STATS_MOCK);
}

// TODO: replace with apiClient.get('/dashboard/clusters')
export function fetchClusterUtilization(): Promise<ClusterUtilization[]> {
  return Promise.resolve(CLUSTER_UTILIZATION_MOCK);
}

// TODO: replace with apiClient.get('/dashboard/activity')
export function fetchRecentActivity(): Promise<RecentActivity[]> {
  return Promise.resolve(RECENT_ACTIVITY_MOCK);
}

// TODO: replace with apiClient.get('/dashboard/servers-by-location')
export function fetchDashboardServersByLocation(): Promise<ServerByLocation[]> {
  return Promise.resolve(SERVER_BY_LOCATION_MOCK);
}
