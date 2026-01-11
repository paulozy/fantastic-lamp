"use client"

import { pageview } from "@/lib/ga"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function GAPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    pageview(url)
  }, [pathname, searchParams])

  return null
}
