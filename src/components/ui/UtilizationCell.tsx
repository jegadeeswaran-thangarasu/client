interface UtilizationCellProps {
  value: number;
}

// Full class names required so Tailwind's scanner can detect them at build time.
const FILL_CLASSES = {
  green:  'bg-green-500',
  yellow: 'bg-yellow-500',
  red:    'bg-red-500',
} as const;

const TEXT_CLASSES = {
  green:  'text-green-500',
  yellow: 'text-yellow-500',
  red:    'text-red-500',
} as const;

function getColorKey(value: number): keyof typeof FILL_CLASSES {
  if (value >= 80) return 'red';
  if (value >= 50) return 'yellow';
  return 'green';
}

export default function UtilizationCell({ value }: UtilizationCellProps) {
  const key = getColorKey(value);
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full ${FILL_CLASSES[key]}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className={`text-sm font-medium ${TEXT_CLASSES[key]}`}>{value}%</span>
    </div>
  );
}
