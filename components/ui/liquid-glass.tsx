"use client";

import { ReactNode, CSSProperties } from "react";

interface GlassEffectProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tint?: string;
  blur?: number;
  border?: string;
}

export function GlassFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "fixed", width: 0, height: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      <defs>
        <filter id="glass-distortion" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.022"
            numOctaves="3"
            seed="5"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.3" result="blurred" />
          <feComposite in="blurred" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="glass-distortion-strong" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.012 0.016"
            numOctaves="4"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.5" />
        </filter>
      </defs>
    </svg>
  );
}

export function GlassEffect({
  children,
  className = "",
  style = {},
  tint,
  blur = 14,
  border,
}: GlassEffectProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        backdropFilter: `blur(${blur}px) saturate(1.5)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(1.5)`,
        background: tint || "rgba(255, 255, 255, 0.18)",
        border: border || "1px solid rgba(255, 255, 255, 0.32)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.1)",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Top-left highlight streak */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 70%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Inner gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)",
          pointerEvents: "none",
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  tint?: string;
  size?: "sm" | "md" | "lg";
}

export function GlassButton({
  children,
  onClick,
  className = "",
  style = {},
  tint,
  size = "md",
}: GlassButtonProps) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: "8px 18px", fontSize: 12 },
    md: { padding: "12px 28px", fontSize: 13 },
    lg: { padding: "16px 36px", fontSize: 14 },
  };

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        position: "relative",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        background: tint || "rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.38)",
        borderRadius: 999,
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        letterSpacing: "0.03em",
        color: "var(--text-primary)",
        transition: "all 0.25s ease",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)",
        overflow: "hidden",
        ...sizeStyles[size],
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = tint
          ? tint.replace(/[\d.]+\)$/, "0.32)")
          : "rgba(255,255,255,0.30)";
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = tint || "rgba(255,255,255,0.2)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)";
      }}
    >
      {/* Shimmer sweep on hover */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "-200% 0",
          animation: "glass-shimmer 2.5s ease infinite",
          borderRadius: "inherit",
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </button>
  );
}

interface GlassDockProps {
  items: Array<{
    label: string;
    icon: ReactNode;
    href?: string;
    onClick?: () => void;
  }>;
  style?: CSSProperties;
}

export function GlassDock({ items, style = {} }: GlassDockProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
        background: "rgba(255, 255, 255, 0.22)",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        borderRadius: 999,
        padding: "6px 8px",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href || "#"}
          onClick={item.onClick}
          title={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            color: "var(--text-primary)",
            transition: "all 0.2s ease",
            textDecoration: "none",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.35)";
            el.style.transform = "scale(1.12)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.transform = "scale(1)";
          }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
