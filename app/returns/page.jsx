"use client";

import { motion } from "framer-motion";

const glassCard = {
  background: "rgba(255,255,255,0.38)",
  backdropFilter: "blur(24px) saturate(1.6)",
  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
  border: "1px solid rgba(255,255,255,0.52)",
  borderRadius: 20,
  boxShadow:
    "inset 0 1.5px 0 rgba(255,255,255,0.7), 0 8px 40px rgba(0,67,70,0.08)",
};

const eligible = [
  "Unopened, sealed product",
  "Returned within 7 days of delivery",
  "Original packaging intact",
];

const notEligible = [
  "Opened products (for hygiene and safety)",
  "Products purchased more than 7 days ago",
  "Items damaged by customer",
];

const steps = [
  {
    num: "01",
    text: "Contact us via WhatsApp at +92 312 142 8187 with your order number and reason.",
  },
  {
    num: "02",
    text: "We'll confirm eligibility and provide a return address.",
  },
  {
    num: "03",
    text: "Ship the item back. Once received and inspected, a full refund is processed within 3–5 business days.",
  },
];

export default function ReturnsPage() {
  return (
    <div
      style={{
        background: "var(--bg-base)",
        minHeight: "100vh",
        paddingTop: "var(--navbar-h)",
        paddingBottom: "clamp(56px,10vw,120px)",
      }}
    >
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 860,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          paddingTop: "clamp(40px,8vw,80px)",
          paddingBottom: "clamp(32px,6vw,56px)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: 16,
          }}
        >
          Policy
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px,6vw,64px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--primary)",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Returns &amp; Exchanges
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--text-secondary)",
            lineHeight: 1.85,
            maxWidth: 480,
            marginInline: "auto",
          }}
        >
          We stand behind every formula we make. If something isn&apos;t right, we&apos;ll make it right.
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: 860,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* Eligibility two-column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {/* Eligible */}
          <div style={{ ...glassCard, padding: "28px 28px" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--primary)",
                marginBottom: 14,
                opacity: 0.7,
              }}
            >
              Eligible for Return
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {eligible.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(0,67,70,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5.5L4 7.5L8 3"
                        stroke="var(--primary)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Not Eligible */}
          <div style={{ ...glassCard, padding: "28px 28px" }}>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--mid)",
                marginBottom: 14,
                opacity: 0.8,
              }}
            >
              Not Eligible
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {notEligible.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(80,137,145,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M3 3L7 7M7 3L3 7"
                        stroke="var(--mid)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* How to Return */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...glassCard, padding: "32px 32px" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: 14,
              opacity: 0.7,
            }}
          >
            Process
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px,3vw,32px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--primary)",
              marginBottom: 28,
            }}
          >
            How to Return
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--primary)",
                    opacity: 0.4,
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                    paddingTop: 2,
                    minWidth: 24,
                  }}
                >
                  {step.num}
                </span>
                <div
                  style={{
                    flex: 1,
                    paddingLeft: 16,
                    borderLeft: "1px solid rgba(0,67,70,0.12)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "var(--text-secondary)",
                      lineHeight: 1.85,
                    }}
                  >
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Refund Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...glassCard,
            padding: "20px 28px",
            borderLeft: "3px solid var(--primary)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.85,
            }}
          >
            <strong style={{ color: "var(--primary)", fontWeight: 500 }}>Note: </strong>
            Refunds are issued to the original payment method. If you paid cash on delivery, we&apos;ll refund via EasyPaisa or bank transfer.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
