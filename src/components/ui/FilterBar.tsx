import type { ReactNode } from 'react';

interface FilterBarProps {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
}

export default function FilterBar({ leftChildren, rightChildren }: FilterBarProps) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">{leftChildren}</div>
      <div className="flex items-center gap-2">{rightChildren}</div>
    </div>
  );
}
