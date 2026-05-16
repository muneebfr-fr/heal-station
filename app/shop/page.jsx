"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { GlassEffect } from "@/components/ui/liquid-glass";
import Link from "next/link";

const ALL_GOALS = [
  { label: "All", value: "all" },
  { label: "Sleep & Recovery", value: "Sleep" },
  { label: "Skin & Glow", value: "Skin Glow" },
  { label: "Immunity", value: "Immunity" },
  { label: "Bones & Joints", value: "Bone Health" },
  { label: "Antioxidant", value: "Antioxidant" },
];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [addedMap, setAddedMap] = useState({});
  const { addItem } = useCart();

  const filtered =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.tags.includes(activeFilter));

  const handleAdd = (product) => {
    addItem(product);
    setAddedMap((m) => ({ ...m, [product.id]: true }));
    setTimeout(() => setAddedMap((m) => ({ ...m, [product.id]: false })), 2000);
  };

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
                <ShopCard
                  product={product}
                  added={!!addedMap[product.id]}
                  onAdd={() => handleAdd(product)}
                />
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
              <button
                onClick={() => PRODUCTS.forEach((p) => handleAdd(p))}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: 999,
                  padding: "12px 28px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  letterSpacing: "0.03em",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 20px rgba(0,67,70,0.4)",
                }}
              >
                Add All Three
              </button>
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

function ShopCard({ product, added, onAdd }) {
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
          <button
            onClick={onAdd}
            style={{
              background: added ? "#508991" : product.colorDark,
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "10px 22px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.25s ease",
              letterSpacing: "0.03em",
            }}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
