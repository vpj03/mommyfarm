import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Banner from "@/models/banner"

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    const query: any = { isActive: true }
    if (type) query.type = type

    const banners = await Banner.find(query).sort({ order: 1 })

    return NextResponse.json({ success: true, banners })
  } catch (error) {
    console.error("Error fetching banners:", error)
    return NextResponse.json(
      { success: false, message: "Error fetching banners", error: (error as Error).message },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    const banner = await Banner.create(data)

    return NextResponse.json({ success: true, message: "Banner created successfully", banner }, { status: 201 })
  } catch (error) {
    console.error("Error creating banner:", error)
    return NextResponse.json(
      { success: false, message: "Error creating banner", error: (error as Error).message },
      { status: 500 },
    )
  }
}
