"use client"

import { motion } from "framer-motion"
import { SkillsRadar } from "@/components/charts/skills-radar"
import { skillCategories } from "@/lib/data/skills"

export function SkillsSnapshot() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Skills Snapshot</h2>
        <p className="text-muted-foreground">A comprehensive view of my technical capabilities</p>
      </div>

      {/* Radar Chart */}
      <div className="bg-card rounded-lg border border-border p-4">
        <SkillsRadar />
      </div>

      {/* Skill Categories */}
      <div className="grid md:grid-cols-2 gap-4">
        {skillCategories.slice(0, 4).map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
            className="bg-card rounded-lg border border-border p-4"
          >
            <h3 className="font-semibold text-foreground mb-3">{category.category}</h3>
            <div className="space-y-2">
              {category.skills.slice(0, 4).map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-foreground font-medium">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
