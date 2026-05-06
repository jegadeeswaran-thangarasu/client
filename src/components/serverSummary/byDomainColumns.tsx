import { type ColumnDef } from '@tanstack/react-table';
import type { ServerByDomain } from '@/types/serverSummary.types';
import StatusBadge from '@/components/ui/StatusBadge';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children}</span>;
}

export const byDomainColumns: ColumnDef<ServerByDomain, unknown>[] = [
  {
    accessorKey: 'domain',
    header: h('Domain'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'location',
    header: h('Location'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'servers',
    header: h('Servers'),
    size: 90,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'clusters',
    header: h('Clusters'),
    size: 90,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'status',
    header: h('Status'),
    size: 120,
    enableSorting: false,
    cell: ({ getValue }) => <StatusBadge value={getValue() as string} />,
  },
];
