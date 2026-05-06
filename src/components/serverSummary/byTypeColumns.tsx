import { type ColumnDef } from '@tanstack/react-table';
import type { ServerByType } from '@/types/serverSummary.types';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children}</span>;
}

export const byTypeColumns: ColumnDef<ServerByType, unknown>[] = [
  {
    accessorKey: 'modelFamily',
    header: h('Model Family'),
    size: 150,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'type',
    header: h('Type'),
    size: 130,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'count',
    header: h('Count'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'avgCpuCores',
    header: h('Avg CPU Cores'),
    size: 120,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'avgMemoryGB',
    header: h('Avg Memory (GB)'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'location',
    header: h('Location'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
];
