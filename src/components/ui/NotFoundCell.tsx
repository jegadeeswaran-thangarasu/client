interface NotFoundCellProps {
  value: string;
  className?: string;
}

export default function NotFoundCell({ value, className = 'text-sm' }: NotFoundCellProps) {
  if (value === 'Not Found' || value === '0') {
    return <span className={`${className} text-gray-400`}>—</span>;
  }
  return <span className={`${className} text-gray-700`}>{value}</span>;
}
