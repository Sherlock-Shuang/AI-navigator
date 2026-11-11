import { TOOLS_DATA } from '../src/data/tools.ts'
import { PRACTICE_PATHS } from '../src/data/practice.ts'
import { reviewAge } from '../src/lib/recommendations.ts'
const today=new Date().toISOString().slice(0,10), ids=new Set<string>(),errors:string[]=[]
for(const t of TOOLS_DATA){
 if(ids.has(t.id))errors.push(`duplicate id: ${t.id}`);ids.add(t.id)
 for(const url of [t.url,...(t.sourceUrl?[t.sourceUrl]:[])]){try{if(new URL(url).protocol!=='https:')errors.push(`non-HTTPS: ${t.id}`)}catch{errors.push(`invalid URL: ${t.id}`)}}
 if(t.reviewStatus==='官方资料已核查'&&(!t.sourceUrl||reviewAge(t,today)===null))errors.push(`missing/invalid evidence: ${t.id}`)
 if(!t.name.trim()||!t.desc.trim())errors.push(`empty description: ${t.id}`)
}
for(const p of PRACTICE_PATHS)for(const t of p.tools)if(!ids.has(t.id))errors.push(`unknown task tool: ${t.id}`)
console.log(JSON.stringify({date:today,total:TOOLS_DATA.length,reviewed:TOOLS_DATA.filter(t=>t.reviewStatus==='官方资料已核查').length,needsReview:TOOLS_DATA.filter(t=>reviewAge(t,today)===null||(reviewAge(t,today)??0)>30).map(t=>t.id),errors},null,2))
if(errors.length)process.exitCode=1
