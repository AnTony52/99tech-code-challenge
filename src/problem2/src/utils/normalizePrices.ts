import type { PriceEntry } from '../data/prices';
import type { CurrencyOption } from '../types';

export type NormalizedPriceMap = Record<string, PriceEntry>;

export function normalizePrices(data: PriceEntry[]): NormalizedPriceMap {
  return data.reduce<NormalizedPriceMap>((acc, current) => {
    const existing = acc[current.currency];

    if (!existing) {
      acc[current.currency] = current;
      return acc;
    }

    const existingTime = new Date(existing.date).getTime();
    const currentTime = new Date(current.date).getTime();

    if (currentTime > existingTime) {
      acc[current.currency] = current;
      return acc;
    }

    if (currentTime === existingTime && current.price > existing.price) {
      acc[current.currency] = current;
    }

    return acc;
  }, {});
}

export function getCurrencyOptions(priceMap: NormalizedPriceMap): CurrencyOption[] {
  return Object.keys(priceMap)
    .sort((a, b) => a.localeCompare(b))
    .map((currency) => ({
      code: currency,
      label: currency,
    }));
}