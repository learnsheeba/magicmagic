import React, { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import LeafMarker from "./LeafMarker.jsx";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ points }) {
  const hostRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topology) => {
        const obj = topology?.objects?.countries;
        const fc = obj ? feature(topology, obj) : null;
        if (mounted) setCountries(fc);
      })
      .catch(() => setCountries(null));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hostRef.current) return;
    const el = hostRef.current;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(320, Math.floor(rect.width));
      const h = Math.max(240, Math.floor(w * (9 / 16)));
      setSize({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const projection = useMemo(() => {
    if (!size.w || !size.h) return null;
    return geoMercator().scale(size.w / 6.1).translate([size.w / 2, size.h / 1.45]);
  }, [size.w, size.h]);

  const path = useMemo(() => (projection ? geoPath(projection) : null), [projection]);

  const projectedPoints = useMemo(() => {
    if (!projection) return [];
    return (points || [])
      .map((p) => {
        const xy = projection(p.coordinates);
        if (!xy) return null;
        return { ...p, x: xy[0], y: xy[1] };
      })
      .filter(Boolean);
  }, [points, projection]);

  return (
    <div ref={hostRef} style={{ width: "100%", aspectRatio: "16 / 9", minHeight: 260 }}>
      <svg
        width={size.w || "100%"}
        height={size.h || "100%"}
        viewBox={`0 0 ${size.w || 800} ${size.h || 450}`}
        role="img"
        aria-label="World map"
      >
        <rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0)" />

        {countries && path
          ? countries.features.map((f) => (
              <path
                key={f.id}
                d={path(f)}
                fill="rgba(148, 163, 184, .12)"
                stroke="rgba(148, 163, 184, .9)"
                strokeWidth="0.35"
              />
            ))
          : null}

        {projectedPoints.map((p) => (
          <g key={p.id} transform={`translate(${p.x - 9}, ${p.y - 18})`}>
            <LeafMarker kind={p.kind} />
          </g>
        ))}
      </svg>
    </div>
  );
}

