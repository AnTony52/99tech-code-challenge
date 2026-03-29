# Problem 2 — Fancy Currency Swap

## Overview
This implementation rebuilds the provided static template into a functional currency swap interface using React, TypeScript, and Vite.

The focus is on correctness, simplicity, and clean structure.

---

## Features
- Convert between currencies based on latest available price data
- Swap direction between selected currencies
- Input validation for amount and currency selection
- Loading state simulation
- Clean and modular code structure

---

## Tech Stack
- React
- TypeScript
- Vite

---

## Key Decisions

### 1. Price Normalization
The provided dataset contains duplicated entries for some currencies.

→ I normalize the data and always select the latest entry (or highest price if timestamps match).

### 2. Exchange Rate Calculation
Instead of hardcoding currency pairs:

→ Exchange rate is derived from price ratio:
rate = fromPrice / toPrice
This makes the system flexible and scalable.

### 3. State Management
All business logic is encapsulated inside a custom hook (`useSwap`), keeping UI components clean and focused.

---

## Project Structure

```text
src/
  components/
  data/
  hooks/
  types/
  utils/
```

---

## Running the App

```bash
npm install
npm run dev
```

---

## Future Improvements
- Integrate real-time API for price updates
- Improve accessibility (keyboard navigation, ARIA)
- Add better UI feedback (toasts, animations)