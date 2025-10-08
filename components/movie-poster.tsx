"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

interface MoviePosterProps {
  src: string
  alt: string
  title: string
  className?: string
}

export function MoviePoster({ src, alt, title, className = "" }: MoviePosterProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    console.log("Image failed to load:", src)
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  if (imageError || !src) {
    return (
      <Card className={`overflow-hidden shadow-xl border-border/50 bg-gradient-to-br from-primary/20 to-primary/10 ${className}`}>
        <div className="aspect-[2/3] w-full flex flex-col items-center justify-center text-center p-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-lg font-bold text-foreground mb-2">{title}</p>
          <p className="text-sm text-muted-foreground">Poster không khả dụng</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`overflow-hidden shadow-xl border-border/50 bg-muted ${className}`}>
      <div className="relative aspect-[2/3] w-full">
        {imageLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="300px"
          priority
          unoptimized={true}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
    </Card>
  )
}