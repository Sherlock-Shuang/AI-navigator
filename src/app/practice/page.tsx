import Link from 'next/link'
import PracticeWorkspace from '@/components/PracticeWorkspace'
export default function Practice(){return <main className="min-h-screen bg-slate-50 text-slate-800 px-5 py-10"><div className="max-w-6xl mx-auto"><Link href="/" className="text-teal-700">← 工具导航</Link><h1 className="text-4xl font-bold mt-10">从一个任务开始学 AI</h1><p className="text-slate-600 mt-4 max-w-2xl">选一个任务，按步骤尝试，留下结果和局限。让下一次选择工具更有依据。</p><PracticeWorkspace/></div></main>}
