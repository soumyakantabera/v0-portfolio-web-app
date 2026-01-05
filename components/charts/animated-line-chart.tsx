"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts"

const generateData = () => {
  const data = []
  let value = 50
  for (let i = 0; i < 12; i++) {
    value = value + Math.random() * 20 - 8
    value = Math.max(20, Math.min(100, value))
    data.push({
      month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      value: Math.round(value),
    })
  }
  return data
}

export function AnimatedLineChart() {
  const [data] = useState(generateData)
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
    <div ref={ref} className="relative w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
          <ReferenceLine y={60} stroke="var(--border)" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={false}
            isAnimationActive={isVisible}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Sketch annotations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="absolute top-8 right-8 font-sketch text-lg text-accent"
        style={{ transform: "rotate(-5deg)" }}
      >
        margin ↑
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="absolute bottom-16 left-16 font-sketch text-lg text-accent"
        style={{ transform: "rotate(3deg)" }}
      >
        risk ↓
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2.1, duration: 0.4 }}
        className="absolute top-1/2 right-1/4 font-sketch text-sm text-muted-foreground"
        style={{ transform: "rotate(-2deg)" }}
      >
        DCF
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2.4, duration: 0.4 }}
        className="absolute bottom-8 right-16 font-sketch text-sm text-muted-foreground"
        style={{ transform: "rotate(4deg)" }}
      >
        VaR
      </motion.div>
    </div>
  )
}
