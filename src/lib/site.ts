// src/lib/site.ts

export const SITE = {
  name: "Joseph Bezzina & Co Ltd",
  shortName: "J. Bezzina & Co",
  tagline: "Marine & Industrial Supplies",
  description:
    "Reliable marine and industrial supply solutions for workshops, contractors, manufacturers, and engineering professionals in Malta.",
  locale: "en_MT",
} as const;

/** Drop logo files in /public — logo.jpeg is the real company logo */
export const BRAND = {
  logoPng: "/logo.jpeg",   // ← updated to match actual file
  logoSvg: "/logo.jpeg",   // ← same fallback since there's no SVG
  logoAlt: `${SITE.name} logo`,
} as const;

export const CONTACT = {
  company: "Joseph Bezzina & Co Ltd",
  address: {
    street: "5/6 Triq Aldo Moro",
    locality: "Marsa",
    postalCode: "MRS 9065",
    country: "Malta",
    full: "5/6 Triq Aldo Moro, Marsa MRS 9065, Malta",
  },
  phones: ["+356 2122 6647", "+356 2122 6648", "+356 2124 3085"],
  emails: ["jason@jbezzina.com", "clayton@jbezzina.com"],
  hours: "Mon–Fri: 07:00 – 16:00",
  facebook: "https://www.facebook.com/JosephBezzina.Co.Ltd/",
  mapLink: "https://maps.app.goo.gl/BHLiQSsbKbSi6i9S7",
  mapEmbed:
    "https://maps.google.com/maps?q=5%2F6+Triq+Aldo+Moro,+Marsa+MRS+9065,+Malta&hl=en&z=16&output=embed",
} as const;

export const NAV_LINKS = [
  { href: "/",        label: "Home"          },
  { href: "/about",   label: "About"         },
  { href: "/products",label: "Products"      },
  { href: "/contact", label: "Contact"       },
  { href: "/quote",   label: "Quote Request" },
] as const;