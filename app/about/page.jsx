"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { GlassEffect } from "@/components/ui/liquid-glass";

const PRINCIPLES = [
  {
    number: "01",
    title: "Form determines function",
    body: "We chose Magnesium Bisglycinate, not because it sounds better, but because the clinical data shows 10x greater absorption than oxide. Every ingredient decision traces back to a mechanism, not a trend.",
    color: "#74B3CE",
    colorDark: "#004346",
  },
  {
    number: "02",
    title: "Dose is the active ingredient",
    body: "A product with 50mg of glutathione costs less to make and looks the same on paper. It does nothing at that dose. We use 500mg because that is what clinical protocols use. Sub-therapeutic dosing is a quiet lie the industry tells.",
    color: "#9E6899",
    colorDark: "#5B3765",
  },
  {
    number: "03",
    title: "USP is the floor, not the ceiling",
    body: "The United States Pharmacopeia standard is the compendial benchmark for pharmaceutical-grade ingredients. We use USP-certified raw materials as a baseline, then verify every batch independently. Most supplement brands use food-grade or no certification at all.",
    color: "#508991",
    colorDark: "#172A3A",
  },
];

const TIMELINE = [
  {
    year: "The question",
    body: "Why does every supplement brand in Pakistan use the cheapest possible form of every ingredient, hide it behind proprietary blends, and use clinical-sounding language for products that could not pass a basic purity test?",
  },
  {
    year: "The research",
    body: "We spent months in the literature. We talked to pharmacologists. We mapped the difference between food-grade and pharmaceutical-grade sourcing. We found that the gap in bioavailability between cheap and correct was not marginal. It was tenfold.",
  },
  {
    year: "The standard",
    body: "We decided to build on USP from day one. Not because it was easy or cheap, but because it was the only way to say, without qualification, that what is on the label is what is in the tablet.",
  },
  {
    year: "Three formulas",
    body: "Magnesium Max. Grenee. DAOS-D. We did not try to cover everything. We chose three foundational deficiencies that affect almost everyone, and we made each one as precise as we could.",
  },
];

const STATS = [
  { value: "100%", label: "USP certified ingredients" },
  { value: "0", label: "Proprietary blends" },
  { value: "3x", label: "Average bioavailability advantage" },
  { value: "3", label: "Formulas. Nothing more." },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ background: "var(--bg-base)" }}>
      {/* Hero */}
      <div
        ref={heroRef}
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse 110% 80% at 50% 30%, #B8E8EE 0%, #D4F0F4 35%, #EAF6F8 60%, #F0FAFA 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "5%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(116,179,206,0.15)",
            filter: "blur(90px)",
            animation: "float-a 12s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "6%",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(0,67,70,0.08)",
            filter: "blur(80px)",
            animation: "float-b 15s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 2 }}
        >
          <div
            style={{
              maxWidth: 820,
              marginInline: "auto",
              paddingInline: "var(--container-px)",
              textAlign: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ marginBottom: 28 }}
            >
              <GlassEffect
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 999,
                  padding: "7px 18px",
                }}
                tint="rgba(0,67,70,0.09)"
                border="1px solid rgba(0,67,70,0.15)"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--primary)",
                  }}
                >
                  Our Story
                </span>
              </GlassEffect>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.12 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 7vw, 86px)",
                fontWeight: 400,
                letterSpacing: "-0.035em",
                lineHeight: 0.96,
                color: "var(--text-primary)",
                marginBottom: 28,
              }}
            >
              Built on one{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--mid)",
                  display: "block",
                }}
              >
                uncomfortable truth
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(16px, 2.5vw, 22px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--text-secondary)",
                lineHeight: 1.55,
                maxWidth: 580,
                marginInline: "auto",
              }}
            >
              Most supplements in Pakistan are built for the shelf, not the body.
              Heal Station was built to be different.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <StatsStrip />

      {/* Timeline / brand story */}
      <TimelineSection />

      {/* Three principles */}
      <PrinciplesSection />

      {/* The team / intent section */}
      <IntentSection />

      {/* Final CTA */}
      <div
        style={{
          padding: "80px var(--container-px)",
          textAlign: "center",
          background: "var(--bg-surface)",
        }}
      >
        <div style={{ maxWidth: 520, marginInline: "auto" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: 14,
            }}
          >
            Try it
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.5vw, 46px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              marginBottom: 18,
              lineHeight: 1.05,
            }}
          >
            The proof is{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>in the result.</em>
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/shop"
              style={{
                display: "inline-block",
                background: "rgba(0,67,70,0.18)",
                backdropFilter: "blur(20px) saturate(1.7)",
                WebkitBackdropFilter: "blur(20px) saturate(1.7)",
                color: "rgba(255,255,255,0.92)",
                borderRadius: 999,
                padding: "13px 32px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.32)",
                boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.40), 0 4px 24px rgba(0,67,70,0.28)",
                transition: "all 0.22s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,67,70,0.28)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,67,70,0.18)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Shop All Formulas
            </a>
            <a
              href="/science"
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px) saturate(1.6)",
                WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                color: "rgba(255,255,255,0.80)",
                borderRadius: 999,
                padding: "13px 30px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.03em",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.30)",
                transition: "all 0.22s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Read the Science
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #172A3A 0%, #004346 100%)",
        padding: "52px var(--container-px)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
          textAlign: "center",
        }}
        className="stats-grid"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: i * 0.1 }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                color: "white",
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(116,179,206,0.75)",
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        padding: "100px var(--container-px)",
        background: "var(--bg-surface)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 80,
          alignItems: "start",
        }}
        className="timeline-grid"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: 16,
            }}
          >
            Origin
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: "var(--text-primary)",
            }}
          >
            How we{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>arrived here</em>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.2 + i * 0.12 }}
              style={{
                display: "flex",
                gap: 28,
                paddingBottom: i < TIMELINE.length - 1 ? 36 : 0,
                position: "relative",
              }}
            >
              {/* Timeline line */}
              {i < TIMELINE.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 11,
                    top: 26,
                    width: 1,
                    height: "calc(100% - 10px)",
                    background:
                      "linear-gradient(to bottom, var(--mid), transparent)",
                    opacity: 0.25,
                  }}
                />
              )}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1.5px solid var(--mid)",
                  background: "var(--bg-surface)",
                  flexShrink: 0,
                  marginTop: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--mid)",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--mid)",
                    marginBottom: 8,
                  }}
                >
                  {item.year}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.78,
                  }}
                >
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .timeline-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}

function PrinciplesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        padding: "100px var(--container-px)",
        background: "var(--bg-base)",
      }}
    >
      <div style={{ maxWidth: 1280, marginInline: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: 14,
            }}
          >
            Founding Principles
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              lineHeight: 1.05,
            }}
          >
            What we refuse{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>to compromise</em>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
          }}
        >
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.13 }}
            >
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-card)",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    height: 5,
                    background: `linear-gradient(90deg, ${p.colorDark}, ${p.color})`,
                  }}
                />
                <div style={{ padding: "32px 28px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: p.color,
                      marginBottom: 14,
                    }}
                  >
                    {p.number}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(18px, 2.5vw, 22px)",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      marginBottom: 14,
                      lineHeight: 1.25,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "var(--text-secondary)",
                      lineHeight: 1.78,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntentSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #0A1A1F 0%, #0D2028 60%, #172A3A 100%)",
        padding: "100px var(--container-px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(116,179,206,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        style={{
          maxWidth: 860,
          marginInline: "auto",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#74B3CE",
              marginBottom: 28,
            }}
          >
            Intent
          </p>
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 4vw, 38px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "white",
              lineHeight: 1.45,
              letterSpacing: "-0.015em",
              marginBottom: 40,
              borderLeft: "3px solid #74B3CE",
              paddingLeft: 28,
            }}
          >
            &ldquo;We are not trying to be the biggest supplement brand. We are trying to be the
            one you trust enough to take every single day, because you have read exactly what
            is in it and exactly why.&rdquo;
          </blockquote>

          <GlassEffect
            tint="rgba(116,179,206,0.1)"
            border="1px solid rgba(116,179,206,0.22)"
            style={{ borderRadius: 16, padding: "24px 28px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
              className="intent-grid"
            >
              {[
                { label: "Transparency", desc: "Every ingredient, every dose, published in full. No blends." },
                { label: "Mechanism", desc: "We explain the biochemistry so you can verify our reasoning." },
                { label: "Standard", desc: "USP grade, batch tested, no exceptions for any formula." },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      color: "rgba(255,255,255,0.9)",
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.45)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </GlassEffect>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .intent-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
