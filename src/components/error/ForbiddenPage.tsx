import { Link } from 'react-router-dom';
import { ShieldX, Home } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <ShieldX className="h-7 w-7 text-red-600" aria-hidden="true" />
        </div>
        <p className="text-5xl font-bold text-red-600">403</p>
        <h1 className="mt-2 text-xl font-bold text-gray-900">Access Denied</h1>
        <p className="mt-2 text-sm text-gray-500">
          You don&apos;t have permission to view this page. Contact your administrator
          if you believe this is a mistake.
        </p>
        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-1.5 rounded-md bg-brand-600 px-5 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
