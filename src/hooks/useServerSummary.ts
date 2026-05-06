import { useQuery } from '@tanstack/react-query';
import type {
  ServerSummaryStats,
  ServerByLocation,
  ServerByDomain,
  ServerByType,
  ServerAssigned,
} from '@/types/serverSummary.types';
import {
  fetchServerSummaryStats,
  fetchServerByLocation,
  fetchServerByDomain,
  fetchServerByType,
  fetchServerAssigned,
} from '@/services/serverSummary.service';

export const SERVER_SUMMARY_STATS_QUERY_KEY    = ['serverSummaryStats'] as const;
export const SERVER_BY_LOCATION_QUERY_KEY      = ['serverByLocation']   as const;
export const SERVER_BY_DOMAIN_QUERY_KEY        = ['serverByDomain']     as const;
export const SERVER_BY_TYPE_QUERY_KEY          = ['serverByType']       as const;
export const SERVER_ASSIGNED_QUERY_KEY         = ['serverAssigned']     as const;

export function useServerSummaryStats() {
  return useQuery<ServerSummaryStats, Error>({
    queryKey: SERVER_SUMMARY_STATS_QUERY_KEY,
    queryFn:  fetchServerSummaryStats,
  });
}

export function useServerByLocation() {
  return useQuery<ServerByLocation[], Error>({
    queryKey: SERVER_BY_LOCATION_QUERY_KEY,
    queryFn:  fetchServerByLocation,
  });
}

export function useServerByDomain() {
  return useQuery<ServerByDomain[], Error>({
    queryKey: SERVER_BY_DOMAIN_QUERY_KEY,
    queryFn:  fetchServerByDomain,
  });
}

export function useServerByType() {
  return useQuery<ServerByType[], Error>({
    queryKey: SERVER_BY_TYPE_QUERY_KEY,
    queryFn:  fetchServerByType,
  });
}

export function useServerAssigned() {
  return useQuery<ServerAssigned[], Error>({
    queryKey: SERVER_ASSIGNED_QUERY_KEY,
    queryFn:  fetchServerAssigned,
  });
}
