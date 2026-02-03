"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { EPISODES } from "@/lib/mockData"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Play } from "lucide-react"

export default function Home() {
  const latestEpisode = EPISODES[0]

  return (
    <div className="space-y-16">
      {/* Hero - CineMora style */}
      <section className="relative -mx-8 -mt-8 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10 rounded-lg" />
        <div className="relative px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">
              Latest Episode
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mt-2 mb-4 font-sans tracking-tight">
              {latestEpisode.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
              {latestEpisode.summary}
            </p>
            <div className="flex gap-4">
              <Link
                href={`/episode/${latestEpisode.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                <Play className="w-4 h-4" />
                Read Now
              </Link>
              <Link
                href={`/episode/${latestEpisode.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-full font-medium hover:bg-muted/80 transition-colors"
              >
                More Info
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Grid - Webtoon style */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Episodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EPISODES.map((ep, i) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/episode/${ep.slug}`}>
                <Card className="overflow-hidden border-border bg-card hover:border-accent/50 transition-all group">
                  <div className="aspect-[3/4] relative bg-gradient-to-br from-primary/30 to-accent/30">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/20">
                      <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/80 px-2 py-0.5 rounded uppercase">
                      {ep.type}
                    </span>
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {ep.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-xs text-muted-foreground">{ep.date}</span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
