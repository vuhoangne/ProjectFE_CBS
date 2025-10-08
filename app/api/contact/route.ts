import { NextRequest, NextResponse } from 'next/server'
import { database } from '@/lib/database'
import { persistentStorage } from '@/lib/persistent-storage'

export async function GET() {
  try {
    const contactInfo = database.getContactInfo()
    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error('Error getting contact info:', error)
    return NextResponse.json(
      { error: 'Failed to get contact info' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const contactData = await request.json()
    
    // Validate required fields
    if (!contactData.phone || !contactData.email || !contactData.address) {
      return NextResponse.json(
        { error: 'Phone, email, and address are required' },
        { status: 400 }
      )
    }

    const updatedContact = database.updateContactInfo(contactData)
    
    // Save to persistent storage
    persistentStorage.saveContactInfo(updatedContact)
    
    // Emit real-time update
    database.emit('contactUpdated', updatedContact)
    
    console.log('[API] Contact info updated and saved:', updatedContact)
    
    return NextResponse.json(updatedContact)
  } catch (error) {
    console.error('Error updating contact info:', error)
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    )
  }
}