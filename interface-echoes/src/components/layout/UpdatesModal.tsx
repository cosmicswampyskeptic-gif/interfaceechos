"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { subscribeToNewsletter } from "@/lib/supabase/queries/newsletter"

export function UpdatesModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubscribe = async () => {
    if (!email.includes("@")) return
    setStatus("loading")

    const ok = await subscribeToNewsletter(email.trim())

    setStatus("success")
    setTimeout(() => {
      onClose()
      setStatus("idle")
      setEmail("")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            Signal Frequency
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Subscribe to receive specialized transmissions. Emails every 3 new
            episodes.
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 text-center space-y-2 bg-green-500/10 rounded-lg border border-green-500/20"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-green-300">Signal Locked</h4>
                <p className="text-xs text-green-400/70">
                  You are now part of the receiving end.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase text-muted-foreground">
                    Email
                  </label>
                  <Input
                    placeholder="observer@void.net"
                    className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
                <Button
                  onClick={handleSubscribe}
                  disabled={status === "loading" || !email}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {status === "loading" ? "Establishing Connection..." : "Connect"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
