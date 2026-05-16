"use client";

import { motion } from "framer-motion";

const VALUE_PROPS = [
  {
    icon: <BioIcon />,
    title: "Bioavailability First",
    body: "We choose the chelated, methylated, and liposomal forms — the forms your cells actually absorb. Not the cheapest, the most effective.",
  },
  {
    icon: <GradeIcon />,
    title: "USP Pharmaceutical Grade",
    body: "Every active ingredient meets United States Pharmacopeia standards for purity and potency. The same standard hospitals use.",
  },
  {
    icon: <DoseIcon />,
    title: "Clinically Dosed",
    body: "Quantities that match clinical research, not the trace amounts used to justify marketing claims. What you see on the label is what does the work.",
  },
];

export default function ScienceStory() {
  return (
    <section
      style={{
        padding: "var(--section-py) 0",
        background: "var(--bg-elevated)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background molecule decoration */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "20%",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      >
        <LargeMolecule />
      </div>

      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
        className="science-grid"
      >
        {/* Left: Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              aspectRatio: "4/5",
              borderRadius: 24,
              background: "linear-gradient(145deg, rgba(214,243,244,0.8) 0%, rgba(116,179,206,0.3) 60%, rgba(0,67,70,0.15) 100%)",
              border: "1px solid var(--border-subtle)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ScienceIllustration />
          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: 20,
            }}
          >
            Our Science
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            Formulated for what
            <br />
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>your body absorbs</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: 48,
            }}
          >
            Most supplements fill capsules with the cheapest form of an ingredient. We do the opposite — starting with the form that works, then building around it. No fillers, no proprietary blends hiding behind marketing.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {VALUE_PROPS.map((vp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.85 }}
                style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--primary)",
                    flexShrink: 0,
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {vp.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: 5,
                    }}
                  >
                    {vp.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "var(--text-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {vp.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .science-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function ScienceIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central hexagon lattice */}
      <g transform="translate(200, 250)" opacity={0.7}>
        {/* Outer hex */}
        <polygon points="0,-80 69,-40 69,40 0,80 -69,40 -69,-40" fill="none" stroke="#004346" strokeWidth={1.5} />
        {/* Inner hex */}
        <polygon points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25" fill="rgba(0,67,70,0.08)" stroke="#508991" strokeWidth={1.2} />
        {/* Core circle */}
        <circle cx={0} cy={0} r={24} fill="rgba(116,179,206,0.3)" stroke="#74B3CE" strokeWidth={1.5} />
        <circle cx={0} cy={0} r={8} fill="#004346" opacity={0.6} />
        {/* Atom orbits */}
        <ellipse cx={0} cy={0} rx={110} ry={36} stroke="#74B3CE" strokeWidth={0.8} fill="none" opacity={0.35} strokeDasharray="5 4" />
        <ellipse cx={0} cy={0} rx={110} ry={36} stroke="#508991" strokeWidth={0.6} fill="none" opacity={0.25} strokeDasharray="5 4" transform="rotate(60)" />
        {/* Vertex dots */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <circle
              key={angle}
              cx={Math.cos(rad) * 80}
              cy={Math.sin(rad) * 80}
              r={4}
              fill="#004346"
              opacity={0.5}
            />
          );
        })}
      </g>

      {/* Formula annotations */}
      {[
        { x: 60, y: 80, text: "Mg²⁺" },
        { x: 300, y: 100, text: "GSH" },
        { x: 80, y: 400, text: "D₃" },
        { x: 310, y: 380, text: "K₂" },
      ].map(({ x, y, text }) => (
        <g key={text} transform={`translate(${x}, ${y})`}>
          <rect x={-20} y={-12} width={40} height={24} rx={6} fill="rgba(0,67,70,0.08)" stroke="#004346" strokeWidth={0.8} opacity={0.6} />
          <text
            x={0} y={5}
            textAnchor="middle"
            fontFamily="'DM Mono', monospace"
            fontSize={11}
            fill="#004346"
            opacity={0.7}
          >
            {text}
          </text>
        </g>
      ))}

      {/* Connecting paths */}
      <path d="M80 92 Q140 150 131 210" stroke="#004346" strokeWidth={0.8} fill="none" opacity={0.2} strokeDasharray="4 3" />
      <path d="M300 112 Q260 160 269 210" stroke="#004346" strokeWidth={0.8} fill="none" opacity={0.2} strokeDasharray="4 3" />
      <path d="M80 388 Q140 340 131 290" stroke="#508991" strokeWidth={0.8} fill="none" opacity={0.2} strokeDasharray="4 3" />
      <path d="M310 368 Q260 330 269 290" stroke="#508991" strokeWidth={0.8} fill="none" opacity={0.2} strokeDasharray="4 3" />
    </svg>
  );
}

function LargeMolecule() {
  return (
    <svg width={400} height={400} viewBox="0 0 400 400" fill="none">
      <polygon points="200,30 340,110 340,270 200,350 60,270 60,110" stroke="#004346" strokeWidth={3} fill="none" />
      <polygon points="200,80 300,138 300,254 200,312 100,254 100,138" stroke="#74B3CE" strokeWidth={2} fill="none" />
      <circle cx={200} cy={200} r={50} stroke="#004346" strokeWidth={2} fill="none" />
    </svg>
  );
}

function BioIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={3} />
      <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20" />
      <path d="M12 6a6 6 0 0 1 0 12 6 6 0 0 1 0-12" />
    </svg>
  );
}

function GradeIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function DoseIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M8 3l-5 13a2 2 0 0 0 1.84 2.76h14.32A2 2 0 0 0 21 16L16 3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}
