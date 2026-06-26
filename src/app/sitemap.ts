import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/url";

const routes = [
  "",
  "/about",
  "/products",
  "/products/fasteners-malta",
  "/products/engineering-tools-malta",
  "/products/workshop-equipment-malta",
  "/contact",
  "/quote",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products") ? 0.9 : 0.8,
  }));
}
