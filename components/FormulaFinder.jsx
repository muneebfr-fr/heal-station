"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById } from "@/data/products";

const WA_NUMBER = "923121428187";

/* ── Flow Data ─────────────────────────────────────────────────────────────── */

const STEP1 = {
  question: "Where does your body need support most right now?",
  options: [
    { label: "Sleep and calmer nerves", icon: "moon", group: "mg" },
    { label: "Energy and mental clarity", icon: "zap", group: "mg" },
    { label: "Skin glow and clarity", icon: "sparkles", group: "gsh" },
    { label: "Cellular protection", icon: "shield", group: "gsh" },
    { label: "Bone and joint strength", icon: "bone", group: "d3" },
    { label: "Immunity and resilience", icon: "heart", group: "d3" },
  ],
};

const STEP2 = {
  mg: {
    question: "How does your body usually feel by the evening?",
    options: [
      "Wired but can't switch off",
      "Physically drained, low motivation",
      "Anxious, tense, or restless",
      "Muscle soreness, slow to recover",
    ],
  },
  gsh: {
    question: "What does your skin most reflect right now?",
    options: [
      "Dull and uneven tone",
      "Puffiness, slow to bounce back",
      "Loss of firmness and radiance",
      "Breakouts or persistent oxidation",
    ],
  },
  d3: {
    question: "Which resonates most with you?",
    options: [
      "Mostly indoors, limited sunlight",
      "Joint stiffness or aching",
      "Get sick often or recover slowly",
      "Taking calcium with no visible results",
    ],
  },
};

const STEP3 = {
  question: "What best describes your daily rhythm?",
  options: [
    "High-stress, mentally demanding",
    "Physically active, hard on the body",
    "Mostly sedentary, desk-based",
    "Irregular, hard to maintain routine",
  ],
};

const GROUP_TO_PRODUCT = { mg: 1, gsh: 2, d3: 3 };

function getPersonalizedMessage(group, step2Idx) {
  const msgs = {
    mg: [
      "That wired-but-tired state is a textbook sign of magnesium depletion. Your nervous system is running on overdrive without the mineral it needs to come down.",
      "Chronic low energy often traces to cellular ATP production. Magnesium is its cofactor. Without it, cells literally cannot generate energy at the rate they should.",
      "Anxiety and restlessness respond remarkably well to bisglycinate specifically. The glycine it carries has its own direct calming effect on NMDA receptors.",
      "Muscle soreness and slow recovery are two of the most documented signs of magnesium deficiency. This chelated form is what clinical recovery protocols use.",
    ],
    gsh: [
      "Dull, uneven skin is the surface symptom of oxidative stress happening underneath. At 500mg, this matches the doses used in clinical skin brightening trials.",
      "Slow cellular recovery reflects reduced antioxidant capacity. L-glutathione paired with its natural regenerator, alpha lipoic acid, restores what stress depletes.",
      "Loss of firmness tracks directly with declining glutathione. The correlation begins in your late 20s. This formulation addresses the root, not just the surface.",
      "Oxidative stress is exactly what glutathione exists to neutralise. At 500mg with ALA regenerating it continuously, this is a clinical-grade antioxidant stack.",
    ],
    d3: [
      "If you are mostly indoors, you are almost certainly deficient. Subclinical D3 deficiency affects the majority of people in South Asia. This dose is built for rapid correction.",
      "Joint stiffness has a D3 and K2 component that gets missed because standard supplementation skips K2, the molecule that directs calcium to bone tissue rather than soft tissue.",
      "Vitamin D3 is central to immune cell differentiation. The MK-7 form of K2 in this formula has a 3-day half-life, meaning one dose keeps working through the week.",
      "Calcium without K2 is the core problem. The mineral needs guidance to reach bone. K2 MK-7 provides that direction. You are likely not missing calcium, just its conductor.",
    ],
  };
  return msgs[group]?.[step2Idx] ?? msgs[group]?.[0] ?? "";
}

/* ── Icons ──────────────────────────────────────────────────────────────────── */
const ICONS = {
  moon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>,
  zap: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  sparkles: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" /></svg>,
  shield: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  bone: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 3.5a2 2 0 0 1 2 2v1l4 4h1a2 2 0 0 1 0 4h-1l-4 4v1a2 2 0 0 1-4 0v-1l-4-4H2a2 2 0 0 1 0-4h1l4-4V5.5a2 2 0 0 1 2-2z" /></svg>,
  heart: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
};

/* ── Main exports ────────────────────────────────────────────────────────────── */

