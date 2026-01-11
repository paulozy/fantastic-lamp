import { StructuredData } from "@/components/structured-data"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/ga-events"
import { organizationSchema, softwareAppSchema } from "@/lib/metadata"
import {
  AlertCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  MessageSquareWarning,
  Users,
  XCircle,
  Zap,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "EscalaPronta - Gerador de Escalas de Trabalho Automático",
  description:
    "Gere escalas de trabalho automáticas em segundos. Sem planilhas, sem dor de cabeça. Grátis para equipes de até 5 funcionários.",
  keywords: [
    "escala de trabalho",
    "agendamento",
    "gestão de equipe",
    "restaurante",
    "software de agendamento",
    "escalas automáticas",
  ],
  openGraph: {
    title: "EscalaPronta - Gerador de Escalas de Trabalho Automático",
    description:
      "Gere escalas de trabalho automáticas em segundos. Sem planilhas, sem dor de cabeça.",
    type: "website",
    url: "https://escalapronta.com.br",
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <StructuredData schema={organizationSchema} />
      <StructuredData schema={softwareAppSchema} />

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">EscalaPronta</div>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
              Preços
            </Link>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight text-balance">
          Sua escala pronta em 1 clique. Sem planilha. Sem confusão. Sem dor de cabeça.
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Pare de perder horas toda semana montando escala na mão. Deixa que o EscalaPronta resolve.
        </p>
        <Button size="lg" className="mt-10 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto" asChild>
          <Link href="/signup" onClick={() => trackEvent("cta_click")}>Criar minha escala agora</Link>
        </Button>
        <p className="mt-4 text-sm text-gray-500">Grátis para equipes de até 5 funcionários</p>
      </section>

      {/* New Pain Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Cansado de lidar com isso toda semana?
          </h2>
          <p className="text-gray-600 text-center text-lg mb-12">
            Você não está sozinho. Todo pequeno negócio passa por isso — toda semana.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200">
              <div className="shrink-0">
                <MessageSquareWarning className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-gray-700">Funcionário reclamando que o dia dele está errado. De novo.</p>
            </div>
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200">
              <div className="shrink-0">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-gray-700">Gente faltando porque não viu a escala no grupo do WhatsApp.</p>
            </div>
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200">
              <div className="shrink-0">
                <FileSpreadsheet className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-gray-700">Planilha bagunçada, papel rasurado, ajustes de última hora.</p>
            </div>
            <div className="flex gap-4 p-5 bg-white rounded-xl border border-gray-200">
              <div className="shrink-0">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-gray-700">Tempo que você deveria gastar no negócio, gasto organizando gente.</p>
            </div>
          </div>
          <p className="text-center text-gray-900 font-semibold text-lg mt-10">
            O problema não é você. É a ferramenta.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">Como funciona</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-blue-600 mb-2">Passo 1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cadastre sua equipe uma vez</h3>
              <p className="text-gray-600 leading-relaxed">
                Adicione seus funcionários, os dias e horários que cada um pode trabalhar. Faz uma vez, usa sempre.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-blue-600 mb-2">Passo 2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Gere a escala em 1 clique</h3>
              <p className="text-gray-600 leading-relaxed">
                O sistema monta a semana inteira automaticamente, respeitando a disponibilidade de cada um.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CalendarDays className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-blue-600 mb-2">Passo 3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Semana inteira organizada</h3>
              <p className="text-gray-600 leading-relaxed">
                Pronto. Todo mundo sabe quando trabalha. Sem confusão, sem reclamação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            O que muda no seu dia a dia
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100">
              <div className="shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mais tempo pro que importa</h3>
                <p className="text-gray-600 leading-relaxed">
                  Você não abriu um negócio pra ficar fazendo escala. Sobra tempo pro que realmente dá dinheiro.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100">
              <div className="shrink-0">
                <MessageSquareWarning className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Menos reclamação</h3>
                <p className="text-gray-600 leading-relaxed">
                  A escala respeita a disponibilidade que cada funcionário cadastrou. Ninguém reclama de dia errado.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100">
              <div className="shrink-0">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Zero erro, zero estresse</h3>
                <p className="text-gray-600 leading-relaxed">
                  Acabou o medo de esquecer alguém ou colocar duas pessoas no mesmo turno.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100">
              <div className="shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Feito pra pequeno negócio de verdade</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nada de sistema complicado. Simples, direto, funciona. Restaurante, limpeza, loja, salão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Planos simples, sem pegadinha
          </h2>
          <p className="text-gray-600 text-center text-lg mb-12">Comece grátis. Upgrade quando precisar.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free Plan Card */}
            <div className="p-6 rounded-xl border border-gray-200 bg-white">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">R$0</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Até 5 funcionários</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Geração limitada de escalas</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-gray-300 bg-transparent" asChild>
                <Link href="/signup">Começar grátis</Link>
              </Button>
            </div>

            {/* Pro Plan Card */}
            <div className="p-6 rounded-xl border-2 border-blue-600 bg-blue-50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Mais popular
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">R$ 29</span>
                <span className="text-gray-600">/mês</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Funcionários ilimitados</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Geração automática ilimitada</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Edição manual de escalas</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/pricing">Ver plano Pro</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Pare de perder tempo com escala. Resolva isso hoje.
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Cadastro grátis. Sem cartão. Sua primeira escala pronta agora.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold"
            asChild
          >
            <Link href="/signup">Criar minha escala agora</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          © 2026 EscalaPronta. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
