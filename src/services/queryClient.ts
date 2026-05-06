/**
 * Singleton QueryClient shared across the entire React tree via QueryClientProvider.
 * Must not be recreated per render — recreating it clears the cache and causes every
 * mounted component to refetch simultaneously, defeating deduplication entirely.
 */
import { QueryClient, QueryCache } from '@tanstack/react-query';
import { logger } from '@/lib/logger';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) =>
      logger.error('Query failed', { queryKey: query.queryKey, error: String(error) }),
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min — prevents redundant refetches on in-app navigation
      retry: 2,                  // two retries balance resilience without masking persistent failures
      refetchOnWindowFocus: false, // avoids surprise refetches in enterprise multi-tab workflows
    },
  },
});
