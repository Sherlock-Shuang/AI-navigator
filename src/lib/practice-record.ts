export type PracticeRecord = { version:1; taskId:string; goal:string; tools:string; result:string; difficulty:string; minutes:string; completed:number[]; updatedAt:string }
export const RECORD_KEY='navigator-practice-v1'
export const SHARE_KEY='navigator-share-draft-v1'
export function emptyRecord(taskId:string):PracticeRecord{return {version:1,taskId,goal:'',tools:'',result:'',difficulty:'',minutes:'',completed:[],updatedAt:''}}
export function parseRecords(raw:string):Record<string,PracticeRecord> {
 const value:unknown=JSON.parse(raw)
 if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('invalid records')
 const out:Record<string,PracticeRecord>={}
 for(const id of ['paper','website','presentation','film']){
  const r=(value as Record<string,unknown>)[id] as PracticeRecord|undefined
  if(!r)continue
  if(r.version!==1||r.taskId!==id||!['goal','tools','result','difficulty','minutes','updatedAt'].every(k=>typeof (r as unknown as Record<string,unknown>)[k]==='string')||!Array.isArray(r.completed)||r.completed.some(i=>!Number.isInteger(i)||i<0||i>2))throw new Error('invalid record')
  if([r.goal,r.tools,r.result,r.difficulty].some(s=>s.length>500)||!/^\d{0,4}$/.test(r.minutes))throw new Error('invalid field')
  out[id]=r
 }
 return out
}
export function shareText(title:string,r:PracticeRecord){return `【${title}】\n目标：${r.goal||'待补充'}\n工具：${r.tools||'待补充'}\n结果与证据：${r.result||'待补充'}\n局限与问题：${r.difficulty||'待补充'}\n实际用时：${r.minutes?`${r.minutes}分钟`:'未记录'}`}
export function recordsCsv(records:PracticeRecord[]){
 const cell=(s:string)=>'"'+(/^[\s]*[=+@-]/.test(s)?"'"+s:s).replaceAll('"','""')+'"'
 return '\uFEFF'+[['task','goal','tools','result','difficulty','minutes','steps_completed','updated_at'],...records.map(r=>[r.taskId,r.goal,r.tools,r.result,r.difficulty,r.minutes,String(r.completed.length),r.updatedAt])].map(row=>row.map(cell).join(',')).join('\r\n')
}
