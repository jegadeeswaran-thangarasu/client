import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { AUTH_CONFIG } from '@/config/auth.config';
import { ROUTES } from '@/router/routes';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  function handleLogin() {
    if (AUTH_CONFIG.bypass) {
      navigate(ROUTES.DASHBOARD, { replace: true });
      return;
    }
    login();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-10 shadow-lg">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600">
            <svg
              className="h-7 w-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Cigna <span className="text-brand-600">Presidio</span>
          </h1>
          <p className="text-sm text-gray-500">Data Platform</p>
        </div>

        <h2 className="mb-6 text-center text-sm font-medium text-gray-700">
          Sign in to your account
        </h2>

        <button
          type="button"
          onClick={handleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Login with Okta
        </button>
      </div>
    </div>
  );
}
