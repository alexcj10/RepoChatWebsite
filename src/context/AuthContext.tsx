import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export type Profile = {
  id: string
  username: string
  avatar_url: string
  is_pro?: boolean
}

type AuthContextType = {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
})

export const useAuth = () => useContext(AuthContext)

/**
 * Fetch profile from the Supabase `profiles` table with retry logic.
 * Falls back to user_metadata if all attempts fail.
 */
async function fetchProfileFromDB(userId: string, metaAvatar: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url, is_pro')
      .eq('id', userId)
      .single()

    if (!error && data) {
      console.log('[RepoChat] ✅ Profile from DB:', {
        username: data.username,
        is_pro: data.is_pro,
      })
      return {
        ...data,
        avatar_url: data.avatar_url || metaAvatar || '',
      } as Profile
    }
    console.warn('[RepoChat] ❌ Profile query error:', error?.message, error?.code)
    return null
  } catch (err) {
    console.warn('[RepoChat] ❌ Profile fetch exception:', err)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const profileFetchedRef = useRef(false)

  // Build a metadata-based profile (always has avatar, never has is_pro)
  const buildMetaProfile = useCallback((u: User): Profile => {
    const meta = u.user_metadata || {}
    return {
      id: u.id,
      username: meta.user_name || meta.preferred_username || meta.name || 'User',
      avatar_url: meta.avatar_url || '',
      is_pro: false,
    }
  }, [])

  // Fetch profile with retries — called OUTSIDE of onAuthStateChange
  const loadProfile = useCallback(async (currentUser: User) => {
    const meta = currentUser.user_metadata || {}
    const metaAvatar = meta.avatar_url || ''

    // Set metadata profile immediately so avatar shows right away
    if (!profileFetchedRef.current) {
      setProfile(buildMetaProfile(currentUser))
    }

    // Now try to get the real profile from DB with retries
    const delays = [0, 800, 2000] // immediate, 800ms, 2s
    for (const delay of delays) {
      if (delay > 0) {
        await new Promise(r => setTimeout(r, delay))
      }

      const dbProfile = await fetchProfileFromDB(currentUser.id, metaAvatar)
      if (dbProfile) {
        profileFetchedRef.current = true
        setProfile(dbProfile)
        return dbProfile
      }
    }

    console.warn('[RepoChat] All DB attempts failed, using metadata profile')
    return null
  }, [buildMetaProfile])

  // 1) Listen for auth state changes
  useEffect(() => {
    let isMounted = true

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[RepoChat] Auth event:', event)
        if (!isMounted) return

        if (session?.user) {
          setUser(session.user)
          // Only set metadata profile if we haven't fetched the real DB profile yet
          // This prevents overwriting `is_pro` when switching tabs (which triggers a token refresh)
          setProfile(prev => profileFetchedRef.current && prev ? prev : buildMetaProfile(session.user))
        } else {
          setUser(null)
          setProfile(null)
          profileFetchedRef.current = false
        }
        setLoading(false)
      }
    )

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return
      if (session?.user) {
        setUser(session.user)
        setProfile(prev => profileFetchedRef.current && prev ? prev : buildMetaProfile(session.user))
      }
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [buildMetaProfile])

  // 2) SEPARATE effect: when user changes, fetch real profile from DB
  //    This runs AFTER the auth state is fully settled
  useEffect(() => {
    if (!user) return

    let cancelled = false
    profileFetchedRef.current = false

    const fetchDB = async () => {
      // Wait for the Supabase client to fully update its auth headers
      await new Promise(r => setTimeout(r, 300))
      if (cancelled) return

      await loadProfile(user)
    }

    fetchDB()

    return () => { cancelled = true }
  }, [user?.id]) // Only re-run when user ID changes

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/pricing',
      },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    profileFetchedRef.current = false
  }

  const refreshProfile = useCallback(async () => {
    if (user) {
      profileFetchedRef.current = false
      await loadProfile(user)
    }
  }, [user, loadProfile])

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
