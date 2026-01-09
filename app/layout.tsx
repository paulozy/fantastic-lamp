import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import type React from "react"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EscalaPronta - Escalas de trabalho automáticas",
  description:
    "Gere automaticamente a escala semanal da sua equipe em segundos. Sem planilhas, sem dor de cabeça. Ideal para restaurantes, serviços de limpeza e pequenas equipes.",
  keywords: [
    "escala de trabalho",
    "agendamento de funcionários",
    "gestão de equipe",
    "escalas automáticas",
    "software de agendamento",
    "restaurante",
    "limpeza",
  ],
  authors: [
    {
      name: "EscalaPronta",
      url: "https://escalpronta.com",
    },
  ],
  creator: "EscalaPronta",
  publisher: "EscalaPronta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://escalpronta.com"),
  alternates: {
    canonical: "https://escalpronta.com",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://escalpronta.com",
    siteName: "EscalaPronta",
    title: "EscalaPronta - Escalas de trabalho automáticas",
    description:
      "Gere automaticamente a escala semanal da sua equipe em segundos. Sem planilhas, sem dor de cabeça.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EscalaPronta - Escalas de trabalho automáticas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EscalaPronta - Escalas de trabalho automáticas",
    description:
      "Gere automaticamente a escala semanal da sua equipe em segundos.",
    images: ["/og-image.png"],
    creator: "@escalpronta",
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
  icons: {
    icon: [
      {
        url: "/escala-pronta.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/escala-pronta.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "escala-pronta.png",
        type: "image/png",
      },
    ],
    apple: "/escala-pronta.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="pt-BR">
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  'page_path': window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Open Graph Verification (if needed) */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
