"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { checkDuplicateFirstName, getOrCreateProfile } from "@/lib/supabase/queries/profiles"

const PROFILE_STORAGE_KEY = "interface_echoes_profile"

export function GuestAuthModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: (name?: string) => void
}) {
  const [step, setStep] = useState<"first" | "disambiguate">("first")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleNext = async () => {
    if (!firstName.trim()) return
    setLoading(true)

    const isDuplicate = await checkDuplicateFirstName(firstName.trim())

    setLoading(false)
    if (isDuplicate) {
      setStep("disambiguate")
    } else {
      const profile = await getOrCreateProfile(firstName.trim())
      if (profile) {
        localStorage.setItem(
          PROFILE_STORAGE_KEY,
          JSON.stringify({ id: profile.id, name: firstName.trim() })
        )
      }
      onClose(firstName.trim())
    }
  }

  const handleFinal = async () => {
    setLoading(true)
    const profile = await getOrCreateProfile(firstName.trim(), lastName.trim())
    setLoading(false)
    if (profile) {
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify({
          id: profile.id,
          name: `${firstName.trim()} ${lastName.trim()}`,
        })
      )
    }
    onClose(`${firstName.trim()} ${lastName.trim()}`)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle>Who goes there?</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your name to leave echoes in the void. No password required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {step === "first" ? (
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                First Name
              </label>
              <Input
                placeholder="Calliope"
                className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Button
                onClick={handleNext}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "Checking..." : "Continue"}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <p className="text-sm text-amber-500 mb-2">
                  Another traveler shares your name. How shall we distinguish you?
                </p>
              </motion.div>
              <label className="text-xs font-medium uppercase text-muted-foreground">
                Last Name
              </label>
              <Input
                placeholder="Muse"
                className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Button
                onClick={handleFinal}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "Checking..." : "Enter"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
