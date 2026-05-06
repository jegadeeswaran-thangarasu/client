/**
 * Renders a colored dot-and-label badge from a raw API status string.
 * "connected"    → green dot + "Connected" (server-details API value)
 * "Active"       → green dot + "Active"
 * "Healthy"      → green dot + "Healthy"
 * "Maintenance"  → orange dot + "Maintenance"
 * "Warning"      → yellow dot + "Warning"
 * "Inactive"     → gray dot + "Inactive"
 * "Not Found"    → gray dot + "—" (sentinel value, not a real status)
 * anything else  → blue dot + truncated value (handles unknown future statuses)
 */
interface StatusBadgeProps {
  value: string;
}

type BadgeConfig = { dot: string; text: string; label: string };

const KNOWN_STATUSES: Record<string, BadgeConfig> = {
  connected:   { dot: 'bg-green-500',  text: 'text-green-700',  label: 'Connected'   },
  Active:      { dot: 'bg-green-500',  text: 'text-green-700',  label: 'Active'      },
  Healthy:     { dot: 'bg-green-500',  text: 'text-green-700',  label: 'Healthy'     },
  Maintenance: { dot: 'bg-orange-500', text: 'text-orange-700', label: 'Maintenance' },
  Warning:     { dot: 'bg-yellow-500', text: 'text-yellow-600', label: 'Warning'     },
  Inactive:    { dot: 'bg-gray-400',   text: 'text-gray-500',   label: 'Inactive'    },
  Critical:    { dot: 'bg-red-500',    text: 'text-red-700',    label: 'Critical'    },
  Approved:    { dot: 'bg-green-500',  text: 'text-green-700',  label: 'Approved'    },
  Pending:     { dot: 'bg-yellow-500', text: 'text-yellow-700', label: 'Pending'     },
  Rejected:    { dot: 'bg-red-500',    text: 'text-red-700',    label: 'Rejected'    },
};

export default function StatusBadge({ value }: StatusBadgeProps) {
  if (value === 'Not Found') {
    return (
      <span className="inline-flex items-center text-sm text-gray-400">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gray-400" aria-hidden="true" />
        —
      </span>
    );
  }

  const config = KNOWN_STATUSES[value];
  if (config) {
    return (
      <span className={`inline-flex items-center text-sm font-medium ${config.text}`}>
        <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
        {config.label}
      </span>
    );
  }

  return (
    <span className="inline-flex max-w-[120px] items-center text-sm font-medium text-blue-700">
      <span className="mr-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
      <span className="truncate">{value}</span>
    </span>
  );
}
