interface CpuCellProps {
  value: string;
}

function getCpuColor(raw: string): string {
  const n = parseFloat(raw);
  if (isNaN(n)) return 'text-gray-600';
  if (n < 50) return 'text-green-600';
  if (n < 70) return 'text-yellow-600';
  return 'text-red-600';
}

export default function CpuCell({ value }: CpuCellProps) {
  return (
    <span className={`text-sm font-medium ${getCpuColor(value)}`}>
      {value}
    </span>
  );
}
