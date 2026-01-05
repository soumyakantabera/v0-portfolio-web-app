"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { profile } from "@/lib/data/profile"

export function LanguagesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Languages</h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {profile.languages.map((lang) => (
          <div key={lang.language} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
            <span className="text-foreground font-medium">{lang.language}</span>
            <span className="text-xs text-muted-foreground">• {lang.level}</span>
          </div>
        ))}
      </div>

      {/* Availability note */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">{profile.availability}</p>
      </div>
    </motion.div>
  )
}
