"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassEffect } from "@/components/ui/liquid-glass";

const SCIENCE_SECTIONS = [
  {
    id: "magnesium",
    color: "#74B3CE",
    colorDark: "#004346",
    colorBg: "#D6F3F4",
    label: "Magnesium Max",
    compound: "Magnesium Bisglycinate",
    dose: "750mg",
    unit: "mg",
    headline: "Why glycinate changes everything",
    body: "Most magnesium supplements use oxide or citrate, forms the body struggles to absorb. Magnesium Bisglycinate chelates the mineral to glycine, an amino acid. This chelated bond survives the gut intact, delivering mineral directly into the bloodstream. Absorption rates climb from 4% to 40%.",
    mechanism: [
      {
        step: "01",
        title: "Chelation",
        desc: "Magnesium binds to glycine, a calming amino acid, forming a stable organic complex that resists breakdown in stomach acid.",
      },
      {
        step: "02",
        title: "Intestinal uptake",
        desc: "The glycinate complex is absorbed via peptide transporters, bypassing the ion channels that become saturated with inorganic forms.",
      },
      {
        step: "03",
        title: "Cellular delivery",
        desc: "Once absorbed, magnesium crosses the blood-brain barrier and enters mitochondria, activating 300+ enzymatic processes.",
      },
    ],
    comparison: { typical: "4%", ours: "40%", label: "Absorption rate" },
    scienceLine: "Clinical research confirms bisglycinate achieves tissue saturation that oxide cannot, even at 5x the dose.",
  },
  {
    id: "grenee",
    color: "#9E6899",
    colorDark: "#5B3765",
    colorBg: "#F3CCDE",
    label: "Grenee",
    compound: "L-Glutathione + Alpha Lipoic Acid",
    dose: "500mg",
    unit: "mg",
    headline: "Glutathione cannot work alone",
    body: "Glutathione is your body's master antioxidant, but supplementing it is notoriously difficult. Oral glutathione degrades in the gut before reaching cells. Grenee solves this by pairing L-Glutathione with Alpha Lipoic Acid, the one molecule that can regenerate oxidised glutathione back to its active state.",
    mechanism: [
      {
        step: "01",
        title: "ALA primes the system",
        desc: "Alpha Lipoic Acid, both fat and water soluble, enters all cell compartments and begins reducing oxidised glutathione disulfide back to active GSH.",
      },
      {
        step: "02",
        title: "Synergistic uptake",
        desc: "ALA upregulates gamma-glutamylcysteine synthetase, the rate-limiting enzyme for glutathione synthesis, raising endogenous production.",
      },
      {
        step: "03",
        title: "Vitamin network amplification",
        desc: "Vitamin C regenerates Vitamin E, which regenerates ALA, creating a self-sustaining antioxidant network across all tissue compartments.",
      },
    ],
    comparison: { typical: "12%", ours: "78%", label: "Cellular uptake" },
    scienceLine: "L-Glutathione at 500mg with ALA co-supplementation has been shown in trials to raise erythrocyte glutathione levels by 30-35% over 12 weeks.",
  },
  {
    id: "daosd",
    color: "#508991",
    colorDark: "#172A3A",
    colorBg: "#D6F3F4",
    label: "DAOS-D",
    compound: "Vitamin D3 + K2 (MK-7)",
    dose: "100K IU",
    unit: "",
    headline: "D3 without K2 is incomplete",
    body: "Vitamin D3 dramatically increases intestinal calcium absorption. But where that calcium goes depends entirely on Vitamin K2. Without K2's activation of osteocalcin and matrix GLA protein, absorbed calcium circulates freely and may deposit in arteries. MK-7, the longest-acting K2 form, redirects it precisely to bone.",
    mechanism: [
      {
        step: "01",
        title: "D3 absorption cascade",
        desc: "Cholecalciferol is hydroxylated in the liver to 25(OH)D, then in the kidneys to active 1,25(OH)2D, which upregulates TRPV6 calcium channels in the gut.",
      },
      {
        step: "02",
        title: "K2 MK-7 carboxylation",
        desc: "MK-7's 72-hour half-life ensures continuous carboxylation of osteocalcin and MGP, the proteins that bind calcium to bone matrix and clear it from vessels.",
      },
      {
        step: "03",
        title: "Bone matrix integration",
        desc: "Carboxylated osteocalcin binds hydroxyapatite crystals with high affinity. The result is measurable gains in bone mineral density at physiological doses.",
      },
    ],
    comparison: { typical: "18%", ours: "91%", label: "Calcium directed to bone" },
    scienceLine: "MK-7 at 200mcg with D3 supplementation has demonstrated significant reduction in arterial calcification markers (dp-ucMGP) in multiple RCTs.",
  },
];

