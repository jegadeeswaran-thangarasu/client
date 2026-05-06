import apiClient from '@/services/apiClient';
import type { ServerDetail, ServerDetailRaw } from '@/types/serverDetails.types';
import { normalizeServerDetail } from '@/utils/normalizeServerDetail';

interface ServerDetailsResponse {
  message: string;
  bucket: string;
  key: string;
  data: ServerDetailRaw[];
}

/**
 * Fetches the full server inventory from the AWS Lambda endpoint.
 * The API wraps results in `{ message, bucket, key, data }` — `message`, `bucket`,
 * and `key` are S3 provenance metadata and are intentionally discarded here.
 * Each raw record is passed through `normalizeServerDetail` to produce camelCase
 * fields and a formatted memory string before being returned to callers.
 * @throws {AxiosError} on 4xx/5xx responses or network failure
 */
export async function fetchServerDetails(): Promise<ServerDetail[]> {
  const response = await apiClient.get<ServerDetailsResponse>(
    'https://ttpnms7nf9.execute-api.us-east-1.amazonaws.com/dev/server-details',
  );
  return response.data.data.map(normalizeServerDetail);
}
