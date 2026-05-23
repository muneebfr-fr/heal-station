"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Quiz Data ──────────────────────────────────────────────────────────────
   Each option has symptom weights for three deficiencies:
   mg (Magnesium), vitd (Vitamin D), gsh (Glutathione / oxidative load)
   Weights reflect clinical co-occurrence in published literature.
   Max achievable: mg = 38 | vitd = 43 | gsh = 32
──────────────────────────────────────────────────────────────────────────── */
const QUESTIONS = [
  {
    id: "energy",
    category: "Energy & Fatigue",
    question: "How would you describe your energy and fatigue levels?",
    note: "Select everything that applies — even if it seems minor.",
    options: [
      { id: "e1", label: "Tired even after a full night of sleep", scores: { mg: 2, vitd: 3, gsh: 1 } },
      { id: "e2", label: "Mid-afternoon energy crash that feels unavoidable", scores: { mg: 1, vitd: 2, gsh: 1 } },
      { id: "e3", label: "Generalised weakness or heaviness without exertion", scores: { mg: 2, vitd: 3, gsh: 1 } },
      { id: "e4", label: "Physical exhaustion after mild activity", scores: { mg: 1, vitd: 3, gsh: 2 } },
      { id: "e0", label: "My energy is stable — none of the above", exclusive: true, scores: { mg: 0, vitd: 0, gsh: 0 } },
    ],
  },
  {
    id: "sleep",
    category: "Sleep Quality",
    question: "Which of these sleep patterns do you recognise?",
    note: "Magnesium plays a direct role in sleep architecture — this section carries strong diagnostic weight.",
    options: [
      { id: "s1", label: "Difficulty falling asleep — mind won't switch off", scores: { mg: 3, vitd: 1 } },
      { id: "s2", label: "Frequent waking during the night", scores: { mg: 3, vitd: 1 } },
      { id: "s3", label: "Waking unrefreshed regardless of hours slept", scores: { mg: 2, vitd: 2 } },
      { id: "s4", label: "Restless legs, nocturnal cramps, or leg twitching", scores: { mg: 4, vitd: 1 } },
      { id: "s0", label: "My sleep is consistently good — none of the above", exclusive: true, scores: { mg: 0, vitd: 0, gsh: 0 } },
    ],
  },
  {
    id: "musculoskeletal",
    category: "Muscles, Bones & Head",
    question: "Have you experienced any of these physical symptoms recently?",
    note: "Bone and joint pain are among the most specific indicators of Vitamin D insufficiency.",
    options: [
      { id: "m1", label: "Muscle cramps or sudden spasms", scores: { mg: 4, vitd: 1 } },
      { id: "m2", label: "Bone pain, joint aching, or deep skeletal discomfort", scores: { mg: 0, vitd: 4, gsh: 1 } },
      { id: "m3", label: "Unexplained muscle weakness", scores: { mg: 1, vitd: 3 } },
      { id: "m4", label: "Frequent tension headaches or migraines", scores: { mg: 3, vitd: 0 } },
      { id: "m5", label: "Visible muscle twitching (eyelid, calf, thumb)", scores: { mg: 3, vitd: 0 } },
      { id: "m0", label: "No significant musculoskeletal symptoms", exclusive: true, scores: { mg: 0, vitd: 0, gsh: 0 } },
    ],
  },
  {
    id: "mood",
    category: "Mood & Cognition",
    question: "Do any of these mental or emotional patterns describe you?",
    note: "Vitamin D receptors are present throughout the brain. Both Mg and Vit D deficiencies have measurable mood and cognitive effects.",
    options: [
      { id: "mo1", label: "Persistent anxiety, nervousness, or inner tension", scores: { mg: 3, vitd: 1 } },
      { id: "mo2", label: "Low mood, low motivation, or depressive episodes", scores: { mg: 2, vitd: 4 } },
      { id: "mo3", label: "Brain fog — difficulty concentrating or recalling things", scores: { mg: 2, vitd: 2, gsh: 2 } },
      { id: "mo4", label: "Irritability or emotional reactivity that feels disproportionate", scores: { mg: 2, vitd: 1 } },
      { id: "mo0", label: "My mood and mental clarity are generally stable", exclusive: true, scores: { mg: 0, vitd: 0, gsh: 0 } },
    ],
  },
  {
    id: "skin",
    category: "Skin & Appearance",
    question: "Which of these skin-related observations apply to you?",
    note: "Glutathione is the body's master antioxidant. Skin is often the first visible indicator of systemic oxidative stress.",
    options: [
      { id: "sk1", label: "Dull, lacklustre complexion — skin that lacks radiance", scores: { mg: 0, vitd: 0, gsh: 4 } },
      { id: "sk2", label: "Uneven skin tone, dark spots, or hyperpigmentation", scores: { mg: 0, vitd: 0, gsh: 4 } },
      { id: "sk3", label: "Premature fine lines or aging signs beyond your age", scores: { mg: 0, vitd: 0, gsh: 3 } },
      { id: "sk4", label: "Slow-healing wounds, persistent blemishes, or skin inflammation", scores: { mg: 0, vitd: 1, gsh: 3 } },
      { id: "sk0", label: "My skin is healthy and I have no major concerns", exclusive: true, scores: { mg: 0, vitd: 0, gsh: 0 } },
    ],
  },
  {
    id: "immunity",
    category: "Immunity & Inflammation",
    question: "How does your body respond to infection and environmental stress?",
    note: "Vitamin D insufficiency is the single most common modifiable factor in impaired Pakistani immune function.",
    options: [
      { id: "im1", label: "Frequent colds, infections, or respiratory illness", scores: { mg: 0, vitd: 4, gsh: 2 } },
      { id: "im2", label: "Slow recovery — illness lingers longer than it should", scores: { mg: 0, vitd: 2, gsh: 3 } },
      { id: "im3", label: "Chronic low-grade inflammation, body aches, or joint swelling", scores: { mg: 0, vitd: 2, gsh: 3 } },
      { id: "im4", label: "Heightened seasonal allergies or autoimmune flares", scores: { mg: 0, vitd: 2, gsh: 2 } },
      { id: "im0", label: "I rarely get ill and recover quickly — none of the above", exclusive: true, scores: { mg: 0, vitd: 0, gsh: 0 } },
    ],
  },
];

