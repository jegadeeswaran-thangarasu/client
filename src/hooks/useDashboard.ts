import { useQuery } from '@tanstack/react-query';
import type { DashboardStats, ClusterUtilization, RecentActivity } from '@/types/dashboard.types';
import type { ServerByLocation } from '@/types/serverSummary.types';
import {
  fetchDashboardStats,
  fetchClusterUtilization,
  fetchRecentActivity,
  fetchDashboardServersByLocation,
} from '@/services/dashboard.service';

export const DASHBOARD_STATS_QUERY_KEY           = ['dashboardStats']        as const;
export const CLUSTER_UTILIZATION_QUERY_KEY       = ['clusterUtilization']    as const;
export const RECENT_ACTIVITY_QUERY_KEY           = ['recentActivity']        as const;
export const DASHBOARD_SERVERS_BY_LOCATION_KEY   = ['dashboardServersByLocation'] as const;

export function useDashboardStats() {
  return useQuery<DashboardStats, Error>({
    queryKey: DASHBOARD_STATS_QUERY_KEY,
    queryFn:  fetchDashboardStats,
  });
}

export function useClusterUtilization() {
  return useQuery<ClusterUtilization[], Error>({
    queryKey: CLUSTER_UTILIZATION_QUERY_KEY,
    queryFn:  fetchClusterUtilization,
  });
}

export function useRecentActivity() {
  return useQuery<RecentActivity[], Error>({
    queryKey: RECENT_ACTIVITY_QUERY_KEY,
    queryFn:  fetchRecentActivity,
  });
}

export function useDashboardServersByLocation() {
  return useQuery<ServerByLocation[], Error>({
    queryKey: DASHBOARD_SERVERS_BY_LOCATION_KEY,
    queryFn:  fetchDashboardServersByLocation,
  });
}
