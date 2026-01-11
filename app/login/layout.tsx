import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Entrar - EscalaPronta",
  description: "Acesse sua conta do EscalaPronta",
  robots: {
    index: true,
    follow: false,
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

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
