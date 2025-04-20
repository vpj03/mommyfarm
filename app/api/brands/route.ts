import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Brand from "@/models/brand"

export async function GET() {
  try {
    await dbConnect()
    const brands = await Brand.find({ isActive: true }).sort({ name: 1 })

    return NextResponse.json({ success: true, brands })
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json(
      { success: false, message: "Error fetching brands", error: (error as Error).message },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    const brand = await Brand.create(data)

    return NextResponse.json({ success: true, message: "Brand created successfully", brand }, { status: 201 })
  } catch (error) {
    console.error("Error creating brand:", error)
    return NextResponse.json(
      { success: false, message: "Error creating brand", error: (error as Error).message },
      { status: 500 },
    )
  }
}
