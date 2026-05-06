interface BadgeProps {
  label: string;
  variant: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

interface StatCardProps {
  label: string;
  value: string | number;
  badge?: BadgeProps;
  subtitle?: string;
  alertBorder?: boolean;
}

const BADGE_CLASSES: Record<BadgeProps['variant'], string> = {
  blue:   'bg-blue-100 text-blue-700',
  green:  'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red:    'bg-red-100 text-red-700',
  gray:   'bg-gray-100 text-gray-600',
};

export default function StatCard({ label, value, badge, subtitle, alertBorder }: StatCardProps) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm${alertBorder ? ' border-l-4 border-l-red-500' : ''}`}>
      <p className="mb-1 text-sm font-medium text-gray-500">{label}</p>
      <p className="mb-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="mb-1 text-xs text-gray-400">{subtitle}</p>}
      {badge && (
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${BADGE_CLASSES[badge.variant]}`}>
          {badge.label}
        </span>
      )}
    </div>
  );
}
