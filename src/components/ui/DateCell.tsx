interface DateCellProps {
  dateStr: string;
}

/**
 * Maps days remaining from today to a CSS color class.
 * >180 days → green (healthy); 60–180 days → orange (approaching); <60 days → red (urgent).
 * The comparison is floored to midnight so the color does not shift mid-day.
 */
function getDateColor(dateStr: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diffDays = Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays > 180) return 'text-green-600';
  if (diffDays >= 60)  return 'text-orange-500';
  return 'text-red-600';
}

export default function DateCell({ dateStr }: DateCellProps) {
  return (
    <span className={`text-sm font-medium ${getDateColor(dateStr)}`}>
      {dateStr}
    </span>
  );
}
