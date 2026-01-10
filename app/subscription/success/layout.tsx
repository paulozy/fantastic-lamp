import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Assinatura Ativada - EscalaPronta",
  description: "Sua assinatura foi ativada com sucesso! Comece a usar o EscalaPronta agora.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SubscriptionSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
