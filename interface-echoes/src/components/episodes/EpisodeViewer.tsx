"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PenTool, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Episode, Comment, ReactionType } from "@/lib/types"
import { useEpisodeMeta } from "@/contexts/EpisodeContext"
import { GlobalAudioPlayer } from "@/components/media/GlobalAudioPlayer"
import { ReactionBar } from "./ReactionBar"
import { StickyMediaSidebar } from "./StickyMediaSidebar"
import { CharacterAvatar } from "./CharacterAvatar"
import { CHARACTERS } from "@/lib/mockData"
import { getReactionCounts } from "@/lib/supabase/queries/reactions"
import { getFavoriteCount } from "@/lib/supabase/queries/favorites"

export function EpisodeViewer({ episode }: { episode?: Episode }) {
  const setEpisodeMeta = useEpisodeMeta()?.setEpisodeMeta
  const [comments, setComments] = useState<Comment[]>(episode?.comments || [])
  const [reactionCounts, setReactionCounts] = useState<Record<ReactionType, number>>({
    resonated: 12,
    literary: 5,
    disturbed: 4,
    heart: 89,
  })
  const [activeReactions, setActiveReactions] = useState<ReactionType[]>([])
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [selectionPos, setSelectionPos] = useState<{ x: number; y: number } | null>(null)

  const displayEpisode = episode || {
    id: "01",
    title: "The Starry-Eyed Wagging Golden Retriever",
    date: "Feb 02, 2026",
    content: "",
    summary: "Default summary",
    executiveSummary: "",
    bannerUrl: "",
    comments: [],
  }

  useEffect(() => {
    if (episode) {
      setEpisodeMeta?.(episode.executiveSummary, episode.tags || ["Growth", "Discomfort"])
      getReactionCounts(episode.id).then(setReactionCounts)
      getFavoriteCount(episode.id).then((heart) =>
        setReactionCounts((prev) => ({ ...prev, heart }))
      )
    }
  }, [episode, setEpisodeMeta])

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        setSelectedText(selection.toString())
        setSelectionPos({ x: rect.left + rect.width / 2, y: rect.top - 40 })
      } else {
        setSelectedText(null)
        setSelectionPos(null)
      }
    }
    document.addEventListener("selectionchange", handleSelection)
    return () => document.removeEventListener("selectionchange", handleSelection)
  }, [])

  const handleSaveQuote = () => {
    if (!selectedText) return
    const newItem = {
      id: Date.now().toString(),
      text: selectedText,
      date: new Date().toISOString(),
      source: displayEpisode.title,
    }
    const existing = JSON.parse(localStorage.getItem("saved_echoes") || "[]")
    localStorage.setItem("saved_echoes", JSON.stringify([newItem, ...existing]))
    setSelectedText(null)
  }

  const contentLines = episode
    ? episode.content.split("\n").filter(Boolean)
    : []

  return (
    <div className="flex gap-8">
      <StickyMediaSidebar bannerUrl={episode?.bannerUrl} />

      <div className="flex-1 min-w-0">
        <div className="relative max-w-2xl mx-auto font-serif text-lg leading-loose text-muted-foreground">
          {/* HEADER */}
          <div className="mb-12 border-b border-border pb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-sans font-bold text-accent tracking-widest uppercase">
                Episode {displayEpisode.id}
              </span>
              <span className="text-xs font-sans text-muted-foreground">
                {displayEpisode.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-sans tracking-tight">
              {displayEpisode.title}
            </h1>

            {episode?.tags && episode.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {episode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-accent/10 rounded text-xs text-accent border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {episode?.songUrl && (
              <div className="mb-6">
                <GlobalAudioPlayer
                  url={episode.songUrl}
                  title={episode.songSource || "Episode soundtrack"}
                />
              </div>
            )}

            {episode?.bannerUrl && (
              <div className="w-full h-48 bg-card rounded-lg mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-accent/40" />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="relative group/content">
            {contentLines.length > 0 ? (
              contentLines.map((line, i) => (
                <p key={i} className="mb-6 relative text-foreground/90">
                  {line}
                </p>
              ))
            ) : (
              <>
                <p className="mb-6 relative">
                  The universe didn't end with a bang, but with a{" "}
                  <span
                    className="text-foreground font-medium decoration-accent/30 underline decoration-wavy cursor-help"
                    title="Hover to see comment"
                  >
                    whimper
                  </span>
                  . It was the sound of a thousand stars flickering out, one by
                  one, like candles in a drafty room.
                  {comments.some((c) => c.highlightedText === "whimper") && (
                    <span className="absolute -right-32 top-0 w-24 opacity-0 group-hover/content:opacity-100 transition-opacity duration-300 text-xs text-muted-foreground bg-card/80 p-2 rounded backdrop-blur border border-border pointer-events-none">
                      <span className="block font-bold text-accent mb-1">
                        Wizard:
                      </span>
                      &quot;Drafty room&quot; implies there&apos;s something outside.
                    </span>
                  )}
                </p>
                <p className="mb-6">
                  I looked at the Golden Retriever. He was still wagging his
                  tail. Even as the entropy consumed the void, he found a reason
                  to be happy. Perhaps it was just the treat in my pocket, or
                  perhaps he knew something I didn&apos;t.
                </p>
                <div className="my-8 aspect-video rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-card to-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-sans text-sm">
                      [ Art Vignette: The Void Dog ]
                    </span>
                  </div>
                </div>
                <p className="mb-6">
                  &quot;Don&apos;t worry,&quot; he seemed to say, his eyes
                  reflecting the dying light of a supernova. &quot;It&apos;s
                  just a phase.&quot;
                </p>
              </>
            )}
          </div>

          {/* Character avatars */}
          <div className="flex gap-4 mt-8 mb-12">
            {Object.values(CHARACTERS).map((char) => (
              <CharacterAvatar key={char.id} character={char} size="md" />
            ))}
          </div>
        </div>
      </div>

      {/* REACTION BAR */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-12 z-40">
        <ReactionBar
          counts={reactionCounts}
          onReaction={(type) =>
            setActiveReactions((prev) =>
              prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
            )
          }
          activeReactions={activeReactions}
        />
      </div>

      {/* TEXT SELECTION POPOVER */}
      <AnimatePresence>
        {selectedText && selectionPos && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ top: selectionPos.y, left: selectionPos.x }}
            className="fixed z-50 -translate-x-1/2 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-2xl flex items-center gap-3 border border-border"
          >
            <button
              className="flex flex-col items-center gap-1 hover:text-accent transition-colors"
              title="Annotate (coming soon)"
            >
              <PenTool className="w-4 h-4" />
              <span className="text-[10px]">Annotate</span>
            </button>
            <div className="w-px h-6 bg-border" />
            <button
              onClick={handleSaveQuote}
              className="flex flex-col items-center gap-1 hover:text-accent transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-[10px]">Save</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
