"use client"

import { motion } from "framer-motion"
import { MessageIconPopover } from "@/components/layout/MessageIconPopover"

export default function AuthorPage() {
  return (
    <div className="max-w-2xl mx-auto pt-24 pb-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-border mx-auto" />
          <MessageIconPopover />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-6 text-center font-sans">
          Meet the (Bastard) Author
        </h1>

        <div className="prose prose-invert prose-lg text-muted-foreground font-serif leading-loose mx-auto">
          <p>I am a collector of echoes.</p>
          <p>
            This interface is an attempt to catalog the sounds that persist when
            everything else fades. It is a digital anthology of stories, poems,
            and half-remembered dreams from the end of the world.
          </p>
          <p>Nothing here is true, but some of it is real.</p>
        </div>

        <div className="mt-12 pt-12 border-t border-border text-center">
          <h3 className="text-sm font-sans font-bold text-accent uppercase tracking-widest mb-4">
            Current Transmissions
          </h3>
          <ul className="text-muted-foreground text-sm space-y-2">
            <li>Location: [REDACTED]</li>
            <li>Status: Monitoring</li>
            <li>Next Update: When the stars align</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
