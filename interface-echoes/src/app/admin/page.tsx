"use client"

import { useState } from "react"
import { EPISODES } from "@/lib/mockData"
import { Plus, Edit, Trash, Users, Activity, MessageCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPage() {
  const stats = [
    { label: "Total Visits", value: "12,403", icon: Activity },
    { label: "Guest Profiles", value: "842", icon: Users },
    { label: "Active Echoes", value: EPISODES.length, icon: MessageCircle },
  ]

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground font-sans">
          Control Deck
        </h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Episode
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border bg-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="episodes" className="space-y-6">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="episodes">Episodes</TabsTrigger>
          <TabsTrigger value="users">User Profiles</TabsTrigger>
          <TabsTrigger value="feedback">Inbound Signals</TabsTrigger>
        </TabsList>

        <TabsContent value="episodes">
          <Card className="border-border">
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead className="bg-muted/30 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {EPISODES.map((ep) => (
                    <tr
                      key={ep.id}
                      className="hover:bg-muted/20 transition-colors group"
                    >
                      <td className="p-4 font-medium text-foreground">
                        {ep.title}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide ${
                            ep.type === "story"
                              ? "bg-primary/20 text-primary"
                              : ep.type === "poetry"
                                ? "bg-accent/20 text-accent"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {ep.type}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{ep.date}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="border-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              User profiles view — connect to Supabase for data
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card className="border-border">
            <CardContent className="p-8 text-center text-muted-foreground">
              Inbound feedback signals — connect to Supabase for data
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
