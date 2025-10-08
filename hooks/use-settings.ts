import { useState, useEffect } from 'react'

export interface AppSettings {
  // General Settings
  siteName: string
  siteDescription: string
  contactEmail: string
  supportPhone: string
  
  // Booking Settings
  maxSeatsPerBooking: number
  bookingTimeLimit: number
  cancellationDeadline: number
  
  // Notification Settings
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  
  // Security Settings
  requireEmailVerification: boolean
  enableTwoFactor: boolean
  sessionTimeout: number
  
  // Payment Settings
  enableCreditCard: boolean
  enableBankTransfer: boolean
  enableEWallet: boolean
  
  // System Settings
  maintenanceMode: boolean
  debugMode: boolean
  cacheEnabled: boolean
}

const defaultSettings: AppSettings = {
  siteName: "CyberLearn Movies",
  siteDescription: "Hệ thống đặt vé xem phim trực tuyến",
  contactEmail: "admin@cyberlearn.vn",
  supportPhone: "1900-1234",
  maxSeatsPerBooking: 8,
  bookingTimeLimit: 15,
  cancellationDeadline: 2,
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  requireEmailVerification: true,
  enableTwoFactor: false,
  sessionTimeout: 30,
  enableCreditCard: true,
  enableBankTransfer: true,
  enableEWallet: true,
  maintenanceMode: false,
  debugMode: false,
  cacheEnabled: true,
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      } else {
        throw new Error('Failed to fetch settings')
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
      setError('Failed to load settings')
      // Use default settings on error
      setSettings(defaultSettings)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings }
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      })

      if (response.ok) {
        const result = await response.json()
        setSettings(result.settings)
        return { success: true, message: result.message }
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (err) {
      console.error('Error saving settings:', err)
      return { success: false, message: 'Failed to save settings' }
    }
  }

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    refetch: fetchSettings,
  }
}