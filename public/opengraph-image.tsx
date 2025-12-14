import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Parador - Luxury Stays";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(to bottom right, #0F172A, #334155)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D97706"
            strokeWidth="1.5"
          >
            <path d="M3 21h18" />
            <path d="M9 8h1" />
            <path d="M14 8h1" />
            <path d="M9 12h1" />
            <path d="M14 12h1" />
            <path d="M9 16h1" />
            <path d="M14 16h1" />
            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
          </svg>
          <span style={{ fontFamily: "serif" }}>Parador</span>
        </div>
        <p style={{ fontSize: 32, marginTop: 20, color: "#D97706" }}>
          Luxury Stays & Premium Rentals
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
