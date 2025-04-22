import HeroSlider from "@/components/home/hero-slider"
import AdSlider from "@/components/home/ad-slider"
import CategorySlider from "@/components/home/category-slider"
import ProductSlider from "@/components/home/product-slider"
import BrandSlider from "@/components/home/brand-slider"
import EbookSlider from "@/components/home/ebook-slider"

export default function Home() {
  return (
    <main className="container py-6 space-y-10">
      {/* Hero Slider */}
      <section>
        <HeroSlider />
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Shop by Category</h2>
        <CategorySlider />
      </section>

      {/* Ad Banner */}
      <section>
        <AdSlider />
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Featured Products</h2>
        <ProductSlider category="vegetables" />
      </section>

      {/* Brands */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Our Brands</h2>
        <BrandSlider />
      </section>

      {/* Oils Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Certified Organic Cold Pressed Oils</h2>
        <ProductSlider category="oils" />
      </section>

      {/* Ebooks */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Organic Living Guides</h2>
        <EbookSlider />
      </section>
    </main>
  )
}
