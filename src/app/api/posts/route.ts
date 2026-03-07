import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
  try {
    const { data: postData, error: postErr } = await supabaseAdmin
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    if (postErr) throw postErr

    const userIds = (postData || []).map((p) => p.user_id)
    const uniqueIds = Array.from(new Set(userIds))
    const { data: profileData, error: profileErr } = await supabaseAdmin
      .from('profiles')
      .select('id, username, avatar_url, updated_at, website')
      .in('id', uniqueIds)
    if (profileErr) throw profileErr

    const profileMap = new Map<string, typeof profileData[number]>()
    for (const prof of profileData || []) profileMap.set(prof.id, prof)

    const merged = (postData || []).map((p) => ({
      ...p,
      profiles: profileMap.get(p.user_id) || null,
    }))

    return NextResponse.json({ posts: merged }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json(
      { error: err.message || 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
