"use client"

import { motion } from "framer-motion"
import { profile } from "@/lib/data/profile"

export function PersonalStory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h1>
        <p className="text-lg text-muted-foreground">{profile.headline}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          I&apos;m a finance professional with a passion for blending traditional corporate finance with modern data
          analytics and AI. My journey started with a{" "}
          <span className="text-foreground font-medium">B.B.A. in Business Administration</span> where I built a solid
          foundation in business principles and financial fundamentals.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Currently pursuing my <span className="text-foreground font-medium">M.Sc. in Finance & Risk Management</span>{" "}
          at the University of Florence, I&apos;ve had the opportunity to apply my skills in a real-world setting during
          my M&A internship at Valdonica SRL. There, I worked on target screening, market mapping, due diligence, and
          creating management reports that drove decision-making.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          What sets me apart is my ability to bridge the gap between{" "}
          <span className="text-foreground font-medium">finance and technology</span>. I&apos;m proficient in Excel,
          Power BI, and Python, and I&apos;ve completed certifications in Machine Learning and Data Science. This unique
          combination allows me to build financial models, create insightful dashboards, and even apply predictive
          analytics to business problems.
        </p>
      </div>

      {/* Sketch annotation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="inline-block px-4 py-2 bg-accent/10 rounded-lg border border-accent/20"
      >
        <span className="font-sketch text-accent text-lg" style={{ transform: "rotate(-2deg)", display: "block" }}>
          Finance + Data = My Superpower
        </span>
      </motion.div>
    </motion.div>
  )
}
