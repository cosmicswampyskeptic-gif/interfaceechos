"use client"

import { useState } from "react"
import { Header, Sidebar, RightPanel } from "./Components"
import { Menu, MessageSquare, List } from "lucide-react"

import { GuestAuthModal } from "@/components/auth/GuestAuthModal"

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [isSummaryOpen, setSummaryOpen] = useState(false)
    const [isAuthOpen, setAuthOpen] = useState(true)
    const [userName, setUserName] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30 relative">
            {/* Theme Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <img src="/header-bg.png" alt="" className="w-full h-full object-cover blur-3xl scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
            </div>

            <div className="relative z-10">
                <GuestAuthModal isOpen={isAuthOpen} onClose={(name) => { setUserName(name); setAuthOpen(false) }} />
                <Header />

                <div className="flex pt-16 min-h-screen">
                    <Sidebar className="z-20" />

                    <main className="flex-1 lg:ml-80 relative">
                        {/* Context-aware toggles for Right Panel (Sticky on scroll) */}
                        <button
                            onClick={() => setSummaryOpen(!isSummaryOpen)}
                            className="fixed right-6 top-24 z-30 p-2 bg-zinc-900 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-white/30 transition-all shadow-lg"
                            title="Toggle Executive Summary"
                        >
                            <List className="w-5 h-5" />
                        </button>

                        <div className="max-w-4xl mx-auto p-8 lg:p-12">
                            {children}
                        </div>
                    </main>

                    <RightPanel isOpen={isSummaryOpen} toggle={() => setSummaryOpen(false)} />
                </div>
            </div>
        </div>
    )
}
