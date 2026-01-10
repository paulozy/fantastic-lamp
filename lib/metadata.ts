import type { Metadata } from "next"

export function generateMetadata(override: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL("https://escalapronta.com.br"),
    alternates: {
      canonical: "https://escalapronta.com.br",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    ...override,
  }
}

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  override: Partial<Metadata> = {}
): Metadata {
  const url = `https://escalapronta.com.br${path}`

  return generateMetadata({
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "EscalaPronta",
      locale: "pt_BR",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "EscalaPronta",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    ...override,
  })
}

// Structured data helpers
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EscalaPronta",
  url: "https://escalapronta.com.br",
  logo: "https://escalapronta.com.br/logo.png",
  description:
    "Gere automaticamente a escala semanal da sua equipe em segundos.",
  sameAs: [
    "https://twitter.com/escalapronta",
    "https://instagram.com/escalapronta",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    availableLanguage: ["pt-BR", "en"],
  },
}

export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EscalaPronta",
  description:
    "Gere automaticamente a escala semanal da sua equipe em segundos. Sem planilhas, sem dor de cabeça.",
  url: "https://escalapronta.com.br",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "Grátis para equipes de até 5 funcionários",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "250",
  },
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como funciona o EscalaPronta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Você adiciona seus funcionários com seus horários disponíveis, define as necessidades da escala e o sistema gera automaticamente a melhor distribuição.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é o custo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EscalaPronta é grátis para equipes de até 5 funcionários. Planos pagos disponíveis para equipes maiores.",
      },
    },
    {
      "@type": "Question",
      name: "Posso exportar as escalas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim! Você pode exportar as escalas em PDF, CSV ou compartilhar diretamente com sua equipe.",
      },
    },
  ],
}
