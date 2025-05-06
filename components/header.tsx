"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false)
      } else {
        setIsScrollingUp(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`sticky ${
        isScrollingUp ? "top-0" : "-top-24"
      } z-50 bg-[#86C33B] shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              <Image
                src="/placeholder.svg?height=40&width=160"
                alt="MommyFarm Logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <Input
                type="search"
                placeholder="Search for organic products..."
                className="w-full pl-10 pr-4 py-2 border-white focus:border-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full"
              >
                <Heart size={20} />
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full relative"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-white text-[#86C33B] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full p-0 overflow-hidden"
                  >
                    {user.image ? (
                      <Image
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account ({user.role})</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin`} className="w-full" onClick={closeMobileMenu}>
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/users`} className="w-full" onClick={closeMobileMenu}>
                          User Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/products`} className="w-full" onClick={closeMobileMenu}>
                          Products Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/orders`} className="w-full" onClick={closeMobileMenu}>
                          Orders Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/payments`} className="w-full" onClick={closeMobileMenu}>
                          Payments Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/banners`} className="w-full" onClick={closeMobileMenu}>
                          Banners/Hero Slides
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/categories`} className="w-full" onClick={closeMobileMenu}>
                          Categories Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/ebooks`} className="w-full" onClick={closeMobileMenu}>
                          E-books Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/brands`} className="w-full" onClick={closeMobileMenu}>
                          Brands Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/sellers`} className="w-full" onClick={closeMobileMenu}>
                          Seller Approvals
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/messages`} className="w-full" onClick={closeMobileMenu}>
                          Messaging System
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/settings`} className="w-full" onClick={closeMobileMenu}>
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "seller" && (
                    <>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/dashboard`} className="w-full" onClick={closeMobileMenu}>
                          Seller Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/store`} className="w-full" onClick={closeMobileMenu}>
                          Store Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/products`} className="w-full" onClick={closeMobileMenu}>
                          Product Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/orders`} className="w-full" onClick={closeMobileMenu}>
                          Orders Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/payments`} className="w-full" onClick={closeMobileMenu}>
                          Payments Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/customers`} className="w-full" onClick={closeMobileMenu}>
                          Customer Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/analytics`} className="w-full" onClick={closeMobileMenu}>
                          Analytics Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/messages`} className="w-full" onClick={closeMobileMenu}>
                          Messaging System
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/kyc`} className="w-full" onClick={closeMobileMenu}>
                          KYC Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/settings`} className="w-full" onClick={closeMobileMenu}>
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "buyer" && (
                    <>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/dashboard`} className="w-full" onClick={closeMobileMenu}>
                          Buyer Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/profile`} className="w-full" onClick={closeMobileMenu}>
                          Profile Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/orders`} className="w-full" onClick={closeMobileMenu}>
                          Orders History
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/wishlist" className="w-full" onClick={closeMobileMenu}>
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/addresses`} className="w-full" onClick={closeMobileMenu}>
                          Address Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/subscriptions`} className="w-full" onClick={closeMobileMenu}>
                          Subscriptions
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/payment-methods`} className="w-full" onClick={closeMobileMenu}>
                          Payment Methods
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/wallet`} className="w-full" onClick={closeMobileMenu}>
                          Wallet
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/notifications`} className="w-full" onClick={closeMobileMenu}>
                          Notifications
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/support`} className="w-full" onClick={closeMobileMenu}>
                          Support
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/settings`} className="w-full" onClick={closeMobileMenu}>
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}

            <Link href="/seller/register">
              <Button
                variant="outline"
                size="sm"
                className="water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
              >
                Sell on MommyFarm
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/20">
            <div className="flex mb-4">
              <Input type="search" placeholder="Search for organic products..." className="w-full pl-10 pr-4 py-2" />
              <Search className="absolute left-7 top-[5.5rem] transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <nav className="flex flex-col space-y-4">
              <Link href="/wishlist" className="flex items-center space-x-2 text-white" onClick={closeMobileMenu}>
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link href="/cart" className="flex items-center space-x-2 text-white" onClick={closeMobileMenu}>
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>

              {user ? (
                <>
                  {user.role === "admin" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Admin Menu</span>
                      <Link href={`/${user.username}/admin`} className="text-white" onClick={closeMobileMenu}>
                        Admin Dashboard
                      </Link>
                      <Link href={`/${user.username}/admin/users`} className="text-white" onClick={closeMobileMenu}>
                        User Management
                      </Link>
                      <Link href={`/${user.username}/admin/products`} className="text-white" onClick={closeMobileMenu}>
                        Products Management
                      </Link>
                      <Link href={`/${user.username}/admin/orders`} className="text-white" onClick={closeMobileMenu}>
                        Orders Management
                      </Link>
                      <Link href={`/${user.username}/admin/payments`} className="text-white" onClick={closeMobileMenu}>
                        Payments Tracking
                      </Link>
                      <Link href={`/${user.username}/admin/settings`} className="text-white" onClick={closeMobileMenu}>
                        Settings
                      </Link>
                    </div>
                  )}

                  {user.role === "seller" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Seller Menu</span>
                      <Link
                        href={`/${user.username}/seller/dashboard`}
                        className="text-white"
                        onClick={closeMobileMenu}
                      >
                        Seller Dashboard
                      </Link>
                      <Link href={`/${user.username}/seller/store`} className="text-white" onClick={closeMobileMenu}>
                        Store Management
                      </Link>
                      <Link href={`/${user.username}/seller/products`} className="text-white" onClick={closeMobileMenu}>
                        Product Management
                      </Link>
                      <Link href={`/${user.username}/seller/orders`} className="text-white" onClick={closeMobileMenu}>
                        Orders Tracking
                      </Link>
                      <Link href={`/${user.username}/seller/settings`} className="text-white" onClick={closeMobileMenu}>
                        Settings
                      </Link>
                    </div>
                  )}

                  {user.role === "buyer" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Buyer Menu</span>
                      <Link href={`/${user.username}/dashboard`} className="text-white" onClick={closeMobileMenu}>
                        Buyer Dashboard
                      </Link>
                      <Link href={`/${user.username}/profile`} className="text-white" onClick={closeMobileMenu}>
                        Profile Management
                      </Link>
                      <Link href={`/${user.username}/orders`} className="text-white" onClick={closeMobileMenu}>
                        Orders History
                      </Link>
                      <Link href="/wishlist" className="text-white" onClick={closeMobileMenu}>
                        Wishlist
                      </Link>
                      <Link href={`/${user.username}/settings`} className="text-white" onClick={closeMobileMenu}>
                        Settings
                      </Link>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="justify-start px-0 text-white border-t border-white/20 pt-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/login" onClick={closeMobileMenu}>
                    <Button
                      variant="outline"
                      className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={closeMobileMenu}>
                    <Button
                      variant="default"
                      className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              <Link href="/seller/register" onClick={closeMobileMenu}>
                <Button
                  variant="outline"
                  className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                >
                  Sell on MommyFarm
                </Button>
              </Link>
            </nav>
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="hidden md:flex mt-4 border-t border-white/20 pt-4">
          <ul className="flex space-x-6">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">
                  Organic Fruits & Vegetables
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>50+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/apples" className="w-full">
                        Apples
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/tomatoes" className="w-full">
                        Tomatoes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/spinach" className="w-full">
                        Spinach
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/carrots" className="w-full">
                        Carrots
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/bananas" className="w-full">
                        Bananas
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/broccoli" className="w-full">
                        Broccoli
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/oranges" className="w-full">
                        Oranges
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/fruits-vegetables/potatoes" className="w-full">
                        Potatoes
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/products/fruits-vegetables" className="w-full">
                      View All
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">
                  Organic Grains & Pulses
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>30+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/rice" className="w-full">
                        Rice
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/wheat" className="w-full">
                        Wheat
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/lentils" className="w-full">
                        Lentils
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/oats" className="w-full">
                        Oats
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/quinoa" className="w-full">
                        Quinoa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/chickpeas" className="w-full">
                        Chickpeas
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/barley" className="w-full">
                        Barley
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/grains-pulses/millet" className="w-full">
                        Millet
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/products/grains-pulses" className="w-full">
                      View All
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">Organic Dairy</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>20+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem>
                      <Link href="/products/dairy/milk" className="w-full">
                        Milk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/dairy/cheese" className="w-full">
                        Cheese
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/dairy/yogurt" className="w-full">
                        Yogurt
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/dairy/butter" className="w-full">
                        Butter
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/dairy/ghee" className="w-full">
                        Ghee
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/dairy/paneer" className="w-full">
                        Paneer
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/dairy/cream" className="w-full">
                        Cream
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/dairy/curd" className="w-full">
                        Curd
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/products/dairy" className="w-full">
                      View All
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">Organic Beverages</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>50+ Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem>
                      <Link href="/products/beverages/coffee" className="w-full">
                        Coffee
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/beverages/tea" className="w-full">
                        Tea
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/beverages/juice" className="w-full">
                        Juice
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/beverages/plant-milk" className="w-full">
                        Plant-based Milk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/beverages/smoothies" className="w-full">
                        Smoothies
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/beverages/herbal" className="w-full">
                        Herbal Drinks
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/beverages/kombucha" className="w-full">
                        Kombucha
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/beverages/coconut-water" className="w-full">
                        Coconut Water
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/products/beverages" className="w-full">
                      View All
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">
                  Organic Personal Care
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>150+ Products</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="grid grid-cols-2 gap-1">
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/skincare" className="w-full">
                        Skincare
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/haircare" className="w-full">
                        Haircare
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/oral-care" className="w-full">
                        Oral Care
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/body-care" className="w-full">
                        Body Care
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/face-wash" className="w-full">
                        Face Wash
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/shampoo" className="w-full">
                        Shampoo
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/oils" className="w-full">
                        Oils
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/products/personal-care/soaps" className="w-full">
                        Soaps
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/products/personal-care" className="w-full">
                      View All
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">More Categories</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Link href="/products/meat-poultry" className="w-full">
                      Organic Meat & Poultry
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/snacks" className="w-full">
                      Organic Snacks
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/cleaning" className="w-full">
                      Organic Cleaning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/baby" className="w-full">
                      Organic Baby Products
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/home-living" className="w-full">
                      Home & Living
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/products/eco-accessories" className="w-full">
                      Eco Accessories
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
