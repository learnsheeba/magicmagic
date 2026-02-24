import React from "react";

export default function BrandMark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        aria-hidden="true"
        style={{
          width: 42,
          height: 42,
          borderRadius: 14,
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,211,110,1), rgba(255,93,108,.35) 55%, rgba(102,153,255,.25) 100%)",
          border: "1px solid rgba(255,255,255,.16)",
          boxShadow: "0 12px 28px rgba(0,0,0,.25)"
        }}
      />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 800, letterSpacing: 0.2 }}>Magic</div>
        <div style={{ color: "rgba(255,255,255,.68)", fontWeight: 650, fontSize: 13 }}>Wishes Map</div>
      </div>
    </div>
  );
}

