import React from "react";

export function HeartStarsIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="mmHeartStars" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a87" />
          <stop offset="1" stopColor="#ff3f55" />
        </linearGradient>
      </defs>
      <path
        d="M32 56s-18-10.8-24.7-22.7C2 23.1 7.5 12 19 12c5.5 0 9.4 3 13 7.2C35.6 15 39.5 12 45 12c11.5 0 17 11.1 11.7 21.3C50 45.2 32 56 32 56Z"
        fill="url(#mmHeartStars)"
        opacity="0.98"
      />
      <path
        d="M49.2 13.4l1.2 3.8 3.8 1.2-3.8 1.2-1.2 3.8-1.2-3.8-3.8-1.2 3.8-1.2 1.2-3.8Z"
        fill="#ffd36e"
      />
      <path
        d="M55.5 23.5l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4Z"
        fill="#ffd36e"
        opacity="0.9"
      />
      <path
        d="M44.5 7.5l.7 2.2 2.2.7-2.2.7-.7 2.2-.7-2.2-2.2-.7 2.2-.7.7-2.2Z"
        fill="#ffd36e"
        opacity="0.85"
      />
    </svg>
  );
}

export function HeartStrikeIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="mmHeartStrike" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#77b6ff" />
          <stop offset="1" stopColor="#3c7dff" />
        </linearGradient>
      </defs>
      <path
        d="M32 56s-18-10.8-24.7-22.7C2 23.1 7.5 12 19 12c5.5 0 9.4 3 13 7.2C35.6 15 39.5 12 45 12c11.5 0 17 11.1 11.7 21.3C50 45.2 32 56 32 56Z"
        fill="url(#mmHeartStrike)"
        opacity="0.98"
      />
      <path
        d="M28 18l-6 14h9l-3 14 14-18h-9l4-10H28Z"
        fill="rgba(255,255,255,.92)"
      />
    </svg>
  );
}

