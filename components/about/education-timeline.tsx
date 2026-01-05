"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { profile } from "@/lib/data/profile"

export function EducationTimeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Education</h2>

      <div className="space-y-4">
        {profile.education.map((edu, index) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative pl-8 pb-6 border-l-2 border-border last:pb-0"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary border-2 border-background" />

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  {edu.gpa && <p className="text-xs text-accent font-medium">GPA: {edu.gpa}</p>}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Calendar className="h-3 w-3" />
                  {edu.period}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
