import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined

    const theaters = database.getTheaters({ status })

    return NextResponse.json({
      success: true,
      data: theaters,
      total: theaters.length,
      filters: { status }
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch theaters",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "location", "capacity"]
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

    // Create new theater
    const newTheater = database.createTheater({
      ...body,
      logo: body.logo || "/placeholder.svg",
      facilities: body.facilities || [],
      status: body.status || 'active'
    })

    return NextResponse.json({
      success: true,
      data: newTheater,
      message: "Theater created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create theater",
      },
      { status: 500 }
    )
  }
}