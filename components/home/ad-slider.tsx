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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdSlides = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/banners?type=ad")

        if (!response.ok) {
          throw new Error(`Error fetching ad slides: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setAdSlides(data.banners)
        } else {
          throw new Error(data.message || "Failed to fetch ad slides")
        }
      } catch (error) {
        console.error("Error fetching ad slides:", error)
        setError((error as Error).message)
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

  // If there's an error, show error message
  if (error) {
    // Instead of showing error, use default slides
    const defaultSlides = [
      {
        _id: "default-ad-1",
        title: "Special Offer on Dry Fruits",
        image: "https://www.google.com/imgres?q=Special%20Offer%20on%20Dry%20Fruits&imgurl=https%3A%2F%2Fwholesaledryfruits.in%2Fwp-content%2Fuploads%2F2024%2F07%2Ffree-shipping-wdf-1.jpg&imgrefurl=https%3A%2F%2Fwholesaledryfruits.in%2F&docid=_kTEZEumXYEtBM&tbnid=ZA9Myu_Ehb9DvM&vet=12ahUKEwit4-LXhY6NAxXe6jgGHVyqEnUQM3oECGQQAA..i&w=1920&h=800&hcb=2&ved=2ahUKEwit4-LXhY6NAxXe6jgGHVyqEnUQM3oECGQQAA",
        link: "/products/dry-fruits",
      },
      {
        _id: "default-ad-2",
        title: "New Arrivals: Fresh Juices",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftocgrp.com%2F%3Ft%3D74411517&psig=AOvVaw07qxxKn7rXgBghBW1IxL7X&ust=1746593514307000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJj9woOGjo0DFQAAAAAdAAAAABAE",
        link: "/products/juices",
      },
      {
        _id: "default-ad-3",
        title: "Organic Gift Hampers",
        image: "https://www.google.com/imgres?q=Organic%20Gift%20Hampers&imgurl=https%3A%2F%2Faarogyamastu.in%2Fwp-content%2Fuploads%2F2022%2F06%2Fimg84.jpg&imgrefurl=https%3A%2F%2Faarogyamastu.in%2Fproduct%2Forganic-tulsi-camomile-teas-and-raw-honey-diwali-hamper%2F&docid=ois5nc_mcDElYM&tbnid=X38UV2UgHJIzmM&vet=12ahUKEwjd8cSSho6NAxUMTWcHHT3aBd8QM3oECHQQAA..i&w=1696&h=1133&hcb=2&itg=1&ved=2ahUKEwjd8cSSho6NAxUMTWcHHT3aBd8QM3oECHQQAA",
        link: "/gift-hampers",
      },
    ]

    setAdSlides(defaultSlides)
    setLoading(false)
    setError(null)
    return null
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  // If no slides, show default ad
  if (adSlides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-lg h-[120px] md:h-[150px] lg:h-[200px] bg-[#86C33B]/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <h3 className="text-xl font-bold text-[#86C33B] mb-2">Special Offers</h3>
            <p className="text-gray-700">Check out our latest deals on organic products!</p>
          </div>
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
