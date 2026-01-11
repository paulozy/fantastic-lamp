import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Title and subtitle */}
        <h1 className="text-3xl font-bold text-foreground mb-3">Assinatura ativada com sucesso 🎉</h1>
        <p className="text-xl text-muted-foreground mb-8">Agora você tem acesso total ao EscalaPronta PRO.</p>

        {/* Benefits card */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Seu plano inclui</h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-foreground">Funcionários ilimitados</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-foreground">Geração automática de escala</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-foreground">Mais tempo livre toda semana</span>
            </li>
          </ul>
        </div>

        {/* Reinforcement text */}
        <p className="text-muted-foreground mb-8">
          Obrigado por confiar no EscalaPronta. Sua equipe e sua rotina acabam de ficar muito mais organizadas.
        </p>

        {/* CTA Button */}
        <Button asChild size="lg" className="w-full text-lg py-6">
          <Link href="/schedule">Começar a usar agora</Link>
        </Button>

        {/* Plan badge */}
        <p className="mt-6 text-sm text-muted-foreground">Plano PRO • R$29/mês</p>
      </div>
    </div>
  )
}
