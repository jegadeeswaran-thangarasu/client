import type { DomainSummary, DomainSummaryStats } from '@/types/domainSummary.types';
import { DOMAIN_SUMMARY_MOCK } from '@/mocks/domainSummary.mock';
import { DOMAIN_SUMMARY_STATS_MOCK } from '@/mocks/domainSummaryStats.mock';

// TODO: replace with apiClient.get('/domain-summary') when API is ready
export function fetchDomainSummary(): Promise<DomainSummary[]> {
  return Promise.resolve(DOMAIN_SUMMARY_MOCK);
}

// TODO: replace with apiClient.get('/domain-summary/stats') when API is ready
export function fetchDomainSummaryStats(): Promise<DomainSummaryStats> {
  return Promise.resolve(DOMAIN_SUMMARY_STATS_MOCK);
}
