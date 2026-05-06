import type { ReactNode } from 'react';

interface StatCardGridProps {
  children: ReactNode;
  cols?: 4 | 5 | 6;
}

const GRID_CLASSES: Record<NonNullable<StatCardGridProps['cols']>, string> = {
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

export default function StatCardGrid({ children, cols = 4 }: StatCardGridProps) {
  return (
    <div className={`mb-6 grid gap-4 ${GRID_CLASSES[cols]}`}>
      {children}
    </div>
  );
}
