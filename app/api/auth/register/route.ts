import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { withMongoose } from "@/lib/server-utils"
import User from "@/models/user"

export async function POST(request: Request) {
  try {
    return withMongoose(async () => {
      const { name, email, password } = await request.json()

      // Check if user already exists
      const existingUser = await User.findOne({ email })

      if (existingUser) {
        return NextResponse.json({ success: false, message: "Email already in use" }, { status: 400 })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: "buyer", // Default role
      })

      // Return user data (excluding password)
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }

      return NextResponse.json({
        success: true,
        message: "Registration successful",
        user: userData,
      })
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during registration" }, { status: 500 })
  }
}
