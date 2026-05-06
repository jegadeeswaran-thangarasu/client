interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
};

export default function Spinner({ size = 'md', label = 'Loading…' }: SpinnerProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-2">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-brand-500 border-t-transparent`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
