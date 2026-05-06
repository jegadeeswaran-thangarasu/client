/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_LOG_LEVEL?: string;
  readonly VITE_OKTA_CLIENT_ID?: string;
  readonly VITE_OKTA_ISSUER?: string;
  readonly VITE_OKTA_SCOPES?: string;
  readonly VITE_AUTH_BYPASS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
