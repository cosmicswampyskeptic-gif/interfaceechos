"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const INSPIRATIONS = [
  { title: "Cosmic Horror", source: "Lovecraft", type: "Literature" },
  { title: "Vaporwave", source: "Internet Culture", type: "Aesthetics" },
  { title: "Existentialism", source: "Camus", type: "Philosophy" },
  { title: "The Void", source: "Unknown", type: "Reality" },
]

export default function InspoPage() {
  return (
    <div className="max-w-4xl mx-auto pt-24 pb-12 px-6">
      <h1 className="text-3xl font-bold text-foreground mb-12 font-sans tracking-tight">
        Inspiration & References
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INSPIRATIONS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-border bg-card hover:border-accent/50 transition-colors group cursor-default">
              <CardHeader className="pb-2">
                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                  {item.type}
                </div>
                <h3 className="text-xl text-foreground font-serif group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-muted-foreground text-sm">{item.source}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