const USP_STANDARDS = [
  { label: "Identity", desc: "Every ingredient verified to be exactly what it claims to be via HPLC and IR spectroscopy." },
  { label: "Potency", desc: "Active content within 90-110% of stated dose. No under-dosing. No overage to compensate." },
  { label: "Purity", desc: "Heavy metals, microbial contamination, and residual solvents tested to USP limits." },
  { label: "Dissolution", desc: "Verified rate at which the active dissolves and becomes available for absorption." },
];

export default function SciencePage() {
  return (
    <div style={{ background: "var(--bg-base)" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(160deg, #0A1A1F 0%, #0D2028 50%, #172A3A 100%)",
          padding: "96px var(--container-px) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(116,179,206,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(116,179,206,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 820,
            marginInline: "auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#74B3CE",
              marginBottom: 20,
            }}
          >
            The Science
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 68px)",
              fontWeight: 400,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              color: "white",
              marginBottom: 24,
            }}
          >
            Every milligram is{" "}
            <em style={{ fontStyle: "italic", color: "#74B3CE" }}>
              a decision.
            </em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              maxWidth: 580,
              marginInline: "auto",
            }}
          >
            We chose the most bioavailable form of each active. We verified every batch to USP
            pharmaceutical standards and registered every product with DRAP — Pakistan&apos;s national
            drug authority. We wrote out the mechanism so you understand exactly what you are
            taking and why.
          </motion.p>
        </div>
      </div>

      {/* DRAP Section */}
      <DRAPSection />

      {/* Science sections */}
      {SCIENCE_SECTIONS.map((section, sIdx) => (
        <ScienceSection key={section.id} section={section} index={sIdx} />
      ))}

      {/* USP Standards section */}
      <UspSection />

      {/* Why We're Better */}
      <WhyWereBetterSection />

      {/* Bioavailability comparison final CTA */}
      <FinalCTA />
    </div>
  );
}

function DRAPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #0A1A1F 0%, #0D2028 50%, #172A3A 100%)",
        padding: "96px var(--container-px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(116,179,206,0.04) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          pointerEvents: "none",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(80,137,145,0.1) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, marginInline: "auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
          className="drap-grid"
        >
          {/* Left: Badge + headline */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* DRAP Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px 10px 12px",
                borderRadius: 999,
                border: "1px solid rgba(116,179,206,0.3)",
                background: "rgba(116,179,206,0.08)",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(116,179,206,0.15)",
                  border: "1px solid rgba(116,179,206,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#74B3CE" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#74B3CE",
                }}
              >
                DRAP Registered
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "white",
                marginBottom: 20,
              }}
            >
              Pakistan&apos;s drug authority{" "}
              <em style={{ fontStyle: "italic", color: "#74B3CE" }}>reviewed this.</em>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                maxWidth: 460,
              }}
            >
              DRAP — the Drug Regulatory Authority of Pakistan — is the country&apos;s equivalent of
              the US FDA. Registration is not a checkbox. It means a formal review of formulation,
              manufacturing standards, labelling accuracy, and ingredient safety before a product
              is permitted to enter the market.
            </p>
          </motion.div>

          {/* Right: Three contrast points */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {[
              {
                num: "01",
                title: "Most supplements in Pakistan are unregistered",
                body: "The majority of supplements sold locally are grey-market imports — no quality verification, no regulatory review, no legal accountability. The label says what the seller decided to print.",
              },
              {
                num: "02",
                title: "DRAP registration is a legal requirement for pharmaceutical-grade products",
                body: "When a product carries a DRAP registration number, the label is legally accountable. Ingredient claims, dosages, and manufacturing conditions have been reviewed by the national authority.",
              },
              {
                num: "03",
                title: "We chose compliance over convenience",
                body: "Registration takes time and cost. We did it anyway — because a product you cannot trust is not a product at all.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.3 + i * 0.12 }}
                style={{
                  padding: "24px 28px",
                  borderRadius: 16,
                  border: "1px solid rgba(116,179,206,0.12)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "rgba(116,179,206,0.5)",
                    marginBottom: 10,
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.75,
                  }}
                >
                  {item.body}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .drap-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}

function WhyWereBetterSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const paragraphs = [
    {
      heading: "The Pakistan supplement market has a compliance problem",
      body: "Walk into any pharmacy or scroll any health page in Pakistan and you will find shelves stacked with supplements — most of them unregistered imports with no quality verification, cheap ingredient forms chosen for margin rather than mechanism, and proprietary blends designed specifically to obscure how little active ingredient is actually in the bottle. There is no oversight enforcing otherwise. Brands make the claims, print the label, and move on. The consumer has no way to know what they are actually swallowing.",
    },
    {
      heading: "Most people feel nothing because the product is wrong, not the nutrient",
      body: "When a supplement does not work, the instinct is to conclude the nutrient is overhyped. That is rarely true. Magnesium oxide has a 4% absorption rate. Oral glutathione degrades almost entirely before reaching the bloodstream. Vitamin D without K2 cannot direct calcium where the body needs it. The science behind these nutrients is solid — it is the form, the dose, and the delivery that fails. Undertherapeutic doses, degraded imports sitting in uncontrolled warehouses, cheap inorganic compounds that the gut cannot meaningfully absorb — these are the real reasons people feel nothing. The nutrient is not the problem. The product is.",
    },
    {
      heading: "How we built around each failure point",
      body: "Heal Station started from the failure modes. Every formula uses the bioavailable form of each active — bisglycinate not oxide, L-glutathione paired with ALA, MK-7 not MK-4. Every batch is verified to USP pharmaceutical standards: identity, potency, purity, dissolution. Every product is DRAP registered, which means Pakistan&apos;s national drug authority has reviewed the formulation before it reached you. The doses match the clinical research — not trace amounts used to justify a marketing claim, but the quantities that produce the outcomes studies actually measured. The label says what is inside. That is not a boast. It should be a baseline. In Pakistan&apos;s supplement market, it is not.",
    },
    {
      heading: "Pakistani consumers deserve the same standard as anyone else",
      body: "Consumers in the US and Europe have regulatory frameworks that enforce minimum quality standards. A supplement sold in those markets without registration, without verifiable potency, without transparent labelling, would not stay on the shelf. Pakistani consumers deserve exactly the same. Not a localised, lower-quality version of a product — the actual standard, applied with the same rigour. That is the only version of this brand we were willing to build.",
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: "var(--bg-base)",
        padding: "100px var(--container-px)",
      }}
    >
      <div style={{ maxWidth: 1280, marginInline: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85 }}
          style={{ marginBottom: 64 }}
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
            The Standard
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 0,
              lineHeight: 1.05,
              maxWidth: 640,
            }}
          >
            Why the bar is{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>set this high</em>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px 80px",
          }}
          className="why-grid"
        >
          {paragraphs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12 }}
            >
              <div
                style={{
                  width: 32,
                  height: 2,
                  background: "var(--mid)",
                  borderRadius: 1,
                  marginBottom: 20,
                  opacity: 0.5,
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(17px, 1.8vw, 22px)",
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                  lineHeight: 1.25,
                  marginBottom: 14,
                }}
              >
                {p.heading}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}

function AbsorptionBar({ value, color, label, animated }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.08em",
        }}
      >
        <span>{label}</span>
        <span style={{ color: animated ? color : "rgba(255,255,255,0.3)" }}>{value}</span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={animated ? { width: value } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
}

