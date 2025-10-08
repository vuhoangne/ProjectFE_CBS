import { NextRequest, NextResponse } from 'next/server'
import { database } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      )
    }

    // In a real app, you would save to database and send email
    // For demo, we'll just simulate success
    
    console.log(`[Newsletter] New subscription: ${email}`)
    
    // Emit real-time update
    database.emit('newsletter:subscribed', { email, timestamp: new Date().toISOString() })
    
    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công! Bạn sẽ nhận được ưu đãi qua email.',
      data: { email }
    })
  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Return newsletter stats for admin
  return NextResponse.json({
    success: true,
    data: {
      totalSubscribers: 423,
      remainingOffers: 377,
      conversionRate: 0.2
    }
  })
}