import { type ColumnDef } from '@tanstack/react-table';
import type { ServerDetail } from '@/types/serverDetails.types';
import StatusBadge from '@/components/ui/StatusBadge';
import NotFoundCell from '@/components/ui/NotFoundCell';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

const MAINT_LABEL: Record<string, string> = {
  notInMaintenance: 'No',
  inMaintenance: 'Yes',
};

export const serverDetailsColumns: ColumnDef<ServerDetail, unknown>[] = [
  {
    accessorKey: 'domain',
    header: h('Domain'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'chassis',
    header: h('Chassis'),
    size: 120,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'slot',
    header: h('Slot'),
    size: 60,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'model',
    header: h('Model'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'totalCores',
    header: h('Total Cores'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'memoryDisplay',
    header: h('Memory'),
    size: 90,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'serial',
    header: h('Serial'),
    size: 110,
    enableSorting: true,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700">{String(getValue())}</span>
    ),
  },
  {
    accessorKey: 'serviceProfile',
    header: h('Service Profile'),
    size: 150,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'userLabel',
    header: h('User Label'),
    size: 110,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'host',
    header: h('Host'),
    size: 180,
    enableSorting: true,
    cell: ({ getValue }) => (
      <NotFoundCell value={getValue() as string} className="text-xs" />
    ),
  },
  {
    accessorKey: 'cluster',
    header: h('Cluster'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'status',
    header: h('Status'),
    size: 100,
    enableSorting: true,
    cell: ({ getValue }) => <StatusBadge value={getValue() as string} />,
  },
  {
    accessorKey: 'maintenanceMode',
    header: h('Maint.'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => {
      const label = MAINT_LABEL[getValue() as string] ?? '—';
      return <span className="text-sm text-gray-700">{label}</span>;
    },
  },
  {
    accessorKey: 'hwrForecast',
    header: h('HWR Forecast'),
    size: 110,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'smartNet',
    header: h('SmartNet'),
    size: 110,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'parkPlace',
    header: h('ParkPlace'),
    size: 110,
    enableSorting: true,
    cell: ({ getValue }) => <NotFoundCell value={getValue() as string} />,
  },
  {
    accessorKey: 'cpu',
    header: h('CPU'),
    size: 200,
    enableSorting: true,
    cell: ({ getValue }) => (
      <NotFoundCell value={getValue() as string} className="text-xs" />
    ),
  },
];
