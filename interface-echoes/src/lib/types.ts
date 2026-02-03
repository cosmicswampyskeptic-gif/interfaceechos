export type EpisodeType = 'story' | 'poetry' | 'excerpt' | 'letter' | 'reddit'

export interface Character {
  id: string
  slug?: string
  name: string
  avatar: string
  avatarUrl?: string
  bio: string
  narrativePurpose?: string
}

export interface Comment {
  id: string
  episodeId: string
  profileId?: string
  author: string
  displayName?: string
  text: string
  highlightedText?: string
  createdAt?: string
}

export interface Episode {
  id: string
  title: string
  slug: string
  date: string
  type: EpisodeType
  summary: string
  executiveSummary: string
  songUrl?: string
  songSource?: string
  content: string
  bannerUrl: string
  tags?: string[]
  comments: Comment[]
  universeId?: string
}

export interface SavedQuote {
  id: string
  quoteText: string
  episodeId: string
  episodeTitle?: string
  createdAt: string
}

export type ReactionType = 'resonated' | 'literary' | 'disturbed' | 'heart'
