/**
 * Fetches and caches the full server inventory.
 * Inherits 5-min staleTime and retry-2 from the global QueryClient, so navigating
 * away from and back to the Server Details page will not trigger a refetch within
 * the cache window.
 */
import { useQuery } from '@tanstack/react-query';
import type { ServerDetail } from '@/types/serverDetails.types';
import { fetchServerDetails } from '@/services/serverDetails.service';

export const SERVER_DETAILS_QUERY_KEY = ['serverDetails'] as const;

export function useServerDetails() {
  return useQuery<ServerDetail[], Error>({
    queryKey: SERVER_DETAILS_QUERY_KEY,
    queryFn: fetchServerDetails,
  });
}
