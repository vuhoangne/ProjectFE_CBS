// Persistent storage using localStorage for client-side and file system for server-side
// This ensures data persists between sessions

import { ContactInfo } from './database'

const STORAGE_KEY = 'cyberlearn_contact_info'

export class PersistentStorage {
  private isClient = typeof window !== 'undefined'

  // Save contact info to persistent storage
  saveContactInfo(contactInfo: ContactInfo): void {
    try {
      if (this.isClient) {
        // Client-side: use localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(contactInfo))
      } else {
        // Server-side: use file system (in production, use database)
        const fs = require('fs')
        const path = require('path')
        const dataDir = path.join(process.cwd(), 'data')
        
        // Create data directory if it doesn't exist
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
        }
        
        const filePath = path.join(dataDir, 'contact-info.json')
        fs.writeFileSync(filePath, JSON.stringify(contactInfo, null, 2))
      }
      console.log('[PersistentStorage] Contact info saved successfully')
    } catch (error) {
      console.error('[PersistentStorage] Error saving contact info:', error)
    }
  }

  // Load contact info from persistent storage
  loadContactInfo(): ContactInfo | null {
    try {
      if (this.isClient) {
        // Client-side: use localStorage
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : null
      } else {
        // Server-side: use file system
        const fs = require('fs')
        const path = require('path')
        const filePath = path.join(process.cwd(), 'data', 'contact-info.json')
        
        if (fs.existsSync(filePath)) {
          const data = fs.readFileSync(filePath, 'utf8')
          return JSON.parse(data)
        }
        return null
      }
    } catch (error) {
      console.error('[PersistentStorage] Error loading contact info:', error)
      return null
    }
  }

  // Clear stored data
  clearContactInfo(): void {
    try {
      if (this.isClient) {
        localStorage.removeItem(STORAGE_KEY)
      } else {
        const fs = require('fs')
        const path = require('path')
        const filePath = path.join(process.cwd(), 'data', 'contact-info.json')
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
      console.log('[PersistentStorage] Contact info cleared')
    } catch (error) {
      console.error('[PersistentStorage] Error clearing contact info:', error)
    }
  }
}

export const persistentStorage = new PersistentStorage()