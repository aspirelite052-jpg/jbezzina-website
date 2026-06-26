import type { Metadata } from "next";
import { SITE } from "./site";
import { getSiteUrl } from "./url";

type PageSEO = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: PageSEO): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  const siteUrl = getSiteUrl();
  const canonicalPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const absoluteUrl = `${siteUrl}${canonicalPath}`;

  const base: Metadata = {
    title: fullTitle,
    description,
    keywords: [
      "industrial equipment Malta",
      "engineering supplies Malta",
      "industrial hardware Malta",
      "fasteners Malta",
      "workshop supplies Malta",
      "industrial supplier Marsa",
      ...keywords,
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      title: fullTitle,
      description,
      url: absoluteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  return {
    ...base,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: absoluteUrl },
  };
}
