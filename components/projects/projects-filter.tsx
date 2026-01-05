"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProjectsFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function ProjectsFilter({ categories, activeCategory, onCategoryChange }: ProjectsFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onCategoryChange("All")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-full transition-colors",
          activeCategory === "All"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80",
        )}
      >
        All Projects
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors",
            activeCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80",
          )}
        >
          {category}
        </motion.button>
      ))}
    </div>
  )
}
