// Public demo dataset: a few points across the world.
// "needs" => red leaf, "gives" => green leaf
const POINTS = [
  { id: "us-needs", country: "United States", kind: "needs", coordinates: [-98.5795, 39.8283] },
  { id: "br-gives", country: "Brazil", kind: "gives", coordinates: [-51.9253, -14.235] },
  { id: "gb-gives", country: "United Kingdom", kind: "gives", coordinates: [-3.436, 55.3781] },
  { id: "ng-needs", country: "Nigeria", kind: "needs", coordinates: [8.6753, 9.082] },
  { id: "in-gives", country: "India", kind: "gives", coordinates: [78.9629, 20.5937] },
  { id: "au-needs", country: "Australia", kind: "needs", coordinates: [133.7751, -25.2744] },
  { id: "jp-gives", country: "Japan", kind: "gives", coordinates: [138.2529, 36.2048] }
];

function getPublicMapPoints() {
  return POINTS;
}

module.exports = { getPublicMapPoints };

