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
              <Heart size={24} />
            </Link>
            <Link href="/cart" className="text-white hover:text-gray-200 relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-white text-[#86C33B] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full text-white hover:bg-[#86C33B]/20">
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-[#86C33B]"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" className="bg-white text-[#86C33B] hover:bg-gray-100">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <Link href="/seller/register">
              <Button
                variant="outline"
                size="sm"
                className="water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90 hover:text-white"
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
                  <Link href={`/${user.role}/dashboard`} className="flex items-center space-x-2 text-white">
                    <User size={20} />
                    <span>Dashboard</span>
                  </Link>
                  <Button variant="ghost" onClick={logout} className="justify-start px-0 text-white">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-[#86C33B]"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="default" className="w-full bg-white text-[#86C33B] hover:bg-gray-100">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              <Link href="/seller/register">
                <Button
                  variant="outline"
                  className="w-full water-drop-btn bg-[#CC6203] text-white border-[#CC6203] hover:bg-[#CC6203]/90 hover:text-white"
                >
                  Sell on MommyFarm
                </Button>
              </Link>
            </nav>
          </div>
        )}

        {/* Navigation Bar */}
        <nav className="hidden md:flex mt-4 border-t border-white/20 pt-4">
          <ul className="flex space-x-8">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">Trending</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Bestsellers</DropdownMenuItem>
                  <DropdownMenuItem>New Releases</DropdownMenuItem>
                  <DropdownMenuItem>Digital Content</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-white hover:text-gray-200">Shop by Category</DropdownMenuTrigger>
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
                <DropdownMenuTrigger className="text-white hover:text-gray-200">
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
                <DropdownMenuTrigger className="text-white hover:text-gray-200">Help & Settings</DropdownMenuTrigger>
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
