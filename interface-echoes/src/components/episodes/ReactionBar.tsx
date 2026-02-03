"use client"

import { Sparkles, BookOpen, Frown, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactionType } from "@/lib/types"

interface ReactionBarProps {
  counts: Record<ReactionType, number>
  onReaction?: (type: ReactionType) => void
  activeReactions?: ReactionType[]
  className?: string
}

const REACTIONS: { type: ReactionType; icon: typeof Sparkles; label: string }[] = [
  { type: "resonated", icon: Sparkles, label: "Resonated" },
  { type: "literary", icon: BookOpen, label: "Literary" },
  { type: "disturbed", icon: Frown, label: "Disturbed" },
  { type: "heart", icon: Heart, label: "Loved" },
]

export function ReactionBar({
  counts,
  onReaction,
  activeReactions = [],
  className,
}: ReactionBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-card/90 backdrop-blur border border-border rounded-full px-4 py-2 shadow-lg",
        className
      )}
    >
      {REACTIONS.map(({ type, icon: Icon, label }) => {
        const isActive = activeReactions.includes(type)
        const count = counts[type] ?? 0
        return (
          <button
            key={type}
            onClick={() => onReaction?.(type)}
            className={cn(
              "flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all hover:bg-accent/10",
              isActive ? "text-accent" : "text-muted-foreground hover:text-accent"
            )}
            title={label}
          >
            <Icon
              className={cn("w-5 h-5", isActive && "drop-shadow-[var(--glow-cyan)]")}
            />
            <span className="text-[10px] font-medium">{count}</span>
          </button>
        )
      })}
    </div>
  )
}
