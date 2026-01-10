"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Loader2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

const PRO_PLAN_PRICE = "R$ 29"

interface PaywallModalProps {
  open: boolean
  onClose: () => void
  type: "PLAN_LIMIT_REACHED" | "FEATURE_NOT_AVAILABLE"
}

const proBenefits = [
  "Geração automática ilimitada de escalas",
  "Funcionários ilimitados",
  "Edição manual de escalas",
  "Suporte prioritário",
]

export function PaywallModal({ open, onClose, type }: PaywallModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const content = {
    PLAN_LIMIT_REACHED: {
      title: "Limite do plano gratuito atingido",
      description:
        "Seu plano Free permite até 5 funcionários. Faça upgrade para o Pro e libere todo o potencial do EscalaPronta.",
    },
    FEATURE_NOT_AVAILABLE: {
      title: "Recurso exclusivo do Pro",
      description: "A geração automática de escalas está disponível apenas no plano Pro. Economize tempo toda semana.",
    },
  }

  const { title, description } = content[type]

  const handleUpgrade = () => {
    router.push("/pricing")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="text-base pt-2">{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Plano Pro</span>
          </div>
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">{PRO_PLAN_PRICE}</span>
            <span className="text-gray-600">/mês</span>
          </div>
          <ul className="space-y-2">
            {proBenefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={handleUpgrade} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              "Desbloquear Plano Pro"
            )}
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Agora não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
