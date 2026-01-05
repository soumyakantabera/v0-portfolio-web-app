"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectCard } from "@/components/ui/project-card"
import { ProjectsFilter } from "./projects-filter"
import { projects } from "@/lib/data/projects"

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = Array.from(new Set(projects.map((p) => p.category)))

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="space-y-8">
      {/* Filter */}
      <ProjectsFilter categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Grid */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found in this category.</p>
        </div>
      )}
    </div>
  )
}
