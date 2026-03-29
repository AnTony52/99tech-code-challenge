export type CurrencyCode = string;

export interface CurrencyOption {
  code: CurrencyCode;
  label: string;
}

export interface SwapState {
  amount: string;
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  loading: boolean;
  error: string;
}