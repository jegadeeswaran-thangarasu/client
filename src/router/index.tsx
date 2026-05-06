import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';
import AppLayout from '@/components/ui/AppLayout';
import ProtectedRoute from '@/components/guards/ProtectedRoute';
import { ROUTES } from './routes';

const LoginPage          = lazy(() => import('@/modules/auth/pages/LoginPage'));
const LoginCallbackPage  = lazy(() => import('@/pages/LoginCallbackPage'));
const DashboardPage      = lazy(() => import('@/pages/DashboardPage'));
const DomainSummaryPage  = lazy(() => import('@/pages/DomainSummaryPage'));
const ServerSummaryPage  = lazy(() => import('@/pages/ServerSummaryPage'));
const ServerDetailsPage  = lazy(() => import('@/pages/ServerDetailsPage'));
const ComingSoon        = lazy(() => import('@/components/ui/ComingSoon'));
const NotFoundPage      = lazy(() => import('@/components/error/NotFoundPage'));
const ForbiddenPage     = lazy(() => import('@/components/error/ForbiddenPage'));

const PageFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <Spinner size="lg" />
  </div>
);

const FullPageFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Spinner size="lg" />
  </div>
);

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<FullPageFallback />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.LOGIN_CALLBACK,
        element: <LoginCallbackPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
              { path: ROUTES.DASHBOARD,         element: <Suspense fallback={<PageFallback />}><DashboardPage /></Suspense> },
              { path: ROUTES.DOMAIN_SUMMARY,    element: <Suspense fallback={<PageFallback />}><DomainSummaryPage /></Suspense> },
              { path: ROUTES.SERVER_SUMMARY,    element: <Suspense fallback={<PageFallback />}><ServerSummaryPage /></Suspense> },
              { path: ROUTES.SERVER_DETAILS,    element: <Suspense fallback={<PageFallback />}><ServerDetailsPage /></Suspense> },
              { path: ROUTES.RESOURCE_UPGRADES, element: <Suspense fallback={<PageFallback />}><ComingSoon pageName="Resource Upgrades" /></Suspense> },
              { path: ROUTES.BU_USAGE,          element: <Suspense fallback={<PageFallback />}><ComingSoon pageName="BU Usage" /></Suspense> },
              { path: ROUTES.INFRA_RUNWAY,      element: <Suspense fallback={<PageFallback />}><ComingSoon pageName="Infra Runway" /></Suspense> },
              { path: ROUTES.EXECUTIVE_VIEW,    element: <Suspense fallback={<PageFallback />}><ComingSoon pageName="Executive View" /></Suspense> },
              { path: ROUTES.CONFIGURATION,     element: <Suspense fallback={<PageFallback />}><ComingSoon pageName="Configuration" /></Suspense> },
            ],
          },
        ],
      },
      {
        path: ROUTES.FORBIDDEN,
        element: <ForbiddenPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
