import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'unconfigured', { auth: { persistSession: isSupabaseConfigured } })

// Database types
export interface Profile {
  id: string
  updated_at: string | null
  username: string | null
  avatar_url: string | null
  website: string | null
}

export interface Post {
  id: string
  user_id: string
  content: string
  created_at: string
  topic: string
  likes_count: number
}

export interface Comment {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
}

export interface CommentWithProfile extends Comment {
  profiles: Profile | null
}

export interface PostWithProfile extends Post {
  profiles: Profile | null
  user_has_liked?: boolean // 辅助字段，前端判断是否已点赞
}
