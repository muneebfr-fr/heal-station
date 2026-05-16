"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassEffect } from "@/components/ui/liquid-glass";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [added, setAdded] = useState(false);
  const showGlass = hovered || tapped;
  const { addItem } = useCart();

  const waMessage = encodeURIComponent(
    `Hi! I'd like to order ${product.name} (${product.price}). Please confirm availability.`
  );
  const waUrl = `https://wa.me/923121428187?text=${waMessage}`;

  function handleAddToCart(e) {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
  }

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
        onClick={() => setTapped((t) => !t)}
        style={{
          background: "var(--bg-surface)",
          border: `1px solid ${showGlass ? product.color + "55" : "var(--border-subtle)"}`,
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "default",
          transition: "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
          boxShadow: showGlass
            ? `0 20px 60px ${product.colorDark}22, 0 8px 24px rgba(0,0,0,0.08)`
            : "var(--shadow-card)",
          transform: showGlass ? "translateY(-8px)" : "translateY(0)",
          position: "relative",
        }}
      >
        {/* Radial glow on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${product.colorAccent}60, transparent 65%)`,
            opacity: showGlass ? 1 : 0,
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
              opacity: showGlass ? 1 : 0,
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
            {showGlass && (
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

          {/* Price + Add to Cart */}
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
              onClick={handleAddToCart}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: added ? `${product.colorDark}cc` : product.colorDark,
                color: "white",
                border: "none",
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 12,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                cursor: added ? "default" : "pointer",
                transition: "all 0.28s ease",
                letterSpacing: "0.03em",
                flexShrink: 0,
              }}
            >
              {added ? (
                <>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Added
                </>
              ) : (
                <>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Place Order strip — animates in after Add to Cart */}
          <AnimatePresence>
            {added && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    background: `${product.colorAccent}50`,
                    border: `1px solid ${product.colorDark}22`,
                    borderRadius: 14,
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-secondary)", marginBottom: 1 }}>
                      Ready to place your order?
                    </p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: product.colorDark, letterSpacing: "0.06em" }}>
                      {product.name} · {product.price}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#1DA851",
                        color: "white",
                        borderRadius: 999,
                        padding: "8px 14px",
                        fontSize: 11,
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        textDecoration: "none",
                        letterSpacing: "0.03em",
                        boxShadow: "0 4px 14px rgba(29,168,81,0.3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <WhatsAppIcon />
                      Place Order
                    </a>
                    <button
                      onClick={(e) => { e.stopPropagation(); setAdded(false); }}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: `${product.colorDark}18`,
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        flexShrink: 0,
                      }}
                    >
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
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
