"use client"

interface FeedbackData {
  type: string
  message: string
  email?: string
  page: string
  userId?: string
  companyId?: string
}

export async function sendFeedback(data: FeedbackData): Promise<{ success: boolean; error?: string }> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const apiKey = process.env.NEXT_PUBLIC_EMAILJS_API_KEY

  if (!serviceId || !templateId || !apiKey) {
    return { success: false, error: "EmailJS configuration missing" }
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: apiKey,
        template_params: {
          type: data.type,
          message: data.message,
          email: data.email || "Não informado",
          page: data.page,
          userId: data.userId || "Não autenticado",
          companyId: data.companyId || "Não disponível",
        },
      }),
    })

    if (!response.ok) {
      return { success: false, error: "Failed to send feedback" }
    }

    if (typeof window !== "undefined" && (window as any).gtag) {
      ; (window as any).gtag("event", "feedback_submitted", {
        feedback_type: data.type,
        page: data.page,
      })
    }

    return { success: true }
  } catch {
    return { success: false, error: "Erro ao enviar feedback" }
  }
}
