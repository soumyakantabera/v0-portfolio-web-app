"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { radarSkills } from "@/lib/data/skills"

export function SkillsRadar() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full h-72">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarSkills} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.3}
              isAnimationActive={isVisible}
              animationDuration={1500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Sketch annotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute top-4 right-4 font-sketch text-accent text-sm"
        style={{ transform: "rotate(-3deg)" }}
      >
        skill coverage
      </motion.div>
    </div>
  )
}
