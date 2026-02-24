import React from "react";
import { useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="screen">
      <div className="container">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <BrandMark />
            <span className="pill">Magic Magic</span>
          </div>

          <h1 className="title" style={{ marginTop: 14 }}>
            What are you waiting for?
          </h1>
          <p className="subtitle">
            Share a wish with the world, or ask for one when you need it. Fast, anonymous-feeling, and designed for phones
            first.
          </p>

          <button className="btn primary" onClick={() => nav("/auth")}>
            Get Started
          </button>

          <div className="footerHint">Tip: you can reset anytime to stop sharing your status.</div>
        </div>
      </div>
    </div>
  );
}

