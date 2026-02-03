"use client"

import { useState } from "react"
import Link from "next/link"
import { Info, BookOpen, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { GlobalAudioPlayer } from "@/components/media/GlobalAudioPlayer"
import { EPISODES } from "@/lib/mockData"
import { UpdatesModal } from "./UpdatesModal"
import { MessageIconPopover } from "./MessageIconPopover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Header() {
  const [showUpdates, setShowUpdates] = useState(false)

  return (
    <TooltipProvider>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-border bg-background/80 backdrop-blur-xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Interface Echoes"
                className="w-16 h-16 object-contain drop-shadow-[var(--glow-purple)] group-hover:drop-shadow-[var(--glow-cyan)] transition-all duration-500"
              />
            </div>
          </Link>
          <GlobalAudioPlayer
            url="https://www.youtube.com/watch?v=iYYRH4apXDo"
            title="Cosmic Theme"
            className="hidden md:flex"
          />
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/author" className="hover:text-foreground hover:drop-shadow-[var(--glow-cyan)] transition-all">
            Meet the Author
          </Link>
          <Link href="/inspo" className="hover:text-foreground hover:drop-shadow-[var(--glow-cyan)] transition-all">
            Inspo
          </Link>
          <Link href="/feedback" className="hover:text-foreground hover:drop-shadow-[var(--glow-cyan)] transition-all">
            Feedback
          </Link>
          <button
            onClick={() => setShowUpdates(true)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/20"
          >
            <Mail className="w-4 h-4" />
            <span>Get Updates</span>
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <MessageIconPopover />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/saved" className="p-2 hover:bg-accent/10 rounded-full transition-colors relative group">
                <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-accent" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>Saved Quotes</TooltipContent>
          </Tooltip>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent border border-border" />
        </div>
      </header>

      <UpdatesModal isOpen={showUpdates} onClose={() => setShowUpdates(false)} />
    </TooltipProvider>
  )
}

// SIDEBAR COMPONENT (Episodes)
export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "w-80 h-screen fixed left-0 top-16 border-r border-border bg-sidebar/50 p-6 overflow-y-auto hidden lg:block",
        className
      )}
    >
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Episodes
      </h3>
      <div className="space-y-4">
        {EPISODES.map((ep) => (
          <Link
            key={ep.id}
            href={`/episode/${ep.slug}`}
            className="block group cursor-pointer p-3 rounded-lg hover:bg-accent/10 transition-all border border-transparent hover:border-border"
          >
            <div className="h-24 w-full rounded-md mb-2 overflow-hidden relative bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
              <div className="absolute bottom-1 right-2 text-[10px] text-muted-foreground bg-background/80 px-1 rounded uppercase tracking-wider">
                {ep.type}
              </div>
            </div>
            <h4 className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {ep.title}
            </h4>
            <span className="text-xs text-muted-foreground">{ep.date}</span>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-border">
        <Link
          href="/admin"
          className="text-[10px] text-muted-foreground/70 hover:text-muted-foreground uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-muted" />
          Admin Access
        </Link>
      </div>
    </aside>
  )
}

// RIGHT PANEL (Executive Summary)
export function RightPanel({
  isOpen,
  toggle,
  summary,
  tags,
}: {
  isOpen: boolean
  toggle: () => void
  summary?: string
  tags?: string[]
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed right-0 top-16 bottom-0 w-96 bg-card border-l border-border z-40 p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Info className="w-5 h-5 text-accent" />
              Executive Summary
            </h2>
            <button
              onClick={toggle}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="prose prose-invert prose-sm">
            <p className="text-muted-foreground italic">
              {summary || "Here lies the author's intent..."}
            </p>
            <div className="my-4 h-px bg-border" />
            <h4 className="text-muted-foreground font-medium mb-2">Themes</h4>
            <div className="flex flex-wrap gap-2">
              {(tags || ["Growth", "Discomfort"]).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-accent/10 rounded text-xs text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
