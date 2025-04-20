import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/user"
import Product from "@/models/product"
import Banner from "@/models/banner"
import Category from "@/models/category"
import Brand from "@/models/brand"
import Ebook from "@/models/ebook"
import bcrypt from "bcryptjs"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Only run this middleware once during startup
  if (global.hasCheckedData) {
    return NextResponse.next()
  }

  try {
    await dbConnect()

    // Check if we have any data
    const userCount = await User.countDocuments()
    const productCount = await Product.countDocuments()
    const bannerCount = await Banner.countDocuments()
    const categoryCount = await Category.countDocuments()
    const brandCount = await Brand.countDocuments()
    const ebookCount = await Ebook.countDocuments()

    // If no users exist, create default users
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
      console.log("Default users created successfully")
    }

    // If no data exists, seed the database
    if (productCount === 0 || bannerCount === 0 || categoryCount === 0 || brandCount === 0 || ebookCount === 0) {
      // Trigger data seeding
      await fetch(`${request.nextUrl.origin}/api/seed`, {
        method: "POST",
      })
      console.log("Database seeded successfully")
    }

    // Mark that we've checked the data
    global.hasCheckedData = true
  } catch (error) {
    console.error("Error in middleware:", error)
  }

  return NextResponse.next()
}

// Only run the middleware on the home page
export const config = {
  matcher: "/",
}
