"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: {
    _id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    images: string[]
    category: string
    stock: number
    averageRating?: number
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleProductClick = () => {
    router.push(`/products/${product.category}/${product._id}`)
  }

  const addToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your cart",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          quantity: 1,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Added to cart",
          description: "Item added to your cart",
        })
      } else {
        throw new Error(data.message || "Failed to add to cart")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to add to cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your wishlist",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    toast({
      title: "Added to wishlist",
      description: "Item added to your wishlist",
    })
  }

  return (
    <div
      className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white rounded-full h-8 w-8 shadow-md hover:bg-gray-100"
            onClick={addToWishlist}
          >
            <Heart size={16} className="text-gray-600" />
          </Button>
        </div>
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">{product.name}</h3>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(product.averageRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">{product.averageRating?.toFixed(1) || "0.0"}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-green-700">${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="ml-1 text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-green-600 hover:bg-green-700 rounded-full h-8 w-8 p-0"
            onClick={addToCart}
            disabled={isLoading}
          >
            <ShoppingCart size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
