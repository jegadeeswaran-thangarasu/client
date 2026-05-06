const DEV_API_FALLBACK = 'https://jsonplaceholder.typicode.com';

if (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL) {
  throw new Error(
    'Missing required environment variable: VITE_API_BASE_URL must be set in production.',
  );
}

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? DEV_API_FALLBACK,
  logLevel: import.meta.env.VITE_LOG_LEVEL ?? 'info',
} as const;

export type AppEnv = typeof env;
