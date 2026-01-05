"use client"

import { motion } from "framer-motion"
import { Building, Calendar, MapPin } from "lucide-react"
import type { experiences } from "@/lib/data/experience"

interface ExperienceCardProps {
  experience: (typeof experiences)[0]
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-lg border border-border p-6 space-y-6"
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">{experience.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{experience.company}</span>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {experience.type}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {experience.period}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {experience.location}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Key Responsibilities</h4>
        <ul className="space-y-2">
          {experience.highlights.map((highlight, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="text-primary mt-1">•</span>
              {highlight}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
        {experience.skills.map((skill) => (
          <span key={skill} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
