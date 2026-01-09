import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Entrar - EscalaPronta",
  description: "Acesse sua conta do EscalaPronta",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
