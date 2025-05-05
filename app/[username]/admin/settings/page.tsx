import { getSessionUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"
import PageTemplate from "@/components/page-template"

export default async function AdminSettingsPage({ params }: { params: { username: string } }) {
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
    <PageTemplate title="Admin Settings">
      <p>Manage admin settings here.</p>
      <div className="mt-6 p-4 border rounded-lg">
        <p>Admin settings functionality will be implemented here.</p>
      </div>
    </PageTemplate>
  )
}
