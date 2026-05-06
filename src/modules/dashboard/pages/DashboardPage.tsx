import PageContainer from '@/components/ui/PageContainer';
import type { AuthUser } from '@/modules/auth/types/auth.types';

interface DashboardPageProps {
  user: AuthUser | null;
  logout: () => void;
}

export default function DashboardPage({ user, logout }: DashboardPageProps) {

  const logoutButton = (
    <button
      type="button"
      onClick={logout}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      Logout
    </button>
  );

  return (
    <PageContainer title="Dashboard" actions={logoutButton}>
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome{user?.name ? `, ${user.name}` : ''}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          You are logged in
          {user?.email ? (
            <>
              {' '}as{' '}
              <span className="font-medium text-gray-700">{user.email}</span>
            </>
          ) : (
            '.'
          )}
        </p>
      </div>
    </PageContainer>
  );
}
