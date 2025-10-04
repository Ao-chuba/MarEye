"use client"

import Link from "next/link"
import { GlassmorphismCard } from "@/components/glassmorphism-card"
import { BubbleButton } from "@/components/bubble-button"
import { Brain, Target, Mic } from "lucide-react"

export function SolutionSection() {
  const solutions = [
    {
      icon: Brain,
      title: "CNN",
      description: "Advanced Convolutional Neural Network for underwater image enhancement and analysis",
      features: ["Image enhancement", "Video processing", "Quality improvement"],
      href: "/cnn-model",
    },
    {
      icon: Target,
      title: "Detection",
      description: "AI-powered object detection system for submarines, mines, and divers",
      features: ["YOLO detection", "Real-time analysis", "Multi-class recognition"],
      href: "/detection",
    },
  ]

  return (
    <section id="solution" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">AI-Powered Solutions</h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto text-balance">
            Advanced AI-powered platform combining CNN image processing and object detection
            for comprehensive marine security operations and analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <GlassmorphismCard key={index} className="p-6 group hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-md border border-cyan-400/30">
                <solution.icon className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
              <p className="text-cyan-100 mb-4 text-sm">{solution.description}</p>
              <ul className="space-y-2 mb-6">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-cyan-200">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={solution.href}>
                <BubbleButton className="w-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 hover:from-emerald-400/30 hover:to-cyan-400/30 text-sm">
                  Explore Solution →
                </BubbleButton>
              </Link>
            </GlassmorphismCard>
          ))}
        </div>

      </div>
    </section>
  )
}
