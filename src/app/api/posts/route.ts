import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
// Public reads use the public key and obey RLS; never bypass policy with a service role.
export async function GET() {
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
 if(!url||!key)return NextResponse.json({error:'社群数据库尚未配置'},{status:503})
 const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}})
 const {data,error}=await db.from('posts').select('id,content,topic,created_at,likes_count,user_id').order('created_at',{ascending:false}).limit(20)
 if(error)return NextResponse.json({error:'暂时无法读取社群内容，请稍后重试'},{status:503})
 return NextResponse.json({posts:data},{headers:{'Cache-Control':'no-store'}})
}
