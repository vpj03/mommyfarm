import Link from "next/link"
import HeroSlider from "@/components/home/hero-slider"
import AdSlider from "@/components/home/ad-slider"
import ProductSlider from "@/components/home/product-slider"
import BrandSlider from "@/components/home/brand-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="container py-6 space-y-12">
      {/* Hero Slider */}
      <section>
        <HeroSlider />
      </section>

      {/* Product Categories */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-[#86C33B]">Product Categories</h2>

        {/* Organic Food */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#CC6203]">🥬 Organic Food</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Fresh Fruits & Vegetables</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Farm-fresh seasonal produce</li>
                  <li>Pesticide-free cultivation</li>
                  <li>Locally sourced when possible</li>
                </ul>
                <Link href="/products/fruits-vegetables">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Grains & Pulses</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Whole grains and ancient varieties</li>
                  <li>Protein-rich pulses and legumes</li>
                  <li>Stone-ground flours</li>
                </ul>
                <Link href="/products/grains-pulses">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Organic Spices</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Hand-picked and sun-dried</li>
                  <li>Pure, unadulterated flavors</li>
                  <li>Traditional processing methods</li>
                </ul>
                <Link href="/products/spices">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Organic Baby Products */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#CC6203]">🍼 Organic Baby Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Baby Food</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>No artificial preservatives</li>
                  <li>Age-appropriate nutrition</li>
                  <li>Gentle on developing digestive systems</li>
                </ul>
                <Link href="/products/baby-food">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Organic Diapers</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Chlorine-free materials</li>
                  <li>Biodegradable options</li>
                  <li>Gentle on sensitive skin</li>
                </ul>
                <Link href="/products/baby-diapers">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Baby Skincare & Oils</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Hypoallergenic formulations</li>
                  <li>No synthetic fragrances</li>
                  <li>Nourishing natural ingredients</li>
                </ul>
                <Link href="/products/baby-skincare">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Organic Personal Care */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#CC6203]">🧖‍♀️ Organic Personal Care</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Skincare</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Moisturizers & Face Creams</li>
                  <li>Natural Scrubs & Exfoliants</li>
                  <li>Gentle Face Wash & Cleansers</li>
                </ul>
                <Link href="/products/skincare">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Haircare</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Natural Shampoos & Conditioners</li>
                  <li>Nourishing Hair Oils</li>
                  <li>Herbal Hair Treatments</li>
                </ul>
                <Link href="/products/haircare">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-medium mb-4">Oral Care</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
                  <li>Herbal Toothpaste</li>
                  <li>Natural Mouthwash</li>
                  <li>Bamboo Toothbrushes</li>
                </ul>
                <Link href="/products/oral-care">
                  <Button className="w-full bg-[#86C33B] hover:bg-[#86C33B]/90">Shop Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <section>
        <AdSlider />
      </section>

      {/* More Categories */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Organic Household Products */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">🧼 Organic Household Products</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/all-purpose-cleaners" className="hover:text-[#86C33B]">
                  All-purpose Cleaners
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/dishwashing" className="hover:text-[#86C33B]">
                  Dishwashing Liquids
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/laundry" className="hover:text-[#86C33B]">
                  Laundry Detergents
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/floor-cleaners" className="hover:text-[#86C33B]">
                  Floor Cleaners
                </Link>
              </li>
            </ul>
          </div>

          {/* Organic Beverages */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">☕ Organic Beverages</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/herbal-teas" className="hover:text-[#86C33B]">
                  Herbal Teas
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/organic-coffee" className="hover:text-[#86C33B]">
                  Organic Coffee
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/detox-juices" className="hover:text-[#86C33B]">
                  Detox Juices
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/plant-milk" className="hover:text-[#86C33B]">
                  Almond & Oat Milk
                </Link>
              </li>
            </ul>
          </div>

          {/* Eco Accessories */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">🧳 Eco Accessories</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/bamboo-brushes" className="hover:text-[#86C33B]">
                  Bamboo Brushes
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/reusable-straws" className="hover:text-[#86C33B]">
                  Reusable Straws
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/cotton-bags" className="hover:text-[#86C33B]">
                  Cotton Bags
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/face-masks" className="hover:text-[#86C33B]">
                  Organic Face Masks
                </Link>
              </li>
            </ul>
          </div>

          {/* Home & Living */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#CC6203]">🛋️ Home & Living</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/bedsheets-towels" className="hover:text-[#86C33B]">
                  Organic Bedsheets & Towels
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/soy-candles" className="hover:text-[#86C33B]">
                  Soy Candles
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/air-fresheners" className="hover:text-[#86C33B]">
                  Plant-Based Air Fresheners
                </Link>
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-[#86C33B] rounded-full mr-2"></span>
                <Link href="/products/storage-containers" className="hover:text-[#86C33B]">
                  Biodegradable Storage Containers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Shop by Themes */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-[#CC6203]">🎨 Shop by Themes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/themes/new-arrivals">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">New Arrivals</h4>
                <p className="text-sm text-gray-600">Latest certified organic products</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes/gifts">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">Gifts for Green Lovers</h4>
                <p className="text-sm text-gray-600">Eco-conscious gift sets</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes/detox">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">Detox & Clean Living</h4>
                <p className="text-sm text-gray-600">Wellness-focused organic bundles</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes/nature">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">Back to Nature</h4>
                <p className="text-sm text-gray-600">Nature-inspired collections</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes/seasonal">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">Seasonal Specials</h4>
                <p className="text-sm text-gray-600">Organic items for summer/winter</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes/mindful">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">Mindful Living</h4>
                <p className="text-sm text-gray-600">Yoga mats, mindfulness journals, aromatherapy</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes/bestsellers">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">Best Sellers</h4>
                <p className="text-sm text-gray-600">Top-rated organic must-haves</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/themes/causes">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <h4 className="font-medium">Causes We Support</h4>
                <p className="text-sm text-gray-600">Products supporting sustainability & fair trade</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Brand Partnerships */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold text-[#CC6203]">🤝 Brand Partnerships</h3>
        <p className="text-gray-700">
          Featuring organic brands like Organic India, Forest Essentials, Eco Roots, Mamaearth, Khadi Naturals, and
          more.
        </p>
        <BrandSlider />
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Featured Products</h2>
        <ProductSlider category="vegetables" />
      </section>

      {/* User Engagement */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h3 className="text-2xl font-semibold text-[#CC6203] mb-6">👤 Join Our Organic Community</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xl font-medium">For Customers</h4>
            <p className="text-gray-700">
              Join our community of conscious consumers and get access to exclusive deals, early product launches, and
              educational content.
            </p>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#86C33B] text-[#86C33B] hover:bg-[#86C33B] hover:text-white"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#86C33B] hover:bg-[#86C33B]/90">Sign Up</Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-medium">For Sellers</h4>
            <p className="text-gray-700">
              Are you an organic farmer or producer? Join our marketplace and reach thousands of customers looking for
              authentic organic products.
            </p>
            <Link href="/seller/register">
              <Button className="bg-[#CC6203] hover:bg-[#CC6203]/90">Start Selling Your Organic Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