export function FormulaFinderInline() {
  return (
    <section
      id="formula-finder"
      style={{
        padding: "var(--section-py) 0",
        background: "var(--bg-elevated)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "80%",
          background: "radial-gradient(ellipse, rgba(116,179,206,0.10), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 820,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
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
            Find Your Formula
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Your body, your{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>formula</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <ChatInterface />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Chat Engine ─────────────────────────────────────────────────────────────── */

function ChatInterface() {
  const [phase, setPhase] = useState("step1");
  const [answers, setAnswers] = useState({ step1: null, step2: null, step3: null });
  const [history, setHistory] = useState([]);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [personMessage, setPersonMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (history.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [phase, history]);

  function pushHistory(userLabel, botQuestion) {
    setHistory((h) => [...h, { user: userLabel, bot: botQuestion }]);
  }

  function handleStep1(option) {
    setAnswers((a) => ({ ...a, step1: option }));
    pushHistory(option.label, STEP2[option.group].question);
    setPhase("step2");
  }

  function handleStep2(label, idx) {
    const group = answers.step1.group;
    setAnswers((a) => ({ ...a, step2: { label, idx } }));
    pushHistory(label, STEP3.question);
    setPhase("step3");
  }

  function handleStep3(label) {
    setAnswers((a) => ({ ...a, step3: label }));
    const group = answers.step1.group;
    const step2Idx = answers.step2.idx;
    setPhase("typing");
    setTimeout(() => {
      const product = getProductById(GROUP_TO_PRODUCT[group]);
      setRecommendedProduct(product);
      setPersonMessage(getPersonalizedMessage(group, step2Idx));
      setPhase("result");
    }, 1800);
  }

  function handleReset() {
    setPhase("step1");
    setAnswers({ step1: null, step2: null, step3: null });
    setHistory([]);
    setRecommendedProduct(null);
    setPersonMessage("");
    setAddedToCart(false);
  }

  const step2Data = answers.step1 ? STEP2[answers.step1.group] : null;

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "var(--shadow-float)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "var(--primary)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(214,243,244,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L12 7M12 17L12 22M2 12L7 12M17 12L22 12" stroke="white" strokeWidth={2} strokeLinecap="round" />
            <circle cx={12} cy={12} r={3} fill="white" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "white" }}>
            Formula Advisor
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(214,243,244,0.65)", letterSpacing: "0.08em" }}>
              Heal Station
            </span>
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["step1", "step2", "step3", "typing", "result"].slice(0, 4).map((s, i) => {
            const steps = ["step1", "step2", "step3"];
            const current = steps.indexOf(phase);
            const done = i < current || phase === "typing" || phase === "result";
            const active = steps[i] === phase;
            return (
              <div
                key={i}
                style={{
                  width: active ? 20 : 6,
                  height: 6,
                  borderRadius: 999,
                  background: done || active ? "rgba(214,243,244,0.8)" : "rgba(214,243,244,0.2)",
                  transition: "all 0.4s ease",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 24px", minHeight: 340 }}>

        {/* Opening bot message */}
        <BotMessage delay={0}>
          {STEP1.question}
        </BotMessage>

        {/* Step 1 options */}
        <AnimatePresence>
          {phase === "step1" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <OptionGrid columns={2}>
                {STEP1.options.map((opt, i) => (
                  <OptionButton
                    key={opt.label}
                    label={opt.label}
                    icon={ICONS[opt.icon]}
                    index={i}
                    onClick={() => handleStep1(opt)}
                  />
                ))}
              </OptionGrid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat history */}
        {history.map((item, i) => (
          <div key={i}>
            <UserBubble>{item.user}</UserBubble>
            {/* Bot follow-up question */}
            {(i < history.length - 1 || phase === "step2" || phase === "step3") && (
              <BotMessage delay={0}>
                {item.bot}
              </BotMessage>
            )}
          </div>
        ))}

        {/* Step 2 options */}
        <AnimatePresence>
          {phase === "step2" && step2Data && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <OptionGrid columns={2}>
                {step2Data.options.map((label, i) => (
                  <OptionButton
                    key={label}
                    label={label}
                    index={i}
                    onClick={() => handleStep2(label, i)}
                  />
                ))}
              </OptionGrid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3 options */}
        <AnimatePresence>
          {phase === "step3" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <OptionGrid columns={2}>
                {STEP3.options.map((label, i) => (
                  <OptionButton
                    key={label}
                    label={label}
                    index={i}
                    onClick={() => handleStep3(label)}
                  />
                ))}
              </OptionGrid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3 user answer shown once past step3 */}
        {answers.step3 && (phase === "typing" || phase === "result") && (
          <UserBubble>{answers.step3}</UserBubble>
        )}

        {/* Typing indicator */}
        <AnimatePresence>
          {phase === "typing" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ display: "flex", gap: 12, marginBottom: 16 }}
            >
              <BotAvatar />
              <div
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "4px 18px 18px 18px",
                  padding: "16px 20px",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--mid)",
                      animation: `typing-dot 1.2s ${i * 0.2}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {phase === "result" && recommendedProduct && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <BotAvatar />
                <div
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "4px 18px 18px 18px",
                    padding: "14px 18px",
                    maxWidth: 420,
                  }}
                >
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)", lineHeight: 1.65, marginBottom: 8 }}>
                    {personMessage}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Based on everything you have shared,{" "}
                    <strong style={{ color: "var(--primary)" }}>{recommendedProduct.name}</strong>{" "}
                    is the right formula for you.
                  </p>
                </div>
              </div>

              <div style={{ marginLeft: 48 }}>
                <RecommendationCard
                  product={recommendedProduct}
                  onReset={handleReset}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function BotMessage({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay }}
      style={{ display: "flex", gap: 12, marginBottom: 20 }}
    >
      <BotAvatar />
      <div
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "4px 18px 18px 18px",
          padding: "14px 18px",
          maxWidth: 380,
        }}
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-primary)", lineHeight: 1.65 }}>
          {children}
        </p>
      </div>
    </motion.div>
  );
}

function UserBubble({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          background: "var(--primary)",
          color: "white",
          borderRadius: "18px 4px 18px 18px",
          padding: "12px 18px",
          maxWidth: 320,
          fontFamily: "var(--font-body)",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function OptionGrid({ children, columns = 2 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 9,
        marginBottom: 20,
        marginLeft: 48,
      }}
      className="option-grid"
    >
      {children}
      <style>{`
        @media (max-width: 520px) { .option-grid { grid-template-columns: 1fr !important; margin-left: 0 !important; } }
      `}</style>
    </div>
  );
}

function OptionButton({ label, icon, index, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.07, duration: 0.45 }}
      onClick={onClick}
      whileHover={{ borderColor: "var(--primary)", background: "rgba(0,67,70,0.04)", y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: "var(--bg-surface)",
        border: "1.5px solid var(--border-subtle)",
        borderRadius: 12,
        padding: "12px 14px",
        cursor: "pointer",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 9,
        fontFamily: "var(--font-body)",
        fontSize: 13,
        color: "var(--text-secondary)",
        lineHeight: 1.4,
        transition: "background 0.2s ease, border-color 0.2s ease",
      }}
    >
      {icon && <span style={{ color: "var(--mid)", flexShrink: 0 }}>{icon}</span>}
      {label}
    </motion.button>
  );
}

function RecommendationCard({ product, onReset }) {
  const waMsg = encodeURIComponent(`Hi! I'd like to order ${product.name} (${product.price}). Please confirm availability.`);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      style={{
        background: "var(--bg-surface)",
        border: `1.5px solid ${product.colorDark}22`,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${product.colorAccent}80, ${product.colorAccent}28)`,
          padding: "18px 20px 14px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: product.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, color: "white" }}>
            {product.name.slice(0, 3).toUpperCase()}
          </span>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500, color: "var(--text-primary)", marginBottom: 2 }}>
            {product.name}
          </h4>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: product.color }}>
            {product.subtitle}
          </p>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 500, color: product.colorDark }}>
            {product.price}
          </span>
        </div>
      </div>

      <div style={{ padding: "14px 20px 18px" }}>
        <div
          style={{
            background: `${product.colorAccent}40`,
            borderRadius: 9,
            padding: "9px 13px",
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)" }}>
            {product.keyActive}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: product.colorDark }}>
            {product.keyAmount}
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 14 }}>
          {product.benefit}
        </p>
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
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
              padding: "11px 20px",
              fontSize: 12,
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order on WhatsApp
          </a>
          <button
            onClick={onReset}
            style={{
              background: "transparent",
              border: "1.5px solid var(--border-active)",
              borderRadius: 999,
              padding: "10px 16px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
              cursor: "pointer",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}
          >
            Start over
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function BotAvatar() {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--primary), var(--mid))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L12 7M12 17L12 22M2 12L7 12M17 12L22 12" stroke="white" strokeWidth={2} strokeLinecap="round" />
        <circle cx={12} cy={12} r={2.5} fill="white" />
      </svg>
    </div>
  );
}

/* ── Floating Button ─────────────────────────────────────────────────────────── */

export function FloatingFormulaButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 100 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {!open && (
          <div
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: 999,
              border: "2px solid var(--primary)",
              animation: "pulse-ring 2.5s ease-out infinite",
              pointerEvents: "none",
            }}
          />
        )}
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: 999,
            padding: "14px 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0,67,70,0.35)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          <svg width={15} height={15} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L12 7M12 17L12 22M2 12L7 12M17 12L22 12" stroke="white" strokeWidth={2} strokeLinecap="round" />
            <circle cx={12} cy={12} r={2.5} fill="white" />
          </svg>
          Find your formula
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(23,42,58,0.5)",
                backdropFilter: "blur(4px)",
                zIndex: 200,
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                bottom: 90,
                right: 28,
                width: "min(520px, calc(100vw - 56px))",
                maxHeight: "82vh",
                overflowY: "auto",
                zIndex: 201,
                borderRadius: 24,
                boxShadow: "0 32px 80px rgba(23,42,58,0.3)",
              }}
            >
              <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "flex-end", padding: "10px 10px 0" }}>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "rgba(23,42,58,0.15)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--primary)",
                  }}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div style={{ background: "var(--bg-surface)", borderRadius: 24 }}>
                <ChatInterface />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
