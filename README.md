# Magic Magic

Mobile-first wishes map with React (frontend) + Node/Express (backend).

## Quick start

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

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
