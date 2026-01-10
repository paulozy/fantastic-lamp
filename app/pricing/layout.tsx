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
    url: "https://escalpronta.com.br/pricing",
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
