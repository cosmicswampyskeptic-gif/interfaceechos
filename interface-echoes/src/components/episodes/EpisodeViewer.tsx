"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Heart, Frown, Sparkles, PenTool, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
type ReactionType = "resonated" | "disturbed" | "literary"
type Comment = { id: string; text: string; author: string; x: number; y: number }

export function EpisodeViewer() {
    const [comments, setComments] = useState<Comment[]>([
        { id: "1", text: "This metaphor kills me.", author: "Wizard", x: 20, y: 15 }, // % based positioning for demo
        { id: "2", text: "Is this foreshadowing?", author: "Cockroach", x: 80, y: 45 }
    ])
    const [activeReaction, setActiveReaction] = useState<ReactionType | null>(null)
    const [selectedText, setSelectedText] = useState<string | null>(null)
    const [selectionPos, setSelectionPos] = useState<{ x: number; y: number } | null>(null)

    // Text Selection Handle
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

    return (
        <div className="relative max-w-2xl mx-auto font-serif text-lg leading-loose text-zinc-300">

            {/* HEADER: Audio & Title */}
            <div className="mb-12 border-b border-white/10 pb-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-sans font-bold text-indigo-400 tracking-widest uppercase">Episode 01</span>
                    <span className="text-xs font-sans text-zinc-500">Feb 02, 2026</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans tracking-tight">The Starry-Eyed Wagging Golden Retriever</h1>

                {/* Audio Player Placeholder */}
                <div className="bg-zinc-900 border border-white/10 rounded-lg p-3 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-white">▶</span>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-white">Space Oddity (Cover)</div>
                        <div className="h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                            <div className="h-full w-1/3 bg-indigo-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT WITH HOVER COMMENTS */}
            <div className="relative group/content">
                <p className="mb-6 relative">
                    The universe didn't end with a bang, but with a <span className="text-white font-medium decoration-indigo-500/30 underline decoration-wavy cursor-help" title="Hover to see comment">whimper</span>.
                    It was the sound of a thousand stars flickering out, one by one, like candles in a drafty room.

                    {/* Inline Hover Comment */}
                    <span className="absolute -right-32 top-0 w-24 opacity-0 group-hover/content:opacity-100 transition-opacity duration-300 text-xs text-zinc-500 bg-zinc-900/80 p-2 rounded backdrop-blur border border-white/5 pointer-events-none">
                        <span className="block font-bold text-indigo-400 mb-1">Wizard:</span>
                        "Drafty room" implies there's something outside.
                    </span>
                </p>

                <p className="mb-6">
                    I looked at the Golden Retriever. He was still wagging his tail. Even as the entropy consumed the void,
                    he found a reason to be happy. Perhaps it was just the treat in my pocket, or perhaps he knew something I didn't.
                </p>

                <div className="my-8 aspect-video rounded-lg overflow-hidden relative">
                    {/* Placeholder for Vignette/Image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <span className="text-zinc-600 font-sans text-sm">[ Art Vignette: The Void Dog ]</span>
                    </div>
                </div>

                <p className="mb-6">
                    "Don't worry," he seemed to say, his eyes reflecting the dying light of a supernova. "It's just a phase."
                </p>
            </div>

            {/* REACTION BAR (Floating at bottom or sticky) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-12 z-40 bg-zinc-900/90 backdrop-blur border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
                <ReactionBtn icon={Sparkles} label="Resonated" count={12} />
                <ReactionBtn icon={Frown} label="Disturbed" count={4} />
                <ReactionBtn icon={Heart} label="Loved" count={89} />
            </div>

            {/* TEXT SELECTION POPOVER */}
            <AnimatePresence>
                {selectedText && selectionPos && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{ top: selectionPos.y, left: selectionPos.x }}
                        className="fixed z-50 -translate-x-1/2 bg-black text-white px-3 py-2 rounded-lg shadow-2xl flex items-center gap-3 border border-zinc-800"
                    >
                        <button className="flex flex-col items-center gap-1 hover:text-indigo-400 transition-colors">
                            <PenTool className="w-4 h-4" />
                            <span className="text-[10px]">Annotate</span>
                        </button>
                        <div className="w-px h-6 bg-zinc-800" />
                        <button className="flex flex-col items-center gap-1 hover:text-indigo-400 transition-colors">
                            <Bookmark className="w-4 h-4" />
                            <span className="text-[10px]">Save</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ReactionBtn({ icon: Icon, label, count }: { icon: any; label: string; count: number }) {
    return (
        <button className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors group">
            <Icon className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
            <span className="text-[10px] font-medium text-zinc-500">{count}</span>
        </button>
    )
}
