"use client"

import { motion } from "framer-motion"
import { TrendingUp, FileSpreadsheet, Target, Code } from "lucide-react"

const stats = [
  {
    icon: FileSpreadsheet,
    value: "M&A",
    label: "Experience",
    description: "Target screening & due diligence",
  },
  {
    icon: TrendingUp,
    value: "DCF",
    label: "Valuation",
    description: "Financial modeling & analysis",
  },
  {
    icon: Target,
    value: "FP&A",
    label: "Expertise",
    description: "Budgeting & forecasting",
  },
  {
    icon: Code,
    value: "ML/AI",
    label: "Skills",
    description: "Python, Power BI, Excel",
  },
]

export function StatsGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Core Competencies</h2>
          <p className="text-muted-foreground mt-2">Bridging corporate finance and data science</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-lg border border-border p-6 card-tilt"
            >
              <stat.icon className="h-8 w-8 text-primary mb-4" />
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>

              {/* Sketch annotation */}
              <div className="mt-4">
                <span className="font-sketch text-accent text-sm inline-block" style={{ transform: "rotate(-2deg)" }}>
                  {index === 0 && "→ real deals"}
                  {index === 1 && "→ from scratch"}
                  {index === 2 && "→ dashboards"}
                  {index === 3 && "→ automation"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
