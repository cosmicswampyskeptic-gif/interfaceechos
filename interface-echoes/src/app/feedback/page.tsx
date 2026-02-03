"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { submitFeedback } from "@/lib/supabase/queries/feedback"

const FEEDBACK_TYPES = [
  "General Feedback",
  "Bug Report",
  "Feature Request",
  "Honest Criticism",
]

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)
  const [type, setType] = useState("General Feedback")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setLoading(true)

    const profileStr = typeof window !== "undefined" && localStorage.getItem("interface_echoes_profile")
    const profileId = profileStr ? JSON.parse(profileStr).id : null

    await submitFeedback(profileId, type, message.trim())
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto pt-32 px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Transmission Received
          </h2>
          <p className="text-muted-foreground mb-4">
            Your signal has been captured by the void. Thank you.
          </p>
          <p className="text-sm text-amber-500/80 mb-6">
            Please don&apos;t be anonymous — I might DM to ask follow-up questions.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="text-accent border-accent/50"
          >
            Send another transmission
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto pt-24 pb-12 px-6">
      <h1 className="text-3xl font-bold text-foreground mb-2 font-sans">
        Feedback Channel
      </h1>
      <p className="text-muted-foreground mb-2">
        Report glitches, suggest echoes, or scream into the void.
      </p>
      <p className="text-sm text-amber-500/80 mb-8">
        Please don&apos;t be anonymous — I might DM to ask follow-up questions. I
        don&apos;t mind honesty or criticism.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Signal Type
          </label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-muted/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FEEDBACK_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Message
          </label>
          <Textarea
            required
            rows={6}
            className="bg-muted/50 border-border placeholder:text-muted-foreground"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="w-4 h-4 mr-2" />
          Transmit Signal
        </Button>
      </form>
    </div>
  )
}
