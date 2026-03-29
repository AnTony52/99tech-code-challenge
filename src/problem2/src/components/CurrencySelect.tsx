import type { CurrencyOption } from '../types';

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CurrencyOption[];
}

export default function CurrencySelect({
  value,
  onChange,
  options,
}: CurrencySelectProps) {
  return (
    <select
      className="currency-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.code} value={option.code}>
          {option.label}
        </option>
      ))}
    </select>
  );
}