import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";
import ProviderButton from "../components/ProviderButton.jsx";

export default function AuthPage() {
  const nav = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const error = params.get("error");

  return (
    <div className="screen">
      <div className="container">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <BrandMark />
            <button className="btn" style={{ width: "auto" }} onClick={() => nav("/")}>
              Back
            </button>
          </div>

          <h1 className="title" style={{ marginTop: 14 }}>
            Sign in using
          </h1>
          <p className="subtitle">Choose a provider to authorize and continue.</p>

          {error ? (
            <div className="pill" style={{ color: "rgba(255,255,255,.9)", borderColor: "rgba(255,93,108,.35)" }}>
              Sign-in failed: {error}. Please try again.
            </div>
          ) : null}

          <div className="stack" style={{ marginTop: 10 }}>
            <ProviderButton provider="google" onClick={() => (window.location.href = "/auth/google")} />
            <ProviderButton provider="apple" onClick={() => (window.location.href = "/auth/apple")} />
            <ProviderButton provider="facebook" onClick={() => (window.location.href = "/auth/facebook")} />
          </div>

          <div className="footerHint">
            If you haven’t configured OAuth keys yet, Google/Facebook/Apple buttons will fail until backend env vars are set.
          </div>
        </div>
      </div>
    </div>
  );
}

