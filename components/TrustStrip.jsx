"use client";

import { motion } from "framer-motion";

const BADGES = [
  { label: "USP Certified", icon: <ShieldIcon /> },
  { label: "Lab Tested", icon: <FlaskIcon /> },
  { label: "Pharmaceutical Grade", icon: <StarIcon /> },
  { label: "Zero Fillers", icon: <LeafIcon /> },
  { label: "Clinically Dosed", icon: <ScaleIcon /> },
  { label: "Bioavailability Focused", icon: <MoleculeIcon /> },
];

const doubled = [...BADGES, ...BADGES];

export default function TrustStrip() {
  return (
    <div
      style={{
        background: "var(--primary)",
        paddingBlock: 18,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Gradient fades */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: "linear-gradient(to right, var(--primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: "linear-gradient(to left, var(--primary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 28s linear infinite",
        }}
      >
        {doubled.map((badge, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginRight: 48,
              flexShrink: 0,
            }}
          >
            <span style={{ color: "rgba(214,243,244,0.7)", flexShrink: 0 }}>
              {badge.icon}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(214,243,244,0.9)",
                whiteSpace: "nowrap",
              }}
            >
              {badge.label}
            </span>
            <span
              style={{
                color: "rgba(196,150,90,0.6)",
                marginLeft: 12,
                fontSize: 8,
              }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function FlaskIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M8 3l-5 13a2 2 0 0 0 1.84 2.76h14.32A2 2 0 0 0 21 16L16 3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M5 8l7-5 7 5M5 16l7-5 7 5" />
    </svg>
  );
}
function MoleculeIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={2} />
      <circle cx={4} cy={6} r={2} />
      <circle cx={20} cy={6} r={2} />
      <circle cx={4} cy={18} r={2} />
      <circle cx={20} cy={18} r={2} />
      <line x1="6" y1="6" x2="10" y2="11" />
      <line x1="18" y1="6" x2="14" y2="11" />
      <line x1="6" y1="18" x2="10" y2="13" />
      <line x1="18" y1="18" x2="14" y2="13" />
    </svg>
  );
}
