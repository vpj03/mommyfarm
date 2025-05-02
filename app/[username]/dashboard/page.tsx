import { getSessionUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"

export default async function BuyerDashboardPage({ params }: { params: { username: string } }) {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  if (user.username !== params.username && user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Buyer Dashboard</h1>
      <p>Welcome to your dashboard, {user.name}!</p>
    </div>
  )
}
