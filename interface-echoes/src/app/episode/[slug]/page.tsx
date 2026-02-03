"use client"

import { use, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { EPISODES, Episode } from "@/lib/mockData"
import { EpisodeViewer } from "@/components/episodes/EpisodeViewer"

// Correctly type the props for Next.js 15+
interface PageProps {
    params: Promise<{ slug: string }>
}

export default function EpisodePage({ params }: PageProps) {
    // Unwrap the Promise using React.use()
    const resolvedParams = use(params)
    const [episode, setEpisode] = useState<Episode | null>(null)

    useEffect(() => {
        const found = EPISODES.find(e => e.slug === resolvedParams.slug)
        if (found) {
            setEpisode(found)
        }
    }, [resolvedParams.slug])

    if (!episode) {
        // Return simple loading or null while effect runs 
        // (Actual 404 handled if logic was server-side, but this is client mock)
        return <div className="p-12 text-zinc-500">Retrieving echoes...</div>
    }

    return (
        <EpisodeViewer episode={episode} />
    )
}
