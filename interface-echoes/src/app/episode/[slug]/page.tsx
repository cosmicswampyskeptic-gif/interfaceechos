"use client"

import { use, useEffect, useState } from "react"
import { EPISODES, type Episode } from "@/lib/mockData"
import { EpisodeViewer } from "@/components/episodes/EpisodeViewer"
import { fetchEpisodeBySlug } from "@/lib/supabase/queries/episodes"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default function EpisodePage({ params }: PageProps) {
  const resolvedParams = use(params)
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const fromDb = await fetchEpisodeBySlug(resolvedParams.slug)
      if (cancelled) return
      if (fromDb) {
        setEpisode(fromDb)
      } else {
        const found = EPISODES.find((e) => e.slug === resolvedParams.slug)
        setEpisode(found || null)
      }
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [resolvedParams.slug])

  if (loading) {
    return (
      <div className="p-12 text-muted-foreground">Retrieving echoes...</div>
    )
  }

  if (!episode) {
    return (
      <div className="p-12 text-muted-foreground text-center">
        Episode not found.
      </div>
    )
  }

  return <EpisodeViewer episode={episode} />
}
