import type { Metadata } from "next";
import { Phone } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/forms/ContactForm";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote — Industrial Supplies Malta",
  description:
    "Submit a quote request for industrial fasteners, tools, hardware, and engineering supplies. Joseph Bezzina & Co Ltd, Marsa, Malta.",
  path: "/quote",
  keywords: ["industrial equipment Malta", "engineering supplies Malta"],
});

export default function QuotePage() {
  return (
    <>
      <Hero
        compact
        headline="Request a Quote"
        subheadline="Provide product details, quantities, and specifications — our Marsa team will respond with availability and pricing."
      />

      <section className="section-padding">
        <div className="container-industrial">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionTitle
                eyebrow="Quote request"
                title="Industrial supply quotation"
                description="For urgent requirements, call our office directly during business hours."
              />
              <div className="mt-8 rounded-sm border border-border bg-surface p-6">
                <p className="text-sm font-semibold text-primary">Prefer to call?</p>
                <ul className="mt-4 space-y-2">
                  {CONTACT.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent"
                      >
                        <Phone className="h-4 w-4" aria-hidden />
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-secondary">{CONTACT.hours}</p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm variant="quote" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
