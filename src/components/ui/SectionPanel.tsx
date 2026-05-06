import type { ReactNode } from 'react';

interface SectionPanelProps {
  title: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function SectionPanel({ title, rightSlot, children, className = '' }: SectionPanelProps) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {rightSlot && <div>{rightSlot}</div>}
      </div>
      {children}
    </div>
  );
}
