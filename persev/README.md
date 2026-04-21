# Perseverantia Static Showcase

This folder contains a fully static showcase version of Perseverantia under the `/persev` route.

## What This Version Does

- Works with static hosting (`npx serve`) and route folders (`/persev/<route>/index.html`).
- Simulates backend APIs in the browser using localStorage.
- Preserves major flows: school login, registration forms, panel stats, leaderboard updates, admin dashboard, leaderboard admin actions.
- Keeps all files self-contained inside `/persev`.

## Run Locally

From the repository root:

```bash
npx serve
```

Open:

- `http://localhost:3000/persev/` (or whichever port `serve` prints)

## Demo Credentials

- School users: `user1` to `user10`
- School passwords: `pass1` to `pass10`
- Admin login: `admin` / `admin123`

## Data Persistence

- All dynamic data is stored in localStorage key: `persev.static.v1`
- Clear browser localStorage to reset the simulated data.

## Core Static Runtime Files

- `assets/app.js`: fake API layer + localStorage data model
- `assets/pages.js`: route normalization, auth redirects, logout handling
- `assets/app.css`: lightweight static showcase helpers
