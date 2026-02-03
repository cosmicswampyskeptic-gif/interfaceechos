"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Star, MessageSquare, Info, BookOpen, Music, Search, Heart, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { GlobalAudioPlayer } from "@/components/media/GlobalAudioPlayer"
import { EPISODES } from "@/lib/mockData"

// HEADER COMPONENT
export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold tracking-tighter text-white">
                    INTERFACE ECHOES
                </Link>
                <GlobalAudioPlayer
                    url="https://www.youtube.com/watch?v=iYYRH4apXDo"
                    title="Cosmic Theme"
                    className="hidden md:flex ml-4"
                />
            </div>

            <nav className="flex items-center gap-6 text-sm font-medium text-zinc-400">
                <Link href="/author" className="hover:text-white transition-colors">Meet the Author</Link>
                <Link href="/inspo" className="hover:text-white transition-colors">Inspo</Link>
                <Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link>
                <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Get Updates</span>
                </button>
            </nav>

            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative group">
                    <BookOpen className="w-5 h-5 text-zinc-300" />
                    <span className="absolute top-full right-0 mt-2 px-2 py-1 bg-zinc-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Saved Quotes
                    </span>
                </button>
                {/* Placeholder for User Profile */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20" />
            </div>
        </header>
    )
}

// SIDEBAR COMPONENT (Episodes)
export function Sidebar({ className }: { className?: string }) {
    return (
        <aside className={cn("w-80 h-screen fixed left-0 top-16 border-r border-white/10 bg-black/50 p-6 overflow-y-auto hidden lg:block", className)}>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Episodes</h3>
            <div className="space-y-4">
                {EPISODES.map((ep) => (
                    <Link key={ep.id} href={`/episode/${ep.slug}`} className="block group cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                        <div className="h-24 w-full bg-zinc-900 rounded-md mb-2 overflow-hidden relative">
                            {/* Placeholder for Banner - Dynamic in future */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50" />
                            <div className="absolute bottom-1 right-2 text-[10px] text-white/60 bg-black/50 px-1 rounded uppercase tracking-wider">{ep.type}</div>
                        </div>
                        <h4 className="font-medium text-zinc-200 group-hover:text-white transition-colors">{ep.title}</h4>
                        <span className="text-xs text-zinc-500">{ep.date}</span>
                    </Link>
                ))}
            </div>
        </aside>
    )
}

// RIGHT PANEL (Executive Summary)
export function RightPanel({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="fixed right-0 top-16 bottom-0 w-96 bg-zinc-950 border-l border-white/10 z-40 p-6 shadow-2xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Info className="w-5 h-5 text-indigo-400" />
                            Executive Summary
                        </h2>
                        <button onClick={toggle} className="text-zinc-500 hover:text-white">Close</button>
                    </div>

                    <div className="prose prose-invert prose-sm">
                        <p className="text-zinc-300 italic">"Here lies the author's intent..."</p>
                        <div className="my-4 h-px bg-white/10" />
                        <h4 className="text-zinc-400 font-medium mb-2">Themes</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-white/5 rounded text-xs text-zinc-400 border border-white/10">Growth</span>
                            <span className="px-2 py-1 bg-white/5 rounded text-xs text-zinc-400 border border-white/10">Discomfort</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
