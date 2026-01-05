"use client"

import { motion } from "framer-motion"
import { Brain, Calculator, BarChart3, Database, Megaphone, Laptop } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, typeof Brain> = {
  brain: Brain,
  calculator: Calculator,
  chart: BarChart3,
  database: Database,
  megaphone: Megaphone,
  laptop: Laptop,
}

interface BadgeCardProps {
  name: string
  issuer: string
  icon: string
  category: string
  description: string
  index?: number
}

export function BadgeCard({ name, issuer, icon, category, description, index = 0 }: BadgeCardProps) {
  const Icon = iconMap[icon] || Brain

  const categoryColors: Record<string, string> = {
    "AI/ML": "bg-chart-4/10 text-chart-4 border-chart-4/20",
    Analytics: "bg-primary/10 text-primary border-primary/20",
    "Data Science": "bg-chart-2/10 text-chart-2 border-chart-2/20",
    Marketing: "bg-chart-5/10 text-chart-5 border-chart-5/20",
    Technology: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? 1 : -1 }}
      className="bg-card rounded-lg border border-border p-5 card-tilt h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="p-3 rounded-lg bg-primary/10 shrink-0">
          <Icon className="h-6 w-6 text-primary" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <span
            className={cn(
              "inline-block px-2 py-0.5 text-xs font-medium rounded-full border mb-2",
              categoryColors[category] || "bg-muted text-muted-foreground border-border",
            )}
          >
            {category}
          </span>
          <h3 className="font-semibold text-foreground text-sm leading-tight">{name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{issuer}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mt-4 flex-1">{description}</p>

      {/* Verified badge */}
      <div className="mt-4 pt-4 border-t border-dashed border-border flex items-center justify-between">
        <span className="font-sketch text-accent text-sm" style={{ transform: "rotate(-2deg)" }}>
          Verified
        </span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-chart-2 animate-pulse" />
          <span className="text-xs text-muted-foreground">Active</span>
        </div>
      </div>
    </motion.div>
  )
}
