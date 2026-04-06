import { useMemo, useState } from 'react';
import { calculateConvertedAmount, calculateExchangeRate } from '../utils/calculateRate';
import { getCurrencyOptions, normalizePrices } from '../utils/normalizePrices';
import { usePricesQuery } from './usePricesQuery';


export function useSwap() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('ETH');
  const [toCurrency, setToCurrency] = useState('USDC');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { data: pricesData, isLoading: isPricesLoading, isError: isPricesError } = usePricesQuery();

  const normalizedPrices = useMemo(
    () => normalizePrices(pricesData ?? []),
    [pricesData]
  )

  const currencyOptions = useMemo(() => {
    return getCurrencyOptions(normalizedPrices);
  }, [normalizedPrices]);
  
  const hasPrices = currencyOptions.length > 0;

  const numericAmount = Number(amount);

  const isAmountValid = amount.trim() !== '' && !Number.isNaN(numericAmount) && numericAmount > 0;
  const isSameCurrency = fromCurrency === toCurrency;


  const rate = useMemo(() => {
    if (isSameCurrency) return 1;

    const fromPrice = normalizedPrices[fromCurrency]?.price;
    const toPrice = normalizedPrices[toCurrency]?.price;

    if (fromPrice == null || toPrice == null || toPrice <= 0) return null;

    return calculateExchangeRate(fromPrice, toPrice);
  }, [fromCurrency, toCurrency, isSameCurrency, normalizedPrices]);

  const convertedAmount = useMemo(() => {
    if (!isAmountValid || rate === null) return '';

    return calculateConvertedAmount(numericAmount, rate).toFixed(6);
  }, [isAmountValid, numericAmount, rate]);

  function swapDirection() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setError('');
  }
  
  async function handleSwap() {
    setError('');

    if (isPricesLoading) {
      setError('Prices are loading. Please wait...');
      return;
    }

    if (isPricesError || !hasPrices) {
      setError('Price data is unavailable. Please try again later.');
      return;
    }

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
    isPricesLoading,
    isPricesError,
    hasPrices,
  };
}
