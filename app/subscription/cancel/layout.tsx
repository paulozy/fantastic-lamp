import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pagamento Cancelado - EscalaPronta",
  description: "Seu pagamento foi cancelado. Volte para tentar novamente ou escolha outro plano.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SubscriptionCancelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
