"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";

export default function ProductGridSection() {
  return (
    <section
      id="products"
      style={{
        padding: "var(--section-py) 0",
        background: "var(--bg-surface)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: "var(--container-px)",
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64, textAlign: "center" }}
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
            The Formulas
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 400,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            Precision in{" "}
            <em style={{ fontStyle: "italic", color: "var(--mid)" }}>every tablet</em>
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
            Hover any product to see the full composition. Each formula is built around the most bioavailable form of each active, without compromise.
          </p>
        </motion.div>

        {/* Product grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            alignItems: "start",
          }}
          className="product-grid"
        >
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
