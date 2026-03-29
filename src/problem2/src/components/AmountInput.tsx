interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export default function AmountInput({
  value,
  onChange,
  hasError = false,
}: AmountInputProps) {
  return (
    <input
      className={`amount-input ${hasError ? 'error' : ''}`}
      type="number"
      min="0"
      step="any"
      placeholder="Enter amount"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
