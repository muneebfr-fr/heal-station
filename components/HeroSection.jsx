"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import { GlassEffect, GlassButton } from "@/components/ui/liquid-glass";

const Capsule3D = dynamic(() => import("@/components/Capsule3D"), { ssr: false });

function CharReveal({ text, delay = 0, style = {} }) {
  const chars = text.split("");
  return (
    <span style={{ display: "inline", ...style }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 32, rotateX: -35 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.048,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const bgY = useSpring(rawY, { stiffness: 55, damping: 18 });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const capsuleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, 70]);

  useEffect(() => {
    setMounted(true);
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(ellipse 55% 45% at 8% 88%, rgba(155,143,198,0.22) 0%, transparent 65%), radial-gradient(ellipse 120% 90% at 60% 30%, #B8E8EE 0%, #D6F0F4 30%, #EAF6F8 55%, #F0FAFA 75%, #E8F2F5 100%)",
      }}
    >
      {/* Large bg orbs */}
      <motion.div
        style={{
          position: "absolute",
          top: "-8%",
          left: "-4%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(116,179,206,0.18)",
          filter: "blur(100px)",
          animation: "float-a 11s ease-in-out infinite",
          x: orb1X,
          translateX: mounted ? mousePos.x * -26 : 0,
          translateY: mounted ? mousePos.y * -16 : 0,
          transition: "transform 1s ease",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "5%",
          right: "-6%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(0,67,70,0.10)",
          filter: "blur(90px)",
          animation: "float-b 14s ease-in-out infinite",
          x: orb2X,
          translateX: mounted ? mousePos.x * 22 : 0,
          translateY: mounted ? mousePos.y * 14 : 0,
          transition: "transform 1s ease",
        }}
      />
      {/* Lavender bloom — bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          left: "-5%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "rgba(155,143,198,0.16)",
          filter: "blur(110px)",
          pointerEvents: "none",
          animation: "float-b 16s ease-in-out infinite",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "30%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(196,150,90,0.07)",
          filter: "blur(80px)",
          animation: "float-c 16s ease-in-out 2s infinite",
          translateX: mounted ? mousePos.x * 10 : 0,
          translateY: mounted ? mousePos.y * 18 : 0,
          transition: "transform 1.2s ease",
        }}
      />

      {/* Expanding load rings */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.6 }}
        animate={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 4, ease: "easeOut", delay: 0.3 }}
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          border: "1px solid rgba(0,67,70,0.16)",
          pointerEvents: "none",
          zIndex: 0,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        initial={{ scale: 0.2, opacity: 0.4 }}
        animate={{ scale: 3.8, opacity: 0 }}
        transition={{ duration: 5.5, ease: "easeOut", delay: 0.8 }}
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          border: "1px solid rgba(116,179,206,0.10)",
          pointerEvents: "none",
          zIndex: 0,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <MoleculeBackground mousePos={mounted ? mousePos : { x: 0, y: 0 }} />

      {/* ─ Two-column layout ─ */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1340,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "center",
          minHeight: "100vh",
        }}
        className="hero-grid"
      >
        {/* LEFT: Text content */}
        <motion.div
          style={{ y: bgY, opacity }}
          className="hero-left"
        >
          {/* Glass eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{ marginBottom: 32, display: "inline-block" }}
          >
            <GlassEffect
              style={{ borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px 8px 10px" }}
              tint="rgba(0, 67, 70, 0.1)"
              border="1px solid rgba(0,67,70,0.18)"
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--mid)",
                  display: "inline-block",
                  boxShadow: "0 0 8px rgba(80,137,145,0.8)",
                  animation: "pulse-ring 2s ease-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--primary)",
                }}
              >
                Pharmaceutical Grade
              </span>
            </GlassEffect>
          </motion.div>

          {/* Headline */}
          <div style={{ marginBottom: 20, perspective: 1200 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(52px, 7.5vw, 96px)",
                fontWeight: 400,
                letterSpacing: "-0.035em",
                lineHeight: 0.92,
                marginBottom: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  background:
                    "linear-gradient(135deg, #172A3A 0%, #004346 35%, #508991 58%, #004346 78%, #172A3A 100%)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 7s ease infinite",
                }}
              >
                <CharReveal text="Heal" delay={0.2} />
              </span>
              <span
                style={{
                  display: "block",
                  fontStyle: "italic",
                  fontWeight: 300,
                  background:
                    "linear-gradient(135deg, #508991 0%, #74B3CE 45%, #004346 72%, #508991 100%)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 7s ease 1.5s infinite",
                }}
              >
                <CharReveal text="Station" delay={0.48} />
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(15px, 2.2vw, 20px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--text-secondary)",
              letterSpacing: "0.01em",
              marginBottom: 40,
              lineHeight: 1.5,
              maxWidth: 380,
            }}
          >
            Science you can feel.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}
          >
            <Link href="/shop" style={{ textDecoration: "none" }}>
              <MetalButton variant="teal">Shop All Products</MetalButton>
            </Link>
            <Link href="/science" style={{ textDecoration: "none" }}>
              <GlassButton tint="rgba(0,67,70,0.08)" style={{ color: "var(--primary)" }}>
                Our Science
              </GlassButton>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            style={{ display: "flex", gap: 28, flexWrap: "wrap" }}
          >
            {["USP Certified", "Lab Tested", "Zero Fillers"].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  color: "var(--mid)",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: "var(--gold)", fontSize: 8 }}>✦</span>
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: 3D Capsule */}
        <motion.div
          style={{ y: capsuleY }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hero-right"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(440px, 55vh, 620px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Glow behind capsule */}
            <div
              style={{
                position: "absolute",
                width: "70%",
                height: "70%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(116,179,206,0.35) 0%, rgba(0,67,70,0.12) 55%, transparent 75%)",
                filter: "blur(40px)",
                animation: "float-a 8s ease-in-out infinite",
                translateX: mounted ? mousePos.x * 12 : 0,
                translateY: mounted ? mousePos.y * 8 : 0,
                transition: "transform 0.9s ease",
              }}
            />

            {/* Orbital ring decorations */}
            <OrbitalRings mousePos={mounted ? mousePos : { x: 0, y: 0 }} />

            {/* The capsule */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 2,
                translateX: mounted ? mousePos.x * -8 : 0,
                translateY: mounted ? mousePos.y * -5 : 0,
                transition: "transform 1.2s ease",
              }}
            >
              <Capsule3D />
            </div>

            {/* Glass info chip — floats over capsule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="hero-chip"
              style={{
                position: "absolute",
                bottom: "12%",
                right: "2%",
                zIndex: 10,
              }}
            >
              <GlassEffect
                style={{ borderRadius: 16, padding: "12px 16px", minWidth: 140 }}
                tint="rgba(0,67,70,0.12)"
                border="1px solid rgba(0,67,70,0.2)"
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--mid)",
                    marginBottom: 4,
                  }}
                >
                  Active Ingredient
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "var(--primary)",
                  }}
                >
                  750mg
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "var(--text-secondary)",
                    lineHeight: 1.4,
                  }}
                >
                  Mg Bisglycinate
                </div>
              </GlassEffect>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.8 }}
              className="hero-chip"
              style={{
                position: "absolute",
                top: "14%",
                left: "0%",
                zIndex: 10,
              }}
            >
              <GlassEffect
                style={{ borderRadius: 16, padding: "10px 14px" }}
                tint="rgba(116,179,206,0.12)"
                border="1px solid rgba(116,179,206,0.25)"
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--lift)",
                    marginBottom: 3,
                  }}
                >
                  Standard
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--dark)",
                  }}
                >
                  USP Grade
                </div>
              </GlassEffect>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "var(--text-muted)",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding-top: 24px !important;
            padding-bottom: 48px !important;
            min-height: 100svh !important;
            align-content: center;
          }
          .hero-left {
            order: 1 !important;
            text-align: center !important;
          }
          .hero-left p { margin-inline: auto; }
          .hero-left > div:nth-child(1) { justify-content: center; }
          .hero-left > div:nth-child(4) { justify-content: center; }
          .hero-left > div:nth-child(5) { justify-content: center; }
          .hero-right {
            order: 2 !important;
          }
          .hero-right > div {
            height: clamp(260px, 55vw, 340px) !important;
          }
          .hero-chip { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function OrbitalRings({ mousePos }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {[220, 300, 380].map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size * 0.38,
            borderRadius: "50%",
            border: `1px solid rgba(0,67,70,${0.1 - i * 0.025})`,
            transform: `rotateX(72deg) rotateZ(${i * 22}deg)`,
            animation: `orbit ${14 + i * 4}s linear ${i * -3}s infinite`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

function MoleculeBackground({ mousePos }) {
  const molecules = [
    { x: "4%", y: "16%", size: 56, anim: "float-a 17s ease-in-out infinite", delay: "0s", px: -14, py: -9 },
    { x: "90%", y: "10%", size: 44, anim: "float-b 12s ease-in-out infinite", delay: "2s", px: 12, py: 7 },
    { x: "88%", y: "70%", size: 66, anim: "float-c 19s ease-in-out infinite", delay: "1s", px: 9, py: -11 },
    { x: "6%", y: "74%", size: 50, anim: "float-a 14s ease-in-out infinite", delay: "3.5s", px: -9, py: 15 },
    { x: "48%", y: "4%", size: 34, anim: "float-b 10s ease-in-out infinite", delay: "0.5s", px: 0, py: -7 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {molecules.map((m, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: m.x,
            top: m.y,
            animation: m.anim,
            animationDelay: m.delay,
            opacity: 0.18,
            transform: `translate(${mousePos.x * m.px}px, ${mousePos.y * m.py}px)`,
            transition: "transform 1.4s ease",
          }}
        >
          <MoleculeSVG size={m.size} index={i} />
        </div>
      ))}
    </div>
  );
}

function MoleculeSVG({ size, index }) {
  const variants = [
    <svg key="hex" width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon points="30,5 52,17.5 52,42.5 30,55 8,42.5 8,17.5" stroke="#004346" strokeWidth={1.2} fill="none" opacity={0.7} />
      <polygon points="30,14 44,22 44,38 30,46 16,38 16,22" stroke="#74B3CE" strokeWidth={0.8} fill="none" opacity={0.4} />
      <circle cx={30} cy={5} r={2} fill="#004346" opacity={0.6} />
      <circle cx={52} cy={17.5} r={2} fill="#004346" opacity={0.6} />
      <circle cx={52} cy={42.5} r={2} fill="#004346" opacity={0.6} />
      <circle cx={30} cy={55} r={2} fill="#004346" opacity={0.6} />
      <circle cx={8} cy={42.5} r={2} fill="#004346" opacity={0.6} />
      <circle cx={8} cy={17.5} r={2} fill="#004346" opacity={0.6} />
    </svg>,
    <svg key="atom" width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx={30} cy={30} r={4} fill="#508991" opacity={0.8} />
      <ellipse cx={30} cy={30} rx={22} ry={8} stroke="#004346" strokeWidth={1} fill="none" opacity={0.5} />
      <ellipse cx={30} cy={30} rx={22} ry={8} stroke="#74B3CE" strokeWidth={0.8} fill="none" opacity={0.4} transform="rotate(60 30 30)" />
      <ellipse cx={30} cy={30} rx={22} ry={8} stroke="#508991" strokeWidth={0.8} fill="none" opacity={0.4} transform="rotate(120 30 30)" />
    </svg>,
    <svg key="dia" width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon points="30,6 54,30 30,54 6,30" stroke="#74B3CE" strokeWidth={1.2} fill="rgba(116,179,206,0.05)" opacity={0.6} />
      <polygon points="30,16 44,30 30,44 16,30" stroke="#004346" strokeWidth={0.8} fill="none" opacity={0.4} />
    </svg>,
    <svg key="tri" width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon points="30,8 54,50 6,50" stroke="#004346" strokeWidth={1.2} fill="rgba(0,67,70,0.05)" opacity={0.6} />
      <circle cx={30} cy={8} r={2.5} fill="#74B3CE" opacity={0.6} />
      <circle cx={54} cy={50} r={2.5} fill="#74B3CE" opacity={0.6} />
      <circle cx={6} cy={50} r={2.5} fill="#74B3CE" opacity={0.6} />
    </svg>,
    <svg key="cross" width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx={30} cy={30} r={5} fill="#004346" opacity={0.5} />
      <circle cx={30} cy={10} r={3} fill="#508991" opacity={0.5} />
      <circle cx={30} cy={50} r={3} fill="#508991" opacity={0.5} />
      <circle cx={10} cy={30} r={3} fill="#508991" opacity={0.5} />
      <circle cx={50} cy={30} r={3} fill="#508991" opacity={0.5} />
      <line x1="30" y1="15" x2="30" y2="25" stroke="#004346" strokeWidth={1} opacity={0.4} />
      <line x1="30" y1="35" x2="30" y2="45" stroke="#004346" strokeWidth={1} opacity={0.4} />
      <line x1="15" y1="30" x2="25" y2="30" stroke="#004346" strokeWidth={1} opacity={0.4} />
      <line x1="35" y1="30" x2="45" y2="30" stroke="#004346" strokeWidth={1} opacity={0.4} />
    </svg>,
  ];
  return variants[index % variants.length];
}
