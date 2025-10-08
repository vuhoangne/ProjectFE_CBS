import { type NextRequest, NextResponse } from "next/server"
import { database } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role") || undefined
    const status = searchParams.get("status") || undefined

    const users = database.getUsers({ role, status })

    return NextResponse.json({
      success: true,
      data: users,
      total: users.length,
      filters: { role, status }
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch users",
      },
      { status: 500 }
    )
  }
}