const MAX_SCORES = { mg: 38, vitd: 43, gsh: 32 };

const DEFICIENCY_META = {
  mg: {
    name: "Magnesium",
    product: "Magnesium Max",
    productSlug: "/shop",
    color: "#74B3CE",
    colorDark: "#004346",
    colorBg: "#D6F3F4",
    symbol: "Mg",
    lowExplanation:
      "Your symptom profile does not strongly suggest magnesium insufficiency. Magnesium deficiency typically presents with sleep disruption, muscle cramps, anxiety, and tension headaches. Absence of these symptoms is a reassuring sign.",
    moderateExplanation:
      "Some of your symptoms overlap with known magnesium insufficiency patterns. Magnesium participates in over 300 enzymatic processes. Subclinical deficiency — where blood tests appear normal but tissue levels are low — is extremely common and often missed by standard panels.",
    elevatedExplanation:
      "Your symptom pattern shows a notable alignment with magnesium insufficiency. The nervous system and skeletal muscle are particularly dependent on magnesium for electrical stability. Chronic stress, soil depletion in Pakistani agricultural land, and processed food consumption are significant contributors to widespread low magnesium status.",
    strongExplanation:
      "Your reported symptoms are highly consistent with clinically significant magnesium insufficiency. Sleep disruption, muscle cramps, anxiety, and headaches are among the most reliable clinical indicators. Bisglycinate is the only form with sufficient bioavailability to meaningfully raise tissue levels — oxide and citrate forms largely fail to penetrate the cells where magnesium does its work.",
  },
  vitd: {
    name: "Vitamin D",
    product: "DAOS-D",
    productSlug: "/shop",
    color: "#508991",
    colorDark: "#172A3A",
    colorBg: "#D6F3F4",
    symbol: "D₃",
    lowExplanation:
      "Your symptoms do not strongly indicate Vitamin D insufficiency. That said, an estimated 70–80% of Pakistanis are deficient regardless of symptoms — lab confirmation via 25(OH)D blood test is always the most reliable assessment.",
    moderateExplanation:
      "Several of your reported symptoms have documented associations with Vitamin D insufficiency. Despite Pakistan's sunny climate, indoor lifestyles, pollution-filtered UV, and skin coverage result in pervasive deficiency — often without the patient or their physician recognising it as the underlying cause.",
    elevatedExplanation:
      "Your symptom profile is significantly consistent with Vitamin D insufficiency. Fatigue, mood disruption, musculoskeletal pain, and immune suppression are all downstream effects of vitamin D acting on its nuclear receptor across multiple tissues. The musculoskeletal symptoms you report are particularly specific to D3 insufficiency.",
    strongExplanation:
      "Your reported symptom cluster strongly matches the clinical profile of Vitamin D deficiency. This is the most common nutritional deficiency in Pakistan — paradoxically, because solar UVB exposure is blocked by atmospheric pollution, indoor work, and modest dress, even in a high-sunlight country. D3 supplementation requires K2 (MK-7 form) to safely direct absorbed calcium to bone rather than arterial walls.",
  },
  gsh: {
    name: "Glutathione",
    product: "Grenee",
    productSlug: "/shop",
    color: "#9E6899",
    colorDark: "#5B3765",
    colorBg: "#F3CCDE",
    symbol: "GSH",
    lowExplanation:
      "Your symptoms do not strongly suggest elevated oxidative stress or glutathione depletion. Glutathione status tends to decline gradually with age, urban pollution exposure, and chronic illness — periodic reassessment is worthwhile even without active symptoms.",
    moderateExplanation:
      "Some of your reported symptoms are associated with reduced glutathione activity. Glutathione is the body's primary cellular antioxidant and the central molecule in hepatic detoxification. Urban air pollution, processed food, and inadequate sleep are the primary depletion drivers in Pakistani cities.",
    elevatedExplanation:
      "Your symptoms show a meaningful pattern consistent with glutathione insufficiency and elevated oxidative stress. The skin is a reliable proxy for systemic antioxidant status — dullness and hyperpigmentation are among the earliest visible signs of oxidative load exceeding the body's capacity to neutralise it.",
    strongExplanation:
      "Your symptom profile is strongly consistent with glutathione depletion and significant oxidative stress burden. This is increasingly prevalent in Pakistani urban populations due to compounding factors: air quality, ultra-processed food, sleep disruption, and inadequate micronutrient intake. Oral supplementation requires co-factors (Alpha Lipoic Acid) to regenerate the molecule after it is oxidised — supplementing glutathione without ALA is largely ineffective.",
  },
};

