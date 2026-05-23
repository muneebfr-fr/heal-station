"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(23,42,58,0.45)",
              backdropFilter: "blur(4px)",
              zIndex: 300,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
              background: "var(--bg-surface)",
              borderLeft: "1px solid var(--border-subtle)",
              zIndex: 301,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 48px rgba(23,42,58,0.15)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px 24px 20px",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: 2,
                  }}
                >
                  Your Cart
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1.5px solid var(--border-subtle)",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onRemove={() => removeItem(item.id)}
                        onQtyChange={(q) => updateQty(item.id, q)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "20px 24px 28px",
                  borderTop: "1px solid var(--border-subtle)",
                  background: "var(--bg-base)",
                }}
              >
                {/* Subtotal */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
                    Subtotal
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 500, color: "var(--gold)" }}>
                    PKR {total.toLocaleString()}
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginBottom: 20, letterSpacing: "0.08em" }}>
                  Shipping calculated at checkout
                </p>

                {/* Checkout CTA */}
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    position: "relative",
                    background: "rgba(0,67,70,0.13)",
                    backdropFilter: "blur(20px) saturate(1.7)",
                    WebkitBackdropFilter: "blur(20px) saturate(1.7)",
                    border: "1px solid rgba(255,255,255,0.48)",
                    borderRadius: 999,
                    padding: "14px 24px",
                    color: "var(--primary)",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.68), inset 0 -1px 0 rgba(0,67,70,0.10), 0 4px 20px rgba(0,67,70,0.16)",
                    overflow: "hidden",
                    transition: "all 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,67,70,0.20)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0,67,70,0.13)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.52) 50%, transparent 72%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "-200% 0",
                    animation: "glass-shimmer 3.2s ease infinite",
                    borderRadius: "inherit",
                  }} />
                  <span style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
                    Proceed to Checkout
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: "16px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      {/* Color swatch */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${item.colorAccent || "#D6F3F4"}, ${item.color || "#74B3CE"})`,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 500, color: item.colorDark || "#004346", textAlign: "center", lineHeight: 1.2 }}>
          {item.name.split(" ")[0].slice(0, 3).toUpperCase()}
        </span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15,
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: 2,
            letterSpacing: "-0.01em",
          }}
        >
          {item.name}
        </h4>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", marginBottom: 12, letterSpacing: "0.08em" }}>
          {item.keyActive}
        </p>

        {/* Qty + remove */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1.5px solid var(--border-subtle)", borderRadius: 999, overflow: "hidden" }}>
            <button
              onClick={() => onQtyChange(item.qty - 1)}
              style={{
                width: 30, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: "none", cursor: "pointer",
                color: "var(--text-muted)", fontSize: 16, lineHeight: 1,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              −
            </button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-primary)", minWidth: 20, textAlign: "center" }}>
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.qty + 1)}
              style={{
                width: 30, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                background: "transparent", border: "none", cursor: "pointer",
                color: "var(--text-muted)", fontSize: 16, lineHeight: 1,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-elevated)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              +
            </button>
          </div>

          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: "var(--gold)" }}>
            {item.price}
          </span>

          <button
            onClick={onRemove}
            style={{
              width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: "50%", background: "transparent", border: "none", cursor: "pointer",
              color: "var(--text-muted)", transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fee2e2";
              e.currentTarget.style.color = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingBlock: 60,
        gap: 16,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--bg-elevated)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
        }}
      >
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 400, color: "var(--text-primary)", marginBottom: 6 }}>
          Your cart is empty
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
          Find your formula and add it here.
        </p>
      </div>
    </motion.div>
  );
}
