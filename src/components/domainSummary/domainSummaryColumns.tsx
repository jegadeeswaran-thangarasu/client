import { type ColumnDef } from '@tanstack/react-table';
import type { DomainSummary } from '@/types/domainSummary.types';
import UtilizationCell from '@/components/ui/UtilizationCell';
import StatusBadge from '@/components/ui/StatusBadge';
import DateCell from '@/components/ui/DateCell';

function h(label: string) {
  return () => (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
  );
}

function Cell({ children }: { children: React.ReactNode }) {
  return <span className="text-sm text-gray-700">{children}</span>;
}

export const domainSummaryColumns: ColumnDef<DomainSummary, unknown>[] = [
  {
    accessorKey: 'domain',
    header: h('Domain'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => {
      const domain = getValue() as string;
      return (
        <button
          type="button"
          className="cursor-pointer text-sm font-medium text-brand-600 hover:underline"
          onClick={() => console.log(domain)}
        >
          {domain}
        </button>
      );
    },
  },
  {
    accessorKey: 'location',
    header: h('Location'),
    size: 140,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'model',
    header: h('Model'),
    size: 120,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'chassis',
    header: h('Chassis'),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'usedSlots',
    header: h('Used Slots'),
    size: 100,
    enableSorting: true,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'emptySlots',
    header: h('Empty Slots'),
    size: 100,
    enableSorting: false,
    cell: ({ getValue }) => <Cell>{getValue() as number}</Cell>,
  },
  {
    accessorKey: 'utilizationPercent',
    header: h('Utilization'),
    size: 160,
    enableSorting: true,
    cell: ({ getValue }) => <UtilizationCell value={getValue() as number} />,
  },
  {
    accessorKey: 'expiration',
    header: h('Expiration'),
    size: 120,
    enableSorting: true,
    cell: ({ getValue }) => <DateCell dateStr={getValue() as string} />,
  },
  {
    accessorKey: 'serial',
    header: h('Serial'),
    size: 120,
    enableSorting: false,
    cell: ({ getValue }) => <Cell>{getValue() as string}</Cell>,
  },
  {
    accessorKey: 'status',
    header: h('Status'),
    size: 110,
    enableSorting: true,
    cell: ({ getValue }) => <StatusBadge value={getValue() as string} />,
  },
];
