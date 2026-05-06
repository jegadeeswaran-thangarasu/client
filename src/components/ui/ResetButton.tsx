interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ResetButton({ onClick, disabled = false }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Reset
    </button>
  );
}
