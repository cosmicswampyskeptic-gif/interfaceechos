"use client"

import { cn } from "@/lib/utils"

interface MediaItem {
  id: string
  url: string
  type: "image" | "vignette" | "pin"
  caption?: string
}

interface StickyMediaSidebarProps {
  bannerUrl?: string
  media?: MediaItem[]
  className?: string
}

export function StickyMediaSidebar({
  bannerUrl,
  media = [],
  className,
}: StickyMediaSidebarProps) {
  const hasContent = bannerUrl || media.length > 0
  if (!hasContent) return null

  return (
    <aside
      className={cn(
        "hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start space-y-4",
        className
      )}
    >
      {bannerUrl && (
        <div className="rounded-lg overflow-hidden border border-border bg-card">
          <div className="aspect-[3/4] relative bg-gradient-to-br from-primary/30 to-accent/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bannerUrl}
              alt="Episode banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
        </div>
      )}
      {media.map((item) => (
        <div
          key={item.id}
          className="rounded-lg overflow-hidden border border-border bg-card"
        >
          <div className="aspect-square relative bg-gradient-to-br from-primary/20 to-accent/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.url}
              alt={item.caption || "Episode media"}
              className="w-full h-full object-cover"
            />
          </div>
          {item.caption && (
            <p className="text-xs text-muted-foreground p-2">{item.caption}</p>
          )}
        </div>
      ))}
    </aside>
  )
}
