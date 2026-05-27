import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { FloatingFormulaButton } from "@/components/FormulaFinder";
import { GlassFilter } from "@/components/ui/liquid-glass";
import SchemaScript from "@/components/SchemaScript";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export const metadata = {
  title: "Heal Station: Pharmaceutical Grade Supplements",
  description:
    "USP-certified, clinically dosed supplements formulated for bioavailability. Magnesium Max, Grenee, DAOS-D. Science you can feel.",
  keywords:
    "pharmaceutical supplements, magnesium bisglycinate, glutathione, vitamin D3 K2, USP certified, Pakistan supplements",
  openGraph: {
    title: "Heal Station",
    description: "Science you can feel.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <SchemaScript schema={organizationSchema()} />
        <SchemaScript schema={websiteSchema()} />
      </head>
      <body>
        <GlassFilter />
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main style={{ paddingTop: "var(--navbar-h)" }}>{children}</main>
            <Footer />
            <CartDrawer />
            <FloatingFormulaButton />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
