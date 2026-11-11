'use client'
import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { communityError } from '@/lib/community'
export default function ReportPost({postId}:{postId:string}){
 const user=useAuthStore(s=>s.user),lock=useRef(false)
 const [open,setOpen]=useState(false),[reason,setReason]=useState('垃圾广告'),[details,setDetails]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false)
 async function report(e:React.FormEvent){e.preventDefault();if(!user){setMessage('请先在讨论区上方登录，再提交举报。');return}if(lock.current)return;lock.current=true;setBusy(true);try{const {error}=await supabase.from('post_reports').insert({post_id:postId,reporter_id:user.id,reason,details:details.trim()});if(error)throw error;setMessage('举报已登记，等待管理员处理。帖子不会因此自动删除。');setOpen(false);setDetails('')}catch(e){setMessage((e as {code?:string}).code==='23505'?'你已举报过这条帖子，无需重复提交。':communityError(e))}finally{lock.current=false;setBusy(false)}}
 return <div className="mt-4 text-sm"><button type="button" onClick={()=>setOpen(!open)} className="text-slate-500 underline">举报帖子</button>{open&&<form onSubmit={report} className="border rounded-lg p-4 mt-3"><label>举报原因<select value={reason} onChange={e=>setReason(e.target.value)} className="border rounded p-2 ml-3">{['垃圾广告','侵犯隐私','不友善内容','其他'].map(r=><option key={r}>{r}</option>)}</select></label><label className="block mt-3">补充说明（可选，不超过500字）<textarea value={details} maxLength={500} onChange={e=>setDetails(e.target.value)} className="block w-full border rounded p-2 mt-2"/></label><p className="my-3 text-slate-500">举报记录仅你和管理员可见，请不要在说明中重复粘贴他人隐私。</p><button disabled={busy} className="bg-teal-700 text-white rounded px-4 py-2">{busy?'提交中…':'提交举报'}</button></form>}<p role="status" className="mt-2">{message}</p></div>
}
