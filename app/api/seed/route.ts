import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/user"
import Category from "@/models/category"
import Brand from "@/models/brand"
import Product from "@/models/product"
import Banner from "@/models/banner"
import Ebook from "@/models/ebook"

export async function GET(request: Request) {
  try {
    await dbConnect()

    // Check if data already exists
    const categoriesCount = await Category.countDocuments()
    const brandsCount = await Brand.countDocuments()
    const productsCount = await Product.countDocuments()
    const bannersCount = await Banner.countDocuments()
    const ebooksCount = await Ebook.countDocuments()

    // If data already exists, return success
    if (categoriesCount > 0 && brandsCount > 0 && productsCount > 0 && bannersCount > 0 && ebooksCount > 0) {
      return NextResponse.json({
        success: true,
        message: "Data already seeded",
        counts: {
          categories: categoriesCount,
          brands: brandsCount,
          products: productsCount,
          banners: bannersCount,
          ebooks: ebooksCount,
        },
      })
    }

    // Get admin user
    const adminUser = await User.findOne({ role: "admin" })
    if (!adminUser) {
      return NextResponse.json({ success: false, message: "Admin user not found" }, { status: 404 })
    }

    // Get seller user
    const sellerUser = await User.findOne({ role: "seller" })
    if (!sellerUser) {
      return NextResponse.json({ success: false, message: "Seller user not found" }, { status: 404 })
    }

    // Seed categories if needed
    if (categoriesCount === 0) {
      const categories = [
        {
          name: "Vegetables",
          slug: "vegetables",
          image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop",
          description: "Fresh organic vegetables directly from farms",
          isActive: true,
        },
        {
          name: "Fruits",
          slug: "fruits",
          image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop",
          description: "Seasonal organic fruits for a healthy lifestyle",
          isActive: true,
        },
        {
          name: "Oils",
          slug: "oils",
          image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop",
          description: "Cold-pressed organic oils for cooking and health",
          isActive: true,
        },
        {
          name: "Dry Fruits",
          slug: "dry-fruits",
          image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=800&auto=format&fit=crop",
          description: "Premium quality organic dry fruits and nuts",
          isActive: true,
        },
        {
          name: "Juices",
          slug: "juices",
          image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop",
          description: "Fresh organic juices without preservatives",
          isActive: true,
        },
      ]

      await Category.insertMany(categories)
    }

    // Seed brands if needed
    if (brandsCount === 0) {
      const brands = [
        {
          name: "Nature's Basket",
          slug: "natures-basket",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
          description: "Premium organic products for a healthier lifestyle",
          isActive: true,
        },
        {
          name: "Organic Valley",
          slug: "organic-valley",
          image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
          description: "Farm-fresh organic products from sustainable farms",
          isActive: true,
        },
        {
          name: "Green Harvest",
          slug: "green-harvest",
          image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop",
          description: "Certified organic products from local farmers",
          isActive: true,
        },
        {
          name: "Pure Earth",
          slug: "pure-earth",
          image: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=800&auto=format&fit=crop",
          description: "Eco-friendly organic products for conscious consumers",
          isActive: true,
        },
        {
          name: "Wholesome Foods",
          slug: "wholesome-foods",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
          description: "Nutritious and delicious organic food products",
          isActive: true,
        },
      ]

      await Brand.insertMany(brands)
    }

    // Seed products if needed
    if (productsCount === 0) {
      const products = [
        // Vegetables
        {
          name: "Organic Carrots (1kg)",
          description:
            "Fresh organic carrots grown without pesticides. Rich in beta-carotene and antioxidants.\n\nOur carrots are harvested at the peak of freshness to ensure maximum flavor and nutritional value. They are perfect for salads, juicing, or cooking.",
          price: 3.99,
          originalPrice: 4.99,
          images: [
            "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&auto=format&fit=crop",
          ],
          category: "vegetables",
          brand: "Nature's Basket",
          stock: 100,
          seller: sellerUser._id,
          isActive: true,
          isFeatured: true,
          isNew: true,
          averageRating: 4.5,
          ratings: [
            {
              user: adminUser._id,
              rating: 5,
              review: "Very fresh and tasty carrots!",
              date: new Date(),
            },
            {
              user: sellerUser._id,
              rating: 4,
              review: "Good quality and fresh.",
              date: new Date(),
            },
          ],
        },
        {
          name: "Organic Spinach (500g)",
          description:
            "Fresh organic spinach leaves, rich in iron and vitamins.\n\nOur spinach is grown using sustainable farming practices and harvested at the peak of freshness. Perfect for salads, smoothies, or cooking.",
          price: 2.49,
          originalPrice: 2.99,
          images: [
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=800&auto=format&fit=crop",
          ],
          category: "vegetables",
          brand: "Green Harvest",
          stock: 75,
          seller: sellerUser._id,
          isActive: true,
          isFeatured: false,
          isNew: false,
          averageRating: 4.0,
          ratings: [
            {
              user: adminUser._id,
              rating: 4,
              review: "Fresh and crisp spinach leaves.",
              date: new Date(),
            },
          ],
        },
        // Add more products as needed
      ]

      await Product.insertMany(products)
    }

    // Seed banners if needed
    if (bannersCount === 0) {
      const banners = [
        // Hero Slides
        {
          title: "Fresh Organic Vegetables",
          image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=1200&auto=format&fit=crop",
          description: "Directly from farms to your table",
          link: "/products/vegetables",
          type: "hero",
          order: 1,
          isActive: true,
        },
        {
          title: "Premium Organic Oils",
          image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop",
          description: "Cold-pressed for maximum nutrition",
          link: "/products/oils",
          type: "hero",
          order: 2,
          isActive: true,
        },
        {
          title: "Seasonal Organic Fruits",
          image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&auto=format&fit=crop",
          description: "Nature's sweetness in every bite",
          link: "/products/fruits",
          type: "hero",
          order: 3,
          isActive: true,
        },

        // Ad Banners
        {
          title: "Special Offer on Dry Fruits",
          image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=1200&auto=format&fit=crop",
          description: "Get 20% off on all dry fruits",
          link: "/products/dry-fruits",
          type: "ad",
          order: 1,
          isActive: true,
        },
        {
          title: "New Arrivals: Fresh Juices",
          image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1200&auto=format&fit=crop",
          description: "Try our new range of organic juices",
          link: "/products/juices",
          type: "ad",
          order: 2,
          isActive: true,
        },
      ]

      await Banner.insertMany(banners)
    }

    // Seed ebooks if needed
    if (ebooksCount === 0) {
      const ebooks = [
        {
          title: "Organic Cooking Basics",
          slug: "organic-cooking-basics",
          image: "https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?w=800&auto=format&fit=crop",
          description: "Learn the fundamentals of cooking with organic ingredients to maximize flavor and nutrition.",
          content:
            "# Organic Cooking Basics\n\n## Introduction\n\nCooking with organic ingredients not only benefits your health but also enhances the flavor of your dishes. This guide will help you understand the basics of organic cooking.\n\n## Chapter 1: Understanding Organic Ingredients\n\nOrganic ingredients are grown without synthetic pesticides, fertilizers, or GMOs. They are better for your health and the environment.\n\n## Chapter 2: Essential Cooking Techniques\n\nLearn how to preserve the nutrients in organic ingredients through proper cooking techniques.\n\n## Chapter 3: Simple Organic Recipes\n\nStart your organic cooking journey with these simple and delicious recipes.",
          isActive: true,
        },
        {
          title: "Organic Gardening for Beginners",
          slug: "organic-gardening-beginners",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop",
          description: "Start your own organic garden with this comprehensive guide for beginners.",
          content:
            "# Organic Gardening for Beginners\n\n## Introduction\n\nGrowing your own organic vegetables and fruits is rewarding and ensures you have access to fresh, pesticide-free produce.\n\n## Chapter 1: Planning Your Garden\n\nLearn how to choose the right location, soil, and plants for your organic garden.\n\n## Chapter 2: Natural Pest Control\n\nDiscover effective methods to control pests without using harmful chemicals.\n\n## Chapter 3: Composting Basics\n\nLearn how to create nutrient-rich compost for your garden using kitchen scraps and yard waste.",
          isActive: true,
        },
        // Add more ebooks as needed
      ]

      await Ebook.insertMany(ebooks)
    }

    return NextResponse.json({
      success: true,
      message: "Data seeded successfully",
      counts: {
        categories: await Category.countDocuments(),
        brands: await Brand.countDocuments(),
        products: await Product.countDocuments(),
        banners: await Banner.countDocuments(),
        ebooks: await Ebook.countDocuments(),
      },
    })
  } catch (error) {
    console.error("Error seeding data:", error)
    return NextResponse.json(
      { success: false, message: "Error seeding data", error: (error as Error).message },
      { status: 500 },
    )
  }
}
