"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ExternalLink, Clock, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { projects } from "@/lib/data/projects"

interface ProjectCardProps {
  project: (typeof projects)[0]
  index?: number
  featured?: boolean
}

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group bg-card rounded-lg border border-border overflow-hidden card-tilt h-full flex flex-col",
        featured && "md:col-span-2 md:row-span-2",
      )}
    >
      {/* Header with gradient */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent p-4">
        {/* Category badge */}
        <span className="inline-block px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm text-foreground rounded-full">
          {project.category}
        </span>

        {/* Floating annotation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 right-4 font-sketch text-accent text-sm"
          style={{ transform: "rotate(3deg)" }}
        >
          {project.category === "Valuation" && "→ build models"}
          {project.category === "Analytics" && "→ visualize data"}
          {project.category === "Quantitative" && "→ predict trends"}
          {project.category === "Risk Analysis" && "→ simulate scenarios"}
          {project.category === "ML/AI" && "→ smart detection"}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{project.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Key Features</p>
            <ul className="grid grid-cols-2 gap-1">
              {project.features.slice(0, 4).map((feature) => (
                <li key={feature} className="text-xs text-muted-foreground flex items-start gap-1">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span key={tool} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {project.metrics.complexity}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {project.metrics.timeToComplete}
            </span>
          </div>

          {project.link ? (
            <Link
              href={project.link}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              Try it
              <ArrowRight className="h-3 w-3" />
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" />
              Coming soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
