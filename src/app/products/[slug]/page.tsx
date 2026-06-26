// src/app/products/[slug]/page.tsx
// Individual product category page — one route handles all categories
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Hero from "@/components/sections/Hero";
import CTASection from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { PRODUCT_SECTIONS } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

// Generate all static paths at build time
export async function generateStaticParams() {
  return PRODUCT_SECTIONS.map((s) => ({ slug: s.slug }));
}

// Dynamic metadata per category
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = PRODUCT_SECTIONS.find((s) => s.slug === slug);
  if (!section) return {};
  return buildMetadata({
    title: `${section.title} Malta — J. Bezzina & Co`,
    description: section.intro,
    path: `/products/${slug}`,
  });
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;
  const section = PRODUCT_SECTIONS.find((s) => s.slug === slug);
  if (!section) notFound();

  const Icon = section.icon;

  return (
    <>
      <Hero
        compact
        headline={section.title}
        subheadline={section.intro}
        primaryCta={{ label: "Request a quote", href: "/quote" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface py-3">
        <div className="container-industrial flex items-center gap-2 text-xs text-secondary">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-accent">Products</Link>
          <span>/</span>
          <span className="font-medium text-primary">{section.title}</span>
        </div>
      </div>

      {/* Main content */}
      <section className="section-padding">
        <div className="container-industrial">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
              <Image
                src={section.imageUrl}
                alt={section.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>

            {/* Info */}
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-accent/10 text-accent">
                <Icon className="h-7 w-7" aria-hidden />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Product category
              </p>
              <h1 className="mt-2 font-heading text-3xl font-bold text-primary sm:text-4xl">
                {section.title}
              </h1>
              <p className="mt-3 text-base font-medium text-secondary">{section.intro}</p>
              <p className="mt-4 leading-relaxed text-secondary">{section.description}</p>

              {/* What we supply */}
              <div className="mt-8">
                <h2 className="mb-4 font-heading text-lg font-bold text-primary">
                  What we supply
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <li
                      key={item.name}
                      className="rounded-sm border border-border bg-background p-4"
                    >
                      <h3 className="font-heading text-sm font-bold text-primary">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-secondary">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Size table */}
          {section.sizes && section.sizes.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-4 font-heading text-xl font-bold text-primary">
                Available sizes & ranges
              </h2>
              <p className="mb-6 text-sm text-secondary">
                Standard stock ranges held at our Marsa Industrial Area location.
                Contact us for non-standard sizes, special grades, or bulk quantities.
              </p>
              <div className="overflow-x-auto rounded-sm border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                        Type
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                        Size Range
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.sizes.map((row, i) => (
                      <tr
                        key={row.type}
                        className={`border-b border-border ${
                          i % 2 === 0 ? "bg-surface" : "bg-background"
                        }`}
                      >
                        <td className="px-5 py-3 font-medium text-primary">{row.type}</td>
                        <td className="px-5 py-3 text-secondary">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Back + quote */}
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all products
            </Link>
            <Link href="/quote" className="btn-primary ml-auto">
              Request a quote
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="section-padding bg-surface border-t border-border">
        <div className="container-industrial">
          <h2 className="mb-8 font-heading text-xl font-bold text-primary">
            Other product categories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_SECTIONS.filter((s) => s.slug !== slug).slice(0, 6).map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/products/${s.slug}`}
                  className="flex items-start gap-4 rounded-sm border border-border bg-background p-4 transition-colors hover:border-accent"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent/10 text-accent">
                    <SIcon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-primary">{s.title}</p>
                    <p className="mt-0.5 text-xs text-secondary line-clamp-2">{s.intro}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
