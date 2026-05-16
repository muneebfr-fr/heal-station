"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "I've tried magnesium supplements before but nothing like this. Three weeks in, I'm sleeping through the night for the first time in years.",
    name: "Sara K.",
    detail: "Magnesium Max user, 6 weeks",
    rating: 5,
  },
  {
    id: 2,
    quote: "The Grenee tablet genuinely changed my skin. Two months in and the difference is visible. I didn't expect a tablet to do this.",
    name: "Mariam A.",
    detail: "Grenee user, 8 weeks",
    rating: 5,
  },
  {
    id: 3,
    quote: "My doctor actually noticed my D3 levels were finally in range. DAOS-D is the only thing I changed. The K2 combination makes total sense.",
    name: "Usman T.",
    detail: "DAOS-D user, 3 months",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        padding: "var(--section-py) 0",
        background: "var(--bg-elevated)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative orb */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse, rgba(116,179,206,0.10), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          style={{ textAlign: "center", marginBottom: 64 }}
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
            From Our Customers
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Results speak{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>for themselves</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
          className="testimonial-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(12px) saturate(1.3)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  borderRadius: "var(--radius-card)",
                  padding: "32px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  boxShadow: "0 4px 24px rgba(23,42,58,0.06)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,67,70,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(23,42,58,0.06)";
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} width={13} height={13} viewBox="0 0 24 24">
                      <polygon
                        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        fill="var(--gold)"
                      />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: "clamp(15px, 2vw, 17px)",
                    fontWeight: 300,
                    color: "var(--text-primary)",
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--primary), var(--mid))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 16,
                        fontWeight: 400,
                        color: "white",
                      }}
                    >
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text-primary)",
                        marginBottom: 2,
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--text-muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {t.detail}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
