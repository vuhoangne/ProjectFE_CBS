"use client"

import { useState, useEffect } from "react"

export function useNewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Removed auto-popup logic - modal only opens manually now

  const closeModal = () => {
    setIsOpen(false)
    // Mark as seen for 24 hours
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    localStorage.setItem('newsletter-modal-seen', tomorrow.toISOString())
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return {
    isOpen,
    closeModal,
    openModal
  }
}