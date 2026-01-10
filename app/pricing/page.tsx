"use client"

import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    const token = localStorage.getItem("escalaProntaToken")

    if (!token) {
      router.push("/signup")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/billing/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ plan: "PRO" }),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar checkout")
      }

      const data = await response.json()
      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFreePlan = () => {
    const token = localStorage.getItem("escalaProntaToken")
    if (token) {
      router.push("/employees")
    } else {
      router.push("/signup")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            EscalaPronta
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Entrar
            </Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/signup">Criar conta</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
            Pare de perder tempo montando escala no papel. Automatize em minutos.
          </h1>
          <p className="mt-6 text-xl text-muted-foreground text-pretty">
            O EscalaPronta organiza seus funcionários, turnos e escalas de forma simples, rápida e sem dor de cabeça.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FREE Plan */}
            <div className="border border-border rounded-2xl p-8 bg-card">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-muted-foreground">Para começar</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">R$ 0</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-foreground">Até 5 funcionários</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-foreground">Escala manual</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-foreground">Suporte básico</span>
                </li>
              </ul>

              <Button onClick={handleFreePlan} variant="outline" className="w-full py-6 text-base bg-transparent">
                Usar plano gratuito
              </Button>
            </div>

            {/* PRO Plan */}
            <div className="border-2 border-blue-600 rounded-2xl p-8 bg-card relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full">Mais popular</span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-muted-foreground">Para crescer</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">R$ 29</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-foreground">Funcionários ilimitados</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-foreground">Auto-geração de escala</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-foreground">Suporte prioritário</span>
                </li>
              </ul>

              <Button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Quero ser PRO"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
