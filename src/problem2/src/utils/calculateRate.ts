export function calculateExchangeRate(fromPrice: number, toPrice: number): number {
  return fromPrice / toPrice;
}

export function calculateConvertedAmount(amount: number, rate: number): number {
  return amount * rate;
}