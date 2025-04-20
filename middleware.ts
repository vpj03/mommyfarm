import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // We can't use Mongoose in middleware, so we'll just pass through
  return NextResponse.next()
}

// Only run the middleware on the home page
export const config = {
  matcher: "/",
}
