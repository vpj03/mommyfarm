import { type NextRequest, NextResponse } from "next/server"
import { verifyJwtToken } from "./lib/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is for a protected route
  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.includes("/admin/") ||
    pathname.startsWith("/seller") ||
    pathname.includes("/seller/") ||
    pathname.includes("/dashboard") ||
    pathname.includes("/profile") ||
    pathname.includes("/orders") ||
    pathname.includes("/addresses") ||
    pathname.includes("/subscriptions") ||
    pathname.includes("/payment-methods") ||
    pathname.includes("/wallet") ||
    pathname.includes("/notifications") ||
    pathname.includes("/support") ||
    pathname.includes("/settings")

  // Skip middleware for non-protected routes and API routes
  if (!isProtectedRoute || pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verify the token
    const payload = await verifyJwtToken(token)

    // If the token is invalid, redirect to login
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check role-based access
    const { role, username } = payload

    // Extract username from path for user-specific routes
    const pathParts = pathname.split("/")
    const pathUsername = pathParts[1] // Username is the first part after the initial slash

    // Check if the route requires a specific role
    const isAdminRoute = pathname.includes("/admin/")
    const isSellerRoute = pathname.includes("/seller/")

    // Admin routes require admin role
    if (isAdminRoute && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Seller routes require seller or admin role
    if (isSellerRoute && role !== "seller" && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // User-specific routes require matching username or admin role
    if (pathUsername && pathUsername !== username && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // If there's an error verifying the token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}
