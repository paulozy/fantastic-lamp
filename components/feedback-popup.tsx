"use client"

import type React from "react"

import { sendFeedback } from "@/app/actions/send-feedback"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Loader2, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [type, setType] = useState("")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const resetForm = () => {
    setType("")
    setMessage("")
    setEmail("")
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!type || !message.trim()) {
      setError("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    setIsLoading(true)

    try {
      // Get user data from localStorage (SSR safe)
      let userId = ""
      let companyId = ""
      let currentPage = ""

      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user")
        const companyData = localStorage.getItem("company")
        if (userData) {
          try {
            userId = JSON.parse(userData).id || ""
          } catch { }
        }
        if (companyData) {
          try {
            companyId = JSON.parse(companyData).id || ""
          } catch { }
        }
        currentPage = window.location.pathname
      }

      const result = await sendFeedback({
        type,
        message: message.trim(),
        email: email.trim(),
        page: currentPage,
        userId,
        companyId,
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      setIsOpen(false)
      resetForm()
      toast({
        title: "Obrigado pelo feedback!",
        description: "Sua mensagem foi enviada com sucesso.",
      })
    } catch {
      setError("Erro ao enviar feedback. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Floating Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(true)}
              size="icon"
              className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Enviar sugestão</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Enviar sugestão</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Feedback Modal */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sugestão ou feedback</DialogTitle>
            <DialogDescription>Sua opinião ajuda a melhorar o EscalaPronta</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-type">Tipo *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="feedback-type">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sugestão">Sugestão</SelectItem>
                  <SelectItem value="Problema / Bug">Problema / Bug</SelectItem>
                  <SelectItem value="Dúvida">Dúvida</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-message">Mensagem *</Label>
              <Textarea
                id="feedback-message"
                placeholder="Escreva sua mensagem"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-email">Seu email (opcional, para resposta)</Label>
              <Input
                id="feedback-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
