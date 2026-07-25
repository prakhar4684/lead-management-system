# LeadDesk Mini

Frontend-only Lead Management System UI. Built with React (Vite), Tailwind CSS v4,
React Router, React Icons, and Framer Motion. No backend, no API calls — all data
is local dummy data, ready for you to wire up to your own Express + MongoDB API.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Routes

- `/` — Landing page (hero, features, lead submission form, footer)
- `/login` — Admin login (UI only, no auth logic — submits straight to `/dashboard`)
- `/dashboard` — Admin dashboard with stats, searchable leads table,
  status dropdowns, a view drawer, and a delete confirmation modal
- Any other path — 404 page

## Wiring up your backend

All integration points are centralized in `src/services/api.js`, currently
placeholder functions that log a warning and resolve with empty data. Dummy data
used across the UI lives in `src/data/dummyLeads.js`. Replace both with real
fetch/axios calls to your Express + MongoDB API when ready.

## Structure

```
src/
 ├── components/   Navbar, Hero, Footer, LeadForm, Sidebar, DashboardNavbar,
 │                 LeadTable, SearchBar, StatusDropdown, DeleteModal, Loader
 ├── pages/        Landing, Login, Dashboard, NotFound
 ├── layouts/      DashboardLayout
 ├── data/         dummyLeads.js (dummy leads + stats)
 ├── services/     api.js (empty placeholders for your backend)
 ├── App.jsx
 └── main.jsx
```

## Theme

Dark, minimal SaaS theme (black background, `#09090b` cards, `#3080FF` accent,
`#53EAFD` secondary accent, `#FF2357` danger) defined as CSS variables in
`src/index.css` via Tailwind v4's `@theme` block — edit the tokens there to
retheme the whole app.
