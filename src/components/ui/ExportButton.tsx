import { Download } from 'lucide-react';

interface ExportButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export default function ExportButton({ onClick, disabled = false, label = 'Export CSV' }: ExportButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center rounded-md bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={15} className="mr-1.5" aria-hidden="true" />
      {label}
    </button>
  );
}
