import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Category from "@/models/category"

export async function GET() {
  try {
    await dbConnect()
    const categories = await Category.find({ isActive: true }).sort({ name: 1 })

    return NextResponse.json({ success: true, categories })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { success: false, message: "Error fetching categories", error: (error as Error).message },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    const category = await Category.create(data)

    return NextResponse.json({ success: true, message: "Category created successfully", category }, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json(
      { success: false, message: "Error creating category", error: (error as Error).message },
      { status: 500 },
    )
  }
}
