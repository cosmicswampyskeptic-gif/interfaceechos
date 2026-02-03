"use client"

import { createContext, useContext, useState, useCallback } from "react"

interface EpisodeContextValue {
  executiveSummary: string
  tags: string[]
  setEpisodeMeta: (summary: string, tags: string[]) => void
}

const EpisodeContext = createContext<EpisodeContextValue | null>(null)

export function EpisodeProvider({ children }: { children: React.ReactNode }) {
  const [executiveSummary, setExecutiveSummary] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const setEpisodeMeta = useCallback((summary: string, tags: string[]) => {
    setExecutiveSummary(summary)
    setTags(tags)
  }, [])

  return (
    <EpisodeContext.Provider
      value={{ executiveSummary, tags, setEpisodeMeta }}
    >
      {children}
    </EpisodeContext.Provider>
  )
}

export function useEpisodeMeta() {
  const ctx = useContext(EpisodeContext)
  return ctx
}
