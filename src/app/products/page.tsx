// src/app/products/page.tsx — updated to show all 9 product categories
import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import ProductCategorySection from "@/components/sections/ProductCategorySection";
import CTASection from "@/components/sections/CTASection";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_SECTIONS } from "@/lib/products";

export const metadata: Metadata = buildMetadata({
  title: "Industrial Products & Marine Supplies Malta — J. Bezzina & Co",
  description:
    "Fasteners, power tools, safety equipment, hydraulics, electrical supplies, mechanical components, engineering tools, workshop equipment, and consumables — Malta.",
  path: "/products",
  keywords: [
    "fasteners Malta",
    "power tools Malta",
    "hydraulics Malta",
    "safety equipment Malta",
    "electrical supplies Malta",
    "marine supplies Malta",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <Hero
        compact
        headline="Industrial & Marine Products"
        subheadline="Nine product categories covering fasteners, power tools, safety, hydraulics, electrical, mechanical, and workshop supply — all from our Marsa location."
        primaryCta={{ label: "Request quote", href: "/quote" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />

      {/* Category quick links */}
      <section className="border-b border-border bg-surface py-8">
        <div className="container-industrial">
          <nav aria-label="Product category quick links">
            <ul className="flex flex-wrap gap-3">
              {PRODUCT_SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/products/${s.slug}`}
                    className="rounded-sm border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="section-padding pb-0">
        <div className="container-industrial">
          <SectionTitle
            eyebrow="Product catalog"
            title="Technical supply categories"
            description="Browse our full industrial and marine range. Click any category for detailed specifications and size tables. For pricing and availability, submit a quote request."
          />
        </div>
      </section>

      {PRODUCT_SECTIONS.map((section, index) => (
        <ProductCategorySection
          key={section.id}
          section={section}
          reversed={index % 2 === 1}
        />
      ))}

      <CTASection
        headline="Request product information"
        description="Send part numbers, quantities, or application details — we will respond with availability and pricing during business hours."
      />
    </>
  );
}
