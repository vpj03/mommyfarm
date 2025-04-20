import { NextResponse } from "next/server"
import { withMongoose } from "@/lib/server-utils"
import Product from "@/models/product"
import Category from "@/models/category"
import Brand from "@/models/brand"
import Ebook from "@/models/ebook"
import Banner from "@/models/banner"

export async function GET() {
  try {
    return withMongoose(async () => {
      // Seed categories
      const categories = [
        { name: "Oils", image: "/images/categories/oils.jpg" },
        { name: "Grains", image: "/images/categories/grains.jpg" },
        { name: "Vegetables", image: "/images/categories/vegetables.jpg" },
        { name: "Fruits", image: "/images/categories/fruits.jpg" },
        { name: "Dairy", image: "/images/categories/dairy.jpg" },
      ]

      await Category.deleteMany({})
      await Category.insertMany(categories)

      // Seed brands
      const brands = [
        { name: "Organic Harvest", logo: "/images/brands/organic-harvest.png" },
        { name: "Nature's Basket", logo: "/images/brands/natures-basket.png" },
        { name: "Farm Fresh", logo: "/images/brands/farm-fresh.png" },
        { name: "Green Earth", logo: "/images/brands/green-earth.png" },
        { name: "Pure & Sure", logo: "/images/brands/pure-and-sure.png" },
      ]

      await Brand.deleteMany({})
      await Brand.insertMany(brands)

      // Seed products
      const products = [
        {
          name: "Organic Coconut Oil",
          description: "Cold-pressed organic coconut oil",
          price: 299,
          discountPrice: 249,
          category: "Oils",
          brand: "Organic Harvest",
          images: ["/images/products/coconut-oil.jpg"],
          stock: 50,
          rating: 4.5,
          numReviews: 12,
          isFeatured: true,
        },
        {
          name: "Organic Brown Rice",
          description: "Naturally grown brown rice",
          price: 199,
          discountPrice: 179,
          category: "Grains",
          brand: "Nature's Basket",
          images: ["/images/products/brown-rice.jpg"],
          stock: 100,
          rating: 4.2,
          numReviews: 8,
          isFeatured: true,
        },
        {
          name: "Fresh Organic Spinach",
          description: "Freshly harvested organic spinach",
          price: 49,
          discountPrice: 39,
          category: "Vegetables",
          brand: "Farm Fresh",
          images: ["/images/products/spinach.jpg"],
          stock: 30,
          rating: 4.0,
          numReviews: 5,
          isFeatured: false,
        },
        {
          name: "Organic Apples",
          description: "Sweet and juicy organic apples",
          price: 149,
          discountPrice: 129,
          category: "Fruits",
          brand: "Green Earth",
          images: ["/images/products/apples.jpg"],
          stock: 80,
          rating: 4.7,
          numReviews: 15,
          isFeatured: true,
        },
        {
          name: "Organic Cow Milk",
          description: "Fresh organic cow milk",
          price: 89,
          discountPrice: 79,
          category: "Dairy",
          brand: "Pure & Sure",
          images: ["/images/products/milk.jpg"],
          stock: 40,
          rating: 4.3,
          numReviews: 10,
          isFeatured: false,
        },
      ]

      await Product.deleteMany({})
      await Product.insertMany(products)

      // Seed ebooks
      const ebooks = [
        {
          title: "Organic Farming Guide",
          description: "Complete guide to organic farming practices",
          coverImage: "/images/ebooks/organic-farming.jpg",
          price: 99,
          discountPrice: 79,
          author: "Dr. Green Thumb",
          pages: 120,
          language: "English",
          isFeatured: true,
        },
        {
          title: "Healthy Recipes with Organic Ingredients",
          description: "Collection of healthy recipes using organic ingredients",
          coverImage: "/images/ebooks/healthy-recipes.jpg",
          price: 149,
          discountPrice: 129,
          author: "Chef Natura",
          pages: 200,
          language: "English",
          isFeatured: true,
        },
        {
          title: "Benefits of Organic Food",
          description: "Scientific research on benefits of organic food",
          coverImage: "/images/ebooks/benefits-organic.jpg",
          price: 79,
          discountPrice: 59,
          author: "Dr. Health Wise",
          pages: 90,
          language: "English",
          isFeatured: false,
        },
      ]

      await Ebook.deleteMany({})
      await Ebook.insertMany(ebooks)

      // Seed banners
      const banners = [
        {
          title: "Organic Products Sale",
          subtitle: "Up to 30% off on all organic products",
          image: "/images/banners/organic-sale.jpg",
          link: "/products",
          type: "hero",
          isActive: true,
        },
        {
          title: "New Arrivals",
          subtitle: "Check out our new organic products",
          image: "/images/banners/new-arrivals.jpg",
          link: "/products/new",
          type: "hero",
          isActive: true,
        },
        {
          title: "Organic Ebooks",
          subtitle: "Expand your knowledge about organic farming",
          image: "/images/banners/ebooks.jpg",
          link: "/ebooks",
          type: "ad",
          isActive: true,
        },
        {
          title: "Free Shipping",
          subtitle: "On orders above ₹999",
          image: "/images/banners/free-shipping.jpg",
          link: "/shipping",
          type: "ad",
          isActive: true,
        },
      ]

      await Banner.deleteMany({})
      await Banner.insertMany(banners)

      return NextResponse.json({
        success: true,
        message: "Data seeded successfully",
      })
    })
  } catch (error) {
    console.error("Error seeding data:", error)
    return NextResponse.json({ success: false, message: "Failed to seed data" }, { status: 500 })
  }
}
