import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get("movieId") ? parseInt(searchParams.get("movieId")!) : undefined
    const theaterId = searchParams.get("theaterId") ? parseInt(searchParams.get("theaterId")!) : undefined
    const date = searchParams.get("date") || undefined

    const showtimes = database.getShowtimes({ movieId, theaterId, date })

    return NextResponse.json({
      success: true,
      data: showtimes,
      total: showtimes.length,
      filters: { movieId, theaterId, date },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch showtimes",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["movieId", "theaterId", "date", "time", "price"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        )
      }
    }

    // Validate price structure
    if (!body.price.regular || !body.price.vip) {
      return NextResponse.json(
        {
          success: false,
          error: "Price must include regular and vip prices",
        },
        { status: 400 }
      )
    }

    // Create new showtime
    const newShowtime = database.createShowtime({
      ...body,
      seats: body.seats || {
        total: 100,
        available: 100,
        booked: 0
      },
      status: body.status || 'active'
    })

    return NextResponse.json({
      success: true,
      data: newShowtime,
      message: "Showtime created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create showtime",
      },
      { status: 500 }
    )
  }
}
