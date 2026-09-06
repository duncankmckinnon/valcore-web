import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://e-valcore.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...docs.map(({ slug }) => ({ url: `https://e-valcore.com/docs/${slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
