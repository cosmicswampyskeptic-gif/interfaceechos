"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import type { Character } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CharacterAvatarProps {
  character: Character
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
}

export function CharacterAvatar({
  character,
  className,
  size = "md",
}: CharacterAvatarProps) {
  const isEmoji = /[\u{1F300}-\u{1F9FF}]|[\u2600-\u26FF]|[\u2700-\u27BF]/u.test(
    character.avatar
  )

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          className={cn(
            "rounded-full transition-all hover:ring-2 hover:ring-accent/50 hover:ring-offset-2 hover:ring-offset-background focus:outline-none focus:ring-2 focus:ring-accent",
            className
          )}
          aria-label={`View ${character.name}'s bio`}
        >
          <Avatar
            className={cn(
              sizeClasses[size],
              "border-2 border-border cursor-pointer"
            )}
          >
            {character.avatarUrl ? (
              <AvatarImage src={character.avatarUrl} alt={character.name} />
            ) : null}
            <AvatarFallback
              className={cn(
                "bg-primary/20 text-primary font-medium",
                isEmoji && "text-2xl"
              )}
            >
              {isEmoji ? character.avatar : character.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="w-80 bg-card border-border"
        side="right"
      >
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">{character.name}</h4>
          <p className="text-sm text-muted-foreground">{character.bio}</p>
          {character.narrativePurpose && (
            <p className="text-xs text-accent/80 italic border-l-2 border-accent/50 pl-2">
              {character.narrativePurpose}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
