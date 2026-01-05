"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"
import { dealPipeline } from "@/lib/data/experience"

export function DealPipeline() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Deal Pipeline</h2>
        <p className="text-muted-foreground">M&A workflow stages I&apos;ve contributed to</p>
      </div>

      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-border rounded-full" />

        {/* Active progress */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-6 left-0 h-1 bg-primary rounded-full"
        />

        {/* Pipeline stages */}
        <div className="relative flex justify-between">
          {dealPipeline.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-[120px]"
            >
              {/* Status icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 300 }}
                className="relative z-10 bg-background p-1"
              >
                {stage.status === "completed" ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </motion.div>

              {/* Label */}
              <div className="mt-3 space-y-1">
                <p className="text-xs font-medium text-foreground">{stage.stage}</p>
                <p className="text-[10px] text-muted-foreground hidden sm:block">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
