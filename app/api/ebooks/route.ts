import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import Ebook from "@/models/ebook"

export async function GET() {
  try {
    await dbConnect()
    const ebooks = await Ebook.find({ isActive: true }).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, ebooks })
  } catch (error) {
    console.error("Error fetching ebooks:", error)
    return NextResponse.json(
      { success: false, message: "Error fetching ebooks", error: (error as Error).message },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    const ebook = await Ebook.create(data)

    return NextResponse.json({ success: true, message: "Ebook created successfully", ebook }, { status: 201 })
  } catch (error) {
    console.error("Error creating ebook:", error)
    return NextResponse.json(
      { success: false, message: "Error creating ebook", error: (error as Error).message },
      { status: 500 },
    )
  }
}
