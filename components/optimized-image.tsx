import Image from "next/image"
import React from "react"

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Optimized Image Component for SEO
 * Uses Next.js Image for automatic optimization
 *
 * Usage:
 * <OptimizedImage
 *   src="/my-image.png"
 *   alt="Description for accessibility"
 *   width={1200}
 *   height={630}
 * />
 */
export function OptimizedImage({
  src,
  alt,
  width = 1200,
  height = 630,
  priority = false,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      {...props}
    />
  )
}

/**
 * SEO Tips for Images:
 * 1. Always use descriptive alt text
 * 2. Use Next.js Image component for optimization
 * 3. Optimize image sizes before uploading
 * 4. Use WebP format when possible
 * 5. Lazy load images below the fold
 * 6. Add width and height attributes to prevent layout shift
 */
