"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function SeedDataButton() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSeedData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/seed")
      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        })
      } else {
        throw new Error(data.message || "Failed to seed data")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to seed data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleSeedData}
      disabled={loading}
      className="water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
    >
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {loading ? "Seeding Data..." : "Seed Default Data"}
    </Button>
  )
}
