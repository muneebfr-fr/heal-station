/**
 * Heal Station — JSON-LD Schema Markup Generators
 * Generates structured data for Google Rich Results.
 */

const SITE_URL = "https://healstation.pk";
const SITE_NAME = "Heal Station";
const LOGO_URL = `${SITE_URL}/logo.png`;
const WHATSAPP = "+923121428187";

/* ─── Organization ───────────────────────────────────────────────────────── */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 200,
      height: 200,
    },
    description:
      "Pharmaceutical-grade supplements formulated for bioavailability. USP-certified, clinically dosed. Based in Pakistan.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: WHATSAPP,
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    sameAs: [],
  };
}

/* ─── WebSite (enables Sitelinks Searchbox) ─────────────────────────────── */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ─── Product ────────────────────────────────────────────────────────────── */
// Maps product slugs to image paths (update when real product images are added)
const PRODUCT_IMAGES = {
  "magnesium-max": `${SITE_URL}/images/magnesium-max.jpg`,
  grenee: `${SITE_URL}/images/grenee.jpg`,
  "daos-d": `${SITE_URL}/images/daos-d.jpg`,
};

/**
 * @param {object} product — a PRODUCTS entry from data/products.js
 */
export function productSchema(product) {
  // Parse price number from "PKR 1,800"
  const priceValue = product.price.replace(/[^0-9]/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: PRODUCT_IMAGES[product.slug] || LOGO_URL,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    sku: product.slug.toUpperCase(),
    category: "Dietary Supplement",
    keywords: product.tags.join(", "),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop`,
      priceCurrency: "PKR",
      price: priceValue,
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "PKR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "PK",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
  };
}

/* ─── FAQPage ────────────────────────────────────────────────────────────── */
/**
 * @param {Array<{q: string, a: string}>} items — flat array of Q&A pairs
 */
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip HTML entities for clean schema text
        text: item.a
          .replace(/&apos;/g, "'")
          .replace(/&ldquo;/g, '"')
          .replace(/&rdquo;/g, '"')
          .replace(/&amp;/g, "&"),
      },
    })),
  };
}

/* ─── BreadcrumbList ─────────────────────────────────────────────────────── */
/**
 * @param {Array<{name: string, href: string}>} crumbs
 */
export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };
}

/* ─── JsonLd component helper ────────────────────────────────────────────── */
/**
 * Returns a <script> tag string — inject via dangerouslySetInnerHTML
 * or use the SchemaScript component below.
 */
export function toScriptTag(schema) {
  return JSON.stringify(schema);
}
