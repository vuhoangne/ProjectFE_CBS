import { NextRequest, NextResponse } from 'next/server'

// In a real app, this would be stored in a database
// For now, we'll use a simple file-based storage
import fs from 'fs'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Default settings
const defaultSettings = {
  // General Settings
  siteName: "CyberLearn Movies",
  siteDescription: "Hệ thống đặt vé xem phim trực tuyến",
  contactEmail: "admin@cyberlearn.vn",
  supportPhone: "1900-1234",
  
  // Booking Settings
  maxSeatsPerBooking: 8,
  bookingTimeLimit: 15,
  cancellationDeadline: 2,
  
  // Notification Settings
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  
  // Security Settings
  requireEmailVerification: true,
  enableTwoFactor: false,
  sessionTimeout: 30,
  
  // Payment Settings
  enableCreditCard: true,
  enableBankTransfer: true,
  enableEWallet: true,
  
  // System Settings
  maintenanceMode: false,
  debugMode: false,
  cacheEnabled: true,
}

// GET - Retrieve settings
export async function GET() {
  try {
    ensureDataDir()
    
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8')
      const settings = JSON.parse(data)
      return NextResponse.json(settings)
    } else {
      // Return default settings if file doesn't exist
      return NextResponse.json(defaultSettings)
    }
  } catch (error) {
    console.error('Error reading settings:', error)
    return NextResponse.json(defaultSettings)
  }
}

// POST - Save settings
export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()
    
    ensureDataDir()
    
    // Merge with default settings to ensure all fields exist
    const mergedSettings = { ...defaultSettings, ...settings }
    
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(mergedSettings, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Settings saved successfully',
      settings: mergedSettings 
    })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save settings' },
      { status: 500 }
    )
  }
}