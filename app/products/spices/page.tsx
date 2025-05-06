import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

// This would typically come from your database
const products = [
  {
    id: "1",
    name: "Organic Turmeric Powder",
    description: "Pure, vibrant turmeric with powerful anti-inflammatory properties",
    price: 6.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "powder",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Organic Cumin Seeds",
    description: "Aromatic seeds that add warmth and depth to dishes",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "seeds",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Organic Cinnamon Sticks",
    description: "Sweet, fragrant cinnamon sticks for teas and desserts",
    price: 5.49,
    image: "/placeholder.svg?height=200&width=200",
    category: "whole",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Organic Garam Masala",
    description: "Traditional Indian spice blend for curries and stews",
    price: 7.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "blend",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Organic Black Peppercorns",
    description: "Bold, aromatic peppercorns for your grinder",
    price: 5.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "whole",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Organic Cardamom Pods",
    description: "Fragrant green pods for sweet and savory dishes",
    price: 8.49,
    image: "/placeholder.svg?height=200&width=200",
    category: "whole",
    rating: 4.8,
  },
]

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default function SpicesPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center text-[#86C33B] hover:text-[#86C33B]/80 mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold">Organic Spices</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 border rounded-lg p-4 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="powder" className="mr-2" defaultChecked />
                  <label htmlFor="powder">Powder Spices</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="whole" className="mr-2" defaultChecked />
                  <label htmlFor="whole">Whole Spices</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="seeds" className="mr-2" defaultChecked />
                  <label htmlFor="seeds">Seeds</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="blend" className="mr-2" defaultChecked />
                  <label htmlFor="blend">Spice Blends</label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="price1" className="mr-2" />
                  <label htmlFor="price1">Under $5</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price2" className="mr-2" />
                  <label htmlFor="price2">$5 - $7</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price3" className="mr-2" />
                  <label htmlFor="price3">$7 - $9</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="price4" className="mr-2" />
                  <label htmlFor="price4">$9+</label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Origin</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="indian" className="mr-2" />
                  <label htmlFor="indian">Indian</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="mediterranean" className="mr-2" />
                  <label htmlFor="mediterranean">Mediterranean</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="middle-eastern" className="mr-2" />
                  <label htmlFor="middle-eastern">Middle Eastern</label>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Apply Filters</Button>
          </div>
        </div>

        <div className="flex-1">
          {/* Mobile Filter and Sort */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Select defaultValue="featured">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Sort */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Showing {products.length} products</p>
            <div className="flex items-center">
              <span className="mr-2 text-sm">Sort by:</span>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <Suspense fallback={<ProductsLoading />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/products/spices/${product.id}`}>
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/products/spices/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-1 hover:text-[#86C33B] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        <span className="text-xs ml-1 text-gray-500">({product.rating})</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                      <Button className="bg-[#86C33B] hover:bg-[#86C33B]/90">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
