import { supabase } from '../client'
import type { Comment } from '@/lib/types'

export async function addComment(
  episodeId: string,
  profileId: string | null,
  displayName: string,
  text: string,
  highlightedText?: string
): Promise<Comment | null> {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('comments')
    .insert({
      episode_id: episodeId,
      profile_id: profileId,
      display_name: displayName,
      text,
      highlighted_text: highlightedText,
    })
    .select()
    .single()

  if (error) return null
  return {
    id: data.id,
    episodeId: data.episode_id,
    profileId: data.profile_id,
    author: data.display_name,
    text: data.text,
    highlightedText: data.highlighted_text,
    createdAt: data.created_at,
  }
}

export function subscribeToComments(
  episodeId: string,
  onInsert: (comment: Comment) => void
) {
  const client = supabase
  if (!client) return () => {}

  const channel = client
    .channel(`comments:${episodeId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'comments',
        filter: `episode_id=eq.${episodeId}`,
      },
      (payload) => {
        const c = payload.new as Record<string, unknown>
        onInsert({
          id: c.id as string,
          episodeId: c.episode_id as string,
          profileId: c.profile_id as string | undefined,
          author: c.display_name as string,
          text: c.text as string,
          highlightedText: c.highlighted_text as string | undefined,
          createdAt: c.created_at as string,
        })
      }
    )
    .subscribe()

  return () => {
    client.removeChannel(channel)
  }
}
