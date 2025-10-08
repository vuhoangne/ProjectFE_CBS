"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, Youtube } from "lucide-react"

interface ContactInfo {
  phone: string
  email: string
  address: string
  website: string
  facebook: string
  instagram: string
  youtube: string
  description: string
}

export default function ContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setContactInfo(data)
      }
    } catch (error) {
      console.error('Error loading contact info:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !contactInfo) {
    return (
      <div className="bg-black text-white p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-400 mb-4">Liên hệ</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Phone className="h-5 w-5" />
            <span>Đang tải...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white p-6 rounded-lg">
      <h3 className="text-xl font-bold text-blue-400 mb-4">Liên hệ</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors">
          <Phone className="h-5 w-5" />
          <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:underline">
            {contactInfo.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors">
          <Mail className="h-5 w-5" />
          <a href={`mailto:${contactInfo.email}`} className="hover:underline">
            {contactInfo.email}
          </a>
        </div>
        
        <div className="flex items-start gap-3 text-gray-300">
          <MapPin className="h-5 w-5 mt-0.5" />
          <span>{contactInfo.address}</span>
        </div>

        {contactInfo.website && (
          <div className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-colors">
            <Globe className="h-5 w-5" />
            <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              Website
            </a>
          </div>
        )}
      </div>

      {contactInfo.description && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-gray-300 text-sm">{contactInfo.description}</p>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        {contactInfo.facebook && (
          <a 
            href={contactInfo.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
            title="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        )}
        {contactInfo.instagram && (
          <a 
            href={contactInfo.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-colors"
            title="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
        )}
        {contactInfo.youtube && (
          <a 
            href={contactInfo.youtube} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 transition-colors"
            title="YouTube"
          >
            <Youtube className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  )
}