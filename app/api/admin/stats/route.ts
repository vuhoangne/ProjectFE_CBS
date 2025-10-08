import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET() {
  try {
    const stats = database.getStats()

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch statistics",
      },
      { status: 500 }
    )
  }
}