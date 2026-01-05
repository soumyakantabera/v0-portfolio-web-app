"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Download, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedLineChart } from "@/components/charts/animated-line-chart"
import { profile } from "@/lib/data/profile"
import { withBasePath } from "@/lib/basePath"

export function HeroSection() {
  const words = ["Finance & Risk", "Analytics", "AI"]

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Animated Headline */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-2 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
              >
                {words.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className={index === words.length - 1 ? "text-primary" : ""}
                  >
                    {word}
                    {index < words.length - 1 && <span className="text-muted-foreground mx-1">+</span>}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl"
              >
                {profile.subheadline}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="group">
                <Link href="/experience">
                  View Deal Room
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group bg-transparent">
                <Link href="/risk-lab">
                  Open Risk Lab
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href={withBasePath("/resume.pdf")} download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-4 pt-4"
            >
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">Email</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Animated Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-lg border border-border p-4 shadow-sm sketch-border">
              <AnimatedLineChart />
            </div>

            {/* Floating annotation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.4 }}
              className="absolute -left-4 top-1/4 bg-accent/10 px-3 py-1 rounded-full border border-accent/20"
            >
              <span className="font-sketch text-accent text-sm">growth trajectory</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
