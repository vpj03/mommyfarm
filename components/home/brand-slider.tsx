"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Brand = {
  _id: string
  name: string
  slug: string
  image: string
}

export default function BrandSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("/api/brands")
        const data = await response.json()

        if (data.success) {
          setBrands(data.brands)
        }
      } catch (error) {
        console.error("Error fetching brands:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef
      const scrollAmount = direction === "left" ? -current.offsetWidth / 2 : current.offsetWidth / 2

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  if (loading) {
    return (
      <div className="relative">
        <div className="flex justify-end mb-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 border-green-600 text-green-600" disabled>
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-green-600 text-green-600" disabled>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-shrink-0 w-[200px] h-[120px] bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (brands.length === 0) {
    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500">No brands available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex justify-end mb-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-green-600 text-green-600"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={18} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-green-600 text-green-600"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand.slug}`} className="flex-shrink-0 group">
            <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-green-300 p-4 bg-white h-[120px] w-[200px] flex items-center justify-center">
              <div className="relative h-[80px] w-[160px]">
                <Image
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
