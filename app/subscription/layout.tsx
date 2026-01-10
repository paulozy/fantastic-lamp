import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Minha Assinatura - EscalaPronta",
  description: "Gerencie sua assinatura do EscalaPronta. Visualize seu plano atual, upgrade ou cancele quando quiser.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Minha Assinatura - EscalaPronta",
    description: "Gerencie sua assinatura",
    type: "website",
    url: "https://escalpronta.com.br/subscription",
  },
}

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
