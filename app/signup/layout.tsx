import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar Conta - EscalaPronta",
  description:
    "Crie sua conta grátis no EscalaPronta e comece a gerar escalas automáticas",
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
