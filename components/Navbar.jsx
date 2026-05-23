"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const { lang, setLang } = useLang();
  const ur = lang === "ur";

  const NAV_LINKS = ur
    ? [{ label: "دکان", href: "/shop" }, { label: "سائنس", href: "/science" }, { label: "کوئز", href: "/quiz" }, { label: "ہمارے بارے میں", href: "/about" }]
    : [{ label: "Shop", href: "/shop" }, { label: "Science", href: "/science" }, { label: "Quiz", href: "/quiz" }, { label: "About", href: "/about" }];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        animate={{
          background: scrolled ? "rgba(240,250,250,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0,67,70,0.08)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 24px rgba(23,42,58,0.06)" : "none",
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "var(--navbar-h)",
          display: "flex",
          alignItems: "center",
          paddingInline: "var(--container-px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            marginInline: "auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <HealStationLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)",
                  fontSize: ur ? 15 : 13,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  letterSpacing: ur ? 0 : "0.04em",
                  position: "relative",
                  paddingBottom: 2,
                }}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
            {/* Language toggle */}
            <button
              onClick={() => setLang(ur ? "en" : "ur")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 999,
                overflow: "hidden",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {["en", "ur"].map((l) => (
                <span
                  key={l}
                  style={{
                    padding: "5px 11px",
                    fontFamily: l === "ur" ? "var(--font-urdu)" : "var(--font-mono)",
                    fontSize: l === "ur" ? 12 : 9,
                    letterSpacing: l === "ur" ? 0 : "0.1em",
                    color: lang === l ? "white" : "var(--text-muted)",
                    background: lang === l ? "var(--primary)" : "transparent",
                    transition: "all 0.2s ease",
                    lineHeight: 1.4,
                  }}
                >
                  {l === "en" ? "EN" : "اردو"}
                </span>
              ))}
            </button>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              style={{
                position: "relative",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: "1.5px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                color: "var(--text-primary)",
                transition: "all 0.2s ease",
              }}
            >
              <CartIcon />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="hide-desktop"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                style={{ display: "block", width: 22, height: 1.5, background: "var(--primary)", transformOrigin: "center", borderRadius: 2 }}
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                style={{ display: "block", width: 22, height: 1.5, background: "var(--primary)", borderRadius: 2 }}
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                style={{ display: "block", width: 22, height: 1.5, background: "var(--primary)", transformOrigin: "center", borderRadius: 2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "var(--navbar-h)",
              left: 0,
              right: 0,
              background: "var(--bg-surface)",
              borderBottom: "1px solid var(--border-subtle)",
              zIndex: 49,
              padding: "24px var(--container-px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    fontFamily: ur ? "var(--font-urdu)" : "var(--font-display)",
                    fontSize: ur ? 18 : 22,
                    fontWeight: ur ? 600 : 400,
                    color: "var(--text-primary)",
                    borderBottom: "1px solid var(--border-subtle)",
                    direction: ur ? "rtl" : "ltr",
                    textAlign: ur ? "right" : "left",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {/* Language toggle in mobile menu */}
            <div style={{ paddingTop: 8 }}>
              <button
                onClick={() => setLang(ur ? "en" : "ur")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0,
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 999,
                  overflow: "hidden",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                {["en", "ur"].map((l) => (
                  <span
                    key={l}
                    style={{
                      padding: "7px 16px",
                      fontFamily: l === "ur" ? "var(--font-urdu)" : "var(--font-mono)",
                      fontSize: l === "ur" ? 13 : 10,
                      letterSpacing: l === "ur" ? 0 : "0.1em",
                      color: lang === l ? "white" : "var(--text-muted)",
                      background: lang === l ? "var(--primary)" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {l === "en" ? "EN" : "اردو"}
                  </span>
                ))}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1.5px;
          background: var(--primary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s var(--ease-out);
        }
        .nav-link:hover { color: var(--primary) !important; }
        .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
      `}</style>
    </>
  );
}

function HealStationLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Liquid-morph logo mark — image zoomed & clipped to the cross icon */}
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "56% 44% 48% 52% / 52% 44% 56% 48%",
          animation: "liquid-morph 6s ease-in-out infinite",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
          boxShadow: "0 2px 12px rgba(0,67,70,0.18)",
        }}
      >
        <Image
          src="/logo.png"
          alt="Heal Station"
          width={120}
          height={120}
          style={{
            position: "absolute",
            width: "auto",
            height: "260%",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          priority
        />
      </div>
      {/* Wordmark */}
      <div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 17,
            fontWeight: 500,
            color: "var(--primary)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          Heal Station
        </span>
      </div>
    </div>
  );
}

function CartIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
