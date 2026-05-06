import { Outlet } from 'react-router-dom';
import { AUTH_CONFIG } from '@/config/auth.config';
import PageErrorBoundary from '@/components/error/PageErrorBoundary';

export default function ProtectedRoute() {
  // DEV BYPASS — skip all auth checks
  if (AUTH_CONFIG.bypass) {
    return (
      <PageErrorBoundary>
        <Outlet />
      </PageErrorBoundary>
    );
  }

  // PRODUCTION Okta check
  // Uncomment when Okta is configured:
  // const { authState } = useOktaAuth();
  // if (!authState) {
  //   return <div className="flex min-h-screen items-center justify-center"><Spinner size="lg" /></div>;
  // }
  // if (!authState.isAuthenticated) {
  //   return <Navigate to={ROUTES.LOGIN} replace />;
  // }

  // Temporary — allow through until Okta ready
  return (
    <PageErrorBoundary>
      <Outlet />
    </PageErrorBoundary>
  );
}
