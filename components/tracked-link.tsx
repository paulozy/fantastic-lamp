"use client"

import { trackEvent } from "@/lib/ga-events"
import Link from "next/link"
import { ReactNode } from "react"

interface TrackedLinkProps {
  href: string
  event: string
  children: ReactNode
  className?: string
}

export function TrackedLink({ href, event, children, className }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event)}
    >
      {children}
    </Link>
  )
}
