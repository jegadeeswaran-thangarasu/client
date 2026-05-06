import { type ColumnDef } from '@tanstack/react-table';
import type { RecentActivity } from '@/types/dashboard.types';
import StatusBadge from '@/components/ui/StatusBadge';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children}</span>;
}

export const recentActivityColumns: ColumnDef<RecentActivity, unknown>[] = [
  {
    accessorKey: 'timestamp',
    header: h('Timestamp'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-500">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: h('Type'),
    size: 150,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'vmServer',
    header: h('VM / Server'),
    size: 180,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm font-medium text-gray-900">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'change',
    header: h('Change'),
    size: 130,
    enableSorting: false,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'requester',
    header: h('Requester'),
    size: 120,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'status',
    header: h('Status'),
    size: 110,
    enableSorting: false,
    cell: ({ getValue }) => <StatusBadge value={getValue() as string} />,
  },
];
