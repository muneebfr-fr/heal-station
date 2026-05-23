"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function ProductDetailModal({ product, onClose }) {
  const { addItem } = useCart();
  const { lang } = useLang();
  const ur = lang === "ur";

  const waMsg = encodeURIComponent(
    `Hi! I'd like to order ${product.name} (${product.price}). Please confirm availability.`
  );
  const waUrl = `https://wa.me/923121428187?text=${waMsg}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

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

  const cd = product.colorDark;
  const ca = product.colorAccent;

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
          background: "rgba(8,28,32,0.52)",
          backdropFilter: "blur(10px) saturate(1.2)",
          WebkitBackdropFilter: "blur(10px) saturate(1.2)",
          zIndex: 400,
        }}
      />

      {/* Drawer — liquid glass shell */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "min(640px, 100vw)",
          background: "rgba(228, 248, 250, 0.70)",
          backdropFilter: "blur(44px) saturate(1.9) brightness(1.03)",
          WebkitBackdropFilter: "blur(44px) saturate(1.9) brightness(1.03)",
          borderLeft: "1px solid rgba(255,255,255,0.34)",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.52), -48px 0 140px rgba(0,50,55,0.22)",
          zIndex: 401,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Rim light — top edge */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.85) 35%, rgba(255,255,255,0.45) 70%, transparent)",
          zIndex: 10, pointerEvents: "none",
        }} />

        {/* Inner light scatter */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "linear-gradient(148deg, rgba(255,255,255,0.20) 0%, transparent 38%, rgba(255,255,255,0.07) 100%)",
        }} />

        {/* Coloured header band — translucent glass */}
        <div style={{
          background: `linear-gradient(138deg, ${cd}CC 0%, ${product.color}A8 100%)`,
          backdropFilter: "blur(8px) saturate(1.5)",
          WebkitBackdropFilter: "blur(8px) saturate(1.5)",
          boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.32), inset 0 -1px 0 ${hexToRgba(cd, 0.16)}, 0 1px 0 ${hexToRgba(cd, 0.12)}`,
          padding: "28px 28px 32px",
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
          zIndex: 2,
        }}>
          {/* Header inner glass overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(138deg, rgba(255,255,255,0.16) 0%, transparent 48%, rgba(255,255,255,0.06) 100%)",
          }} />
          {/* Header rim */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.25) 70%, transparent)",
            pointerEvents: "none",
          }} />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label={t.close}
            style={{
              position: "absolute", top: 18, right: 18,
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.32)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "white", zIndex: 3,
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, position: "relative", zIndex: 2 }}>
            {(ur ? product.tagsUr : product.tags).map((tag) => (
              <span key={tag} style={{
                fontFamily: ur ? "var(--font-urdu)" : "var(--font-mono)",
                fontSize: ur ? 11 : 9,
                letterSpacing: ur ? 0 : "0.12em",
                textTransform: ur ? "none" : "uppercase",
                background: "rgba(255,255,255,0.16)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: "rgba(255,255,255,0.92)",
                padding: "3px 10px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.25)",
                direction: ur ? "rtl" : "ltr",
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Name */}
          <h2 style={{
            fontFamily: ur ? "var(--font-urdu)" : "var(--font-display)",
            fontSize: ur ? "clamp(22px,5vw,32px)" : "clamp(26px,5vw,38px)",
            fontWeight: ur ? 600 : 400,
            color: "white",
            letterSpacing: ur ? 0 : "-0.02em",
            lineHeight: ur ? 1.6 : 1.05,
            marginBottom: 6,
            direction: ur ? "rtl" : "ltr",
            position: "relative", zIndex: 2,
          }}>
            {ur ? product.nameUr : product.name}
          </h2>
          <p style={{
            fontFamily: ur ? "var(--font-urdu)" : "var(--font-mono)",
            fontSize: ur ? 13 : 10,
            letterSpacing: ur ? 0 : "0.1em",
            color: "rgba(255,255,255,0.72)",
            direction: ur ? "rtl" : "ltr",
            position: "relative", zIndex: 2,
          }}>
            {ur ? product.subtitleUr : product.subtitle}
          </p>

          {/* Price */}
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 20, fontWeight: 500,
            color: "white", marginTop: 14,
            letterSpacing: "0.02em",
            position: "relative", zIndex: 2,
          }}>
            {product.price}
          </p>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 120px", position: "relative", zIndex: 1 }}>

          {/* Tagline */}
          <p style={{
            fontFamily: ur ? "var(--font-urdu)" : "var(--font-display)",
            fontSize: ur ? 15 : 17,
            fontStyle: ur ? "normal" : "italic",
            color: "var(--text-primary)",
            lineHeight: ur ? 2.0 : 1.5,
            marginBottom: 16,
            direction: ur ? "rtl" : "ltr",
            textAlign: ur ? "right" : "left",
          }}>
            {ur ? product.taglineUr : product.tagline}
          </p>

          {/* Description */}
          <p style={{
            fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: ur ? 2.2 : 1.8,
            marginBottom: 32,
            direction: ur ? "rtl" : "ltr",
            textAlign: ur ? "right" : "left",
          }}>
            {ur ? product.descriptionUr : product.description}
          </p>

          <Divider label={t.contains} color={product.color} />

          {/* Ingredients */}
          <div style={{ marginBottom: 32 }}>
            {product.composition.map((c, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 14px",
                background: i % 2 === 0
                  ? `rgba(255,255,255,0.28)`
                  : "transparent",
                backdropFilter: i % 2 === 0 ? "blur(8px)" : "none",
                WebkitBackdropFilter: i % 2 === 0 ? "blur(8px)" : "none",
                borderRadius: 10,
                border: i % 2 === 0 ? "1px solid rgba(255,255,255,0.32)" : "1px solid transparent",
                boxShadow: i % 2 === 0 ? "inset 0 1px 0 rgba(255,255,255,0.45)" : "none",
                marginBottom: 4,
              }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)" }}>
                  {c.name}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", marginLeft: 6, letterSpacing: "0.08em" }}>
                    {c.spec}
                  </span>
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: cd }}>
                  {c.amount} {c.unit}
                </span>
              </div>
            ))}
          </div>

          <Divider label={t.usedFor} color={product.color} />

          {/* Uses */}
          <ul style={{ marginBottom: 32, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {(ur ? product.usesUr : product.uses).map((use, i) => (
              <li key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                flexDirection: ur ? "row-reverse" : "row",
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: "rgba(255,255,255,0.32)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: `1.5px solid ${hexToRgba(product.color, 0.40)}`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 1,
                }}>
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke={cd} strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span style={{
                  fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
                  fontSize: ur ? 14 : 13,
                  color: "var(--text-secondary)",
                  lineHeight: ur ? 2.0 : 1.65,
                  direction: ur ? "rtl" : "ltr",
                  textAlign: ur ? "right" : "left",
                  flex: 1,
                }}>
                  {use}
                </span>
              </li>
            ))}
          </ul>

          <Divider label={t.whyThis} color={product.color} />

          {/* Advantages */}
          <ul style={{ marginBottom: 32, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {(ur ? product.advantagesUr : product.advantages).map((adv, i) => (
              <li key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                flexDirection: ur ? "row-reverse" : "row",
                padding: "10px 14px",
                background: "rgba(255,255,255,0.22)",
                backdropFilter: "blur(12px) saturate(1.4)",
                WebkitBackdropFilter: "blur(12px) saturate(1.4)",
                borderRadius: 12,
                border: `1px solid rgba(255,255,255,0.36)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 8px ${hexToRgba(cd, 0.06)}`,
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: product.color, flexShrink: 0, marginTop: 3, letterSpacing: "0.04em" }}>
                  0{i + 1}
                </span>
                <span style={{
                  fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
                  fontSize: ur ? 14 : 13,
                  color: "var(--text-secondary)",
                  lineHeight: ur ? 2.0 : 1.65,
                  direction: ur ? "rtl" : "ltr",
                  textAlign: ur ? "right" : "left",
                  flex: 1,
                }}>
                  {adv}
                </span>
              </li>
            ))}
          </ul>

          <Divider label={t.howTo} color={product.color} />

          {/* Dosage */}
          <div style={{
            background: "rgba(255,255,255,0.28)",
            backdropFilter: "blur(16px) saturate(1.5)",
            WebkitBackdropFilter: "blur(16px) saturate(1.5)",
            border: `1px solid rgba(255,255,255,0.42)`,
            borderRadius: 14,
            padding: "18px 20px",
            marginBottom: 28,
            boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.6), 0 4px 16px ${hexToRgba(cd, 0.08)}`,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%)",
            }} />
            <p style={{
              fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
              fontSize: ur ? 14 : 13,
              color: cd,
              lineHeight: ur ? 2.2 : 1.75,
              direction: ur ? "rtl" : "ltr",
              textAlign: ur ? "right" : "left",
              position: "relative",
            }}>
              {ur ? product.dosageUr : product.dosage}
            </p>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <GlassBadge color={cd} label={t.drap} icon={
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            } />
            <GlassBadge color={cd} label={t.usp} icon={
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={12} r={10} />
                <path d="M9 12l2 2 4-4" />
              </svg>
            } />
          </div>
        </div>

        {/* Sticky footer — glass */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "rgba(220, 246, 248, 0.88)",
          backdropFilter: "blur(28px) saturate(1.7)",
          WebkitBackdropFilter: "blur(28px) saturate(1.7)",
          borderTop: "1px solid rgba(255,255,255,0.52)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65), 0 -8px 40px rgba(0,50,55,0.08)",
          padding: "16px 24px",
          display: "flex",
          gap: 10,
          zIndex: 2,
        }}>
          {/* Add to Cart — tinted glass pill */}
          <GlassCtaButton
            onClick={() => { addItem(product); onClose(); }}
            tintColor={cd}
            label={t.addCart}
            ur={ur}
          />

          {/* Place Order — WhatsApp tinted glass */}
          <GlassCtaLink
            href={waUrl}
            tintColor="#009B3A"
            textColor="#004d1c"
            label={t.order}
            ur={ur}
            icon={<WhatsAppIcon />}
          />
        </div>
      </motion.div>
    </>
  );
}

function GlassCtaButton({ onClick, tintColor, label, ur }) {
  const r = parseInt(tintColor.slice(1, 3), 16);
  const g = parseInt(tintColor.slice(3, 5), 16);
  const b = parseInt(tintColor.slice(5, 7), 16);

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, position: "relative",
        background: `rgba(${r},${g},${b},0.14)`,
        backdropFilter: "blur(20px) saturate(1.7)",
        WebkitBackdropFilter: "blur(20px) saturate(1.7)",
        border: "1px solid rgba(255,255,255,0.48)",
        borderRadius: 999,
        padding: "13px 0",
        color: tintColor,
        fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
        fontSize: ur ? 14 : 13,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: ur ? 0 : "0.04em",
        direction: ur ? "rtl" : "ltr",
        boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.68), inset 0 -1px 0 rgba(${r},${g},${b},0.10), 0 4px 20px rgba(${r},${g},${b},0.16)`,
        overflow: "hidden",
        transition: "all 0.22s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `rgba(${r},${g},${b},0.22)`;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `rgba(${r},${g},${b},0.14)`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.52) 50%, transparent 72%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "-200% 0",
        animation: "glass-shimmer 3.2s ease infinite",
        borderRadius: "inherit",
      }} />
      <span style={{ position: "relative" }}>{label}</span>
    </button>
  );
}

