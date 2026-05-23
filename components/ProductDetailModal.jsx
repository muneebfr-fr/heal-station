"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";

export default function ProductDetailModal({ product, onClose }) {
  const { addItem } = useCart();
  const { lang } = useLang();
  const ur = lang === "ur";

  const waMsg = encodeURIComponent(
    `Hi! I'd like to order ${product.name} (${product.price}). Please confirm availability.`
  );
  const waUrl = `https://wa.me/923121428187?text=${waMsg}`;

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const t = {
    contains: ur ? "اجزاء" : "What it contains",
    usedFor: ur ? "استعمال" : "What it's used for",
    whyThis: ur ? "یہ فارمولا کیوں؟" : "Why this formula",
    howTo: ur ? "استعمال کا طریقہ" : "How to take it",
    addCart: ur ? "کارٹ میں شامل کریں" : "Add to Cart",
    order: ur ? "آرڈر دیں" : "Place Order",
    drap: ur ? "ڈریپ رجسٹرڈ" : "DRAP Registered",
    usp: ur ? "یو ایس پی درجہ" : "USP Grade",
    close: ur ? "بند کریں" : "Close",
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(23,42,58,0.6)",
          backdropFilter: "blur(6px)",
          zIndex: 400,
        }}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "min(640px, 100vw)",
          background: "var(--bg-surface)",
          zIndex: 401,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-24px 0 80px rgba(23,42,58,0.18)",
        }}
      >
        {/* Coloured header band */}
        <div
          style={{
            background: `linear-gradient(135deg, ${product.colorDark} 0%, ${product.color} 100%)`,
            padding: "28px 28px 32px",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label={t.close}
            style={{
              position: "absolute", top: 18, right: 18,
              width: 34, height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "white",
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Tags row */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {(ur ? product.tagsUr : product.tags).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: ur ? "var(--font-urdu)" : "var(--font-mono)",
                  fontSize: ur ? 11 : 9,
                  letterSpacing: ur ? 0 : "0.12em",
                  textTransform: ur ? "none" : "uppercase",
                  background: "rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.9)",
                  padding: "3px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.22)",
                  direction: ur ? "rtl" : "ltr",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Name */}
          <h2
            style={{
              fontFamily: ur ? "var(--font-urdu)" : "var(--font-display)",
              fontSize: ur ? "clamp(22px, 5vw, 32px)" : "clamp(26px, 5vw, 38px)",
              fontWeight: ur ? 600 : 400,
              color: "white",
              letterSpacing: ur ? 0 : "-0.02em",
              lineHeight: ur ? 1.6 : 1.05,
              marginBottom: 6,
              direction: ur ? "rtl" : "ltr",
            }}
          >
            {ur ? product.nameUr : product.name}
          </h2>
          <p
            style={{
              fontFamily: ur ? "var(--font-urdu)" : "var(--font-mono)",
              fontSize: ur ? 13 : 10,
              letterSpacing: ur ? 0 : "0.1em",
              color: "rgba(255,255,255,0.72)",
              direction: ur ? "rtl" : "ltr",
            }}
          >
            {ur ? product.subtitleUr : product.subtitle}
          </p>

          {/* Price */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 20,
              fontWeight: 500,
              color: "white",
              marginTop: 14,
              letterSpacing: "0.02em",
            }}
          >
            {product.price}
          </p>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 120px" }}>

          {/* Tagline */}
          <p
            style={{
              fontFamily: ur ? "var(--font-urdu)" : "var(--font-display)",
              fontSize: ur ? 15 : 17,
              fontStyle: ur ? "normal" : "italic",
              color: "var(--text-primary)",
              lineHeight: ur ? 2.0 : 1.5,
              marginBottom: 16,
              direction: ur ? "rtl" : "ltr",
              textAlign: ur ? "right" : "left",
            }}
          >
            {ur ? product.taglineUr : product.tagline}
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
              fontSize: ur ? 14 : 14,
              color: "var(--text-secondary)",
              lineHeight: ur ? 2.2 : 1.8,
              marginBottom: 32,
              direction: ur ? "rtl" : "ltr",
              textAlign: ur ? "right" : "left",
            }}
          >
            {ur ? product.descriptionUr : product.description}
          </p>

          <Divider label={t.contains} color={product.color} />

          {/* Ingredients table */}
          <div style={{ marginBottom: 32 }}>
            {product.composition.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 14px",
                  background: i % 2 === 0 ? `${product.colorAccent}60` : "transparent",
                  borderRadius: 10,
                  marginBottom: 4,
                }}
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)" }}>
                  {c.name}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginLeft: 6, letterSpacing: "0.08em" }}>
                    {c.spec}
                  </span>
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: product.colorDark }}>
                  {c.amount} {c.unit}
                </span>
              </div>
            ))}
          </div>

          <Divider label={t.usedFor} color={product.color} />

          {/* Uses */}
          <ul style={{ marginBottom: 32, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {(ur ? product.usesUr : product.uses).map((use, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  flexDirection: ur ? "row-reverse" : "row",
                }}
              >
                <span
                  style={{
                    width: 20, height: 20,
                    borderRadius: "50%",
                    background: `${product.colorAccent}`,
                    border: `1.5px solid ${product.color}55`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 1,
                  }}
                >
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={product.colorDark} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span
                  style={{
                    fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
                    fontSize: ur ? 14 : 13,
                    color: "var(--text-secondary)",
                    lineHeight: ur ? 2.0 : 1.65,
                    direction: ur ? "rtl" : "ltr",
                    textAlign: ur ? "right" : "left",
                    flex: 1,
                  }}
                >
                  {use}
                </span>
              </li>
            ))}
          </ul>

          <Divider label={t.whyThis} color={product.color} />

          {/* Advantages */}
          <ul style={{ marginBottom: 32, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {(ur ? product.advantagesUr : product.advantages).map((adv, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  flexDirection: ur ? "row-reverse" : "row",
                  padding: "10px 12px",
                  background: "var(--bg-base)",
                  borderRadius: 10,
                  border: `1px solid ${product.color}22`,
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: product.color, flexShrink: 0, marginTop: 3, letterSpacing: "0.04em" }}>
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
                    fontSize: ur ? 14 : 13,
                    color: "var(--text-secondary)",
                    lineHeight: ur ? 2.0 : 1.65,
                    direction: ur ? "rtl" : "ltr",
                    textAlign: ur ? "right" : "left",
                    flex: 1,
                  }}
                >
                  {adv}
                </span>
              </li>
            ))}
          </ul>

          <Divider label={t.howTo} color={product.color} />

          {/* Dosage */}
          <div
            style={{
              background: `linear-gradient(135deg, ${product.colorAccent}80, ${product.colorAccent}30)`,
              border: `1px solid ${product.color}30`,
              borderRadius: 14,
              padding: "18px 20px",
              marginBottom: 28,
            }}
          >
            <p
              style={{
                fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
                fontSize: ur ? 14 : 13,
                color: product.colorDark,
                lineHeight: ur ? 2.2 : 1.75,
                direction: ur ? "rtl" : "ltr",
                textAlign: ur ? "right" : "left",
              }}
            >
              {ur ? product.dosageUr : product.dosage}
            </p>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Badge color="#004346" bg="#D6F3F4" label={t.drap} icon={
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            } />
            <Badge color="#004346" bg="#D6F3F4" label={t.usp} icon={
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={12} r={10} />
                <path d="M9 12l2 2 4-4" />
              </svg>
            } />
          </div>
        </div>

        {/* Sticky footer CTA */}
        <div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "var(--bg-surface)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "16px 28px",
            display: "flex",
            gap: 10,
            boxShadow: "0 -8px 32px rgba(23,42,58,0.08)",
          }}
        >
          <button
            onClick={() => { addItem(product); onClose(); }}
            style={{
              flex: 1,
              background: product.colorDark,
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "13px 0",
              fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
              fontSize: ur ? 14 : 13,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: ur ? 0 : "0.04em",
              direction: ur ? "rtl" : "ltr",
            }}
          >
            {t.addCart}
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              background: "#1DA851",
              color: "white",
              borderRadius: 999,
              padding: "13px 0",
              fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
              fontSize: ur ? 14 : 13,
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: ur ? 0 : "0.04em",
              boxShadow: "0 4px 16px rgba(29,168,81,0.28)",
              direction: ur ? "rtl" : "ltr",
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.order}
          </a>
        </div>
      </motion.div>
    </>
  );
}

function Divider({ label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: color,
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `${color}25` }} />
    </div>
  );
}

function Badge({ label, color, bg, icon }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: bg,
        border: `1px solid ${color}25`,
        borderRadius: 999,
        padding: "5px 12px",
        color,
      }}
    >
      {icon}
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}
