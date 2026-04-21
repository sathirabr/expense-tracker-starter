# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the **starter** project for Mosh Hamedani's Claude Code course. Per the README, it was **intentionally shipped with a bug, poor UI, and messy code** — the course walks through fixing them with Claude. Treat existing defects as expected course material, not accidents to silently "clean up" unless the user asks.

Note: transaction `amount` is stored as a number in state. The `<input type="number">` in `TransactionForm` yields a string, so the submit handler coerces it with `Number(amount)` before calling `onAdd` — keep that coercion if you touch the submit path.

## Commands

```bash
npm install        # install deps
npm run dev        # start Vite dev server at http://localhost:5173
npm run build      # production build to dist/
npm run lint       # ESLint flat config across the repo
npm run preview    # preview the built bundle
```

No test framework is configured — there is no `test` script and no testing library in `package.json`. If the user asks to run tests, confirm before adding a framework.

## Architecture

Single-page React 19 + Vite app. No routing, no persistence — state resets on reload.

- `src/main.jsx` — React root, wraps `<App />` in `<StrictMode>`.
- `src/App.jsx` — owns the canonical `transactions` array (seed data) and the shared `categories` list. Holds no UI state. Wires the three child components together via props and an `addTransaction` callback.
- `src/Summary.jsx` — receives `transactions` and derives `totalIncome` / `totalExpenses` / `balance` itself. Pure render.
- `src/TransactionForm.jsx` — owns its own form state (`description`, `amount`, `type`, `category`). Calls `onAdd(transaction)` on submit and resets its inputs.
- `src/TransactionList.jsx` — owns its own filter state (`filterType`, `filterCategory`). Receives `transactions` + `categories` and renders the filtered table.
- `src/App.css` / `src/index.css` — styles.

State-ownership rule: `App` owns persistent data; each child component owns its own *local* UI state (form inputs, filter selections). When adding a feature, prefer keeping new local state inside the component that uses it; only lift to `App` if another sibling needs to read it.

ESLint uses the flat-config format (`eslint.config.js`) with `@eslint/js` recommended, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` (Vite variant). The `no-unused-vars` rule ignores identifiers matching `^[A-Z_]`.
