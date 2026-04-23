---
name: Expense Tracker Starter — Project Context
description: Key facts about the expense-tracker-starter project relevant to future code reviews
type: project
---

Intentional course bug: seed transaction id:4 "Freelance Work" has type "expense" but category "salary", so it is misclassified — it appears in the expense column of Summary and the bar chart, and is filtered under the expense type but also categorized under salary. This is the seeded intentional defect.

**Why:** Mosh Hamedani's Claude Code course ships the project with intentional bugs as teaching material. CLAUDE.md explicitly documents this.
**How to apply:** Do not silently fix seed data bugs. Flag them in reviews as the intentional course bug rather than an oversight.

Other standing facts:
- React 19 + Vite 7, Recharts 3.x. No test framework. No routing. No persistence.
- State ownership rule from CLAUDE.md: App owns persistent data; children own local UI state (filters, form inputs). Only lift if a sibling needs to read it.
- Amount stored as number; TransactionForm coerces with Number(amount) on submit — keep that coercion.
- ESLint flat config; no-unused-vars ignores ^[A-Z_] pattern (covers COLORS constant in CategoryChart).
- `addTransaction` and `removeTransaction` in App use stale-closure pattern (reading `transactions` directly instead of functional updater) — minor but worth noting in reviews.
- No `<label>` elements on any form inputs; all inputs are placeholder-only — accessibility gap.
- `window.confirm` used for delete UX — blocks the main thread, not testable; intentional simplicity for course.
- Dollar amounts formatted with template literals (`$${amount}`) — no toFixed(2), so floating-point amounts display raw (e.g., 1.1+2.2 = 3.3000000000000003).
- Balance card has no colour coding (red/green) — minor UX gap compared to income/expense cards.
- Empty-header `<th></th>` for the delete column has no `aria-label` — a11y gap.
- CategoryChart bar colors cycle via index mod; stable because `entry.name` used as Cell key.
