import { supabase, type Profile, type Post, type PostWithProfile, type Comment, type CommentWithProfile } from './supabase'

async function profilesFor(ids: string[]) {
  if (!ids.length) return new Map<string, Profile>()
  const { data, error } = await supabase.from('profiles').select('id,username,avatar_url,updated_at,website').in('id', [...new Set(ids)])
  if (error) throw error
  return new Map((data as Profile[]).map(p => [p.id, p]))
}
export async function loadPosts(userId?: string, offset = 0): Promise<PostWithProfile[]> {
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).order('id', { ascending: false }).range(offset, offset + 19)
  if (error) throw error
  const posts = data as Post[]
  const profiles = await profilesFor(posts.map(p => p.user_id))
  const liked = new Set<string>()
  if (userId && posts.length) {
    const { data, error } = await supabase.from('post_likes').select('post_id').eq('user_id', userId).in('post_id', posts.map(p => p.id))
    if (error) throw error
    data.forEach(p => liked.add(p.post_id))
  }
  return posts.map(p => ({ ...p, profiles: profiles.get(p.user_id) || null, user_has_liked: liked.has(p.id) }))
}
export async function loadComments(postId: string): Promise<CommentWithProfile[]> {
  const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at').limit(100)
  if (error) throw error
  const comments = data as Comment[]
  const profiles = await profilesFor(comments.map(c => c.user_id))
  return comments.map(c => ({ ...c, profiles: profiles.get(c.user_id) || null }))
}
export function communityError(error: unknown) {
  const code = (error as { code?: string })?.code
  if (code === '23514') return '内容为空或超出长度限制，请修改后重试。'
  if (code === '42501') return '没有操作权限，请重新登录或联系管理员检查数据库配置。'
  if (code === 'P0001') return '操作过于频繁，请稍后再试。'
  if (code === '42P01' || code === '42703' || code?.startsWith('PGRST')) return '社群数据库尚未完成初始化或升级，请联系管理员。'
  return '操作失败，请检查网络后重试；输入内容已保留。'
}
