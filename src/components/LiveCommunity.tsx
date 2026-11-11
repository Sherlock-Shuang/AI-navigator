'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase, type PostWithProfile } from '@/lib/supabase'
import { loadPosts, communityError } from '@/lib/community'
import { useAuthStore } from '@/stores/auth'
import PostCard from './PostCard'
import DiscussionStarter from '@/components/DiscussionStarter'
import ShareDraft from './ShareDraft'
import EmailLoginModal from './EmailLoginModal'
export default function LiveCommunity() {
 const user = useAuthStore(s=>s.user)
 const userId = user?.id
 const [posts,setPosts]=useState<PostWithProfile[]>([]),[content,setContent]=useState(''),[topic,setTopic]=useState('实践复盘'),[loading,setLoading]=useState(true),[posting,setPosting]=useState(false),[error,setError]=useState(''),[login,setLogin]=useState(false),[more,setMore]=useState(false)
 const generation=useRef(0), busy=useRef(false), readBusy=useRef(false)
 const refresh=useCallback(async()=>{const id=++generation.current;setLoading(true);setError('');try{const rows=await loadPosts(userId);if(id===generation.current){setPosts(rows);setMore(rows.length===20)}}catch(e){if(id===generation.current)setError(communityError(e))}finally{if(id===generation.current)setLoading(false)}},[userId])
 const invalidateRequests=useCallback(()=>{generation.current++},[])
 // Starting a Supabase read on mount or account change must immediately expose its loading state.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{void refresh();return invalidateRequests},[refresh,invalidateRequests])
 async function publish(e:React.FormEvent){e.preventDefault();if(!user){setLogin(true);return}if(busy.current||!content.trim())return;busy.current=true;setPosting(true);setError('');try{const {error}=await supabase.from('posts').insert({user_id:user.id,content:content.trim(),topic});if(error)throw error;setContent('');await refresh()}catch(e){setError(communityError(e))}finally{busy.current=false;setPosting(false)}}
 async function next(){if(readBusy.current)return;readBusy.current=true;const id=generation.current;try{const rows=await loadPosts(user?.id,posts.length);if(id!==generation.current)return;setPosts(old=>[...old,...rows.filter(r=>!old.some(p=>p.id===r.id))]);setMore(rows.length===20)}catch(e){setError(communityError(e))}finally{readBusy.current=false}}
 return <section id="discussion" aria-label="线上讨论"><div className="flex justify-between items-center mb-5"><h2 className="text-2xl font-bold">线上讨论</h2>{user?<button onClick={async()=>{const {error}=await supabase.auth.signOut();if(error)setError(communityError(error))}}>退出登录</button>:<button onClick={()=>setLogin(true)} className="text-teal-700">邮箱登录</button>}</div><p className="text-sm text-slate-500 mb-4">帖子与评论公开可见，请勿发布个人联系方式或他人隐私。请围绕工具与实践友善交流。</p><ShareDraft onApply={setContent}/><DiscussionStarter content={content} onApply={(text,board)=>{setContent(text);setTopic(board)}}/><form onSubmit={publish} className="bg-white rounded-xl p-5 border"><label>讨论板块<select value={topic} onChange={e=>setTopic(e.target.value)} className="border rounded p-2 ml-3">{['实践复盘','工具问答','项目组队','资源分享'].map(t=><option key={t}>{t}</option>)}</select></label><textarea aria-label="帖子内容" maxLength={2000} required value={content} onChange={e=>setContent(e.target.value)} placeholder="描述任务、方法、结果与局限…" className="border rounded-xl p-3 my-4 w-full" rows={4}/><div className="flex justify-between"><span className="text-sm text-slate-500">{content.length}/2000</span><button disabled={posting||!content.trim()} className="bg-teal-700 text-white rounded-lg px-5 py-2 disabled:opacity-40">{posting?'发布中…':user?'发布':'登录后发布'}</button></div></form>{error&&<p role="alert" className="bg-amber-50 p-4 my-4">{error}</p>}<button onClick={()=>void refresh()} disabled={loading} className="my-5 text-teal-700">{loading?'加载中…':'刷新讨论'}</button>{!loading&&!error&&!posts.length&&<p className="py-10 text-slate-500">暂无讨论，分享你的第一条实践记录吧。</p>}<div className="space-y-4">{posts.map(post=><PostCard key={`${user?.id||'guest'}:${post.id}`} post={post} onDeleted={()=>setPosts(old=>old.filter(p=>p.id!==post.id))}/>)}</div>{more&&<button onClick={()=>void next()} className="my-6">加载更多</button>}<EmailLoginModal isOpen={login} onClose={()=>setLogin(false)} onSuccess={()=>{setLogin(false)}}/></section>
}
