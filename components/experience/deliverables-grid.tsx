"use client"

import { motion } from "framer-motion"
import { FileText, BarChart3, Table, Presentation, Search } from "lucide-react"
import { experiences } from "@/lib/data/experience"

const iconMap: Record<string, typeof FileText> = {
  document: FileText,
  analysis: BarChart3,
  dashboard: BarChart3,
  tracker: Table,
  presentation: Presentation,
}

export function DeliverablesGrid() {
  const deliverables = experiences[0]?.deliverables || []

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">What I Shipped</h2>
        <p className="text-muted-foreground">Key deliverables from my M&A internship</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliverables.map((item, index) => {
          const Icon = iconMap[item.type] || Search

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, rotate: 0, scale: 1.02 }}
              className="bg-card rounded-lg border border-border p-4 cursor-pointer card-tilt"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10 shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground capitalize mt-1">{item.type}</p>
                </div>
              </div>

              {/* Sketch label */}
              <div className="mt-3 pt-3 border-t border-dashed border-border">
                <span className="font-sketch text-accent text-sm" style={{ transform: "rotate(-2deg)" }}>
                  {item.type === "document" && "→ research & analysis"}
                  {item.type === "analysis" && "→ competitive intel"}
                  {item.type === "dashboard" && "→ real-time metrics"}
                  {item.type === "tracker" && "→ DD management"}
                  {item.type === "presentation" && "→ board-ready"}
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
