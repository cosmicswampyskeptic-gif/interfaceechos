"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function GuestAuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: (name: string) => void }) {
    const [step, setStep] = useState<"first" | "disambiguate">("first")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [loading, setLoading] = useState(false)

    const handleNext = async () => {
        if (!firstName.trim()) return
        setLoading(true)

        // Simulate DB check (replace with actual Supabase call)
        // const { count } = await supabase.from('profiles').select('*', { count: 'exact' }).eq('first_name', firstName)
        const isDuplicate = firstName.toLowerCase() === "john" // Demo logic: "John" is taken

        setTimeout(() => {
            setLoading(false)
            if (isDuplicate) {
                setStep("disambiguate")
            } else {
                onClose(firstName)
            }
        }, 1000)
    }

    const handleFinal = () => {
        onClose(`${firstName} ${lastName}`)
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Who goes there?</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Enter your name to leave echoes in the void. No password required.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-4">
                    {step === "first" ? (
                        <div className="space-y-2">
                            <label className="text-xs font-medium uppercase text-zinc-500">First Name</label>
                            <Input
                                placeholder="Calliope"
                                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-700"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Button onClick={handleNext} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                {loading ? "Checking..." : "Continue"}
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                <p className="text-sm text-yellow-500 mb-2">Another traveler shares your name. How shall we distinguish you?</p>
                            </motion.div>
                            <label className="text-xs font-medium uppercase text-zinc-500">Last Name</label>
                            <Input
                                placeholder="Muse"
                                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-700"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Button onClick={handleFinal} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Enter
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
