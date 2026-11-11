'use client'
import { useState } from 'react'
const starters = [
 {topic:'工具问答', title:'带着问题来', text:'我想完成的任务：\n已尝试的工具与方法：\n遇到的具体问题：\n希望得到的帮助：'},
 {topic:'项目组队', title:'寻找共创伙伴', text:'想做的作品或要解决的问题：\n当前进度与已有材料：\n我能承担的工作：\n希望伙伴承担的工作：\n预计投入时间与下一步：'},
 {topic:'实践复盘', title:'分享一次尝试', text:'任务与背景：\n工具和操作方法：\n结果与作品链接：\n失败、局限与修改：\n想请大家反馈的问题：'},
 {topic:'资源分享', title:'整理共学资源', text:'资源名称与原始链接：\n适合的基础与学习目标：\n建议先完成的小练习：\n阅读或试用后的体会：'},
]
export default function DiscussionStarter({content,onApply}:{content:string;onApply:(content:string,topic:string)=>void}) {
 const [selected,setSelected]=useState<number|null>(null)
 const template=selected===null?null:starters[selected]
 const next=template?[content.trim(),template.text].filter(Boolean).join('\n\n'):content
 return <section aria-label="讨论写作模板" className="border-l-4 border-teal-700 pl-4 my-5">
  <h3 className="font-semibold">从一件具体的事开始交流</h3>
  <div className="flex flex-wrap gap-2 mt-3">{starters.map((s,i)=><button type="button" key={s.topic} aria-pressed={selected===i} onClick={()=>setSelected(i)} className={`border rounded-lg px-3 py-2 text-sm ${selected===i?'bg-teal-800 text-white':'bg-white text-teal-800'}`}>{s.title}</button>)}</div>
  {template&&<div className="mt-3"><pre className="whitespace-pre-wrap text-sm leading-7 font-sans text-slate-600">{template.text}</pre><p className="text-xs text-slate-500 mt-2">填写具体内容后再发布。保留已有文字，不自动发布；板块将切换为“{template.topic}”。</p><button type="button" disabled={next.length>2000} onClick={()=>{onApply(next,template.topic);setSelected(null)}} className="mt-3 text-teal-800 underline disabled:opacity-40">{content.trim()?'追加到当前草稿':'使用这个模板'}</button>{next.length>2000&&<p role="status" className="text-amber-800 mt-2">追加后超过2000字，请先精简当前草稿。</p>}</div>}
 </section>
}
