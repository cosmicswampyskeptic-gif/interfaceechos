"use client"

import { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
    url?: string
    title?: string
    className?: string
}

export function GlobalAudioPlayer({ url, title, className }: AudioPlayerProps) {
    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [mounted, setMounted] = useState(false) // Hydration fix

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // If no URL provided, don't render (or render placeholder)
    if (!url) return null

    return (
        <div className={cn("flex items-center gap-3 bg-zinc-900/80 border border-white/10 rounded-full pl-2 pr-4 py-1.5 backdrop-blur-md transition-all", className)}>
            <button
                onClick={() => setPlaying(!playing)}
                className="w-8 h-8 rounded-full bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center text-white transition-colors shadow-lg shadow-indigo-500/20"
            >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <div className="flex flex-col min-w-[120px] max-w-[200px]">
                <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Music className="w-3 h-3" /> Now Playing
                </span>
                <span className="text-xs text-white truncate font-medium">{title || "Unknown Track"}</span>
            </div>

            <button
                onClick={() => setMuted(!muted)}
                className="ml-2 text-zinc-400 hover:text-white transition-colors"
            >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Hidden Player */}
            <div className="hidden">
                <ReactPlayer
                    url={url}
                    playing={playing}
                    muted={muted}
                    width="0"
                    height="0"
                    onReady={() => setIsReady(true)}
                    config={{
                        youtube: { playerVars: { showinfo: 0 } as any }
                    }}
                />
            </div>
        </div>
    )
}
