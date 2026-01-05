"use client"

import { motion } from "framer-motion"
import { projects } from "@/lib/data/projects"

export function TechStackOverview() {
  // Aggregate all tools from projects
  const toolCounts: Record<string, number> = {}
  projects.forEach((project) => {
    project.tools.forEach((tool) => {
      toolCounts[tool] = (toolCounts[tool] || 0) + 1
    })
  })

  const sortedTools = Object.entries(toolCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const maxCount = Math.max(...sortedTools.map(([_, count]) => count))

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Tech Stack Usage</h3>
        <p className="text-sm text-muted-foreground">Tools I use across projects</p>
      </div>

      <div className="space-y-3">
        {sortedTools.map(([tool, count], index) => (
          <motion.div
            key={tool}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="space-y-1"
          >
            <div className="flex justify-between text-sm">
              <span className="text-foreground">{tool}</span>
              <span className="text-muted-foreground">
                {count} project{count > 1 ? "s" : ""}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(count / maxCount) * 100}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sketch annotation */}
      <div className="pt-4 border-t border-border">
        <span className="font-sketch text-accent text-sm" style={{ transform: "rotate(-2deg)", display: "block" }}>
          Finance tools + Modern tech = Powerful solutions
        </span>
      </div>
    </div>
  )
}
