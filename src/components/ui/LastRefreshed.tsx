interface LastRefreshedProps {
  date?: Date;
}

export default function LastRefreshed({ date }: LastRefreshedProps) {
  const d = date ?? new Date();
  const formatted = d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <p className="text-xs text-gray-400 text-right">Last refreshed {formatted}</p>
  );
}
