import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import CTASection from "@/components/sections/CTASection";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_SECTIONS } from "@/lib/products";
import { ArrowRight } from "lucide-react";

const engineering = PRODUCT_SECTIONS.find((s) => s.id === "engineering-tools")!;
const tools = PRODUCT_SECTIONS.find((s) => s.id === "workshop-equipment")!;

export const metadata: Metadata = buildMetadata({
  title: "Engineering Tools Malta — Workshop & Industrial Tools",
  description:
    "Engineering tools and industrial hand tools in Malta. Workshop equipment, machinery accessories, and precision tools — Marsa supplier.",
  path: "/products/engineering-tools-malta",
  keywords: ["engineering tools Malta", "industrial equipment Malta"],
});

export default function EngineeringToolsMaltaPage() {
  return (
    <>
      <Hero
        compact
        headline="Engineering Tools Malta"
        subheadline="Workshop machinery accessories, maintenance equipment, and precision tools for Maltese industrial and marine trades."
      />

      {[engineering, tools].map((section) => (
        <section
          key={section.id}
          id={section.slug}
          className="section-padding scroll-mt-24 border-b border-border"
        >
          <div className="container-industrial">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionTitle
                  eyebrow="Category"
                  title={section.title}
                  description={section.description}
                />
                <ul className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      className="rounded-sm border border-border p-4 text-sm"
                    >
                      <span className="font-heading font-bold text-primary">
                        {item.name}
                      </span>
                      <span className="text-secondary"> — {item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
                <Image
                  src={section.imageUrl}
                  alt={section.imageAlt}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding">
        <div className="container-industrial text-center">
          <Link href="/quote" className="btn-primary">
            Request tooling quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <p className="mt-4">
            <Link href="/products" className="text-sm font-medium text-accent hover:text-orange-600">
              ← Full product catalog
            </Link>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
