// src/components/sections/ProductCategorySection.tsx
import Image from "next/image";
import Link from "next/link";
import type { ProductSection } from "@/lib/products";
import { ArrowRight } from "lucide-react";

type Props = {
  section: ProductSection;
  reversed?: boolean;
};

export default function ProductCategorySection({ section, reversed = false }: Props) {
  const Icon = section.icon;

  return (
    <section
      id={section.slug}
      className="section-padding border-b border-border scroll-mt-24"
      aria-labelledby={`${section.slug}-title`}
    >
      <div className="container-industrial">
        <div
          className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
            reversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-slate-100">
            <Image
              src={section.imageUrl}
              alt={section.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </div>

          {/* Content */}
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-accent/10 text-accent">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Product category
            </p>
            <h2
              id={`${section.slug}-title`}
              className="mt-2 font-heading text-2xl font-bold text-primary sm:text-3xl"
            >
              {section.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-secondary">{section.intro}</p>
            <p className="mt-4 leading-relaxed text-secondary">{section.description}</p>

            {/* Product items */}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {section.items.map((item) => (
                <li key={item.name} className="rounded-sm border border-border bg-background p-4">
                  <h3 className="font-heading text-sm font-bold text-primary">{item.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-secondary">{item.detail}</p>
                </li>
              ))}
            </ul>

            {/* Size table */}
            {section.sizes && section.sizes.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-primary">
                  Available sizes / ranges
                </h3>
                <div className="overflow-x-auto rounded-sm border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-primary text-white">
                        <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide">
                          Type
                        </th>
                        <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide">
                          Size Range
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.sizes.map((row, i) => (
                        <tr
                          key={row.type}
                          className={i % 2 === 0 ? "bg-surface" : "bg-background"}
                        >
                          <td className="px-4 py-2.5 font-medium text-primary">{row.type}</td>
                          <td className="px-4 py-2.5 text-secondary">{row.range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/quote" className="btn-primary">
                Request inquiry
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href={section.seoPath} className="btn-secondary text-xs sm:text-sm">
                View full range
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
