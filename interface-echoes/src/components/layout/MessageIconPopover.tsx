"use client"

import { MessageCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MessageIconPopover() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-accent/10 transition-colors text-muted-foreground hover:text-accent group"
                aria-label="Send me a message"
              >
                <MessageCircle className="w-5 h-5 group-hover:drop-shadow-[var(--glow-cyan)]" />
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-popover border-border">
            Send me a message
          </TooltipContent>
        </Tooltip>
        <PopoverContent align="end" className="bg-card border-border">
          <p className="text-sm text-muted-foreground mb-3">
            Want to reach out? Drop a line.
          </p>
          <Link href="/feedback" onClick={() => setOpen(false)}>
            <Button variant="secondary" size="sm" className="w-full">
              Open Feedback Form
            </Button>
          </Link>
        </PopoverContent>
      </Popover>
  )
}
