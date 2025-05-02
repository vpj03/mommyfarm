import { getSessionUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"

export default async function SellerDashboardPage({ params }: { params: { username: string } }) {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "seller" && user.role !== "admin") {
    redirect("/")
  }

  if (user.username !== params.username && user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      <p>Welcome to your seller dashboard, {user.name}!</p>
    </div>
  )
}
