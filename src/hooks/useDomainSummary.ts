import { useQuery } from '@tanstack/react-query';
import type { DomainSummary, DomainSummaryStats } from '@/types/domainSummary.types';
import { fetchDomainSummary, fetchDomainSummaryStats } from '@/services/domainSummary.service';

export const DOMAIN_SUMMARY_QUERY_KEY = ['domainSummary'] as const;
export const DOMAIN_SUMMARY_STATS_QUERY_KEY = ['domainSummaryStats'] as const;

export function useDomainSummary() {
  return useQuery<DomainSummary[], Error>({
    queryKey: DOMAIN_SUMMARY_QUERY_KEY,
    queryFn: fetchDomainSummary,
  });
}

export function useDomainSummaryStats() {
  return useQuery<DomainSummaryStats, Error>({
    queryKey: DOMAIN_SUMMARY_STATS_QUERY_KEY,
    queryFn: fetchDomainSummaryStats,
  });
}
