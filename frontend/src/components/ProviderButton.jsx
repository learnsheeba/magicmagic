import React from "react";

const PROVIDERS = {
  google: { label: "Google", bg: "rgba(255,255,255,.06)" },
  apple: { label: "Apple", bg: "rgba(255,255,255,.06)" },
  facebook: { label: "Facebook", bg: "rgba(255,255,255,.06)" }
};

function ProviderIcon({ provider }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" };
  if (provider === "google") {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M21.6 12.227c0-.75-.067-1.47-.192-2.159H12v4.084h5.377a4.6 4.6 0 0 1-1.994 3.015v2.65h3.23c1.89-1.74 2.987-4.303 2.987-7.59Z"
          fill="#FFD36E"
        />
        <path
          d="M12 22c2.7 0 4.964-.895 6.619-2.423l-3.23-2.65c-.895.6-2.041.955-3.389.955-2.603 0-4.808-1.757-5.596-4.118H3.065v2.73A10 10 0 0 0 12 22Z"
          fill="#59D18F"
        />
        <path
          d="M6.404 13.764a5.99 5.99 0 0 1 0-3.528v-2.73H3.065a10 10 0 0 0 0 8.988l3.339-2.73Z"
          fill="#6699FF"
        />
        <path
          d="M12 6.118c1.469 0 2.788.505 3.827 1.498l2.87-2.87C16.957 3.122 14.7 2 12 2A10 10 0 0 0 3.065 7.506l3.339 2.73c.788-2.36 2.993-4.118 5.596-4.118Z"
          fill="#FF5D6C"
        />
      </svg>
    );
  }
  if (provider === "facebook") {
    return (
      <svg {...common} aria-hidden="true">
        <path
          d="M14 13.5h2.5l1-3H14V8.75c0-.86.28-1.25 1.1-1.25H17V4.1c-.54-.07-1.69-.2-3.03-.2-2.8 0-4.47 1.65-4.47 4.7V10.5H7v3h2.5V22H14v-8.5Z"
          fill="#8AB4FF"
        />
      </svg>
    );
  }
  // apple
  return (
    <svg {...common} aria-hidden="true">
      <path
        d="M16.8 13.9c0-2 1.6-3 1.7-3.1-1-.5-2-1.1-3.3-1.2-1.4-.2-2.7.8-3.4.8-.7 0-1.7-.8-2.9-.8-1.4 0-2.7.8-3.4 2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.1 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 2-.9 2.7-1.9.8-1.2 1.2-2.4 1.2-2.5-.1 0-2-1-2-4Z"
        fill="rgba(255,255,255,.88)"
      />
      <path
        d="M14.8 6.3c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3Z"
        fill="rgba(255,255,255,.65)"
      />
    </svg>
  );
}

export default function ProviderButton({ provider, onClick }) {
  const p = PROVIDERS[provider];
  return (
    <button className="btn" style={{ justifyContent: "space-between", background: p.bg }} onClick={onClick}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <ProviderIcon provider={provider} />
        Continue with {p.label}
      </span>
      <span style={{ color: "rgba(255,255,255,.55)", fontWeight: 800 }}>→</span>
    </button>
  );
}

