import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { notes } from "@/data/notes";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...notes.map((n) => ({
      url: `${site.url}/notes/${n.slug}`,
      lastModified: new Date(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
