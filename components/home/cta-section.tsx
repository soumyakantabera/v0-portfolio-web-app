"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/data/profile"

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Collaborate?</h2>
          <p className="text-lg opacity-90">{profile.objective}</p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" variant="secondary" className="group">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/risk-lab">Try the Risk Lab</Link>
            </Button>
          </div>

          {/* Sketch stamp */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block mt-8 px-6 py-3 border-2 border-dashed border-primary-foreground/50 rounded-lg"
          >
            <span className="font-sketch text-xl">Open to Opportunities!</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
