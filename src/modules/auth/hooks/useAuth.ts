import { AUTH_CONFIG } from '@/config/auth.config';

// Mock user for bypass mode
const BYPASS_USER = {
  name: 'J. Smith',
  email: 'j.smith@dev.local',
  sub: 'dev-user-001',
};

export function useAuth() {
  // DEV BYPASS — remove when Okta is fully configured
  if (AUTH_CONFIG.bypass) {
    return {
      isAuthenticated: true,
      user: BYPASS_USER,
      login: () => {},
      logout: () => { window.location.href = '/'; },
    };
  }

  // PRODUCTION — Okta auth
  // Uncomment when Okta is configured:
  // const { oktaAuth, authState } = useOktaAuth();
  // return {
  //   isAuthenticated: authState?.isAuthenticated ?? false,
  //   user: authState?.idToken?.claims ?? null,
  //   login: () => oktaAuth.signInWithRedirect(),
  //   logout: () => oktaAuth.signOut({ postLogoutRedirectUri: window.location.origin }),
  // };

  // Temporary stub until Okta is wired up
  return {
    isAuthenticated: true,
    user: BYPASS_USER,
    login: () => {},
    logout: () => { window.location.href = '/'; },
  };
}
