"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionRatingButtonsProps {
  sectionId: string
  episodeId: string
  onRate?: (rating: number) => void
  currentRating?: number
  disabled?: boolean
}

export function SectionRatingButtons({
  sectionId,
  episodeId,
  onRate,
  currentRating,
  disabled,
}: SectionRatingButtonsProps) {
  const ratings = [1, 2, 3, 4, 5]

  return (
    <div
      className="flex items-center gap-1 py-2"
      data-section-id={sectionId}
      data-episode-id={episodeId}
    >
      <span className="text-xs text-muted-foreground mr-2">Rate this section:</span>
      {ratings.map((r) => (
        <button
          key={r}
          onClick={() => onRate?.(r)}
          disabled={disabled}
          className={cn(
            "p-1.5 rounded transition-colors hover:bg-accent/20",
            currentRating === r
              ? "text-accent bg-accent/10"
              : "text-muted-foreground hover:text-accent"
          )}
          aria-label={`Rate ${r} out of 5`}
          title={`${r} / 5`}
        >
          <Star
            className={cn("w-4 h-4", currentRating !== undefined && currentRating >= r && "fill-current")}
          />
        </button>
      ))}
    </div>
  )
}
