import { type NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Username and password are required",
        },
        { status: 400 }
      );
    }

    // Find user in database
    let user = database.getUserByUsername(username);
    
    // If user doesn't exist, create a new one (for demo purposes)
    if (!user) {
      user = database.createUser({
        username: username,
        email: `${username}@example.com`,
        fullName: username === 'admin' ? 'System Administrator' : `User ${username}`,
        phone: "0123456789",
        role: username === 'admin' ? 'admin' : 'customer',
        status: 'active'
      });
    }

    // In a real app, you would verify the password hash here
    // For demo purposes, we'll accept any password

    console.log("[API] User login:", user);

    return NextResponse.json({
      success: true,
      data: user,
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Login failed",
      },
      { status: 500 }
    );
  }
}
