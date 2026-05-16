export const PRODUCTS = [
  {
    id: 1,
    slug: "magnesium-max",
    name: "Magnesium Max",
    subtitle: "Sleep. Calm. Recovery.",
    tagline: "Deep cellular restoration for the body that never stops working.",
    description:
      "Magnesium Bisglycinate, the most bioavailable form, paired with Vitamin B6 for enhanced absorption. Supports muscle recovery, nervous system calm, and restorative sleep.",
    composition: [
      { name: "Magnesium Bisglycinate", spec: "USP", amount: "750", unit: "mg" },
      { name: "Vitamin B6", spec: "USP", amount: "5", unit: "mg" },
    ],
    keyActive: "Magnesium Bisglycinate",
    keyAmount: "750mg",
    benefit: "Bioavailable magnesium chelate for sleep, muscle & nerve support",
    color: "#74B3CE",
    colorDark: "#004346",
    colorAccent: "#D6F3F4",
    price: "PKR 1,800",
    tags: ["Sleep", "Recovery", "Nerve Health"],
    goals: ["Better sleep & calmer nerves", "More energy, less fatigue"],
  },
  {
    id: 2,
    slug: "grenee",
    name: "Grenee",
    subtitle: "Glow. Protect. Renew.",
    tagline: "Master antioxidant complex for skin luminosity and cellular defence.",
    description:
      "L-Glutathione at clinical dose, amplified by Alpha Lipoic Acid, its natural regenerator, alongside Vitamin C and E. Together, they form the skin's premier antioxidant shield.",
    composition: [
      { name: "L-Glutathione", spec: "USP", amount: "500", unit: "mg" },
      { name: "Alpha Lipoic Acid", spec: "USP", amount: "50", unit: "mg" },
      { name: "Vitamin C", spec: "USP", amount: "60", unit: "mg" },
      { name: "Vitamin E", spec: "USP", amount: "10", unit: "IU" },
    ],
    keyActive: "L-Glutathione",
    keyAmount: "500mg",
    benefit: "Master antioxidant complex for skin clarity and oxidative defence",
    color: "#9E6899",
    colorDark: "#5B3765",
    colorAccent: "#F3CCDE",
    price: "PKR 2,400",
    tags: ["Skin Glow", "Antioxidant", "Anti-Aging"],
    goals: ["Brighter, clearer skin", "Antioxidant & inner glow"],
  },
  {
    id: 3,
    slug: "daos-d",
    name: "DAOS-D",
    subtitle: "Bones. Immunity. Heart.",
    tagline: "The D3+K2 protocol that does what daily vitamins cannot.",
    description:
      "High-potency Vitamin D3 paired with MK-7 form of Vitamin K2, the only form that directs calcium precisely to bones and away from arteries. A protocol trusted by integrative medicine.",
    composition: [
      { name: "Vitamin D3", spec: "USP", amount: "100,000", unit: "IU" },
      { name: "Vitamin K2 (MK7)", spec: "USP", amount: "200", unit: "mcg" },
    ],
    keyActive: "Vitamin D3 + K2",
    keyAmount: "100K IU + 200mcg",
    benefit: "High-potency D3/K2 protocol for bone density and immune resilience",
    color: "#508991",
    colorDark: "#172A3A",
    colorAccent: "#D6F3F4",
    price: "PKR 2,200",
    tags: ["Bone Health", "Immunity", "Heart"],
    goals: ["Stronger bones & joints", "Immunity that holds up"],
  },
];

export const FORMULA_GOALS = [
  { label: "Better sleep & calmer nerves", icon: "moon", productId: 1 },
  { label: "More energy, less fatigue", icon: "zap", productId: 1 },
  { label: "Brighter, clearer skin", icon: "sparkles", productId: 2 },
  { label: "Antioxidant & inner glow", icon: "shield", productId: 2 },
  { label: "Stronger bones & joints", icon: "bone", productId: 3 },
  { label: "Immunity that holds up", icon: "heart", productId: 3 },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
