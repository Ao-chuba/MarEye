"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BubbleButton } from "@/components/bubble-button"
import { Menu, X, User, LogOut, Settings, ChevronDown, Zap, Crown, Building2, MoreHorizontal, Phone, BarChart3, TrendingUp, Leaf } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [avatar, setAvatar] = useState<string>("")
  const [userData, setUserData] = useState<any>(null)
  const [tokenStatus, setTokenStatus] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/cnn-model", label: "CNN Model", icon: "🧠" },
    { href: "/detection", label: "Detection", icon: "🎯" }
  ]

  useEffect(() => {
    try {
      const stored = localStorage.getItem("profile")
      if (stored) {
        const data = JSON.parse(stored)
        setUserData(data)
        if (data?.avatar) {
          setAvatar(data.avatar)
        }
      }
    } catch {}
  }, [])

  // Fetch token status and subscription info
  useEffect(() => {
    const fetchTokenStatus = async () => {
      try {
        const response = await fetch('/api/tokens/status', {
          credentials: 'include'
        })
        const data = await response.json()
        if (data.success) {
          setTokenStatus(data.tokenStatus)
          setSubscription(data.subscription)
        }
      } catch (error) {
        console.error('Error fetching token status:', error)
      }
    }

    if (userData) {
      fetchTokenStatus()
    }
  }, [userData])

  const mainNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/solutions/ai-processing", label: "AI Processing", icon: "🤖" },
    { href: "/species-recognition", label: "Species Recognition", icon: "🔍" },
    { href: "/forum", label: "Forum", icon: "💬" },
  ]

  const moreNavItems = [
    { href: "/solutions/population-trends", label: "Abundance", icon: TrendingUp },
    { href: "/subscription", label: "Subscription", icon: Crown },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
      localStorage.removeItem("profile")
      localStorage.removeItem("user")
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center backdrop-blur-md border border-cyan-400/40 shadow-lg group-hover:shadow-cyan-400/25 transition-all duration-300 group-hover:scale-105">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center ml-6">
                <div className="flex items-center rounded-md">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`relative flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? "text-white bg-white/10"
                            : "text-cyan-100 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="whitespace-nowrap">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Profile and Contact */}
              <div className="flex items-center space-x-2 ml-auto pl-2">
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-1 p-1.5 rounded-md hover:bg-white/10 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-md overflow-hidden border border-white/10">
                        {avatar ? (
                          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <User className="w-4 h-4 text-cyan-300" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-slate-900"></div>
                    </div>
                    <div className="hidden xl:block text-left">
                      <div className="text-xs font-medium text-white">
                        {userData?.firstName || "User"}
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-cyan-300 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="text-sm font-medium text-white">{userData?.firstName} {userData?.lastName}</div>
                        <div className="text-xs text-cyan-300/70">{userData?.email}</div>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-cyan-100 hover:text-white hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <div className="border-t border-white/10 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors duration-200 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Contact Button */}
                <BubbleButton
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 hover:from-emerald-400/30 hover:to-cyan-400/30 hover:shadow-lg hover:shadow-emerald-400/25 transition-all duration-300 px-2 py-1.5 text-[10px]"
                >
                  Contact Us
                </BubbleButton>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
              <BubbleButton 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-white hover:bg-white/10 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </BubbleButton>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-4 pt-4 pb-6 space-y-2 bg-slate-900/95 backdrop-blur-2xl border-t border-cyan-400/20 rounded-b-3xl shadow-2xl">
                {/* Main Navigation Items */}
                {mainNavItems.map((item) => {
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

                {/* More Options */}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-xs text-cyan-300/70 px-4 py-2 font-medium">More Options</div>
                  {moreNavItems.map((item) => {
                    const isActive = pathname === item.href
                    const IconComponent = item.icon
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
                        <IconComponent className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                  <button
                    onClick={() => {
                      scrollToContact()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-cyan-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 w-full text-left"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Contact Us</span>
                  </button>
                </div>
                
                {/* Mobile Token Status */}
                {tokenStatus && (
                  <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-cyan-300" />
                        <span className="text-sm text-cyan-200">
                          {tokenStatus.dailyLimit === -1 ? 'Unlimited' : tokenStatus.remaining} tokens left
                        </span>
                      </div>
                      {tokenStatus.remaining <= 2 && tokenStatus.dailyLimit !== -1 && (
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile Profile Section */}
                {userData && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="px-4 py-3 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-cyan-400/40">
                          {avatar ? (
                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
                              <User className="w-5 h-5 text-cyan-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{userData.firstName} {userData.lastName}</div>
                          <div className="text-xs text-cyan-300/70">{userData.email}</div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-cyan-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile Settings</span>
                    </Link>
                    <Link
                      href="/subscription"
                      className="flex items-center space-x-3 px-4 py-3 text-cyan-100 hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Crown className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-xl transition-colors duration-200 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
                
                <div className="pt-4">
                  <BubbleButton
                    onClick={() => {
                      scrollToContact()
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 hover:from-emerald-400/30 hover:to-cyan-400/30"
                  >
                    Contact Us
                  </BubbleButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isMoreOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsProfileOpen(false)
            setIsMoreOpen(false)
          }}
        />
      )}
    </>
  )
}

