"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Banner = {
  _id: string
  title: string
  image: string
  link: string
}

export default function AdSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [adSlides, setAdSlides] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdSlides = async () => {
      try {
        const response = await fetch("/api/banners?type=ad")
        const data = await response.json()

        if (data.success) {
          setAdSlides(data.banners)
        }
      } catch (error) {
        console.error("Error fetching ad slides:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdSlides()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === adSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? adSlides.length - 1 : prev - 1))
  }

  // Auto-rotate slides
  useEffect(() => {
    if (adSlides.length === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentSlide, adSlides.length])

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  // If no slides, show placeholder
  if (adSlides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">No ad banners available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px]">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {adSlides.map((slide) => (
          <div key={slide._id} className="min-w-full relative">
            <a href={slide.link}>
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
            </a>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full h-8 w-8"
        onClick={prevSlide}
      >
        <ChevronLeft size={16} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full h-8 w-8"
        onClick={nextSlide}
      >
        <ChevronRight size={16} />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {adSlides.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 w-1.5 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
