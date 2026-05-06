import { type ColumnDef } from '@tanstack/react-table';
import type { ServerByLocation } from '@/types/serverSummary.types';
import HealthBar from '@/components/ui/HealthBar';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children}</span>;
}

export const byLocationColumns: ColumnDef<ServerByLocation, unknown>[] = [
  {
    accessorKey: 'location',
    header: h('Location'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'blade',
    header: h('Blade'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'rack',
    header: h('Rack'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'total',
    header: h('Total'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'maintenance',
    header: h('Maint.'),
    size: 90,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'healthPercent',
    header: h('Health'),
    size: 120,
    enableSorting: false,
    cell: ({ getValue }) => <HealthBar value={getValue() as number} />,
  },
];
