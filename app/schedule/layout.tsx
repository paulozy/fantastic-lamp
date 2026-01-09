import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Escala - EscalaPronta",
  description: "Gerencie e visualize sua escala de trabalho",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
