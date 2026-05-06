import { type ColumnDef } from '@tanstack/react-table';
import type { ClusterUtilization } from '@/types/dashboard.types';
import UtilizationCell from '@/components/ui/UtilizationCell';
import StatusBadge from '@/components/ui/StatusBadge';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children}</span>;
}

export const clusterColumns: ColumnDef<ClusterUtilization, unknown>[] = [
  {
    accessorKey: 'cluster',
    header: h('Cluster'),
    size: 200,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm font-semibold text-gray-900">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'location',
    header: h('Location'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'domain',
    header: h('Domain'),
    size: 150,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-xs text-gray-500">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'vms',
    header: h('VMs'),
    size: 70,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'cpuUtil',
    header: h('CPU Util.'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => <UtilizationCell value={getValue() as number} />,
  },
  {
    accessorKey: 'memoryUtil',
    header: h('Memory Util.'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => <UtilizationCell value={getValue() as number} />,
  },
  {
    accessorKey: 'storageUtil',
    header: h('Storage Util.'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => <UtilizationCell value={getValue() as number} />,
  },
  {
    accessorKey: 'health',
    header: h('Health'),
    size: 100,
    enableSorting: false,
    cell: ({ getValue }) => <StatusBadge value={getValue() as string} />,
  },
];
