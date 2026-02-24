const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const AppleStrategy = require("passport-apple");

const enabledProviders = {
  google: false,
  facebook: false,
  apple: false
};

function normalizeUser(provider, profile) {
  const email =
    profile?.emails?.[0]?.value ||
    profile?.email ||
    (profile?._json && profile._json.email) ||
    null;

  return {
    id: `${provider}:${profile.id}`,
    provider,
    displayName: profile.displayName || profile?.name?.givenName || "User",
    email,
    photoUrl: profile?.photos?.[0]?.value || null
  };
}

function configurePassport(passport) {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback"
        },
        (_accessToken, _refreshToken, profile, done) => done(null, normalizeUser("google", profile))
      )
    );
    enabledProviders.google = true;
  }

  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: process.env.FACEBOOK_CALLBACK_URL || "/auth/facebook/callback",
          profileFields: ["id", "displayName", "photos", "email"]
        },
        (_accessToken, _refreshToken, profile, done) => done(null, normalizeUser("facebook", profile))
      )
    );
    enabledProviders.facebook = true;
  }

  // Apple requires paid Apple Developer account + keys. Keep it optional for local dev.
  // Required env: APPLE_CLIENT_ID, APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY (PEM)
  if (
    process.env.APPLE_CLIENT_ID &&
    process.env.APPLE_TEAM_ID &&
    process.env.APPLE_KEY_ID &&
    process.env.APPLE_PRIVATE_KEY
  ) {
    passport.use(
      new AppleStrategy(
        {
          clientID: process.env.APPLE_CLIENT_ID,
          teamID: process.env.APPLE_TEAM_ID,
          keyID: process.env.APPLE_KEY_ID,
          privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          callbackURL: process.env.APPLE_CALLBACK_URL || "/auth/apple/callback",
          scope: ["name", "email"]
        },
        (_accessToken, _refreshToken, idToken, profile, done) => {
          const p = profile || { id: idToken?.sub || "apple_user", displayName: "Apple User" };
          done(null, normalizeUser("apple", p));
        }
      )
    );
    enabledProviders.apple = true;
  }
}

module.exports = { configurePassport, enabledProviders };

