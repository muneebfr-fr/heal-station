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

const sections = [
  {
    title: "Information We Collect",
    body: "Name, phone number, delivery address, and order history when you place an order via WhatsApp. We do not collect payment card data.",
  },
  {
    title: "How We Use It",
    body: "To process and deliver your order, send you order updates via WhatsApp, and occasionally notify you of new products or restocks (you can opt out at any time by replying STOP).",
  },
  {
    title: "Data Storage",
    body: "Your data is stored securely and never sold or shared with third parties except our logistics partners (TCS/Leopards) solely for delivery purposes.",
  },
  {
    title: "Your Rights",
    body: "You can request deletion of your data at any time by contacting us via WhatsApp. We will remove all records within 7 business days.",
  },
  {
    title: "Contact",
    body: "For any privacy concerns, contact us at +92 312 142 8187 or healstation.pk@gmail.com.",
  },
];

export default function PrivacyPage() {
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
          Legal
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px,6vw,64px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--primary)",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}
        >
          Last updated: May 2025
        </p>
      </motion.div>

      {/* Sections */}
      <div
        style={{
          maxWidth: 860,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...glassCard, padding: "28px 32px" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "var(--primary)",
                  opacity: 0.35,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px,2.5vw,24px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "var(--primary)",
                  lineHeight: 1.2,
                }}
              >
                {section.title}
              </h2>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                paddingLeft: 28,
              }}
            >
              {section.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
