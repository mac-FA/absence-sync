# FINDINGS — Absence Calendar

Canonical record of the build. Appended to at every checkpoint.

- **Repo:** `mac-FA/absence-sync`
- **Live URL:** https://mac-fa.github.io/absence-sync/
- **Stack:** Vite + React + TypeScript + Tailwind (frontend) · Supabase Auth + Postgres (backend) · GitHub Pages via GitHub Actions.

## On the anon key being public-safe

The Supabase **Project URL** and **anon (publishable) key** are *designed* to live in public
frontend code — they are shipped in the browser bundle by design and are **not secrets**. They are
stored as GitHub repo **Variables** (not Secrets) and baked into the build. All real protection comes
from **Row-Level Security (RLS)** policies on the database (defined at CP3). A leaked anon key on its
own grants nothing that RLS + locked-down signups don't already gate.

---

## CP1 — Fresh repo, scaffold, and a live deploy

**Status:** ✅ LIVE at https://mac-fa.github.io/absence-sync/ (HTTP 200, JS + CSS assets 200,
renders correctly at mobile width 390×844).

**Deploy gotcha hit:** the *first* workflow run's `deploy` job failed with
`Creating Pages deployment failed … Ensure GitHub Pages has been enabled` — a race because Pages
hadn't been turned on yet when the job ran. Fixed by enabling Pages (Source = GitHub Actions) via the
API and re-running the workflow; second run succeeded. Repo is **public** so Pages works on a free
account; the frontend is public-safe by design (see anon-key note above).

### Dependency versions (installed)

| Package | Pinned | Notes |
|---|---|---|
| vite | ^8.0.14 | |
| react / react-dom | ^19.2.0 | |
| react-router-dom | ^7.16.0 | `HashRouter` used |
| typescript | ^5.9.3 | (registry briefly mis-reported a "6.0.3"; latest real is 5.9.3) |
| tailwindcss | ^4.3.0 | Tailwind v4 via `@tailwindcss/vite` plugin (no PostCSS config needed) |
| @tailwindcss/vite | ^4.3.0 | |
| @vitejs/plugin-react | ^6.0.2 | supports vite 8 |
| @supabase/supabase-js | ^2.106.2 | added now, wired at CP2 |

`npm install` → 169 packages, 0 vulnerabilities reported. Node 22.17, npm 11.5.2.

### Classic GitHub Pages failure points — handled

- **Vite base path:** `base: '/absence-sync/'` in `vite.config.ts`. Verified the built
  `dist/index.html` references assets at `/absence-sync/assets/...` (not `/assets/...`).
- **Routing:** `HashRouter` in `src/main.tsx` — sidesteps the Pages SPA 404 problem; no `404.html`
  redirect hack needed.
- **Deploy:** `.github/workflows/deploy.yml` builds `dist/` and publishes via
  `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4` (Pages source = GitHub Actions).
  Supabase URL/anon key injected from repo **Variables** at build time.

### Build result

`npm run build` (`tsc -b && vite build`) succeeded. Output: `dist/index.html` +
`dist/assets/index-*.js` + `dist/assets/index-*.css`.

### Note for later

Built-in Supabase email has low rate limits and may land in spam — fine for four people. Custom SMTP
is a later option if delivery is flaky.

### Manual tasks outstanding for Mac (see CP2/CP3)

- Create Supabase project (EU region), copy URL + anon key.
- Auth → Providers → Email: keep enabled, **disable open signups**.
- Auth → URL Configuration: Site URL = `https://mac-fa.github.io/absence-sync/`, add same to redirect
  allowlist (+ `http://localhost:5173` for local testing).
- Invite the four users.
- GitHub → Settings → Pages → Source = **GitHub Actions**.
- GitHub → Settings → Secrets and variables → Actions → **Variables**: add `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` (repo Variables, public-safe).
