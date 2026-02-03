"use client"

import { cn } from "@/lib/utils"

interface DiscordQuoteBlockProps {
  text: string
  isLong?: boolean
  source?: string
  className?: string
}

export function DiscordQuoteBlock({
  text,
  isLong = false,
  source,
  className,
}: DiscordQuoteBlockProps) {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-accent/50 pl-4 py-2 my-4 bg-card/50 rounded-r-md",
        isLong ? "font-serif text-base leading-relaxed" : "font-sans text-sm",
        className
      )}
    >
      <p className="text-foreground/90">"{text}"</p>
      {source && (
        <cite className="text-xs text-muted-foreground mt-1 block">
          — {source}
        </cite>
      )}
    </blockquote>
  )
}
