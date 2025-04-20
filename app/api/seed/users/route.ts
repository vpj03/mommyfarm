import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/db"
import User from "@/models/user"

export async function POST() {
  try {
    await dbConnect()

    // Check if users already exist
    const userCount = await User.countDocuments()

    // Only seed if no users exist
    if (userCount === 0) {
      // Hash passwords
      const salt = await bcrypt.genSalt(10)
      const adminPassword = await bcrypt.hash("admin123", salt)
      const sellerPassword = await bcrypt.hash("seller123", salt)
      const buyerPassword = await bcrypt.hash("buyer123", salt)

      // Create users
      const users = [
        {
          name: "Admin User",
          email: "admin@mommyfarm.com",
          password: adminPassword,
          role: "admin",
        },
        {
          name: "Seller User",
          email: "seller@mommyfarm.com",
          password: sellerPassword,
          role: "seller",
        },
        {
          name: "Buyer User",
          email: "buyer@mommyfarm.com",
          password: buyerPassword,
          role: "buyer",
        },
      ]

      await User.insertMany(users)

      return NextResponse.json({
        success: true,
        message: "Default users created successfully",
        users: users.map((user) => ({
          name: user.name,
          email: user.email,
          role: user.role,
        })),
      })
    }

    return NextResponse.json({
      success: false,
      message: "Users already exist. No new users created.",
    })
  } catch (error) {
    console.error("Error seeding users:", error)
    return NextResponse.json(
      { success: false, message: "Failed to seed users", error: (error as Error).message },
      { status: 500 },
    )
  }
}
