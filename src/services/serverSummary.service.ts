import type {
  ServerSummaryStats,
  ServerByLocation,
  ServerByDomain,
  ServerByType,
  ServerAssigned,
} from '@/types/serverSummary.types';
import { SERVER_SUMMARY_STATS_MOCK }   from '@/mocks/serverSummaryStats.mock';
import { SERVER_BY_LOCATION_MOCK }     from '@/mocks/serverSummaryByLocation.mock';
import { SERVER_BY_DOMAIN_MOCK }       from '@/mocks/serverSummaryByDomain.mock';
import { SERVER_BY_TYPE_MOCK }         from '@/mocks/serverSummaryByType.mock';
import { SERVER_ASSIGNED_MOCK }        from '@/mocks/serverSummaryAssigned.mock';

// TODO: replace with apiClient.get('/server-summary/stats') when API is ready
export function fetchServerSummaryStats(): Promise<ServerSummaryStats> {
  return Promise.resolve(SERVER_SUMMARY_STATS_MOCK);
}

// TODO: replace with apiClient.get('/server-summary/by-location') when API is ready
export function fetchServerByLocation(): Promise<ServerByLocation[]> {
  return Promise.resolve(SERVER_BY_LOCATION_MOCK);
}

// TODO: replace with apiClient.get('/server-summary/by-domain') when API is ready
export function fetchServerByDomain(): Promise<ServerByDomain[]> {
  return Promise.resolve(SERVER_BY_DOMAIN_MOCK);
}

// TODO: replace with apiClient.get('/server-summary/by-type') when API is ready
export function fetchServerByType(): Promise<ServerByType[]> {
  return Promise.resolve(SERVER_BY_TYPE_MOCK);
}

// TODO: replace with apiClient.get('/server-summary/assigned') when API is ready
export function fetchServerAssigned(): Promise<ServerAssigned[]> {
  return Promise.resolve(SERVER_ASSIGNED_MOCK);
}
