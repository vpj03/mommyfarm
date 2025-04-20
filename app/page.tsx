import HeroSlider from "@/components/home/hero-slider"
import AdSlider from "@/components/home/ad-slider"
import CategorySlider from "@/components/home/category-slider"
import ProductSlider from "@/components/home/product-slider"
import BrandSlider from "@/components/home/brand-slider"
import EbookSlider from "@/components/home/ebook-slider"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <HeroSlider />
      <AdSlider />
      <CategorySlider />

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Orgpick Vegetables</h2>
        <ProductSlider category="vegetables" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Orgpick Launch Offer</h2>
        <ProductSlider category="launch-offer" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Certified Organic Cold Pressed Oils</h2>
        <ProductSlider category="oils" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Premium Organic Dry Fruits</h2>
        <ProductSlider category="dry-fruits" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Organic Juices</h2>
        <ProductSlider category="juices" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Shop By Brands</h2>
        <BrandSlider />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-[#86C33B]">Health E-books</h2>
        <EbookSlider />
      </section>
    </div>
  )
}
