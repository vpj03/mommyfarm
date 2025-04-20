import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { withMongoose } from "@/lib/server-utils"
import User from "@/models/user"

export async function POST(request: Request) {
  try {
    return withMongoose(async () => {
      const { email, password } = await request.json()

      // Find user by email
      const user = await User.findOne({ email })

      if (!user) {
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
      }

      // Return user data (excluding password)
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }

      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: userData,
      })
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "An error occurred during login" }, { status: 500 })
  }
}
