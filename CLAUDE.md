# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the **starter** project for Mosh Hamedani's Claude Code course. Per the README, it was **intentionally shipped with a bug, poor UI, and messy code** — the course walks through fixing them with Claude. Treat existing defects as expected course material, not accidents to silently "clean up" unless the user asks.

One known defect worth knowing: transaction `amount` values are stored as strings in state (see the seed data in `src/App.jsx`), so `reduce((sum, t) => sum + t.amount, 0)` for `totalIncome` / `totalExpenses` concatenates strings instead of summing numbers. The `balance` calculation then coerces via `-`, producing wrong totals. Don't fix this unless the user asks — it's a deliberate teaching example.

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

Single-page React 19 + Vite app. The entire application is one component:

- `src/main.jsx` — React root, wraps `<App />` in `<StrictMode>`.
- `src/App.jsx` — **everything** lives here: seed transactions, form state, filter state, derived totals, submit handler, and the rendered UI (summary cards, add-transaction form, filterable transactions table). There are no sub-components, no routing, no hooks beyond `useState`, no persistence — state resets on reload.
- `src/App.css` / `src/index.css` — styles.

ESLint uses the flat-config format (`eslint.config.js`) with `@eslint/js` recommended, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` (Vite variant). The `no-unused-vars` rule ignores identifiers matching `^[A-Z_]`.
