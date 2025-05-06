"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
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
  const router = useRouter()
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

  const handleNavigation = (url: string) => {
    router.push(url)
    closeMobileMenu()
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
            <Button
              variant="ghost"
              size="icon"
              className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full"
              onClick={() => handleNavigation("/wishlist")}
            >
              <Heart size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="water-drop-btn bg-[#CC6203] text-white hover:bg-[#CC6203]/90 h-9 w-9 rounded-full relative"
              onClick={() => handleNavigation("/cart")}
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-[#86C33B] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>

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
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin`} onClick={closeMobileMenu}>
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/users`} onClick={closeMobileMenu}>
                          User Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/products`} onClick={closeMobileMenu}>
                          Products Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/orders`} onClick={closeMobileMenu}>
                          Orders Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/payments`} onClick={closeMobileMenu}>
                          Payments Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/banners`} onClick={closeMobileMenu}>
                          Banners/Hero Slides
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/categories`} onClick={closeMobileMenu}>
                          Categories Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/ebooks`} onClick={closeMobileMenu}>
                          E-books Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/brands`} onClick={closeMobileMenu}>
                          Brands Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/sellers`} onClick={closeMobileMenu}>
                          Seller Approvals
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/messages`} onClick={closeMobileMenu}>
                          Messaging System
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/admin/settings`} onClick={closeMobileMenu}>
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "seller" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/dashboard`} onClick={closeMobileMenu}>
                          Seller Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/store`} onClick={closeMobileMenu}>
                          Store Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/products`} onClick={closeMobileMenu}>
                          Product Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/orders`} onClick={closeMobileMenu}>
                          Orders Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/payments`} onClick={closeMobileMenu}>
                          Payments Tracking
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/customers`} onClick={closeMobileMenu}>
                          Customer Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/analytics`} onClick={closeMobileMenu}>
                          Analytics Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/messages`} onClick={closeMobileMenu}>
                          Messaging System
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/kyc`} onClick={closeMobileMenu}>
                          KYC Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/seller/settings`} onClick={closeMobileMenu}>
                          Settings
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {user.role === "buyer" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/dashboard`} onClick={closeMobileMenu}>
                          Buyer Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/profile`} onClick={closeMobileMenu}>
                          Profile Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/orders`} onClick={closeMobileMenu}>
                          Orders History
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist" onClick={closeMobileMenu}>
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/addresses`} onClick={closeMobileMenu}>
                          Address Management
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/subscriptions`} onClick={closeMobileMenu}>
                          Subscriptions
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/payment-methods`} onClick={closeMobileMenu}>
                          Payment Methods
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/wallet`} onClick={closeMobileMenu}>
                          Wallet
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/notifications`} onClick={closeMobileMenu}>
                          Notifications
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/support`} onClick={closeMobileMenu}>
                          Support
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/${user.username}/settings`} onClick={closeMobileMenu}>
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
              <button
                className="flex items-center space-x-2 text-white w-full text-left"
                onClick={() => handleNavigation("/wishlist")}
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </button>
              <button
                className="flex items-center space-x-2 text-white w-full text-left"
                onClick={() => handleNavigation("/cart")}
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
              </button>

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
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/apples">Apples</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/tomatoes">Tomatoes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/spinach">Spinach</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/carrots">Carrots</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/bananas">Bananas</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/broccoli">Broccoli</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/oranges">Oranges</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/fruits-vegetables/potatoes">Potatoes</Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/products/fruits-vegetables">View All</Link>
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
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/rice">Rice</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/wheat">Wheat</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/lentils">Lentils</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/oats">Oats</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/quinoa">Quinoa</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/chickpeas">Chickpeas</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/barley">Barley</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/grains-pulses/millet">Millet</Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/products/grains-pulses">View All</Link>
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
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/milk">Milk</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/cheese">Cheese</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/yogurt">Yogurt</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/butter">Butter</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/ghee">Ghee</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/paneer">Paneer</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/cream">Cream</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/dairy/curd">Curd</Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/products/dairy">View All</Link>
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
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/coffee">Coffee</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/tea">Tea</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/juice">Juice</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/plant-milk">Plant-based Milk</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/smoothies">Smoothies</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/herbal">Herbal Drinks</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/kombucha">Kombucha</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/beverages/coconut-water">Coconut Water</Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/products/beverages">View All</Link>
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
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/skincare">Skincare</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/haircare">Haircare</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/oral-care">Oral Care</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/body-care">Body Care</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/face-wash">Face Wash</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/shampoo">Shampoo</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/oils">Oils</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/products/personal-care/soaps">Soaps</Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/products/personal-care">View All</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">More Categories</DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/products/meat-poultry">Organic Meat & Poultry</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/snacks">Organic Snacks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/cleaning">Organic Cleaning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/baby">Organic Baby Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/home-living">Home & Living</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/products/eco-accessories">Eco Accessories</Link>
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
