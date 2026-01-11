"use client"

import { pageview } from "@/lib/ga"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function GAPageView() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    pageview(pathname)
  }, [pathname])

  return null
}
