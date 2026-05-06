interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  placeholder: string;
}

export default function FilterDropdown({ value, options, onChange, placeholder }: FilterDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-w-[140px] rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
