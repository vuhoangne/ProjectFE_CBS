"use client"

import { useState } from "react"
import Image from "next/image"

interface TheaterLogoProps {
  src: string
  alt: string
  name: string
  className?: string
}

export function TheaterLogo({ src, alt, name, className = "" }: TheaterLogoProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  // Generate initials from theater name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 3)
      .toUpperCase()
  }

  // Generate color based on theater name
  const getTheaterColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  if (imageError || !src) {
    return (
      <div className={`${className} ${getTheaterColor(name)} rounded-xl flex items-center justify-center shadow-md`}>
        <span className="text-white font-bold text-xs sm:text-sm">
          {getInitials(name)}
        </span>
      </div>
    )
  }

  return (
    <div className={`${className} bg-white rounded-xl shadow-md overflow-hidden flex items-center justify-center p-1`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-1"
        sizes="48px"
        onError={handleImageError}
      />
    </div>
  )
}