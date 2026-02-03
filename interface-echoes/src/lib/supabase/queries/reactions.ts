import { supabase } from '../client'
import type { ReactionType } from '@/lib/types'

export async function getReactionCounts(
  episodeId: string
): Promise<Record<ReactionType, number>> {
  if (!supabase) {
    return { resonated: 12, literary: 5, disturbed: 4, heart: 89 }
  }

  const { data } = await supabase
    .from('reactions')
    .select('reaction_type')
    .eq('episode_id', episodeId)

  const counts: Record<ReactionType, number> = {
    resonated: 0,
    literary: 0,
    disturbed: 0,
    heart: 0,
  }

  for (const row of data || []) {
    const t = row.reaction_type as ReactionType
    if (t in counts) counts[t]++
  }
  return counts
}

export async function toggleReaction(
  episodeId: string,
  profileId: string,
  reactionType: ReactionType
): Promise<boolean> {
  if (!supabase) return false

  const { data: existing } = await supabase
    .from('reactions')
    .select('id')
    .eq('episode_id', episodeId)
    .eq('profile_id', profileId)
    .eq('reaction_type', reactionType)
    .single()

  if (existing) {
    await supabase.from('reactions').delete().eq('id', existing.id)
    return false
  } else {
    await supabase.from('reactions').insert({
      episode_id: episodeId,
      profile_id: profileId,
      reaction_type: reactionType,
    })
    return true
  }
}