function ScienceSection({ section, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        padding: "100px var(--container-px)",
        background: index % 2 === 0 ? "var(--bg-surface)" : "var(--bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle bg decoration */}
      <div
        style={{
          position: "absolute",
          [isEven ? "right" : "left"]: "-5%",
          top: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `${section.colorBg}`,
          opacity: 0.18,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
        className="science-grid"
      >
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -32 : 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ order: isEven ? 0 : 1 }}
          className={isEven ? "science-text-first" : "science-text-second"}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              padding: "6px 14px",
              borderRadius: 999,
              background: `${section.colorBg}`,
              border: `1px solid ${section.color}35`,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: section.color,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: section.colorDark,
              }}
            >
              {section.label}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: "var(--text-primary)",
              marginBottom: 18,
            }}
          >
            {section.headline}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              marginBottom: 32,
              maxWidth: 440,
            }}
          >
            {section.body}
          </p>

          {/* Mechanism steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {section.mechanism.map((m, i) => (
              <motion.div
                key={m.step}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
                style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 500,
                    color: section.color,
                    flexShrink: 0,
                    marginTop: 2,
                    letterSpacing: "0.06em",
                  }}
                >
                  {m.step}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      marginBottom: 4,
                    }}
                  >
                    {m.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {m.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data card column */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 32 : -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ order: isEven ? 1 : 0 }}
          className={isEven ? "science-data-second" : "science-data-first"}
        >
          <div
            style={{
              background: `linear-gradient(145deg, #0A1A1F 0%, #0D2028 60%, ${section.colorDark}CC 100%)`,
              borderRadius: 24,
              padding: "40px 36px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(${section.color}0A 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <div style={{ position: "relative" }}>
              {/* Dose callout */}
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: section.color,
                    marginBottom: 8,
                    opacity: 0.8,
                  }}
                >
                  Clinical Dose
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(44px, 7vw, 72px)",
                    fontWeight: 400,
                    color: "white",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {section.dose}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 6,
                  }}
                >
                  {section.compound}
                </div>
              </div>

              {/* Absorption bars */}
              <AbsorptionBar
                value={section.comparison.typical}
                color="rgba(255,255,255,0.3)"
                label="Typical supplement"
                animated={inView}
              />
              <AbsorptionBar
                value={section.comparison.ours}
                color={section.color}
                label="Heal Station"
                animated={inView}
              />

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.35)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: 16,
                  marginTop: 8,
                  lineHeight: 1.7,
                }}
              >
                {section.scienceLine}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .science-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .science-text-second, .science-data-first { order: unset !important; }
        }
      `}</style>
    </div>
  );
}

function UspSection() {
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
            Quality Standard
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 16,
              lineHeight: 1.05,
            }}
          >
            What USP means{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>in practice</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--text-secondary)",
              maxWidth: 480,
              marginInline: "auto",
              lineHeight: 1.75,
            }}
          >
            The United States Pharmacopeia sets the compendial standards for pharmaceuticals.
            Meeting USP is not a marketing claim. It is a measurable, verifiable standard with
            four distinct pillars.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {USP_STANDARDS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.1 }}
            >
              <div
                style={{
                  background: "var(--bg-base)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-card)",
                  padding: "32px 28px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--mid)",
                    marginBottom: 12,
                  }}
                >
                  0{i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  {s.label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <div
      style={{
        background: "var(--bg-base)",
        padding: "80px var(--container-px)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 560, marginInline: "auto" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: 16,
          }}
        >
          Ready
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4.5vw, 48px)",
            fontWeight: 400,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginBottom: 20,
            lineHeight: 1.05,
          }}
        >
          Science you can{" "}
          <em style={{ fontStyle: "italic", color: "var(--mid)" }}>actually feel.</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            marginBottom: 36,
          }}
        >
          DRAP registered. USP grade. Clinically dosed. The only thing left is to try it.
        </p>
        <a
          href="/shop"
          style={{
            display: "inline-block",
            background: "var(--primary)",
            color: "white",
            borderRadius: 999,
            padding: "14px 38px",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.04em",
            textDecoration: "none",
            transition: "all 0.25s ease",
            boxShadow: "0 4px 20px rgba(0,67,70,0.3)",
          }}
        >
          Shop All Formulas
        </a>
      </div>
    </div>
  );
}
