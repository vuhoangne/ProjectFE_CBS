import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const showtime = database.getShowtime(id)

    if (!showtime) {
      return NextResponse.json(
        {
          success: false,
          error: "Showtime not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: showtime,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch showtime",
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
    const id = parseInt(params.id)
    const body = await request.json()

    const updatedShowtime = database.updateShowtime(id, body)

    if (!updatedShowtime) {
      return NextResponse.json(
        {
          success: false,
          error: "Showtime not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedShowtime,
      message: "Showtime updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update showtime",
      },
      { status: 500 }
    )
  }
}