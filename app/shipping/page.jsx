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

const highlights = [
  {
    title: "Same-Day Dispatch",
    body: "Orders confirmed before 2 pm PKT are dispatched same day via TCS or Leopards Courier.",
    icon: "⚡",
  },
  {
    title: "Delivery Times",
    body: "Lahore, Karachi, Islamabad: 1 business day. All other cities: 2–3 business days.",
    icon: "📦",
  },
  {
    title: "Free Shipping",
    body: "Free on all orders over PKR 3,000. Flat PKR 250 shipping on orders below that.",
    icon: "🎁",
  },
];

export default function ShippingPage() {
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
          Logistics
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px,6vw,64px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--primary)",
            lineHeight: 1.1,
          }}
        >
          Shipping &amp; Delivery
        </h1>
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
        {/* Highlight Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {highlights.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...glassCard,
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  marginBottom: 14,
                  lineHeight: 1,
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "var(--primary)",
                  marginBottom: 10,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Packaging */}
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
            Packaging
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px,3vw,30px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--primary)",
              marginBottom: 12,
            }}
          >
            Sealed &amp; Protected
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.85,
            }}
          >
            All products are shipped in tamper-evident sealed packaging. Temperature-sensitive formulas (Grenee, DAOS-D) are packed with insulation during summer months.
          </p>
        </motion.div>

        {/* Tracking */}
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
            Tracking
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px,3vw,30px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--primary)",
              marginBottom: 12,
            }}
          >
            Track Your Order
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.85,
            }}
          >
            You&apos;ll receive a tracking number via WhatsApp once your order is dispatched. Track directly on the TCS or Leopards website.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
