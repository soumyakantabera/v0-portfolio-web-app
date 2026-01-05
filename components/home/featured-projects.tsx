"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data/projects"

export function FeaturedProjects() {
  const featured = projects.slice(0, 3)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Work</h2>
            <p className="text-muted-foreground mt-2">Selected projects in finance and analytics</p>
          </div>
          <Button asChild variant="outline" className="group bg-transparent">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group bg-card rounded-lg border border-border overflow-hidden card-tilt"
            >
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {project.category}
                  </span>
                  {project.link && (
                    <Link href={project.link} className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Sketch annotation */}
                <div className="pt-2 border-t border-border">
                  <span className="font-sketch text-accent text-sm" style={{ transform: "rotate(-1deg)" }}>
                    {project.metrics.complexity} • {project.metrics.timeToComplete}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
