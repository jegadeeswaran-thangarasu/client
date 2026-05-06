import { OktaAuth } from '@okta/okta-auth-js';

const clientId = import.meta.env.VITE_OKTA_CLIENT_ID;
const issuer   = import.meta.env.VITE_OKTA_ISSUER;

if (!clientId || !issuer) {
  throw new Error('Missing required Okta environment variables. Check .env.local.');
}

const oktaAuth = new OktaAuth({
  clientId,
  issuer,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: import.meta.env.VITE_OKTA_SCOPES?.split(',') ?? ['openid', 'profile', 'email'],
  pkce: true,
});

export default oktaAuth;
