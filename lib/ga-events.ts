export const trackEvent = (event: string, params?: Record<string, any>) => {
  if (typeof window === "undefined") return
  if (!(window as any).gtag) return

    ; (window as any).gtag("event", event, {
      event_category: "engagement",
      ...params,
    })
}
