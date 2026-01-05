"use client"

import { motion } from "framer-motion"
import { learningArc } from "@/lib/data/certifications"

export function LearningArc() {
  const phaseColors = [
    "bg-[#1E3A8A]", // Deep blue - Fundamentals
    "bg-[#1E4D8A]", // Blue - Core Finance
    "bg-[#1E5F8A]", // Teal blue - Data Analytics
    "bg-[#1E7A6A]", // Teal - ML & AI
    "bg-[#22C55E]", // Green - Application
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Learning Arc</h2>
        <p className="text-muted-foreground">My progression from fundamentals to applications</p>
      </div>

      <div className="relative pt-4">
        <div className="absolute top-8 left-0 right-0 h-1.5 bg-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(to right, #1E3A8A 0%, #1E5F8A 40%, #1E7A6A 70%, #22C55E 100%)",
            }}
          />
        </div>

        <div className="relative grid grid-cols-5 gap-2">
          {learningArc.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 300 }}
                className={`relative z-10 w-3.5 h-3.5 rounded-full ${phaseColors[index]} border-4 border-background shadow-sm`}
              />

              <div className="mt-4 space-y-2">
                <p
                  className="text-xs font-semibold text-foreground border-b-2 pb-1"
                  style={{
                    borderColor:
                      index === 0
                        ? "#1E3A8A"
                        : index === 1
                          ? "#1E4D8A"
                          : index === 2
                            ? "#1E5F8A"
                            : index === 3
                              ? "#1E7A6A"
                              : "#22C55E",
                  }}
                >
                  {phase.phase}
                </p>
                <div className="flex flex-col items-center gap-1">
                  {phase.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] px-2 py-0.5 bg-muted hover:bg-muted/80 rounded text-muted-foreground transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
