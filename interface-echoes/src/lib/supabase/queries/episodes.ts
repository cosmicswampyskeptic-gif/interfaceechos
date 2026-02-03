import { supabase } from '../client'
import { EPISODES } from '@/lib/mockData'
import type { Episode } from '@/lib/types'

function mapDbToEpisode(row: Record<string, unknown>): Episode {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    date: row.published_at
      ? new Date(row.published_at as string).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
      : new Date(row.created_at as string).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
    type: row.type as Episode['type'],
    summary: (row.summary as string) || '',
    executiveSummary: (row.executive_summary as string) || '',
    songUrl: row.song_url as string | undefined,
    songSource: row.song_source as string | undefined,
    content: row.content as string,
    bannerUrl: (row.banner_url as string) || '',
    tags: row.tags as string[] | undefined,
    comments: [],
    universeId: row.universe_id as string | undefined,
  }
}

export async function fetchEpisodes(universeSlug?: string): Promise<Episode[]> {
  if (!supabase) return EPISODES

  let query = supabase
    .from('episodes')
    .select('*, universes(slug)')
    .order('published_at', { ascending: false, nullsFirst: false })

  if (universeSlug) {
    const { data: universe } = await supabase
      .from('universes')
      .select('id')
      .eq('slug', universeSlug)
      .single()
    if (universe) {
      query = query.eq('universe_id', universe.id)
    }
  }

  const { data, error } = await query
  if (error) return EPISODES
  return (data || []).map(mapDbToEpisode)
}

export async function fetchEpisodeBySlug(slug: string): Promise<Episode | null> {
  if (!supabase) {
    const ep = EPISODES.find((e) => e.slug === slug)
    return ep || null
  }

  const { data, error } = await supabase
    .from('episodes')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  const episode = mapDbToEpisode(data)

  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('episode_id', data.id)
    .order('created_at', { ascending: true })

  episode.comments = (comments || []).map((c) => ({
    id: c.id,
    episodeId: c.episode_id,
    profileId: c.profile_id,
    author: c.display_name,
    text: c.text,
    highlightedText: c.highlighted_text,
    createdAt: c.created_at,
  }))

  return episode
}
