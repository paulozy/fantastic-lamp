import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function SubscriptionCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <XCircle className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        {/* Title and subtitle */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Tudo bem, a compra foi cancelada</h1>
        <p className="text-lg text-muted-foreground mb-6">Nenhuma cobrança foi feita.</p>

        {/* Explanatory text */}
        <p className="text-muted-foreground mb-8">
          Se você mudou de ideia ou teve algum problema no pagamento, você pode tentar novamente quando quiser.
        </p>

        {/* Value reminder card */}
        <div className="bg-muted/50 border border-border rounded-lg p-5 mb-8">
          <p className="text-sm text-muted-foreground">
            Lembre-se: com o plano <span className="font-semibold text-foreground">PRO</span> você tem funcionários
            ilimitados e geração automática de escala por apenas{" "}
            <span className="font-semibold text-foreground">R$29/mês</span>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="w-full">
            <Link href="/subscription">Tentar novamente</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
            <Link href="/schedule">Voltar para a home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
