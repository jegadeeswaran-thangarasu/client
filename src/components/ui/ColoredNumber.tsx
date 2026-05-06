interface ColoredNumberProps {
  value: number;
  variant: 'success' | 'danger' | 'neutral';
}

const VARIANT_CLASSES: Record<ColoredNumberProps['variant'], string> = {
  success: 'text-green-600 font-semibold',
  danger:  'text-red-500 font-semibold',
  neutral: 'text-gray-700',
};

export default function ColoredNumber({ value, variant }: ColoredNumberProps) {
  return (
    <span className={`text-sm ${VARIANT_CLASSES[variant]}`}>{value}</span>
  );
}
