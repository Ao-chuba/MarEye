"use client"

import { usePathname } from "next/navigation"
import { Navigation } from "./navigation"
import { PublicNavigation } from "./public-navigation"
import { useAuth } from "@/hooks/use-auth"

export function ConditionalNavigation() {
  const pathname = usePathname()
  const { isAuthenticated, loading } = useAuth()
  
  // Don't show navigation on auth pages
  if (pathname.startsWith("/auth/")) {
    return null
  }
  
  // Don't show navigation on try page
  if (pathname === "/try") {
    return null
  }
  
  // Don't show navigation on voice-agent page
  if (pathname === "/voice-agent") {
    return null
  }
  
  // Don't show navigation on cnn-model page
  if (pathname === "/cnn-model") {
    return null
  }
  
  // Don't show navigation on detection page
  if (pathname === "/detection") {
    return null
  }
  
  // Don't show navigation on contact page
  if (pathname === "/contact") {
    return null
  }
  
  // Don't show navigation on api-docs page
  if (pathname === "/api-docs") {
    return null
  }
  
  // Show loading state while checking authentication
  if (loading) {
    return <PublicNavigation />
  }
  
  // Show authenticated navigation if user is logged in
  if (isAuthenticated) {
    return <Navigation />
  }
  
  // Show public navigation for non-authenticated users
  return <PublicNavigation />
}
