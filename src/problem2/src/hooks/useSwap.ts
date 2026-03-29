import { useMemo, useState } from 'react';
import { PRICE_DATA } from '../data/prices';
import { calculateConvertedAmount, calculateExchangeRate } from '../utils/calculateRate';
import { getCurrencyOptions, normalizePrices } from '../utils/normalizePrices';

const normalizedPrices = normalizePrices(PRICE_DATA);
const currencyOptions = getCurrencyOptions(normalizedPrices);

export function useSwap() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('ETH');
  const [toCurrency, setToCurrency] = useState('USDC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const numericAmount = Number(amount);

  const isAmountValid = amount.trim() !== '' && !Number.isNaN(numericAmount) && numericAmount > 0;
  const isSameCurrency = fromCurrency === toCurrency;

  const rate = useMemo(() => {
    if (isSameCurrency) return 1;

    const fromPrice = normalizedPrices[fromCurrency]?.price;
    const toPrice = normalizedPrices[toCurrency]?.price;

    if (!fromPrice || !toPrice) return null;

    return calculateExchangeRate(fromPrice, toPrice);
  }, [fromCurrency, toCurrency, isSameCurrency]);

  const convertedAmount = useMemo(() => {
    if (!isAmountValid || rate === null) return '';

    return calculateConvertedAmount(numericAmount, rate).toFixed(6);
  }, [isAmountValid, numericAmount, rate]);

  function swapDirection() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }
  
  async function handleSwap() {
    setError('');

    if (!isAmountValid) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    if (isSameCurrency) {
      setError('Please choose two different currencies.');
      return;
    }

    if (rate === null) {
      setError('Failed to fetch exchange rate. Please try another pair.');
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setError('Failed to process swap. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    loading,
    error,
    rate,
    convertedAmount,
    currencyOptions,
    handleSwap,
    swapDirection,
  };
}
