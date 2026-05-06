interface HealthBarProps {
  value: number;
}

// Full class names required so Tailwind's scanner can detect them at build time.
const FILL_CLASSES = {
  green:  'bg-green-500',
  yellow: 'bg-yellow-500',
  red:    'bg-red-500',
} as const;

function getColorKey(value: number): keyof typeof FILL_CLASSES {
  if (value >= 80) return 'red';
  if (value >= 50) return 'yellow';
  return 'green';
}

export default function HealthBar({ value }: HealthBarProps) {
  return (
    <div className="relative h-2.5 w-24 rounded-full bg-gray-200">
      <div
        className={`absolute left-0 top-0 h-full rounded-full ${FILL_CLASSES[getColorKey(value)]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
