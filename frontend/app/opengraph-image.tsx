import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JanMitra AI — Smart Governance Powered by AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #080e1c 0%, #0f1e3d 50%, #080e1c 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #3b82f6 0%, #22d3ee 100%)",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 900,
            color: "white",
            marginBottom: 32,
          }}
        >
          JM
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: "-2px",
          }}
        >
          JanMitra AI
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          Smart Governance Powered by AI
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["200+ Schemes", "12+ Languages", "1M+ Citizens"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 20px",
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: 100,
                color: "#60a5fa",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            color: "#475569",
            fontSize: 18,
          }}
        >
          janmitra.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
