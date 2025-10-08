import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const booking = database.getBooking(params.id)

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch booking",
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const updatedBooking = database.updateBooking(params.id, body)

    if (!updatedBooking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: "Booking updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update booking",
      },
      { status: 500 }
    )
  }
}