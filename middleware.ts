import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Only run this middleware for the home page
  if (request.nextUrl.pathname === "/") {
    try {
      // Check if we need to seed data
      const response = await fetch(`${request.nextUrl.origin}/api/seed/check`, {
        method: "GET",
      })

      const data = await response.json()

      // If data needs to be seeded, do it
      if (data.needsSeeding) {
        await fetch(`${request.nextUrl.origin}/api/seed`, {
          method: "GET",
        })
      }
    } catch (error) {
      console.error("Error in middleware:", error)
    }
  }

  return NextResponse.next()
}

// Only run this middleware for the home page
export const config = {
  matcher: ["/"],
}
