interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageItems(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const pageSet = new Set<number>();
  pageSet.add(0);
  pageSet.add(totalPages - 1);
  for (let i = Math.max(0, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
    pageSet.add(i);
  }

  const sorted = [...pageSet].sort((a, b) => a - b);
  const result: Array<number | 'ellipsis'> = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('ellipsis');
    }
    result.push(sorted[i]);
  }

  return result;
}

const BASE = 'h-8 min-w-[32px] px-2 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors';
const ACTIVE = 'bg-brand-600 text-white border-brand-600 hover:bg-brand-700';
const DISABLED = 'opacity-40 cursor-not-allowed pointer-events-none';

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageItems(currentPage, totalPages);
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className={`${BASE} ${isFirst ? DISABLED : ''}`}
      >
        « Prev
      </button>

      {items.map((item, idx) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${idx}`} className="px-1 text-sm text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            className={`${BASE} ${item === currentPage ? ACTIVE : ''}`}
          >
            {item + 1}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className={`${BASE} ${isLast ? DISABLED : ''}`}
      >
        Next »
      </button>
    </div>
  );
}
