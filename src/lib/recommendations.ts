import type { Tool } from '../data/tools'
import type { PracticePath } from '../data/practice'
export function reviewAge(tool: Tool, today: string): number | null {
 if (!tool.checkedAt || !/^\d{4}-\d{2}-\d{2}$/.test(tool.checkedAt)) return null
 const day=Date.parse(tool.checkedAt+'T00:00:00Z'), now=Date.parse(today+'T00:00:00Z')
 if (!Number.isFinite(day)||!Number.isFinite(now)||day>now) return null
 return Math.floor((now-day)/86400000)
}
export function recommendTools(tools: Tool[], path: PracticePath, query: string, freshOnly: boolean, today: string) {
 const words=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
 return path.tools.flatMap(mapping=>{
  const tool=tools.find(t=>t.id===mapping.id)
  if(!tool)return []
  const age=reviewAge(tool,today)
  const fresh=tool.reviewStatus==='官方资料已核查'&&!!tool.sourceUrl&&age!==null&&age<=30
  if(freshOnly&&!fresh)return []
  const haystack=[tool.name,tool.desc,...tool.tags].join(' ').toLocaleLowerCase()
  const matched=words.filter(w=>haystack.includes(w))
  if(words.length&&!matched.length)return []
  const score=3+(fresh?2:0)+Math.min(matched.length,3)
  return [{tool,score,reason:mapping.reason,reasons:['适用于该任务 +3',...(fresh?['近30天官方资料已核查 +2']:[]),...(matched.length?[`命中关键词 +${Math.min(matched.length,3)}`]:[])],fresh}]
 }).sort((a,b)=>b.score-a.score||a.tool.id.localeCompare(b.tool.id))
}
