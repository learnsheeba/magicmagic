const express = require("express");
const cors = require("cors");
const session = require("express-session");
const helmet = require("helmet");
const passport = require("passport");
require("dotenv").config();

const { configurePassport, enabledProviders } = require("./passport");
const { ensureAuthed } = require("./middleware");
const { getPublicMapPoints } = require("./mapData");
const { statusStore } = require("./statusStore");

const PORT = Number(process.env.PORT || 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "dev_secret_change_me";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
  })
);
app.use(express.json());

app.use(
  session({
    name: "mm.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    }
  })
);

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get("/health", (_req, res) => res.json({ ok: true }));

// ---- Auth routes (only register providers that are configured)
if (enabledProviders.google) {
  app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: `${FRONTEND_ORIGIN}/auth?error=google` }),
    (_req, res) => res.redirect(`${FRONTEND_ORIGIN}/app`)
  );
} else {
  app.get("/auth/google", (_req, res) =>
    res.redirect(`${FRONTEND_ORIGIN}/auth?error=google_not_configured`)
  );
}

if (enabledProviders.facebook) {
  app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: `${FRONTEND_ORIGIN}/auth?error=facebook` }),
    (_req, res) => res.redirect(`${FRONTEND_ORIGIN}/app`)
  );
} else {
  app.get("/auth/facebook", (_req, res) =>
    res.redirect(`${FRONTEND_ORIGIN}/auth?error=facebook_not_configured`)
  );
}

// Apple uses POST callback (form_post). This route exists so local dev compiles;
// you must configure Apple keys/TeamId and a verified domain for it to work.
if (enabledProviders.apple) {
  app.get("/auth/apple", passport.authenticate("apple"));
  app.post(
    "/auth/apple/callback",
    passport.authenticate("apple", { failureRedirect: `${FRONTEND_ORIGIN}/auth?error=apple` }),
    (_req, res) => res.redirect(`${FRONTEND_ORIGIN}/app`)
  );
} else {
  app.get("/auth/apple", (_req, res) =>
    res.redirect(`${FRONTEND_ORIGIN}/auth?error=apple_not_configured`)
  );
}

app.post("/auth/logout", (req, res) => {
  req.logout(() => {
    req.session?.destroy(() => {
      res.clearCookie("mm.sid");
      res.json({ ok: true });
    });
  });
});

// ---- API
app.get("/api/me", (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: req.user });
});

app.get("/api/map", (_req, res) => {
  res.json({ points: getPublicMapPoints() });
});

app.get("/api/status", ensureAuthed, (req, res) => {
  const status = statusStore.get(req.user.id) || { mode: null, updatedAt: null };
  res.json({ status });
});

app.post("/api/status", ensureAuthed, (req, res) => {
  const mode = req.body?.mode;
  if (mode !== "send" && mode !== "get") {
    return res.status(400).json({ error: "mode must be 'send' or 'get'" });
  }
  const status = statusStore.set(req.user.id, mode);
  res.json({ status });
});

app.post("/api/status/reset", ensureAuthed, (req, res) => {
  const status = statusStore.reset(req.user.id);
  res.json({ status });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

