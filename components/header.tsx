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

  return (
    <header
      className={`sticky ${isScrollingUp ? "top-0" : "-top-24"} z-50 bg-[#86C33B] shadow-md transition-all duration-300 ease-in-out`}
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
            <Link href="/wishlist" className="text-white hover:text-gray-200">
              <Button
                variant="ghost"
                size="icon"
                className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full"
              >
                <Heart size={20} />
              </Button>
            </Link>
            <Link href="/cart" className="text-white hover:text-gray-200 relative">
              <Button
                variant="ghost"
                size="icon"
                className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full"
              >
                <ShoppingCart size={20} />
              </Button>
              <span className="absolute -top-2 -right-2 bg-white text-[#86C33B] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
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
                        <Link href={`/${user.username}/admin`} className="w-full">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/users`} className="w-full">
                          User Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/products`} className="w-full">
                          Products Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/orders`} className="w-full">
                          Orders Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/payments`} className="w-full">
                          Payments Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/banners`} className="w-full">
                          Banners/Hero Slides
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/categories`} className="w-full">
                          Categories Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/ebooks`} className="w-full">
                          E-books Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/brands`} className="w-full">
                          Brands Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/sellers`} className="w-full">
                          Seller Approvals
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/messages`} className="w-full">
                          Messaging System
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/admin/settings`} className="w-full">
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "seller" && (
                    <>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/dashboard`} className="w-full">
                          Seller Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/store`} className="w-full">
                          Store Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/products`} className="w-full">
                          Product Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/orders`} className="w-full">
                          Orders Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/payments`} className="w-full">
                          Payments Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/customers`} className="w-full">
                          Customer Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/analytics`} className="w-full">
                          Analytics Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/messages`} className="w-full">
                          Messaging System
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/kyc`} className="w-full">
                          KYC Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/seller/settings`} className="w-full">
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "buyer" && (
                    <>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/dashboard`} className="w-full">
                          Buyer Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/profile`} className="w-full">
                          Profile Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/orders`} className="w-full">
                          Orders History
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/wishlist" className="w-full">
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/addresses`} className="w-full">
                          Address Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/subscriptions`} className="w-full">
                          Subscriptions
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/payment-methods`} className="w-full">
                          Payment Methods
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/wallet`} className="w-full">
                          Wallet
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/notifications`} className="w-full">
                          Notifications
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/support`} className="w-full">
                          Support
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={`/${user.username}/settings`} className="w-full">
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
              <Link href="/wishlist" className="flex items-center space-x-2 text-white">
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link href="/cart" className="flex items-center space-x-2 text-white">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>

              {user ? (
                <>
                  {user.role === "admin" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Admin Menu</span>
                      <Link href={`/${user.username}/admin`} className="text-white">
                        Admin Dashboard
                      </Link>
                      <Link href={`/${user.username}/admin/users`} className="text-white">
                        User Management
                      </Link>
                      <Link href={`/${user.username}/admin/products`} className="text-white">
                        Products Management
                      </Link>
                      <Link href={`/${user.username}/admin/orders`} className="text-white">
                        Orders Management
                      </Link>
                      <Link href={`/${user.username}/admin/payments`} className="text-white">
                        Payments Tracking
                      </Link>
                      <Link href={`/${user.username}/admin/settings`} className="text-white">
                        Settings
                      </Link>
                    </div>
                  )}

                  {user.role === "seller" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Seller Menu</span>
                      <Link href={`/${user.username}/seller/dashboard`} className="text-white">
                        Seller Dashboard
                      </Link>
                      <Link href={`/${user.username}/seller/store`} className="text-white">
                        Store Management
                      </Link>
                      <Link href={`/${user.username}/seller/products`} className="text-white">
                        Product Management
                      </Link>
                      <Link href={`/${user.username}/seller/orders`} className="text-white">
                        Orders Tracking
                      </Link>
                      <Link href={`/${user.username}/seller/settings`} className="text-white">
                        Settings
                      </Link>
                    </div>
                  )}

                  {user.role === "buyer" && (
                    <div className="flex flex-col space-y-2 border-t border-white/20 pt-2">
                      <span className="text-white font-semibold">Buyer Menu</span>
                      <Link href={`/${user.username}/dashboard`} className="text-white">
                        Buyer Dashboard
                      </Link>
                      <Link href={`/${user.username}/profile`} className="text-white">
                        Profile Management
                      </Link>
                      <Link href={`/${user.username}/orders`} className="text-white">
                        Orders History
                      </Link>
                      <Link href="/wishlist" className="text-white">
                        Wishlist
                      </Link>
                      <Link href={`/${user.username}/settings`} className="text-white">
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
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="default"
                      className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              <Link href="/seller/register">
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
                    <DropdownMenuItem>Apples</DropdownMenuItem>
                    <DropdownMenuItem>Tomatoes</DropdownMenuItem>
                    <DropdownMenuItem>Spinach</DropdownMenuItem>
                    <DropdownMenuItem>Carrots</DropdownMenuItem>
                    <DropdownMenuItem>Bananas</DropdownMenuItem>
                    <DropdownMenuItem>Broccoli</DropdownMenuItem>
                    <DropdownMenuItem>Oranges</DropdownMenuItem>
                    <DropdownMenuItem>Potatoes</DropdownMenuItem>
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
                    <DropdownMenuItem>Rice</DropdownMenuItem>
                    <DropdownMenuItem>Wheat</DropdownMenuItem>
                    <DropdownMenuItem>Lentils</DropdownMenuItem>
                    <DropdownMenuItem>Oats</DropdownMenuItem>
                    <DropdownMenuItem>Quinoa</DropdownMenuItem>
                    <DropdownMenuItem>Chickpeas</DropdownMenuItem>
                    <DropdownMenuItem>Barley</DropdownMenuItem>
                    <DropdownMenuItem>Millet</DropdownMenuItem>
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
                    <DropdownMenuItem>Milk</DropdownMenuItem>
                    <DropdownMenuItem>Cheese</DropdownMenuItem>
                    <DropdownMenuItem>Yogurt</DropdownMenuItem>
                    <DropdownMenuItem>Butter</DropdownMenuItem>
                    <DropdownMenuItem>Ghee</DropdownMenuItem>
                    <DropdownMenuItem>Paneer</DropdownMenuItem>
                    <DropdownMenuItem>Cream</DropdownMenuItem>
                    <DropdownMenuItem>Curd</DropdownMenuItem>
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
                    <DropdownMenuItem>Coffee</DropdownMenuItem>
                    <DropdownMenuItem>Tea</DropdownMenuItem>
                    <DropdownMenuItem>Juice</DropdownMenuItem>
                    <DropdownMenuItem>Plant-based Milk</DropdownMenuItem>
                    <DropdownMenuItem>Smoothies</DropdownMenuItem>
                    <DropdownMenuItem>Herbal Drinks</DropdownMenuItem>
                    <DropdownMenuItem>Kombucha</DropdownMenuItem>
                    <DropdownMenuItem>Coconut Water</DropdownMenuItem>
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
                    <DropdownMenuItem>Skincare</DropdownMenuItem>
                    <DropdownMenuItem>Haircare</DropdownMenuItem>
                    <DropdownMenuItem>Oral Care</DropdownMenuItem>
                    <DropdownMenuItem>Body Care</DropdownMenuItem>
                    <DropdownMenuItem>Face Wash</DropdownMenuItem>
                    <DropdownMenuItem>Shampoo</DropdownMenuItem>
                    <DropdownMenuItem>Oils</DropdownMenuItem>
                    <DropdownMenuItem>Soaps</DropdownMenuItem>
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
