import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { BubbleCursor } from "@/components/bubble-cursor"
import { ConditionalNavigation } from "@/components/conditional-navigation"

import { DeepSeaBackground } from "@/components/deep-sea-background"
import { Chatbot } from "@/components/chatbot"

import "./globals.css"

export const metadata: Metadata = {
  title: "MarEye",
  description:
    "Advanced AI-powered marine security platform for submarine detection, mine identification, diver tracking, drone surveillance, torpedo analysis, and underwater threat assessment using cutting-edge computer vision and machine learning.",
  keywords:
    "marine security, submarine detection, mine detection, diver tracking, underwater drones, torpedo analysis, AI, computer vision, underwater surveillance, naval defense",
  authors: [{ name: "MarEye Security Team" }],
  openGraph: {
    title: "MarEye - AI-Driven Marine Security Defense Platform",
    description: "Revolutionary AI platform for underwater security and threat detection",
    type: "website",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <DeepSeaBackground />
        <BubbleCursor />
        <ConditionalNavigation />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>

        <Chatbot />

        <Analytics />
      </body>
    </html>
  )
}