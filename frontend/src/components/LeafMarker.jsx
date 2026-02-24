import React from "react";

export default function LeafMarker({ kind }) {
  const fill = kind === "gives" ? "#59d18f" : "#ff5d6c";
  const stroke = "rgba(0,0,0,.25)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.5 3.5c-7.3.4-12.6 3.9-15.2 9.4-1.6 3.4-1.7 6.7-1.7 7.7 0 .5.4.9.9.9 1 0 4.3-.1 7.7-1.7 5.5-2.6 9-7.9 9.4-15.2.03-.55-.42-1-.97-1Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="0.6"
      />
      <path d="M6.2 18.2c4.3-4.7 7.4-7.3 12.1-10.1" stroke="rgba(255,255,255,.72)" strokeWidth="1.2" />
    </svg>
  );
}

