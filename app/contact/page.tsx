import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Soumyakanta Bera",
  description:
    "Get in touch for internship or junior analyst opportunities in Finance, FP&A, or Corporate Finance in Milan/Italy/Europe.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Let&apos;s Connect</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Interested in collaboration, have a question, or want to discuss opportunities? I&apos;d love to hear from
            you.
          </p>

          {/* Sketch annotation */}
          <div
            className="inline-block px-4 py-2 bg-accent/10 rounded-lg border border-accent/20"
            style={{ transform: "rotate(-1deg)" }}
          >
            <span className="font-sketch text-accent text-lg">Your next finance hire is just a message away</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  )
}
