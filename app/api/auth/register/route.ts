import { type NextRequest, NextResponse } from "next/server";
import { database } from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, fullName, phone, password } = body;

    // Validate required fields
    const requiredFields = ["username", "email", "fullName", "phone", "password"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
    const existingUser = database.getUserByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Username already exists",
        },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = database.createUser({
      username,
      email,
      fullName,
      phone,
      role: 'customer',
      status: 'active'
    });

    // Remove sensitive data from response
    const { ...userResponse } = newUser;

    console.log("[API] User registered:", userResponse);

    return NextResponse.json({
      success: true,
      data: userResponse,
      message: "Registration successful",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Registration failed",
      },
      { status: 500 }
    );
  }
}