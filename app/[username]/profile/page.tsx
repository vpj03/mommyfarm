import { getSessionUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"
import PageTemplate from "@/components/page-template"

export default async function BuyerProfilePage({ params }: { params: { username: string } }) {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  if (user.username !== params.username && user.role !== "admin") {
    redirect("/")
  }

  return (
    <PageTemplate title="Profile Management">
      <p>Manage your profile here.</p>
      <div className="mt-6 p-4 border rounded-lg">
        <p>Profile management functionality will be implemented here.</p>
      </div>
    </PageTemplate>
  )
}
