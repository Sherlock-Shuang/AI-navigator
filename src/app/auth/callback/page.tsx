'use client'
import { useEffect,useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
export default function AuthCallbackPage(){const router=useRouter(),setUser=useAuthStore(s=>s.setUser),[error,setError]=useState('');useEffect(()=>{let active=true;(async()=>{try{const params=new URLSearchParams(window.location.search),hash=new URLSearchParams(window.location.hash.slice(1));if(params.has('error')||hash.has('error'))throw new Error();const code=params.get('code');if(code){const {error}=await supabase.auth.exchangeCodeForSession(code);if(error)throw error}const {data,error}=await supabase.auth.getSession();if(error||!data.session)throw error||new Error();if(active){setUser(data.session.user);router.replace('/community')}}catch{if(active)setError('登录链接无效或已过期，请返回社群重新发送登录邮件。')}})();return()=>{active=false}},[router,setUser]);return <main className="p-10 text-center text-slate-800"><p role="status">{error||'正在完成登录…'}</p>{error&&<Link href="/community" className="text-teal-700">返回社群</Link>}</main>}
