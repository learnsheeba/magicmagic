import React from "react";
import { useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";

export default function BestWishesPage() {
  const nav = useNavigate();

  return (
    <div className="screen">
      <div className="container">
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BrandMark />
          </div>

          <h1 className="title" style={{ marginTop: 14 }}>
            Best Wishes!!!
          </h1>
          <p className="subtitle">
            Your status has been shared. If you’re giving wishes — thank you. If you’re receiving wishes — you’re not
            alone.
          </p>

          <button className="btn primary" onClick={() => nav("/app")}>
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}

