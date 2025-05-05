import { getSessionUser } from "@/lib/server-utils"
import { redirect } from "next/navigation"
import PageTemplate from "@/components/page-template"

export default async function WishlistPage() {
  const user = await getSessionUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <PageTemplate title="Wishlist">
      <p>View your wishlist here.</p>
      <div className="mt-6 p-4 border rounded-lg">
        <p>Wishlist functionality will be implemented here.</p>
      </div>
    </PageTemplate>
  )
}
