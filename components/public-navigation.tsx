"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BubbleButton } from "@/components/bubble-button"
import { Menu, X, LogIn, UserPlus } from "lucide-react"

export function PublicNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/cnn-model", label: "CNN Model", icon: "🧠" },
    { href: "/detection", label: "Detection", icon: "🎯" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 shadow-xl">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 relative w-full">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <img src="/logos/mareye-logo.png" alt="MarEye Logo" className="w-16 h-16 drop-shadow object-cover object-top" />
                </div>
                <div className="hidden sm:flex flex-col leading-tight">
                  <span className="text-xl font-extrabold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent tracking-wide">
                    MarEye
                  </span>
                  <span className="text-xs text-cyan-300/40 font-medium tracking-wider">
                    Marine Security Platform
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/10">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 group ${
                        isActive
                          ? "text-white bg-white/10"
                          : "text-cyan-100 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link href="/auth/login">
                <BubbleButton
                  variant="ghost"
                  className="text-cyan-100 hover:text-white hover:bg-white/10 transition-all duration-300 px-4 py-2 text-sm"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </BubbleButton>
              </Link>
              <Link href="/auth/register">
                <BubbleButton
                  className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 hover:from-cyan-400/30 hover:to-blue-400/30 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 px-4 py-2 text-sm text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </BubbleButton>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <BubbleButton 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-white hover:bg-white/10 transition-all duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </BubbleButton>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-4 pt-4 pb-6 space-y-2 bg-slate-900/95 backdrop-blur-2xl border-t border-cyan-400/20 rounded-b-3xl shadow-2xl">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30"
                          : "text-cyan-100 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <BubbleButton
                      variant="ghost"
                      className="w-full text-cyan-100 hover:text-white hover:bg-white/10 transition-all duration-300 justify-start"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </BubbleButton>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <BubbleButton
                      className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30 hover:from-cyan-400/30 hover:to-blue-400/30 justify-start"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </BubbleButton>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
