"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SavedItem {
  id: string
  text: string
  date: string
  source: string
}

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("saved_echoes")
    if (stored) {
      setSavedItems(JSON.parse(stored))
    }
  }, [])

  const removeItem = (id: string) => {
    const updated = savedItems.filter((item) => item.id !== id)
    setSavedItems(updated)
    localStorage.setItem("saved_echoes", JSON.stringify(updated))
  }

  if (savedItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto pt-32 px-6 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          No Echoes Saved
        </h1>
        <p className="text-muted-foreground">
          Highlight text in an episode and click &quot;Save&quot; to keep it
          here.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto pt-24 pb-12 px-6">
      <h1 className="text-3xl font-bold text-foreground mb-8 border-b border-border pb-4">
        Saved Echoes
      </h1>

      <div className="grid gap-6">
        {savedItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="relative group border-border bg-card hover:border-accent/30 transition-colors">
              <CardContent className="p-6">
                <blockquote className="font-serif text-xl text-foreground/90 mb-4 leading-relaxed">
                  &quot;{item.text}&quot;
                </blockquote>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-sans uppercase tracking-wider">
                  <span>{item.source}</span>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                  title="Forget this echo"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
