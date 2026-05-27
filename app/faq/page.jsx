"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SchemaScript from "@/components/SchemaScript";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

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
    title: "Our Products",
    items: [
      {
        q: "What makes Heal Station different from pharmacy supplements?",
        a: "We source USP-certified actives, use the most bioavailable molecular forms (bisglycinate, reduced L-glutathione, MK-7), and dose clinically — not to hit a label claim.",
      },
      {
        q: "Are your products approved by DRAP?",
        a: "Yes. All three formulas are registered with the Drug Regulatory Authority of Pakistan. Registration numbers are available on each product's packaging.",
      },
      {
        q: "What does USP grade mean?",
        a: "USP (United States Pharmacopeia) is the global gold standard for pharmaceutical raw material purity. Our magnesium, glutathione, and vitamin D3/K2 are all sourced to USP specification.",
      },
      {
        q: "Can I take multiple products together?",
        a: "Magnesium Max + DAOS-D is a common pairing — magnesium aids D3 absorption. Grenee pairs well with either. If you take prescription medication, consult your physician first.",
      },
    ],
  },
  {
    title: "Orders & Delivery",
    items: [
      {
        q: "How do I place an order?",
        a: "Orders are placed via WhatsApp. Tap &ldquo;Place Order&rdquo; on any product and we&apos;ll confirm availability, process payment, and dispatch within 24 hours.",
      },
      {
        q: "Where do you deliver?",
        a: "Currently delivering across Pakistan. Lahore, Karachi, Islamabad — next day. Other cities 2–3 business days via TCS/Leopards.",
      },
      {
        q: "What is your return policy?",
        a: "Unopened products in original packaging can be returned within 7 days of delivery. See our Returns page for the full process.",
      },
      {
        q: "How do I contact support?",
        a: "WhatsApp us directly at +92 312 142 8187. We respond within a few hours on business days.",
      },
    ],
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        flexShrink: 0,
      }}
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="var(--primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  // Flatten all Q&A pairs for schema
  const allFaqItems = sections.flatMap((s) => s.items);

  let globalIndex = -1;

  return (
    <div
      style={{
        background: "var(--bg-base)",
        minHeight: "100vh",
        paddingTop: "var(--navbar-h)",
        paddingBottom: "clamp(56px,10vw,120px)",
      }}
    >
      {/* Schema markup */}
      <SchemaScript schema={faqSchema(allFaqItems)} />
      <SchemaScript schema={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }])} />

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
          Support
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
          Frequently Asked Questions
        </h1>
      </motion.div>

      {/* Sections */}
      <div
        style={{
          maxWidth: 860,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          display: "flex",
          flexDirection: "column",
          gap: 48,
        }}
      >
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: si * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--primary)",
                marginBottom: 16,
                opacity: 0.7,
              }}
            >
              {section.title}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {section.items.map((item) => {
                globalIndex++;
                const idx = globalIndex;
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    style={{
                      ...glassCard,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 16,
                        padding: "18px 24px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.q}
                      </span>
                      <ChevronIcon open={isOpen} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 14,
                              color: "var(--text-secondary)",
                              lineHeight: 1.85,
                              padding: "0 24px 20px",
                              borderTop: "1px solid rgba(0,67,70,0.07)",
                              paddingTop: 16,
                            }}
                          >
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
