const DEFAULT_OPTIONS = [10, 25, 50, 100];

interface PageSizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
  options?: number[];
}

export default function PageSizeSelector({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
}: PageSizeSelectorProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>Show</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span>rows</span>
    </div>
  );
}