function GlassCtaLink({ href, tintColor, textColor, label, ur, icon }) {
  const r = parseInt(tintColor.slice(1, 3), 16);
  const g = parseInt(tintColor.slice(3, 5), 16);
  const b = parseInt(tintColor.slice(5, 7), 16);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: 1, position: "relative",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
        background: `rgba(${r},${g},${b},0.12)`,
        backdropFilter: "blur(20px) saturate(1.7)",
        WebkitBackdropFilter: "blur(20px) saturate(1.7)",
        border: "1px solid rgba(255,255,255,0.46)",
        borderRadius: 999,
        padding: "13px 0",
        color: textColor,
        fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
        fontSize: ur ? 14 : 13,
        fontWeight: 600,
        textDecoration: "none",
        letterSpacing: ur ? 0 : "0.04em",
        direction: ur ? "rtl" : "ltr",
        boxShadow: `inset 0 1.5px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(${r},${g},${b},0.10), 0 4px 16px rgba(${r},${g},${b},0.14)`,
        overflow: "hidden",
        transition: "all 0.22s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `rgba(${r},${g},${b},0.20)`;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = `rgba(${r},${g},${b},0.12)`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.48) 50%, transparent 72%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "-200% 0",
        animation: "glass-shimmer 3.2s ease infinite 0.6s",
        borderRadius: "inherit",
      }} />
      <span style={{ position: "relative", display: "flex", alignItems: "center", gap: 7 }}>
        {icon}
        {label}
      </span>
    </a>
  );
}

function Divider({ label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{ width: 4, height: 4, borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 9,
        letterSpacing: "0.22em", textTransform: "uppercase", color,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: `${color}25` }} />
    </div>
  );
}

function GlassBadge({ label, color, icon }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "rgba(255,255,255,0.30)",
      backdropFilter: "blur(12px) saturate(1.4)",
      WebkitBackdropFilter: "blur(12px) saturate(1.4)",
      border: "1px solid rgba(255,255,255,0.45)",
      borderRadius: 999,
      padding: "5px 12px",
      color,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
    }}>
      {icon}
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
