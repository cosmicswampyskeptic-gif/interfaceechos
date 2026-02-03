"use client"

import { useState } from "react"
import { Header, Sidebar, RightPanel } from "./Components"
import { List } from "lucide-react"
import { GuestAuthModal } from "@/components/auth/GuestAuthModal"
import { EpisodeProvider, useEpisodeMeta } from "@/contexts/EpisodeContext"

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const [isSummaryOpen, setSummaryOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(true)
  const episodeMeta = useEpisodeMeta()

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 relative">
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="/header-bg.png"
          alt=""
          className="w-full h-full object-cover blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10">
        <GuestAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
        <Header />

        <div className="flex pt-16 min-h-screen">
          <Sidebar className="z-20" />

          <main className="flex-1 lg:ml-80 relative">
            <button
              onClick={() => setSummaryOpen(!isSummaryOpen)}
              className="fixed right-6 top-24 z-30 p-2 bg-card border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all shadow-lg"
              title="Toggle Executive Summary"
            >
              <List className="w-5 h-5" />
            </button>

            <div className="max-w-4xl mx-auto p-8 lg:p-12">{children}</div>
          </main>

          <RightPanel
            isOpen={isSummaryOpen}
            toggle={() => setSummaryOpen(false)}
            summary={episodeMeta?.executiveSummary}
            tags={episodeMeta?.tags.length ? episodeMeta.tags : undefined}
          />
        </div>
      </div>
    </div>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <EpisodeProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </EpisodeProvider>
  )
}
