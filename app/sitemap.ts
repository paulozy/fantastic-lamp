import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://escalapronta.com.br",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://escalapronta.com.br/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://escalapronta.com.br/signup",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://escalapronta.com.br/schedule",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5,
    },
    {
      url: "https://escalapronta.com.br/employees",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5,
    },
  ]
}
