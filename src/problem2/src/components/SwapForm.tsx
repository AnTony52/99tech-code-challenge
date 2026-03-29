import AmountInput from './AmountInput';
import CurrencySelect from './CurrencySelect';
import { useSwap } from '../hooks/useSwap';
import { formatNumber } from '../utils/format';

export default function SwapForm() {
  const {
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
  } = useSwap();

  const isDisabled =
    loading ||
    !amount ||
    Number(amount) <= 0 ||
    fromCurrency === toCurrency ||
    rate === null;

  return (
    <section className="swap-card">
      <div className="swap-card__header">
        <p className="swap-eyebrow">Problem 2</p>
        <h1 className="swap-title">Fancy Currency Swap</h1>
        <p className="swap-subtitle">
          Convert assets using the latest available market price.
        </p>
      </div>

      <div className="field-group">
        <label className="field-label">Amount</label>
        <AmountInput value={amount} onChange={setAmount} hasError={!!error} />
      </div>

      <div className="field-group">
        <label className="field-label">From / To</label>

        <div className="swap-row">
          <CurrencySelect
            value={fromCurrency}
            onChange={setFromCurrency}
            options={currencyOptions}
          />

          <div className="swap-arrow" onClick={swapDirection}>
            ⇄
          </div>
          <CurrencySelect
            value={toCurrency}
            onChange={setToCurrency}
            options={currencyOptions}
          />
        </div>
      </div>

      <div className="rate-panel">
        {rate !== null ? (
          <>
            <strong>
              {convertedAmount ? formatNumber(Number(convertedAmount)) : '0'}{' '}
              {toCurrency}
            </strong>
          </>
        ) : (
          <p className="rate-line">Rate unavailable for this pair.</p>
        )}
      </div>
      <p className="helper-text">
        Rates are simulated from the latest available market price data.
      </p>
      {error && <p className="error-text">{error}</p>}

      <button
        className="swap-button"
        onClick={handleSwap}
        disabled={isDisabled}
      >
        {loading ? 'Swapping...' : 'Swap'}
      </button>
    </section>
  );
}
