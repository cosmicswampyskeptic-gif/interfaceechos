import { supabase } from '../client'

export async function subscribeToNewsletter(email: string): Promise<boolean> {
  if (!supabase) return true

  const { error } = await supabase.from('newsletter_subscribers').upsert(
    { email, episodes_since_last_sent: 0 },
    { onConflict: 'email' }
  )

  return !error
}
