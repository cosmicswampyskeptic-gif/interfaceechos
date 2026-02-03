import { supabase } from '../client'

export interface Profile {
  id: string
  firstName: string
  lastName?: string
  displayName?: string
  isAdmin: boolean
}

export async function findProfileByName(
  firstName: string,
  lastName?: string
): Promise<Profile | null> {
  if (!supabase) return null

  let query = supabase
    .from('profiles')
    .select('*')
    .ilike('first_name', firstName)

  if (lastName) {
    query = query.eq('last_name', lastName)
  } else {
    query = query.is('last_name', null)
  }

  const { data } = await query.single()
  if (!data) return null

  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    displayName: data.display_name,
    isAdmin: data.is_admin ?? false,
  }
}

export async function checkDuplicateFirstName(firstName: string): Promise<boolean> {
  if (!supabase) return firstName.toLowerCase() === 'john'

  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .ilike('first_name', firstName)

  return (count ?? 0) > 0
}

export async function createProfile(
  firstName: string,
  lastName?: string
): Promise<Profile | null> {
  if (!supabase) {
    return {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      firstName,
      lastName,
      isAdmin: false,
    }
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      first_name: firstName,
      last_name: lastName || null,
    })
    .select()
    .single()

  if (error) return null
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    displayName: data.display_name,
    isAdmin: data.is_admin ?? false,
  }
}

export async function getOrCreateProfile(
  firstName: string,
  lastName?: string
): Promise<Profile | null> {
  const existing = await findProfileByName(firstName, lastName)
  if (existing) return existing
  return createProfile(firstName, lastName || undefined)
}
