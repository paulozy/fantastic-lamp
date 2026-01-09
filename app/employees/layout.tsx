import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Funcionários - EscalaPronta",
  description: "Gerencie os funcionários e suas disponibilidades",
  robots: {
    index: false,
    follow: false,
  },
}

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
