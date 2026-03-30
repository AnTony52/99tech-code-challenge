# 99Tech Code Challenge - Frontend Submission

This repository contains my solutions for 3 frontend coding challenges.

---

## Repository Structure

* `src/problem1/` - Three ways to sum to n
* `src/problem2/` - Fancy Form
* `src/problem3/` - Messy React

---

## Problem 1: Three ways to sum to n

### Objective

Provide 3 unique implementations of a function that returns the sum of integers from 1 to `n`.

Example:

```js
sum_to_n(5) = 15
```

---

### Assumptions

* Input `n` is an integer
* For `n <= 0`, the function returns `0`
* Result is guaranteed to be less than `Number.MAX_SAFE_INTEGER` (as stated in the problem)

---

### Implementations

#### 1. Iterative (Loop)

* Time complexity: O(n)
* Simple and easy to understand
* Safe for most use cases

#### 2. Mathematical Formula

* Time complexity: O(1)
* Most efficient approach
* Relies on arithmetic correctness

#### 3. Recursion

* Time complexity: O(n)
* Space complexity: O(n) due to call stack
* Not suitable for large inputs due to call stack limitations

---

### Trade-offs

* The **formula approach** is the fastest but depends on arithmetic correctness
* The **iterative approach** is the most readable and safest in practice
* The **recursive approach** is expressive but not practical for large inputs

---

### Problem 2 — Fancy Form
Location: `src/problem2`

**Live Demo:**
https://bolt.new/~/vitejs-vite-d5vytqsw

Tech stack:
- Vite
- React
- TypeScript

Highlights:
- Rebuilt the provided static template as a small Vite app
- Used normalized market price data to compute exchange rates
- Added validation, loading state, and swap direction interaction

Run locally:
```bash
cd src/problem2
npm install
npm run dev
```

---

### Problem 3 — Messy React

Location: `src/problem3`

#### Overview
Refactored a flawed React implementation with a focus on correctness, performance, and code clarity.

#### Key Improvements
- Identified and fixed logical inconsistencies in data processing
- Improved TypeScript typings to ensure safer and more predictable behavior
- Eliminated unnecessary computations and redundant transformations
- Refactored component structure for better readability and reuse
- Applied clearer naming and separation of concerns

#### Technical Highlights
- Optimized filtering and sorting logic to avoid wasted renders
- Ensured stable data flow and deterministic UI output
- Reduced unnecessary re-renders by controlling dependencies
- Improved hook usage and state derivation

#### Outcome
The refactored solution is:
- More maintainable and easier to reason about
- Safer with stronger type guarantees
- Closer to production-ready React standards