"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

interface Subscription {
  id: string
  companyId: string
  plan: "FREE" | "PRO"
  status: "ACTIVE" | "CANCELLED" | "FAILED"
  createdAt: string
}

export default function SubscriptionPage() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [upgrading, setUpgrading] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState("")

  const getAuthHeaders = () => {
    const token = localStorage.getItem("escalaProntaToken")
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("escalaProntaToken")
    if (!token) {
      router.replace("/signup")
      return
    }
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/billing/status`, {
        headers: getAuthHeaders(),
      })

      if (response.status === 401) {
        localStorage.removeItem("escalaProntaToken")
        router.push("/signup")
        return
      }

      if (!response.ok) {
        throw new Error("Erro ao carregar assinatura")
      }

      const data = await response.json()
      setSubscription(data)
    } catch (err) {
      setError("Erro ao carregar informações da assinatura")
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async () => {
    setUpgrading(true)
    try {
      const response = await fetch(`${API_URL}/billing/checkout`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ plan: "PRO" }),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar checkout")
      }

      const data = await response.json()
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError("Erro ao processar upgrade")
    } finally {
      setUpgrading(false)
    }
  }

  const handleCancel = async () => {
    setCancelling(true)
    try {
      const response = await fetch(`${API_URL}/billing/subscription`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erro ao cancelar assinatura")
      }

      await fetchSubscription()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao cancelar assinatura")
    } finally {
      setCancelling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const isPro = subscription?.plan === "PRO" && subscription?.status === "ACTIVE"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            EscalaPronta
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/schedule" className="text-muted-foreground hover:text-foreground transition-colors">
              Escalas
            </Link>
            <Link href="/employees" className="text-muted-foreground hover:text-foreground transition-colors">
              Funcionários
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Minha assinatura</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Current Plan Card */}
        <div className="border border-border rounded-2xl p-8 bg-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Plano atual</p>
              <h2 className="text-2xl font-bold text-foreground">
                {subscription?.plan === "PRO" ? "PRO" : "Gratuito"}
              </h2>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${subscription?.status === "ACTIVE"
                  ? "bg-green-100 text-green-700"
                  : subscription?.status === "CANCELLED"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {subscription?.status === "ACTIVE"
                ? "Ativo"
                : subscription?.status === "CANCELLED"
                  ? "Cancelado"
                  : "Falhou"}
            </div>
          </div>

          {isPro ? (
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-blue-600" />
                Funcionários ilimitados
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-blue-600" />
                Auto-geração de escala
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-blue-600" />
                Suporte prioritário
              </li>
            </ul>
          ) : (
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-blue-600" />
                Até 5 funcionários
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-blue-600" />
                Escala manual
              </li>
              <li className="flex items-center gap-3 text-foreground">
                <Check className="w-5 h-5 text-blue-600" />
                Suporte básico
              </li>
            </ul>
          )}

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {isPro ? (
                <>
                  <span className="font-medium text-foreground">R$ 29/mês</span> — Renovação automática
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">R$ 0/mês</span> — Sem cobrança
                </>
              )}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {isPro ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                Cancelar assinatura
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja cancelar?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ao cancelar, você perderá acesso aos recursos PRO imediatamente. Seu plano voltará para o Gratuito com
                  limite de 5 funcionários.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Voltar</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel} disabled={cancelling} className="bg-red-600 hover:bg-red-700">
                  {cancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Cancelando...
                    </>
                  ) : (
                    "Confirmar cancelamento"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={handleUpgrade} disabled={upgrading} className="w-full bg-blue-600 hover:bg-blue-700 py-6">
            {upgrading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              "Fazer upgrade para PRO"
            )}
          </Button>
        )}
      </main>
    </div>
  )
}
