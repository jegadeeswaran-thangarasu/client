/**
 * Singleton Axios instance — the single HTTP gateway for the entire application.
 * All API calls must import this instance; never call `axios.get/post` directly
 * or create additional Axios instances. Auth interceptors and error handling live here.
 */
import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios';
import { logger } from '@/lib/logger';
import { ROUTES } from '@/router/routes';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    logger.debug('Outgoing request', { method: config.method, url: config.url });
    // Okta token injection — kept as a placeholder so the wiring point is obvious
    // when integrating @okta/okta-auth-js. Do not remove this block.
    // const token = getAccessToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      const url = error.config?.url ?? 'unknown';
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          logger.warn('Unauthorised response — auth redirect will be handled by Okta', { url, status });
        } else if (status === 403) {
          logger.warn('Forbidden response', { url, status });
          window.location.replace(ROUTES.FORBIDDEN);
        } else if (status >= 500) {
          const message =
            (error.response.data as { message?: string })?.message ?? error.message;
          logger.error('Server error', { url, status, message });
        }
      } else {
        logger.error('Network unavailable', { url });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
