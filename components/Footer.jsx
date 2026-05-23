"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--dark)",
        color: "rgba(214,243,244,0.75)",
        padding: "64px 0 36px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 56,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(214,243,244,0.08)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #004346, #508991)",
                  animation: "liquid-morph 6s ease-in-out infinite",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L12 7M12 17L12 22M2 12L7 12M17 12L22 12" stroke="white" strokeWidth={2} strokeLinecap="round" />
                  <circle cx={12} cy={12} r={3} fill="white" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 400,
                  color: "rgba(214,243,244,0.95)",
                  letterSpacing: "-0.01em",
                }}
              >
                Heal Station
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                lineHeight: 1.75,
                color: "rgba(214,243,244,0.55)",
                maxWidth: 240,
                marginBottom: 24,
              }}
            >
              Pharmaceutical-grade supplements formulated for what your body actually absorbs.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["USP", "GMP", "LAB"].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    color: "rgba(116,179,206,0.8)",
                    border: "1px solid rgba(116,179,206,0.2)",
                    borderRadius: 999,
                    padding: "4px 10px",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(214,243,244,0.4)",
                marginBottom: 20,
              }}
            >
              Products
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Magnesium Max", "Grenee", "DAOS-D"].map((link) => (
                <Link
                  key={link}
                  href="/shop"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(214,243,244,0.65)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(214,243,244,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(214,243,244,0.65)")}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(214,243,244,0.4)",
                marginBottom: 20,
              }}
            >
              Company
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["About", "Science", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(214,243,244,0.65)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(214,243,244,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(214,243,244,0.65)")}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(214,243,244,0.4)",
                marginBottom: 20,
              }}
            >
              Support
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["FAQ", "/faq"], ["Shipping", "/shipping"], ["Returns", "/returns"], ["Privacy", "/privacy"]].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(214,243,244,0.65)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(214,243,244,0.95)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(214,243,244,0.65)")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "rgba(214,243,244,0.35)",
              letterSpacing: "0.06em",
            }}
          >
            © 2025 Heal Station. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "rgba(214,243,244,0.25)",
              letterSpacing: "0.08em",
            }}
          >
            Pharmaceutical-grade formulations · USP Certified
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
