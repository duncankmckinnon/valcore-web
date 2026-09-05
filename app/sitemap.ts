import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["installation", "getting-started", "datasets", "evaluators", "experiments"];
  return [
    { url: "https://e-valcore.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...pages.map((page) => ({ url: `https://e-valcore.com/docs/${page}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
