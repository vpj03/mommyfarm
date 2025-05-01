import type { Metadata } from "next"
import { getServerSession } from "@/lib/server-utils"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Seller Settings | MommyFarm",
  description: "Manage your seller settings on MommyFarm",
}

export default async function SellerSettingsPage({ params }: { params: { username: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    redirect("/login")
  }

  if (session.user.role !== "seller" && session.user.role !== "admin") {
    redirect("/")
  }

  if (session.user.username !== params.username && session.user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Seller Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">Welcome to your seller settings page, {session.user.name}!</p>
        <p>This page is currently under development. Soon you'll be able to manage all your seller settings here.</p>
      </div>
    </div>
  )
}
