# Fraction Addition

React SPA for visualizing fraction addition (like and unlike denominators). Vite, Tailwind, and chart libraries; output hosted on GitHub Pages.

**Live:** https://content-interactives.github.io/fraction_addition/

**Curriculum and standards:** [Standards.md](Standards.md)

## Stack

- React 19, Vite 7, JavaScript (JSX)
- Tailwind CSS 3
- `recharts`, `react-minimal-pie-chart` for visuals

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Build → `dist/` |
| `npm run preview` | Preview `dist/` |
| `npm run lint` | ESLint |
| `npm run deploy` | Build + `gh-pages -d dist` |

## Configuration

`vite.config.js`: `base: '/fraction_addition/'` for GitHub Pages.

## Layout

`src/main.jsx` → `App.jsx` and fraction UI under `src/`.
