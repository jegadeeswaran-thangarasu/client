import type { ServerDetail } from '@/types/serverDetails.types';
import { normalizeServerDetail } from '@/utils/normalizeServerDetail';
import { SERVER_DETAILS_MOCK } from '@/mocks/serverDetails.mock';

// TODO: replace with apiClient.get('/api/server-details')
export function fetchServerDetails(): Promise<ServerDetail[]> {
  return Promise.resolve(SERVER_DETAILS_MOCK.map(normalizeServerDetail));
}
