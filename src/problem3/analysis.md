## Problem 3: Messy React

Files:
- `src/problem3/original.tsx` - original code from the prompt
- `src/problem3/analysis.md` - identified issues and anti-patterns
- `src/problem3/refactor.tsx` - refactored version

### Key Issues

1. Undefined variable in filter
- `lhsPriority` is not defined
- Causes runtime/compile error

2. Incorrect filtering logic
- Keeps balances with `amount <= 0`
- Should keep only positive balances

3. Unused derived data
- `formattedBalances` is computed but not used
- Wastes computation and breaks data flow

4. Type mismatch in rendering
- `sortedBalances` typed as `FormattedWalletBalance`
- But data is not formatted → incorrect typing

5. Wrong data source in render
- Rendering from `sortedBalances`
- Should render from formatted data

6. Unnecessary dependency in `useMemo`
- `prices` included but not used
- Causes unnecessary recomputation

7. Unstable key usage
- `key={index}` is unsafe for sorted lists

8. Weak type safety
- `getPriority(blockchain: any)`
- Should use `string`

9. Potential NaN in USD calculation
- `prices[currency]` may be undefined

---

### Refactoring Approach

- Fix correctness issues first (bug + logic)
- Normalize data in a single pipeline
- Remove unused computations
- Improve typing and safety
- Use stable keys for rendering