import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Criar Conta - EscalaPronta",
  description:
    "Crie sua conta grátis no EscalaPronta e comece a gerar escalas automáticas",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    }
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
