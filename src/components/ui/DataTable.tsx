/**
 * Generic, reusable table — use this for every new data module; never duplicate it.
 * Supports client-side sorting, global filtering (debounced 300 ms), and pagination.
 * `data` and `columns` are memoized internally; do NOT wrap them in `useMemo` at the
 * call site or the table instance will reinitialize on every parent render.
 */
import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import PaginationBar from '@/components/ui/PaginationBar';
import { useDebounce } from '@/hooks/useDebounce';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
}

export default function DataTable<TData>({ data, columns }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const debouncedGlobalFilter = useDebounce(globalFilter, 300);

  const memoData = useMemo(() => data, [data]);
  const memoColumns = useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memoData,
    columns: memoColumns,
    state: {
      sorting,
      globalFilter: debouncedGlobalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  const { rows } = table.getRowModel();

  return (
    <div className="w-full">
      <PaginationBar
        currentPage={table.getState().pagination.pageIndex}
        totalPages={table.getPageCount()}
        pageSize={table.getState().pagination.pageSize}
        onPageChange={table.setPageIndex}
        onPageSizeChange={(size) => {
          table.setPageSize(size);
          table.setPageIndex(0);
        }}
        totalRows={memoData.length}
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      scope="col"
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={[
                        'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6',
                        canSort ? 'cursor-pointer select-none hover:text-gray-800' : '',
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-1.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && <SortIcon direction={sorted} />}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={memoColumns.length}
                  className="px-6 py-12 text-center text-sm text-gray-400"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="transition hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-gray-700 sm:px-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface SortIconProps {
  direction: 'asc' | 'desc' | false;
}

function SortIcon({ direction }: SortIconProps) {
  return (
    <span className="text-gray-400" aria-hidden="true">
      {direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕'}
    </span>
  );
}
