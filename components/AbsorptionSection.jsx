"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const COMPARISONS = [
  {
    label: "Magnesium Form",
    typical: { form: "Magnesium Oxide", pct: 4, note: "cheapest to produce" },
    ours: { form: "Magnesium Bisglycinate", pct: 40, note: "USP chelated, crosses blood-brain barrier" },
  },
  {
    label: "Vitamin D Protocol",
    typical: { form: "Vitamin D3, no K2", pct: 18, note: "calcium direction left to chance" },
    ours: { form: "D3 + K2 MK-7", pct: 91, note: "K2 directs calcium to bone, not arteries" },
  },
  {
    label: "Antioxidant Stack",
    typical: { form: "Generic Glutathione", pct: 12, note: "broken down in digestive tract" },
    ours: { form: "L-Glutathione USP + ALA", pct: 78, note: "ALA regenerates GSH continuously" },
  },
];

function AbsorptionBar({ pct, color, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: color,
            borderRadius: 999,
          }}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.8, duration: 0.5 }}
        style={{
          position: "absolute",
          right: 0,
          top: -20,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color,
          letterSpacing: "0.06em",
        }}
      >
        {pct}%
      </motion.span>
    </div>
  );
}

function ComparisonRow({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: 24,
        alignItems: "start",
        paddingBlock: 36,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      className="comparison-row"
    >
      {/* Typical */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: 10,
          }}
        >
          Typical Brand
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(14px, 1.8vw, 17px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 6,
            textDecoration: "line-through",
            textDecorationColor: "rgba(255,100,100,0.3)",
            lineHeight: 1.3,
          }}
        >
          {item.typical.form}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(255,255,255,0.2)",
            marginBottom: 18,
          }}
        >
          {item.typical.note}
        </p>
        <AbsorptionBar pct={item.typical.pct} color="rgba(255,100,100,0.5)" delay={index * 0.15} />
      </div>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          paddingTop: 28,
        }}
      >
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          VS
        </span>
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
      </div>

      {/* Ours */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--lift)",
            marginBottom: 10,
            opacity: 0.8,
          }}
        >
          Heal Station
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(14px, 1.8vw, 17px)",
            fontWeight: 500,
            color: "rgba(214,243,244,0.95)",
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {item.ours.form}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "rgba(116,179,206,0.6)",
            marginBottom: 18,
          }}
        >
          {item.ours.note}
        </p>
        <AbsorptionBar pct={item.ours.pct} color="#74B3CE" delay={index * 0.15 + 0.3} />
      </div>
    </motion.div>
  );
}

export default function AbsorptionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg, #0A1A1F 0%, #0D2028 50%, #172A3A 100%)",
        padding: "var(--section-py) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Parallax background elements */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          pointerEvents: "none",
        }}
      >
        {/* Large faint molecule */}
        <svg
          viewBox="0 0 600 600"
          style={{
            position: "absolute",
            right: "-10%",
            top: "10%",
            width: "55%",
            opacity: 0.04,
          }}
        >
          <polygon points="300,40 520,170 520,430 300,560 80,430 80,170" stroke="#74B3CE" strokeWidth="2" fill="none" />
          <polygon points="300,100 460,192 460,378 300,470 140,378 140,192" stroke="#D6F3F4" strokeWidth="1.5" fill="none" />
          <circle cx="300" cy="300" r="70" stroke="#508991" strokeWidth="1.5" fill="none" />
          <circle cx="300" cy="300" r="30" stroke="#74B3CE" strokeWidth="1" fill="rgba(116,179,206,0.05)" />
        </svg>

        {/* Subtle grid lines */}
        <svg
          viewBox="0 0 800 600"
          style={{
            position: "absolute",
            left: "-5%",
            bottom: "5%",
            width: "50%",
            opacity: 0.03,
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="600" stroke="#74B3CE" strokeWidth="1" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={i} x1="0" y1={i * 100} x2="800" y2={i * 100} stroke="#74B3CE" strokeWidth="1" />
          ))}
        </svg>
      </motion.div>

      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "5%",
          width: 400,
          height: 400,
          background: "radial-gradient(ellipse, rgba(0,67,70,0.25), transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 300,
          height: 300,
          background: "radial-gradient(ellipse, rgba(116,179,206,0.08), transparent 70%)",
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: 64 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(116,179,206,0.6)",
              marginBottom: 20,
            }}
          >
            The Absorption Gap
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 20,
              maxWidth: 680,
            }}
          >
            <span style={{ color: "rgba(214,243,244,0.95)" }}>Most supplements</span>{" "}
            <em style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
              fail at step one.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "rgba(116,179,206,0.55)",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            The ingredient on the label is not the ingredient your cells use. The form matters more than the dose. We start there.
          </motion.p>
        </div>

        {/* Label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 24,
            marginBottom: 0,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          className="comparison-row"
        >
          <div />
          <div style={{ width: 40 }} />
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(116,179,206,0.4)",
              }}
            >
              Cellular Absorption
            </span>
          </div>
        </motion.div>

        {/* Comparison rows */}
        {COMPARISONS.map((item, i) => (
          <ComparisonRow key={item.label} item={item} index={i} />
        ))}

        {/* Bottom stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            marginTop: 72,
            paddingTop: 56,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
          className="stats-grid"
        >
          {[
            { number: "100%", label: "USP Pharmaceutical Grade", sub: "every active ingredient" },
            { number: "0", label: "Proprietary Blends", sub: "full transparency on every dose" },
            { number: "3×", label: "More Bioavailable", sub: "vs oxide and synthetic forms" },
          ].map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .comparison-row { grid-template-columns: 1fr !important; gap: 16px !important; }
          .stats-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 400,
          color: "#74B3CE",
          lineHeight: 1,
          marginBottom: 8,
          letterSpacing: "-0.02em",
        }}
      >
        {stat.number}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 500,
          color: "rgba(214,243,244,0.8)",
          marginBottom: 4,
        }}
      >
        {stat.label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(116,179,206,0.4)",
          letterSpacing: "0.06em",
        }}
      >
        {stat.sub}
      </p>
    </motion.div>
  );
}
