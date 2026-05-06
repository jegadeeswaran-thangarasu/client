import type { ReactNode } from 'react';

interface PageContainerProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function PageContainer({ title, description, actions, children }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {title && (
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        </header>
      )}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
