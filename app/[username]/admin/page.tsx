import { getSessionUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"

export default async function AdminDashboardPage({ params }: { params: { username: string } }) {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  if (user.role !== "admin") {
    redirect("/")
  }

  if (user.username !== params.username) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard, {user.name}!</p>
    </div>
  )
}
