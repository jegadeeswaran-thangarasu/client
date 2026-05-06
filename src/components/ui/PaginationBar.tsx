import Pagination from '@/components/ui/Pagination';
import PageSizeSelector from '@/components/ui/PageSizeSelector';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalRows: number;
}

export default function PaginationBar({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  totalRows,
}: PaginationBarProps) {
  if (totalPages <= 1 && totalRows <= 10) return null;

  const start = currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, totalRows);

  return (
    <div className="mb-1 flex items-center justify-between px-1 py-2">
      <PageSizeSelector value={pageSize} onChange={onPageSizeChange} />
      <span className="text-xs text-gray-400">
        Showing {start}–{end} of {totalRows} rows
      </span>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
