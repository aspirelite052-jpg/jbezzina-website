// src/app/products/workshop-equipment-malta/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/sections/Hero";
import CTASection from "@/components/sections/CTASection";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_SECTIONS } from "@/lib/products";
import { ArrowRight } from "lucide-react";

const section = PRODUCT_SECTIONS.find((s) => s.id === "workshop-equipment")!;

export const metadata: Metadata = buildMetadata({
  title: "Workshop Equipment Malta — Industrial Machinery & Tools",
  description:
    "Workshop equipment in Malta: vices, presses, welding machines, compressors, and hoists. Joseph Bezzina & Co Ltd, Marsa.",
  path: "/products/workshop-equipment-malta",
  keywords: ["workshop equipment Malta", "industrial machinery Malta"],
});

export default function WorkshopEquipmentMaltaPage() {
  return (
    <>
      <Hero compact headline="Workshop Equipment Malta" subheadline={section.intro} />

      <section className="section-padding">
        <div className="container-industrial">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle title={section.title} description={section.description} />
              <ul className="mt-8 space-y-4">
                {section.items.map((item) => (
                  <li key={item.name} className="border-l-4 border-accent bg-surface py-3 pl-4">
                    <h3 className="font-heading font-bold text-primary">{item.name}</h3>
                    <p className="mt-1 text-sm text-secondary">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <Link href="/quote" className="btn-primary mt-8">
                Request a quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-sm border border-border">
              <Image
                src={section.imageUrl}
                alt={section.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}