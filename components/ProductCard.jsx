"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { GlassEffect } from "@/components/ui/liquid-glass";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "100%" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--bg-surface)",
          border: `1px solid ${hovered ? product.color + "55" : "var(--border-subtle)"}`,
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "default",
          transition: "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
          boxShadow: hovered
            ? `0 20px 60px ${product.colorDark}22, 0 8px 24px rgba(0,0,0,0.08)`
            : "var(--shadow-card)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          position: "relative",
        }}
      >
        {/* Radial glow on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${product.colorAccent}60, transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Illustration area */}
        <div
          style={{
            background: `linear-gradient(150deg, ${product.colorAccent}90 0%, ${product.colorAccent}35 100%)`,
            padding: "40px 32px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minHeight: 220,
            overflow: "hidden",
          }}
        >
          {/* Subtle grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${product.colorDark}15 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          <ProductIllustration product={product} animated={hovered} />

          {/* Tags */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {product.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: `${product.colorDark}18`,
                  color: product.colorDark,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: `1px solid ${product.colorDark}22`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Glass composition panel — slides up on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              >
                <GlassEffect
                  tint={`${product.colorAccent}55`}
                  border={`1px solid ${product.color}40`}
                  blur={16}
                  style={{ borderRadius: 0 }}
                >
                  <div style={{ padding: "14px 16px" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 8,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: product.colorDark,
                        marginBottom: 8,
                        opacity: 0.75,
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
                          alignItems: "center",
                          paddingBlock: 5,
                          borderBottom:
                            i < product.composition.length - 1
                              ? `1px solid ${product.colorDark}18`
                              : "none",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 11,
                            color: "var(--text-secondary)",
                          }}
                        >
                          {c.name}
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 9,
                              color: "var(--text-muted)",
                              marginLeft: 4,
                            }}
                          >
                            ({c.spec})
                          </span>
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            fontWeight: 500,
                            color: product.colorDark,
                          }}
                        >
                          {c.amount} {c.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassEffect>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card body */}
        <div
          style={{
            padding: "24px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.5vw, 24px)",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: 4,
                letterSpacing: "-0.01em",
              }}
            >
              {product.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: product.color,
              }}
            >
              {product.subtitle}
            </p>
          </div>

          {/* Key active */}
          <div
            style={{
              background: `${product.colorAccent}50`,
              border: `1px solid ${product.colorDark}14`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 17,
                fontWeight: 500,
                color: product.colorDark,
                lineHeight: 1,
              }}
            >
              {product.keyAmount}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                color: "var(--text-secondary)",
                lineHeight: 1.4,
              }}
            >
              {product.keyActive}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.72,
              marginBottom: 20,
              flex: 1,
            }}
          >
            {product.description}
          </p>

          {/* Price + CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
              onClick={handleAdd}
              style={{
                background: added ? "#508991" : product.colorDark,
                color: "white",
                border: "none",
                borderRadius: 999,
                padding: "10px 22px",
                fontSize: 12,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.28s ease",
                letterSpacing: "0.04em",
                flexShrink: 0,
                boxShadow: hovered ? `0 6px 20px ${product.colorDark}40` : "none",
              }}
            >
              {added ? "✓ Added" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductIllustration({ product, animated }) {
  if (product.id === 1) return <MagnesiumIllustration animated={animated} color={product.color} colorDark={product.colorDark} />;
  if (product.id === 2) return <GreneeIllustration animated={animated} color={product.color} colorDark={product.colorDark} />;
  return <DaosDIllustration animated={animated} color={product.color} colorDark={product.colorDark} />;
}

function MagnesiumIllustration({ animated, color, colorDark }) {
  return (
    <svg width={150} height={150} viewBox="0 0 140 140" fill="none">
      <motion.rect
        x={42} y={48} width={56} height={44} rx={22}
        fill={color} opacity={0.88}
        animate={animated ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1={70} y1={50} x2={70} y2={90}
        stroke="white" strokeWidth={1.5} opacity={0.45}
        animate={animated ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {[[28, 28], [112, 32], [22, 102], [116, 96], [70, 16], [70, 124]].map(([x, y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r={3.2}
          fill={color} opacity={0.4}
          animate={animated ? { scale: [1, 1.35, 1], opacity: [0.4, 0.72, 0.4] } : {}}
          transition={{ duration: 2.2, delay: i * 0.28, repeat: Infinity }}
        />
      ))}
      <line x1="28" y1="28" x2="42" y2="58" stroke={color} strokeWidth={0.9} opacity={0.22} />
      <line x1="112" y1="32" x2="98" y2="58" stroke={color} strokeWidth={0.9} opacity={0.22} />
      <line x1="22" y1="102" x2="42" y2="86" stroke={color} strokeWidth={0.9} opacity={0.22} />
      <line x1="116" y1="96" x2="98" y2="86" stroke={color} strokeWidth={0.9} opacity={0.22} />
      <text x={70} y={75} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize={14} fontWeight={500} fill="white" opacity={0.92}>Mg</text>
    </svg>
  );
}

function GreneeIllustration({ animated, color, colorDark }) {
  return (
    <svg width={150} height={150} viewBox="0 0 140 140" fill="none">
      <motion.g
        animate={animated ? { y: [0, -6, 0] } : { y: 0 }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx={70} cy={70} rx={30} ry={18} fill={color} opacity={0.82} />
        <ellipse cx={70} cy={70} rx={30} ry={18} fill="none" stroke="white" strokeWidth={1} opacity={0.28} />
        <ellipse cx={62} cy={65} rx={11} ry={5.5} fill="white" opacity={0.18} />
      </motion.g>
      {[24, 38, 54].map((r, i) => (
        <motion.circle
          key={i} cx={70} cy={70} r={r + 18}
          stroke={color} strokeWidth={0.6} fill="none" opacity={0.14 - i * 0.03}
          strokeDasharray="4 5"
          animate={animated ? { rotate: [0, 360] } : {}}
          style={{ transformOrigin: "70px 70px" }}
          transition={{ duration: 9 + i * 3.5, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {[[30, 28], [110, 30], [26, 110], [114, 108]].map(([x, y], i) => (
        <motion.polygon
          key={i}
          points={`${x},${y-6} ${x+2},${y-2} ${x+6},${y} ${x+2},${y+2} ${x},${y+6} ${x-2},${y+2} ${x-6},${y} ${x-2},${y-2}`}
          fill={color} opacity={0.38}
          animate={animated ? { scale: [1, 1.45, 1], opacity: [0.38, 0.78, 0.38] } : {}}
          transition={{ duration: 2.2, delay: i * 0.45, repeat: Infinity }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      <text x={70} y={75} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize={12} fontWeight={500} fill="white" opacity={0.92}>GSH</text>
    </svg>
  );
}

function DaosDIllustration({ animated, color, colorDark }) {
  return (
    <svg width={150} height={150} viewBox="0 0 140 140" fill="none">
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 70 + Math.cos(angle) * 28;
        const y1 = 70 + Math.sin(angle) * 28;
        const x2 = 70 + Math.cos(angle) * 46;
        const y2 = 70 + Math.sin(angle) * 46;
        return (
          <motion.line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color} strokeWidth={2.2} strokeLinecap="round" opacity={0.52}
            animate={animated ? { opacity: [0.52, 0.92, 0.52] } : {}}
            transition={{ duration: 2, delay: i * 0.18, repeat: Infinity }}
          />
        );
      })}
      <motion.circle
        cx={70} cy={70} r={24}
        fill={color} opacity={0.85}
        animate={animated ? { r: [24, 26, 24] } : {}}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={70} y={76} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize={14} fontWeight={500} fill="white" opacity={0.95}>D₃</text>
      <motion.circle
        cx={108} cy={42} r={16}
        fill={colorDark} opacity={0.72}
        animate={animated ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={108} y={47} textAnchor="middle" fontFamily="'DM Mono', monospace" fontSize={10} fontWeight={500} fill="white" opacity={0.9}>K₂</text>
      <line x1="94" y1="60" x2="100" y2="52" stroke={color} strokeWidth={0.9} opacity={0.3} strokeDasharray="3 2" />
    </svg>
  );
}
