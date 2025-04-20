"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react"
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
      className={`sticky ${isScrollingUp ? "top-0" : "-top-24"} z-50 bg-white shadow-md transition-all duration-300 ease-in-out`}
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
                className="w-full pl-10 pr-4 py-2 border-green-300 focus:border-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist" className="text-gray-700 hover:text-green-600">
              <Heart size={24} />
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-green-600 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/${user.role}/dashboard`} className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <Link href="/seller/register">
              <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                Sell on MommyFarm
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex mb-4">
              <Input type="search" placeholder="Search for organic products..." className="w-full pl-10 pr-4 py-2" />
              <Search className="absolute left-7 top-[5.5rem] transform -translate-y-1/2 text-gray-400" size={18} />
            </div>

            <nav className="flex flex-col space-y-4">
              <Link href="/wishlist" className="flex items-center space-x-2 text-gray-700">
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link href="/cart" className="flex items-center space-x-2 text-gray-700">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>

              {user ? (
                <>
                  <Link href={`/${user.role}/dashboard`} className="flex items-center space-x-2 text-gray-700">
                    <User size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <Button variant="ghost" onClick={logout} className="justify-start px-0">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="default" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              <Link href="/seller/register">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  Sell on MommyFarm
                </Button>
              </Link>
            </nav>
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="hidden md:flex mt-4 border-t pt-4">
          <ul className="flex space-x-8">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-700 hover:text-green-600">Trending</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Bestsellers</DropdownMenuItem>
                  <DropdownMenuItem>New Releases</DropdownMenuItem>
                  <DropdownMenuItem>Digital Content</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-700 hover:text-green-600">
                  Shop by Category
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Vegetables</DropdownMenuItem>
                  <DropdownMenuItem>Fruits</DropdownMenuItem>
                  <DropdownMenuItem>Oils</DropdownMenuItem>
                  <DropdownMenuItem>Dry Fruits</DropdownMenuItem>
                  <DropdownMenuItem>Juices</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-700 hover:text-green-600">
                  Programs & Features
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Gift Cards</DropdownMenuItem>
                  <DropdownMenuItem>MommyFarm Business</DropdownMenuItem>
                  <DropdownMenuItem>Subscription Boxes</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-gray-700 hover:text-green-600">
                  Help & Settings
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Your Account</DropdownMenuItem>
                  <DropdownMenuItem>Customer Service</DropdownMenuItem>
                  <DropdownMenuItem>Contact Us</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
