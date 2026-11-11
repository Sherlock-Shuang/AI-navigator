import Link from 'next/link'
import { TOOLS_DATA } from '@/data/tools'
import { reviewAge } from '@/lib/recommendations'
export const dynamic='force-dynamic'
export default function Catalog(){
 const today=new Date().toISOString().slice(0,10)
 const rows=TOOLS_DATA.map(tool=>({tool,age:reviewAge(tool,today)})).sort((a,b)=>(a.age===null?-1:b.age===null?1:b.age-a.age)||a.tool.id.localeCompare(b.tool.id))
 const checked=rows.filter(({tool,age})=>tool.reviewStatus==='官方资料已核查'&&!!tool.sourceUrl&&age!==null&&age<=30).length
 return <main className="bg-slate-50 min-h-screen px-5 py-10 text-slate-800"><div className="max-w-6xl mx-auto"><Link href="/" className="text-teal-700">← 工具导航</Link><h1 className="text-4xl font-bold mt-10">工具资料维护记录</h1><p className="my-5 max-w-3xl leading-7">目录共 {rows.length} 项，其中 {checked} 项在近30天核查过官方资料。资料超过30天会标记为待更新；这不表示工具失效。核查记录不是使用测试或服务保证。</p><p className="text-sm text-slate-500 mb-6">状态计算日期：{today} · 资料通过人工核对维护，尚未自动采集官网变更。</p><div className="overflow-x-auto bg-white border rounded-xl"><table className="w-full text-left text-sm"><thead className="bg-slate-100"><tr>{['工具','状态','核查日期','来源'].map(h=><th key={h} scope="col" className="p-4">{h}</th>)}</tr></thead><tbody>{rows.map(({tool,age})=><tr key={tool.id} className="border-t"><th scope="row" className="p-4 font-medium">{tool.name}</th><td className="p-4">{age===null?'待复核':age>30?'待更新':'近30天已核查'}</td><td className="p-4 whitespace-nowrap">{tool.checkedAt||'未记录'}</td><td className="p-4"><a href={tool.sourceUrl||tool.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">{tool.sourceUrl?'官方来源':'工具入口'} ↗</a></td></tr>)}</tbody></table></div></div></main>
}
