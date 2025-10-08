import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined
    const genre = searchParams.get("genre") || undefined

    const movies = database.getMovies({ status, genre })
    
    return NextResponse.json({
      success: true,
      data: movies,
      total: movies.length,
      filters: { status, genre }
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch movies",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "title",
      "titleEn",
      "genre",
      "duration",
      "rating",
      "director",
      "cast",
      "synopsis",
      "releaseDate",
    ]
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

    // Create new movie in database
    const newMovie = database.createMovie({
      ...body,
      status: body.status || 'active'
    })

    console.log("[API] Creating new movie:", newMovie)

    return NextResponse.json({
      success: true,
      data: newMovie,
      message: "Movie created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create movie",
      },
      { status: 500 },
    )
  }
}
