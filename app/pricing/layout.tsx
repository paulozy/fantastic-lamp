import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Planos e Preços - EscalaPronta",
  description:
    "Escolha o plano certo para sua equipe. Comece grátis com até 5 funcionários ou upgrade para PRO com funcionários ilimitados e geração automática de escalas.",
  keywords: ["preços", "planos", "escalas de trabalho", "software de agendamento"],
  openGraph: {
    title: "Planos e Preços - EscalaPronta",
    description:
      "Escolha o plano certo para sua equipe. Comece grátis ou faça upgrade para PRO.",
    type: "website",
    url: "https://escalapronta.com.br/pricing",
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
    }
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
