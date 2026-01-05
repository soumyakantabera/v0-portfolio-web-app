"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { profile } from "@/lib/data/profile"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SB</span>
              </div>
              <span className="font-semibold text-foreground">Soumyakanta Bera</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Finance & Risk Management + Analytics + AI. Building the bridge between corporate finance and data
              science.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Me
              </Link>
              <Link
                href="/experience"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Deal Room
              </Link>
              <Link href="/risk-lab" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Risk Lab
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="flex flex-col gap-3">
              <motion.a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </motion.a>
              <motion.a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
              >
                <Phone className="h-4 w-4" />
                {profile.phone}
              </motion.a>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </motion.a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} Soumyakanta Bera. All rights reserved.</p>
          <p className="text-xs text-muted-foreground font-sketch text-lg">Built with passion for finance & code</p>
        </div>
      </div>
    </footer>
  )
}
