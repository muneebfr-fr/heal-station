"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { GlassEffect } from "@/components/ui/liquid-glass";
import Link from "next/link";

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const ALL_GOALS = [
  { label: "All", value: "all" },
  { label: "Sleep & Recovery", value: "Sleep" },
  { label: "Skin & Glow", value: "Skin Glow" },
  { label: "Immunity", value: "Immunity" },
  { label: "Bones & Joints", value: "Bone Health" },
  { label: "Antioxidant", value: "Antioxidant" },
];

const WA_NUMBER = "923121428187";

function waUrl(product) {
  const msg = encodeURIComponent(
    `Hi! I'd like to order ${product.name} (${product.price}). Please confirm availability.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

function waBundleUrl() {
  const msg = encodeURIComponent(
    "Hi! I'd like to order the Complete Stack (Magnesium Max + Grenee + DAOS-D). Please confirm availability and pricing."
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.tags.includes(activeFilter));

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
      {/* Hero band */}
      <div
        style={{
          background:
            "linear-gradient(160deg, #C8EEEF 0%, #D8F2F4 40%, #EAF6F8 100%)",
          padding: "72px var(--container-px) 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bg orbs */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "5%",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(0,67,70,0.08)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "10%",
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(116,179,206,0.14)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1280, marginInline: "auto", position: "relative" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: 14,
            }}
          >
            The Complete Lineup
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              marginBottom: 16,
            }}
          >
            Three formulas.{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>
              All you need.
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--text-secondary)",
              maxWidth: 480,
              lineHeight: 1.75,
            }}
          >
            Every formula is clinically dosed, USP-certified, and built around the most
            bioavailable form of each active ingredient.
          </motion.p>
        </div>
      </div>

      {/* Filter bar */}
      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          padding: "36px var(--container-px) 0",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}
        >
          {ALL_GOALS.map((g) => {
            const active = activeFilter === g.value;
            return (
              <button
                key={g.value}
                onClick={() => setActiveFilter(g.value)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: active
                    ? "1.5px solid var(--primary)"
                    : "1px solid var(--border-subtle)",
                  background: active ? "var(--primary)" : "transparent",
                  color: active ? "white" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                }}
              >
                {g.label}
              </button>
            );
          })}
        </motion.div>

        {/* Product grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 32,
            marginBottom: 80,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <ShopCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bundle CTA section */}
      <div
        style={{
          background: "linear-gradient(160deg, #172A3A 0%, #004346 60%, #172A3A 100%)",
          padding: "80px var(--container-px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(116,179,206,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 640,
            marginInline: "auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--lift)",
              marginBottom: 16,
            }}
          >
            Stack Protocol
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              color: "white",
              letterSpacing: "-0.025em",
              marginBottom: 16,
              lineHeight: 1.05,
            }}
          >
            Take all three.{" "}
            <em style={{ fontStyle: "italic", color: "#74B3CE" }}>See the difference.</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              marginBottom: 36,
            }}
          >
            Magnesium Max + Grenee + DAOS-D forms the complete foundation stack: cellular
            energy, skin defence, and structural resilience, all in one protocol.
          </p>

          <GlassEffect
            tint="rgba(116,179,206,0.14)"
            border="1px solid rgba(116,179,206,0.28)"
            style={{ borderRadius: 16, padding: "24px 28px", textAlign: "left" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
                marginBottom: 24,
              }}
              className="bundle-grid"
            >
              {PRODUCTS.map((p) => (
                <div key={p.id}>
                  <div
                    style={{
                      width: 40,
                      height: 4,
                      borderRadius: 2,
                      background: p.color,
                      marginBottom: 10,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      color: "white",
                      marginBottom: 3,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {p.price}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(116,179,206,0.2)",
                paddingTop: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Complete Stack
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#C4965A",
                  }}
                >
                  PKR 6,400
                </div>
              </div>
              <a
                href={waBundleUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#1DA851",
                  color: "white",
                  borderRadius: 999,
                  padding: "12px 28px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  boxShadow: "0 4px 20px rgba(29,168,81,0.4)",
                }}
              >
                <WaIcon />
                Order All Three
              </a>
            </div>
          </GlassEffect>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .bundle-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

function WaIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ShopCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-surface)",
        border: `1px solid ${hovered ? product.color + "50" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 18px 52px ${product.colorDark}1E, 0 6px 20px rgba(0,0,0,0.07)`
          : "var(--shadow-card)",
      }}
    >
      {/* Colored band */}
      <div
        style={{
          height: 5,
          background: `linear-gradient(90deg, ${product.colorDark}, ${product.color})`,
          transition: "height 0.3s ease",
          ...(hovered && { height: 7 }),
        }}
      />

      {/* Illustration area */}
      <div
        style={{
          padding: "36px 24px 28px",
          background: `linear-gradient(145deg, ${product.colorAccent}70 0%, ${product.colorAccent}28 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          minHeight: 180,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${product.colorDark}12 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Big dosage number */}
        <div
          style={{
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 7vw, 60px)",
              fontWeight: 400,
              color: product.colorDark,
              lineHeight: 1,
              opacity: hovered ? 1 : 0.85,
              transition: "all 0.3s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          >
            {product.keyAmount}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: product.color,
              marginTop: 6,
            }}
          >
            {product.keyActive}
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "flex-end",
          }}
        >
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: `${product.colorDark}15`,
                color: product.colorDark,
                padding: "3px 9px",
                borderRadius: 999,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 22px 20px" }}>
        <div style={{ marginBottom: 10 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: 3,
              letterSpacing: "-0.015em",
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: product.color,
            }}
          >
            {product.subtitle}
          </p>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          {product.description}
        </p>

        {/* Full composition table */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden", marginBottom: 16 }}
            >
              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: 14,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: 10,
                  }}
                >
                  Full Composition
                </p>
                {product.composition.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBlock: 5,
                      borderBottom:
                        i < product.composition.length - 1
                          ? "1px solid var(--border-subtle)"
                          : "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {c.name}{" "}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          color: "var(--text-muted)",
                        }}
                      >
                        ({c.spec})
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: product.colorDark,
                      }}
                    >
                      {c.amount} {c.unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              fontWeight: 500,
              color: "var(--gold)",
            }}
          >
            {product.price}
          </span>
          <a
            href={waUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              position: "relative",
              background: hovered ? "rgba(0,155,58,0.18)" : hexToRgba(product.colorDark, 0.12),
              backdropFilter: "blur(18px) saturate(1.6)",
              WebkitBackdropFilter: "blur(18px) saturate(1.6)",
              color: hovered ? "#004d1c" : product.colorDark,
              border: "1px solid rgba(255,255,255,0.46)",
              borderRadius: 999,
              padding: "10px 20px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.25s ease",
              letterSpacing: "0.03em",
              boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.65), inset 0 -1px 0 ${hexToRgba(product.colorDark, 0.08)}, 0 3px 14px ${hexToRgba(product.colorDark, 0.13)}`,
              overflow: "hidden",
            }}
          >
            <span style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.5) 50%, transparent 72%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "-200% 0",
              animation: "glass-shimmer 3s ease infinite",
              borderRadius: "inherit",
            }} />
            <span style={{ position: "relative", display: "flex", alignItems: "center", gap: 7 }}>
              <WaIcon />
              Order Now
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
