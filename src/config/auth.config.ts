// This is the single place that controls bypass mode.
// When Okta is ready: set VITE_AUTH_BYPASS=false in .env.local
// Never import this in production-critical paths
export const AUTH_CONFIG = {
  bypass: import.meta.env.VITE_AUTH_BYPASS === 'true',
};
