import { StructuredData } from "@/components/structured-data"
import { Button } from "@/components/ui/button"
import { organizationSchema, softwareAppSchema } from "@/lib/metadata"
import { CalendarDays, CheckCircle2, Clock, Shield, Users, Zap } from "lucide-react"
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
  ],
  openGraph: {
    title: "EscalaPronta - Gerador de Escalas de Trabalho Automático",
    description:
      "Gere escalas de trabalho automáticas em segundos. Sem planilhas, sem dor de cabeça.",
    type: "website",
    url: "https://escalpronta.com",
  },
}

export default function LandingPage() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">EscalaPronta</h1>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight text-balance">
            Escalas de trabalho prontas em segundos
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed text-balance">
            Gere automaticamente a escala semanal da sua equipe. Sem planilhas, sem dor de cabeça.
          </p>
          <Button size="lg" className="mt-10 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto" asChild>
            <Link href="/signup">Começar agora</Link>
          </Button>
          <p className="mt-4 text-sm text-gray-500">Grátis para equipes de até 5 funcionários</p>
        </section>

        {/* How it Works */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">Como funciona</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">Passo 1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cadastre sua equipe</h3>
                <p className="text-gray-600 leading-relaxed">
                  Adicione seus funcionários com horários e dias disponíveis para trabalhar.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">Passo 2</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Gere a escala</h3>
                <p className="text-gray-600 leading-relaxed">
                  Com um clique, o sistema cria a escala semanal automaticamente.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CalendarDays className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">Passo 3</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compartilhe</h3>
                <p className="text-gray-600 leading-relaxed">
                  Envie a escala para sua equipe ou exporte para onde precisar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              Por que usar o EscalaPronta
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-6 rounded-xl border border-gray-100">
                <div className="shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Economize tempo</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pare de perder horas montando escalas manualmente. Faça em segundos.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-xl border border-gray-100">
                <div className="shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sem erros</h3>
                  <p className="text-gray-600 leading-relaxed">
                    O sistema respeita os horários e dias de cada funcionário automaticamente.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-xl border border-gray-100">
                <div className="shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Feito para pequenas equipes</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Restaurantes, limpeza, varejo. Simples e direto ao ponto.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-xl border border-gray-100">
                <div className="shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Seus dados seguros</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Informações da sua equipe protegidas e acessíveis só por você.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-blue-600 py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
              Pronto para simplificar suas escalas?
            </h2>
            <p className="text-blue-100 text-lg mb-10">Comece grátis e veja como é fácil organizar sua equipe.</p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold"
              asChild
            >
              <Link href="/signup">Começar agora</Link>
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
    </>
  )
}
