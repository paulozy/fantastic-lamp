import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://escalpronta.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://escalpronta.com/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://escalpronta.com/signup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://escalpronta.com/schedule",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5,
    },
    {
      url: "https://escalpronta.com/employees",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5,
    },
  ]
}
