"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import { PRODUCTS } from "@/data/products";
import { useLang } from "@/context/LanguageContext";

export default function ProductGridSection() {
  const [activeProduct, setActiveProduct] = useState(null);
  const { lang } = useLang();
  const ur = lang === "ur";

  return (
    <section id="products" style={{ padding: "var(--section-py) 0", background: "var(--bg-surface)" }}>
      <div style={{ maxWidth: 1280, marginInline: "auto", paddingInline: "var(--container-px)" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <p style={{ fontFamily: ur ? "var(--font-urdu)" : "var(--font-mono)", fontSize: ur ? 13 : 10, letterSpacing: ur ? 0 : "0.28em", textTransform: ur ? "none" : "uppercase", color: "var(--mid)", marginBottom: 16, direction: ur ? "rtl" : "ltr" }}>
            {ur ? "ہماری فارمولیں" : "The Formulas"}
          </p>
          <h2 style={{ fontFamily: ur ? "var(--font-urdu)" : "var(--font-display)", fontSize: ur ? "clamp(26px, 5vw, 42px)" : "var(--text-h2)", fontWeight: ur ? 700 : 400, color: "var(--text-primary)", letterSpacing: ur ? 0 : "-0.02em", lineHeight: ur ? 1.5 : 1.05, marginBottom: 16, direction: ur ? "rtl" : "ltr" }}>
            {ur ? "ہر گولی میں " : "Precision in "}
            <em style={{ fontStyle: ur ? "normal" : "italic", color: "var(--mid)" }}>
              {ur ? "درستگی" : "every tablet"}
            </em>
          </h2>
          <p style={{ fontFamily: ur ? "var(--font-urdu)" : "var(--font-body)", fontSize: 15, color: "var(--text-secondary)", maxWidth: 480, marginInline: "auto", lineHeight: ur ? 2.0 : 1.75, direction: ur ? "rtl" : "ltr", textAlign: ur ? "right" : "center" }}>
            {ur
              ? "تفصیلات دیکھنے کے لیے کسی بھی پروڈکٹ پر کلک کریں۔ ہر فارمولا سب سے زیادہ جذب ہونے والی شکل پر مبنی ہے۔"
              : "Click any product for full details. Each formula is built around the most bioavailable form of each active, without compromise."}
          </p>
        </motion.div>

        {/* Product grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, alignItems: "start" }}
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
              <ProductCard product={product} onViewDetails={() => setActiveProduct(product)} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProduct && (
          <ProductDetailModal product={activeProduct} onClose={() => setActiveProduct(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
