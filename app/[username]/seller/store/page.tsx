import { getSessionUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"
import PageTemplate from "@/components/page-template"

export default async function SellerStorePage({ params }: { params: { username: string } }) {
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
    <PageTemplate title="Store Management">
      <p>Manage your store here.</p>
      <div className="mt-6 p-4 border rounded-lg">
        <p>Store management functionality will be implemented here.</p>
      </div>
    </PageTemplate>
  )
}
