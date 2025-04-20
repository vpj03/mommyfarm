"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  _id: string
  name: string
  email: string
  role: "admin" | "seller" | "buyer"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: "buyer" | "seller") => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("mommyfarm_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Update the login function to properly handle authentication
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Store user data in state and localStorage
      setUser(data.user)
      localStorage.setItem("mommyfarm_user", JSON.stringify(data.user))

      toast({
        title: "Login successful",
        description: "Welcome back to MommyFarm!",
      })

      return data.user
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login failed",
        description: (error as Error).message || "Please check your credentials and try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "buyer" | "seller") => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      setUser(data.user)
      localStorage.setItem("mommyfarm_user", JSON.stringify(data.user))

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      })

      return data.user
    } catch (error) {
      console.error("Registration failed:", error)
      toast({
        title: "Registration failed",
        description: (error as Error).message || "Please try again with different credentials.",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mommyfarm_user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
