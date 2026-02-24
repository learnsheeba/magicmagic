import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark.jsx";
import WorldMap from "../components/WorldMap.jsx";
import { HeartStarsIcon, HeartStrikeIcon } from "../components/WishIcons.jsx";
import { api, useAuth } from "../lib/auth.jsx";

function ModeButton({ active, label, icon, onClick }) {
  return (
    <button
      className="btn"
      onClick={onClick}
      style={{
        padding: "14px 14px",
        borderColor: active ? "rgba(255,211,110,.55)" : "rgba(255,255,255,.14)",
        background: active ? "rgba(255,211,110,.12)" : "rgba(255,255,255,.06)"
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        {icon}
        <span style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 800 }}>{label}</div>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 13 }}>
            {active ? "Selected" : "Tap to select"}
          </div>
        </span>
      </span>
    </button>
  );
}

export default function AppHomePage() {
  const nav = useNavigate();
  const { user, loading, logout } = useAuth();

  const [points, setPoints] = useState([]);
  const [selectedMode, setSelectedMode] = useState(null); // 'send' | 'get'
  const [currentStatus, setCurrentStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const displayName = useMemo(() => user?.displayName || "Friend", [user]);

  useEffect(() => {
    api("/api/map")
      .then((d) => setPoints(d.points || []))
      .catch(() => setPoints([]));
  }, []);

  useEffect(() => {
    if (!user) return;
    api("/api/status")
      .then((d) => setCurrentStatus(d.status))
      .catch(() => setCurrentStatus(null));
  }, [user]);

  if (!loading && !user) return <Navigate to="/auth" replace />;

  const submit = async () => {
    if (!selectedMode) {
      setErr("Pick Send Wishes or Get Wishes first.");
      return;
    }
    setErr(null);
    setBusy(true);
    try {
      const d = await api("/api/status", { method: "POST", body: JSON.stringify({ mode: selectedMode }) });
      setCurrentStatus(d.status);
      nav("/best-wishes");
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    setErr(null);
    setBusy(true);
    try {
      const d = await api("/api/status/reset", { method: "POST" });
      setCurrentStatus(d.status);
      setSelectedMode(null);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="screen" style={{ alignItems: "stretch" }}>
      <div className="container" style={{ paddingTop: 14 }}>
        <div className="mapWrap">
          <div className="mapHeader">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <BrandMark />
              <div className="legend" aria-label="legend">
                <span className="pill">
                  <span className="dot bad" /> Needs wishes (red leaves)
                </span>
                <span className="pill">
                  <span className="dot good" /> Gives wishes (green leaves)
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <span className="pill">Hi, {displayName}</span>
              <button className="btn" style={{ width: "auto" }} onClick={() => logout()}>
                Logout
              </button>
            </div>
          </div>

          <div className="mapBody">
            <WorldMap points={points} />

            <div style={{ marginTop: 12 }} className="stack">
              <ModeButton
                active={selectedMode === "send"}
                label="SEND WISHES"
                icon={<HeartStarsIcon size={40} />}
                onClick={() => setSelectedMode("send")}
              />
              <ModeButton
                active={selectedMode === "get"}
                label="GET WISHES"
                icon={<HeartStrikeIcon size={40} />}
                onClick={() => setSelectedMode("get")}
              />

              {err ? (
                <div className="pill" style={{ borderColor: "rgba(255,93,108,.35)", color: "rgba(255,255,255,.9)" }}>
                  {err}
                </div>
              ) : null}

              <div className="btnRow">
                <button className="btn primary" onClick={submit} disabled={busy}>
                  Submit
                </button>
                <button className="btn" onClick={reset} disabled={busy}>
                  Reset
                </button>
              </div>

              <div className="footerHint">
                <span style={{ fontWeight: 700, color: "rgba(255,255,255,.85)" }}>Current status:</span>{" "}
                {currentStatus?.mode ? (
                  <>
                    sharing <span style={{ fontWeight: 800 }}>{currentStatus.mode.toUpperCase()}</span> (updated{" "}
                    {new Date(currentStatus.updatedAt).toLocaleString()})
                  </>
                ) : (
                  "not sharing"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

