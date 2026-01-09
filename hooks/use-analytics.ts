"use client"

import { useEffect } from "react"

/**
 * Track page views and custom events with Google Analytics 4
 */
export function useAnalytics() {
  useEffect(() => {
    // The gtag script is already loaded via next/script in layout
    // This hook can be used for custom tracking
  }, [])

  const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, eventData)
    }
  }

  const trackSignup = () => {
    trackEvent("sign_up", {
      method: "email",
    })
  }

  const trackLogin = () => {
    trackEvent("login", {
      method: "email",
    })
  }

  const trackButtonClick = (buttonName: string) => {
    trackEvent("button_click", {
      button_name: buttonName,
    })
  }

  return {
    trackEvent,
    trackSignup,
    trackLogin,
    trackButtonClick,
  }
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      config?: Record<string, unknown>
    ) => void
  }
}
