import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const movie = database.getMovie(id)

    if (!movie) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: movie,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch movie",
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

    const updatedMovie = database.updateMovie(id, body)

    if (!updatedMovie) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedMovie,
      message: "Movie updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update movie",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const deleted = database.deleteMovie(id)

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Movie deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete movie",
      },
      { status: 500 }
    )
  }
}