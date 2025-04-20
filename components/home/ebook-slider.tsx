"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

type Ebook = {
  _id: string
  title: string
  slug: string
  image: string
  description: string
}

export default function EbookSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await fetch("/api/ebooks")
        const data = await response.json()

        if (data.success) {
          setEbooks(data.ebooks)
        }
      } catch (error) {
        console.error("Error fetching ebooks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEbooks()
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
            <div key={i} className="flex-shrink-0 w-[220px] h-[350px] bg-gray-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (ebooks.length === 0) {
    return (
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500">No ebooks available</p>
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
        {ebooks.map((ebook) => (
          <Link key={ebook._id} href={`/ebooks/${ebook.slug}`} className="flex-shrink-0 w-[220px] group">
            <div className="rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-md group-hover:border-green-300 h-full flex flex-col">
              <div className="relative h-[280px] w-full">
                <Image
                  src={ebook.image || "/placeholder.svg"}
                  alt={ebook.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" className="bg-white bg-opacity-90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Now
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-white flex flex-col flex-grow">
                <h3 className="font-medium text-gray-800 mb-2">{ebook.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{ebook.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
