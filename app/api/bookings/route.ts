import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || undefined
    const status = searchParams.get("status") || undefined
    const date = searchParams.get("date") || undefined

    const bookings = database.getBookings({ userId, status, date })

    console.log("[API] Fetching bookings with filters:", { userId, status, date })

    return NextResponse.json({
      success: true,
      data: bookings,
      total: bookings.length,
      filters: { userId, status, date },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch bookings",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["userId", "showtimeId", "seats", "totalAmount", "customerInfo", "paymentMethod"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Validate customer info
    const { customerInfo } = body
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required customer information",
        },
        { status: 400 },
      )
    }

    // Check if showtime exists and has available seats
    const showtime = database.getShowtime(body.showtimeId)
    if (!showtime) {
      return NextResponse.json(
        {
          success: false,
          error: "Showtime not found",
        },
        { status: 404 }
      )
    }

    if (showtime.seats.available < body.seats.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Not enough available seats",
        },
        { status: 400 }
      )
    }

    // Create new booking in database
    const newBooking = database.createBooking({
      ...body,
      movieId: showtime.movieId,
      theaterId: showtime.theaterId,
      paymentStatus: "pending",
      bookingStatus: "confirmed"
    })

    console.log("[API] Creating new booking:", newBooking)

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: "Booking created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create booking",
      },
      { status: 500 },
    )
  }
}
