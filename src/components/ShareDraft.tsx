'use client'
import { useState } from 'react'
import { SHARE_KEY } from '@/lib/practice-record'
export default function ShareDraft({onApply}:{onApply:(text:string)=>void}){
 const [message,setMessage]=useState('')
 return <div className="mb-4 text-sm"><button type="button" className="text-teal-700 underline" onClick={()=>{try{const text=localStorage.getItem(SHARE_KEY);if(!text){setMessage('还没有分享草稿，请先到实践页生成。');return}if(text.length>2000){setMessage('草稿超过2000字，请缩短实践记录后重新生成。');return}onApply(text);setMessage('已载入草稿，请检查内容后手动发布。')}catch{setMessage('浏览器存储不可用，无法读取草稿。')}}}>载入实践页分享草稿（替换输入）</button><p role="status" className="mt-2">{message}</p></div>
}