function getSignalLabel(pct) {
  if (pct < 20) return { label: "Low signal", tier: 0 };
  if (pct < 42) return { label: "Moderate signal", tier: 1 };
  if (pct < 66) return { label: "Elevated signal", tier: 2 };
  return { label: "Strong signal", tier: 3 };
}

function getExplanation(meta, tier) {
  if (tier === 0) return meta.lowExplanation;
  if (tier === 1) return meta.moderateExplanation;
  if (tier === 2) return meta.elevatedExplanation;
  return meta.strongExplanation;
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function QuizPage() {
  const [step, setStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState({}); // { questionId: Set of optionIds }
  const [results, setResults] = useState(null);
  const topRef = useRef(null);

  const currentQ = QUESTIONS[step];

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleOption(qId, optId, exclusive) {
    setAnswers((prev) => {
      const current = new Set(prev[qId] || []);
      // exclusive "none" option
      if (exclusive) {
        return { ...prev, [qId]: new Set([optId]) };
      }
      // deselect exclusive if a real option chosen
      const q = QUESTIONS.find((q) => q.id === qId);
      const exclusiveId = q.options.find((o) => o.exclusive)?.id;
      if (exclusiveId) current.delete(exclusiveId);
      if (current.has(optId)) current.delete(optId);
      else current.add(optId);
      return { ...prev, [qId]: current };
    });
  }

  function canAdvance() {
    if (step < 0) return true;
    const sel = answers[currentQ.id];
    return sel && sel.size > 0;
  }

  function advance() {
    scrollTop();
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      computeResults();
    }
  }

  function computeResults() {
    const raw = { mg: 0, vitd: 0, gsh: 0 };
    QUESTIONS.forEach((q) => {
      const sel = answers[q.id] || new Set();
      q.options.forEach((opt) => {
        if (sel.has(opt.id)) {
          raw.mg += opt.scores.mg || 0;
          raw.vitd += opt.scores.vitd || 0;
          raw.gsh += opt.scores.gsh || 0;
        }
      });
    });
    const pct = {
      mg: Math.round((raw.mg / MAX_SCORES.mg) * 100),
      vitd: Math.round((raw.vitd / MAX_SCORES.vitd) * 100),
      gsh: Math.round((raw.gsh / MAX_SCORES.gsh) * 100),
    };
    const ranked = ["mg", "vitd", "gsh"].sort((a, b) => pct[b] - pct[a]);
    setResults({ raw, pct, ranked });
    setStep(QUESTIONS.length);
    scrollTop();
  }

  function restart() {
    setStep(-1);
    setAnswers({});
    setResults(null);
    scrollTop();
  }

  return (
    <div ref={topRef} style={{ background: "var(--bg-base)", minHeight: "100vh", paddingBottom: 80 }}>
      {/* Progress bar */}
      {step >= 0 && step < QUESTIONS.length && (
        <div style={{ position: "sticky", top: "var(--navbar-h)", zIndex: 10, background: "var(--bg-base)", borderBottom: "1px solid var(--border-subtle)", padding: "10px var(--container-px)" }}>
          <div style={{ maxWidth: 720, marginInline: "auto", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1, height: 4, background: "var(--border-subtle)", borderRadius: 2, overflow: "hidden" }}>
              <motion.div
                style={{ height: "100%", background: "var(--primary)", borderRadius: 2, transformOrigin: "left" }}
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              {step + 1} / {QUESTIONS.length}
            </span>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 720, marginInline: "auto", paddingInline: "var(--container-px)", paddingTop: 64 }}>
        <AnimatePresence mode="wait">

          {/* ─── Intro ─────────────────────────────────────────────────── */}
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--mid)", marginBottom: 20 }}>
                Clinical Assessment
              </p>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 6vw, 58px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--text-primary)", marginBottom: 24 }}>
                Deficiency{" "}
                <em style={{ fontStyle: "italic", color: "var(--mid)" }}>signal assessment</em>
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16, maxWidth: 540 }}>
                This tool screens for symptom patterns associated with three clinically significant and widely prevalent deficiencies in Pakistan: Magnesium, Vitamin D, and Glutathione depletion.
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 48, maxWidth: 540 }}>
                It is not a diagnosis. It identifies symptom clusters that, in clinical and research literature, co-occur with measurable biochemical insufficiency. 6 sections. Takes approximately 3 minutes.
              </p>

              {/* Three deficiency cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 48 }} className="quiz-def-grid">
                {Object.entries(DEFICIENCY_META).map(([key, meta]) => (
                  <div
                    key={key}
                    style={{
                      background: meta.colorBg,
                      border: `1px solid ${meta.color}40`,
                      borderRadius: 16,
                      padding: "18px 16px",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, fontWeight: 500, color: meta.colorDark, marginBottom: 8 }}>
                      {meta.symbol}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: meta.colorDark, marginBottom: 4 }}>
                      {meta.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", color: meta.color }}>
                      Deficiency
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setStep(0); scrollTop(); }}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: 999,
                  padding: "15px 44px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0,67,70,0.25)",
                }}
              >
                Begin Assessment
              </button>

              <style>{`@media (max-width: 500px) { .quiz-def-grid { grid-template-columns: 1fr !important; } }`}</style>
            </motion.div>
          )}

          {/* ─── Questions ─────────────────────────────────────────────── */}
          {step >= 0 && step < QUESTIONS.length && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category label */}
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--mid)", marginBottom: 16 }}>
                Section {step + 1} — {currentQ.category}
              </p>

              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: "var(--text-primary)", marginBottom: 14 }}>
                {currentQ.question}
              </h2>

              <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 32, borderLeft: "2px solid var(--border-active)", paddingLeft: 14, fontStyle: "italic" }}>
                {currentQ.note}
              </p>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
                {currentQ.options.map((opt) => {
                  const selected = (answers[currentQ.id] || new Set()).has(opt.id);
                  return (
                    <motion.button
                      key={opt.id}
                      onClick={() => toggleOption(currentQ.id, opt.id, opt.exclusive)}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "16px 18px",
                        borderRadius: 14,
                        border: selected ? "1.5px solid var(--primary)" : "1.5px solid var(--border-subtle)",
                        background: selected ? "rgba(0,67,70,0.05)" : "var(--bg-surface)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.18s ease",
                        boxShadow: selected ? "0 4px 16px rgba(0,67,70,0.08)" : "var(--shadow-card)",
                      }}
                    >
                      {/* Checkbox */}
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: opt.exclusive ? "50%" : 5,
                          border: selected ? "none" : "1.5px solid var(--border-active)",
                          background: selected ? "var(--primary)" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.18s ease",
                        }}
                      >
                        {selected && (
                          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 14,
                          color: selected ? "var(--text-primary)" : "var(--text-secondary)",
                          lineHeight: 1.55,
                          fontWeight: selected ? 500 : 400,
                          flex: 1,
                          fontStyle: opt.exclusive ? "italic" : "normal",
                        }}
                      >
                        {opt.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Nav buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  onClick={() => { setStep((s) => s - 1); scrollTop(); }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    visibility: step > 0 ? "visible" : "hidden",
                  }}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Back
                </button>

                <button
                  onClick={advance}
                  disabled={!canAdvance()}
                  style={{
                    background: canAdvance() ? "var(--primary)" : "var(--border-subtle)",
                    color: canAdvance() ? "white" : "var(--text-muted)",
                    border: "none",
                    borderRadius: 999,
                    padding: "13px 36px",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    cursor: canAdvance() ? "pointer" : "default",
                    transition: "all 0.2s ease",
                    boxShadow: canAdvance() ? "0 4px 16px rgba(0,67,70,0.2)" : "none",
                  }}
                >
                  {step === QUESTIONS.length - 1 ? "See My Results" : "Next Section"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Results ───────────────────────────────────────────────── */}
          {step === QUESTIONS.length && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--mid)", marginBottom: 20 }}>
                Assessment Results
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--text-primary)", marginBottom: 14 }}>
                Your deficiency{" "}
                <em style={{ fontStyle: "italic", color: "var(--mid)" }}>signal profile</em>
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 48, maxWidth: 500, fontStyle: "italic" }}>
                Results are based on clinical symptom co-occurrence patterns, not blood markers. A higher signal does not confirm deficiency — it indicates your symptoms warrant further investigation or empirical supplementation under medical guidance.
              </p>

              {/* Ranked result cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {results.ranked.map((key, rank) => {
                  const meta = DEFICIENCY_META[key];
                  const pct = results.pct[key];
                  const { label, tier } = getSignalLabel(pct);
                  const explanation = getExplanation(meta, tier);

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: rank * 0.12 }}
                    >
                      <div
                        style={{
                          background: "var(--bg-surface)",
                          border: `1px solid ${rank === 0 && tier >= 2 ? meta.color + "55" : "var(--border-subtle)"}`,
                          borderRadius: 20,
                          overflow: "hidden",
                          boxShadow: rank === 0 ? "var(--shadow-hover)" : "var(--shadow-card)",
                        }}
                      >
                        {/* Top strip */}
                        <div
                          style={{
                            background: rank === 0
                              ? `linear-gradient(135deg, ${meta.colorDark} 0%, ${meta.color} 100%)`
                              : `${meta.colorBg}`,
                            padding: "20px 28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                background: rank === 0 ? "rgba(255,255,255,0.15)" : meta.colorBg,
                                border: `1px solid ${rank === 0 ? "rgba(255,255,255,0.2)" : meta.color + "40"}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "var(--font-mono)",
                                fontSize: 16,
                                fontWeight: 500,
                                color: rank === 0 ? "white" : meta.colorDark,
                              }}
                            >
                              {meta.symbol}
                            </div>
                            <div>
                              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: rank === 0 ? "white" : meta.colorDark, letterSpacing: "-0.01em" }}>
                                {meta.name}
                              </div>
                              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: rank === 0 ? "rgba(255,255,255,0.65)" : meta.color, marginTop: 2 }}>
                                {rank === 0 ? "Highest signal" : rank === 1 ? "Second signal" : "Third signal"}
                              </div>
                            </div>
                          </div>

                          {/* Signal badge */}
                          <div
                            style={{
                              background: rank === 0 ? "rgba(255,255,255,0.18)" : meta.colorBg,
                              border: `1px solid ${rank === 0 ? "rgba(255,255,255,0.3)" : meta.color + "50"}`,
                              borderRadius: 999,
                              padding: "6px 14px",
                            }}
                          >
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: rank === 0 ? "white" : meta.colorDark }}>
                              {label}
                            </span>
                          </div>
                        </div>

                        {/* Bar + explanation */}
                        <div style={{ padding: "24px 28px" }}>
                          {/* Progress bar */}
                          <div style={{ marginBottom: 22 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                                Symptom alignment
                              </span>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, color: meta.colorDark }}>
                                {pct}%
                              </span>
                            </div>
                            <div style={{ height: 8, background: "var(--bg-base)", borderRadius: 4, overflow: "hidden" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1.2, delay: rank * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                  height: "100%",
                                  borderRadius: 4,
                                  background: `linear-gradient(90deg, ${meta.color}88, ${meta.colorDark})`,
                                }}
                              />
                            </div>
                            {/* Scale labels */}
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                              {["Low", "Moderate", "Elevated", "Strong"].map((l) => (
                                <span key={l} style={{ fontFamily: "var(--font-mono)", fontSize: 7, letterSpacing: "0.08em", color: "var(--border-active)", textTransform: "uppercase" }}>
                                  {l}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Clinical explanation */}
                          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 20 }}>
                            {explanation}
                          </p>

                          {/* Subtle product link — not a buy button */}
                          {tier >= 1 && (
                            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}>
                              <div style={{ width: 3, height: 3, borderRadius: "50%", background: meta.color }} />
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                                Relevant formula
                              </span>
                              <Link
                                href={meta.productSlug}
                                style={{ fontFamily: "var(--font-body)", fontSize: 12, color: meta.colorDark, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}
                              >
                                {meta.product}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer actions */}
              <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <button
                  onClick={restart}
                  style={{
                    background: "none",
                    border: "1.5px solid var(--border-active)",
                    borderRadius: 999,
                    padding: "11px 28px",
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                  }}
                >
                  Retake Assessment
                </button>
                <Link
                  href="/science"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    color: "var(--mid)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                  }}
                >
                  Read the science behind these deficiencies
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", color: "var(--border-active)", marginTop: 28, lineHeight: 1.8 }}>
                DISCLAIMER — This tool is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Consult a qualified healthcare provider before beginning any supplementation. Blood tests (25(OH)D, RBC magnesium, glutathione peroxidase) remain the definitive method of assessing deficiency status.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
