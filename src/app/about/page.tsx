import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CTASection from "@/components/sections/CTASection";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Industrial Supplier Malta",
  description:
    "Learn about Joseph Bezzina & Co Ltd — established industrial equipment and engineering supplies from Marsa Industrial Area, Malta.",
  path: "/about",
  keywords: ["industrial supplier Marsa", "engineering supplies Malta"],
});

const VALUES = [
  {
    title: "Reliability",
    text: "We understand that downtime costs money. Our supply approach prioritises availability, accurate fulfilment, and dependable lead times for industrial customers.",
  },
  {
    title: "Technical competence",
    text: "From fasteners to workshop equipment, our team supports enquiries with practical product knowledge suited to engineering and maintenance environments.",
  },
  {
    title: "Local commitment",
    text: "Operating from Marsa Industrial Area, we serve Malta's contractors, factories, shipyards, and workshops with accessible, professional supplier support.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        headline="About Joseph Bezzina & Co Ltd"
        subheadline="An established Maltese industrial supplier serving engineering, manufacturing, and construction professionals."
        primaryCta={{ label: "Our products", href: "/products" }}
        secondaryCta={{ label: "Contact", href: "/contact" }}
      />

      <section className="section-padding">
        <div className="container-industrial">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="prose-industrial max-w-none">
              <SectionTitle
                eyebrow="Company overview"
                title="Industrial supply built on trust"
              />
              <p className="mt-6">
                {SITE.name} has long supported Malta&apos;s industrial sector with
                equipment, hardware, fasteners, tools, and workshop supplies. We
                work with businesses that depend on consistent supply — from
                small fabrication workshops to large maintenance departments and
                marine engineering operations.
              </p>
              <p className="mt-4">
                Our role is straightforward: provide the right industrial
                products, backed by supplier reliability and local availability.
                We are not a generic retailer — we are a B2B-focused engineering
                supply partner for professionals who need technical confidence in
                every order.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border">
              <Image
                src="https://images.unsplash.com/photo-1587293852726-70cdb56f0e41?w=800&q=80"
                alt="Industrial engineering and manufacturing environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-industrial">
          <SectionTitle
            eyebrow="Industrial expertise"
            title="Serving Malta's engineering economy"
            description="Contractors, factories, shipyards, construction firms, and maintenance teams rely on structured, professional supply partnerships."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <article key={v.title} className="card-industrial p-8">
                <h3 className="font-heading text-lg font-bold text-primary">
                  {v.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-secondary">
                  {v.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-industrial max-w-3xl">
          <SectionTitle
            eyebrow="Mission"
            title="Enabling operational efficiency"
            align="center"
          />
          <p className="mt-6 text-center text-secondary leading-relaxed">
            Our mission is to strengthen our customers&apos; operations through
            dependable industrial supply — reducing procurement friction, supporting
            technical requirements, and maintaining the supplier trust that
            established engineering businesses depend on.
          </p>
          <p className="mt-4 text-center text-secondary leading-relaxed">
            Whether you are sourcing fasteners for a site project, equipping a
            workshop, or maintaining production machinery, we aim to be the
            supplier you call first — because reliability is what we sell.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/products" className="btn-secondary text-center">
              Explore products
            </Link>
            <Link href="/quote" className="btn-primary text-center">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
