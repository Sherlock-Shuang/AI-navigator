'use client'

import { useState } from 'react'
import Link from 'next/link'
import LocalCommunity from '@/components/LocalCommunity'
import LiveCommunity from '@/components/LiveCommunity'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function Community() {
  const [mode, setMode] = useState<'local' | 'live'>('local')
  return <div className="min-h-screen bg-white text-[#34473d]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif' }}>
    <header className="border-b border-[#edf0ed]">
      <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-5 px-5 py-6 sm:px-8">
        <Link href="/" className="text-[18px] font-semibold tracking-tight text-[#2c7056]">AI Navigator<span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#88aa91]" /></Link>
        <nav aria-label="主导航" className="flex items-center gap-5 text-[13px] sm:gap-8"><Link href="/" className="text-[#67756c] hover:text-[#2c7056]">导航</Link><Link href="/practice" className="text-[#67756c] hover:text-[#2c7056]">实践</Link><Link href="/community" aria-current="page" className="font-medium text-[#2c7056]">社群</Link></nav>
      </div>
    </header>
    <main className="mx-auto max-w-[1080px] px-5 pb-12 pt-9 sm:px-8 sm:pt-12">
      {isSupabaseConfigured && <div className="mb-6 flex items-center gap-5 text-sm" role="group" aria-label="讨论范围"><button type="button" aria-pressed={mode === 'live'} onClick={() => setMode('live')} className={mode === 'live' ? 'font-medium text-[#2c7056]' : 'text-[#67756c]'}>当前讨论</button><button type="button" aria-pressed={mode === 'local'} onClick={() => setMode('local')} className={mode === 'local' ? 'font-medium text-[#2c7056]' : 'text-[#67756c]'}>历史讨论</button></div>}
      {mode === 'live' && isSupabaseConfigured ? <LiveCommunity /> : <LocalCommunity />}
      <footer className="mt-12 border-t border-[#edf0ed] pt-6 text-xs text-[#67756c]">AI Navigator</footer>
    </main>
  </div>
}
