import { CONTACT, SITE } from "@/lib/site";
import { getSiteUrl } from "@/lib/url";

export default function JsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: siteUrl,
    telephone: CONTACT.phones[0],
    email: CONTACT.emails[0],
    sameAs: [CONTACT.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.locality,
      postalCode: CONTACT.address.postalCode,
      addressCountry: "MT",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "16:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Malta",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
