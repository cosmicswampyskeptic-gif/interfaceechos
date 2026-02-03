import { supabase } from '../client'
import type { SavedQuote } from '@/lib/types'

export async function fetchSavedQuotes(
  profileId: string
): Promise<SavedQuote[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('saved_quotes')
    .select('*, episodes(title)')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false })

  if (error) return []

  return (data || []).map((row) => ({
    id: row.id,
    quoteText: row.quote_text,
    episodeId: row.episode_id,
    episodeTitle: (row.episodes as { title?: string })?.title,
    createdAt: row.created_at,
  }))
}

export async function saveQuote(
  profileId: string,
  episodeId: string,
  quoteText: string
): Promise<SavedQuote | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('saved_quotes')
    .insert({
      profile_id: profileId,
      episode_id: episodeId,
      quote_text: quoteText,
    })
    .select('*, episodes(title)')
    .single()

  if (error) return null
  return {
    id: data.id,
    quoteText: data.quote_text,
    episodeId: data.episode_id,
    episodeTitle: (data.episodes as { title?: string })?.title,
    createdAt: data.created_at,
  }
}

export async function deleteSavedQuote(
  quoteId: string,
  profileId: string
): Promise<boolean> {
  if (!supabase) return false

  const { error } = await supabase
    .from('saved_quotes')
    .delete()
    .eq('id', quoteId)
    .eq('profile_id', profileId)

  return !error
}
