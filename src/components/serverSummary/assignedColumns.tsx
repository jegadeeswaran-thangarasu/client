import { type ColumnDef } from '@tanstack/react-table';
import type { ServerAssigned } from '@/types/serverSummary.types';
import ColoredNumber from '@/components/ui/ColoredNumber';
import UtilizationCell from '@/components/ui/UtilizationCell';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children}</span>;
}

export const assignedColumns: ColumnDef<ServerAssigned, unknown>[] = [
  {
    accessorKey: 'modelFamily',
    header: h('Model Family'),
    size: 150,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm font-semibold text-gray-900">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: h('Type'),
    size: 130,
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
    accessorKey: 'total',
    header: h('Total'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'assigned',
    header: h('Assigned'),
    size: 90,
    enableSorting: true,
    cell: ({ getValue }) => (
      <ColoredNumber value={getValue() as number} variant="success" />
    ),
  },
  {
    accessorKey: 'unassigned',
    header: h('Unassigned'),
    size: 100,
    enableSorting: true,
    cell: ({ getValue }) => {
      const val = getValue() as number;
      return <ColoredNumber value={val} variant={val === 0 ? 'neutral' : 'danger'} />;
    },
  },
  {
    accessorKey: 'assignedPercent',
    header: h('Assigned %'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <UtilizationCell value={getValue() as number} />,
  },
];
