import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/forms/ContactForm";
import SectionTitle from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Marsa Industrial Area Malta",
  description:
    "Contact Joseph Bezzina & Co Ltd in Marsa, Malta. Phone, email, business hours, and enquiry form for industrial supply.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Hero
        compact
        headline="Contact Us"
        subheadline="Reach our Marsa team for stock enquiries, technical questions, and supply support."
      />

      <section className="section-padding">
        <div className="container-industrial">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionTitle
                eyebrow="Get in touch"
                title="Joseph Bezzina & Co Ltd"
                description="Visit us in Marsa Industrial Area or contact our team during business hours."
              />

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-primary">Address</p>
                    <address className="mt-1 text-sm not-italic text-secondary">
                      {CONTACT.company}
                      <br />
                      {CONTACT.address.street}
                      <br />
                      {CONTACT.address.locality} {CONTACT.address.postalCode}
                      <br />
                      {CONTACT.address.country}
                    </address>
                    <a
                      href={CONTACT.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-accent hover:text-orange-600"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-primary">Phone</p>
                    <ul className="mt-1 space-y-1">
                      {CONTACT.phones.map((phone) => (
                        <li key={phone}>
                          <a
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="text-sm text-secondary hover:text-primary"
                          >
                            {phone}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-primary">Email</p>
                    <ul className="mt-1 space-y-1">
                      {CONTACT.emails.map((email) => (
                        <li key={email}>
                          <a
                            href={`mailto:${email}`}
                            className="text-sm text-secondary hover:text-primary"
                          >
                            {email}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-primary">Business hours</p>
                    <p className="mt-1 text-sm text-secondary">{CONTACT.hours}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 overflow-hidden rounded-sm border border-border">
                <iframe
                  title="Google Maps — Joseph Bezzina & Co Ltd"
                  src={CONTACT.mapEmbed}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div>
              <SectionTitle
                eyebrow="Enquiry form"
                title="Send a message"
                description="Complete the form and our team will respond during business hours."
              />
              <div className="mt-8">
                <ContactForm variant="contact" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
