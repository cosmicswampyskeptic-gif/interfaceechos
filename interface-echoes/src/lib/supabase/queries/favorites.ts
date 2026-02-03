import { supabase } from '../client'

export async function getFavoriteCount(episodeId: string): Promise<number> {
  if (!supabase) return 89

  const { count } = await supabase
    .from('favorites')
    .select('*', { count: 'exact', head: true })
    .eq('episode_id', episodeId)

  return count ?? 0
}

export async function isFavorited(
  episodeId: string,
  profileId: string | null
): Promise<boolean> {
  if (!supabase || !profileId) return false

  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('episode_id', episodeId)
    .eq('profile_id', profileId)
    .single()

  return !!data
}

export async function toggleFavorite(
  episodeId: string,
  profileId: string
): Promise<boolean> {
  if (!supabase) return false

  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('episode_id', episodeId)
    .eq('profile_id', profileId)
    .single()

  if (existing) {
    await supabase.from('favorites').delete().eq('id', existing.id)
    return false
  } else {
    await supabase.from('favorites').insert({
      episode_id: episodeId,
      profile_id: profileId,
    })
    return true
  }
}
