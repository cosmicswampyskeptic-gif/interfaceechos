import { supabase } from '../client'

export async function submitFeedback(
  profileId: string | null,
  type: string,
  message: string
): Promise<boolean> {
  if (!supabase) return true

  const { error } = await supabase.from('feedback').insert({
    profile_id: profileId,
    type,
    message,
  })

  return !error
}
