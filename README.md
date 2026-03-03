# Magic Magic

Mobile-first wishes map with React (frontend) + Node/Express (backend).

## Quick start

From the project root (`magicmagic`):

```bash
cd magicmagic
npm install
npm run app
```

Or use `npm run dev` for the same result.

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Deploy to Vercel (frontend + backend)

This repo deploys as a single Vercel project:

- Vite React build is served from `frontend/dist`
- Express backend runs as a Vercel Serverless Function (`api/index.js`)
- Requests to `/api/*` and `/auth/*` are rewritten to the serverless backend (see `vercel.json`)

### Vercel settings

- **Framework preset**: Other
- **Build command**: uses `vercel.json` (`npm run build -w frontend`)
- **Output directory**: uses `vercel.json` (`frontend/dist`)

### Vercel environment variables

Set these in your Vercel Project Settings → Environment Variables:

- `FRONTEND_ORIGIN`: `https://<your-vercel-domain>` (example: `https://magicmagic.vercel.app`)
- `SESSION_SECRET`: a long random string
- OAuth provider secrets (see below): Google/Facebook/Apple

After deploy, your API should be reachable at:

- `https://<your-vercel-domain>/api/me`

(If you hit `.../frontend/api/me` you’ll get `Not Found` — the correct path is `/api/me`.)

## OAuth setup (Google / Facebook / Apple)

Backend env vars live in `backend/.env` (copy from `backend/.env.example`).

- **Google**:
  - Backend callback: `http://localhost:4000/auth/google/callback`
  - You must set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- **Facebook**:
  - Backend callback: `http://localhost:4000/auth/facebook/callback`
  - You must set `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET`
- **Apple**:
  - Apple Sign-In requires a paid Apple Developer account and key material.
  - Set `APPLE_CLIENT_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY`

## App flow

1. Landing screen → tap **Get Started**
2. Choose provider (Google/Apple/Facebook)
3. After auth → Map screen shows **red leaves (needs wishes)** and **green leaves (gives wishes)**
4. Tap **SEND WISHES** (heart with stars) or **GET WISHES** (heart with strike)
5. Tap **Submit** to share status or **Reset** to stop sharing
6. “Best Wishes!!!” confirmation screen
