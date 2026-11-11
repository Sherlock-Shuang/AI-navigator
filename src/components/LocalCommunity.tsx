'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, PenLine, Search, ThumbsUp, X } from 'lucide-react'
import { COMMUNITY_DEMO_POSTS, COMMUNITY_TOPICS, type CommunityTopic, type DemoPost, type DemoReply } from '@/data/community-demo'
import { COMMUNITY_PAGE_SIZE, COMMUNITY_STORAGE_KEY, LEGACY_COMMUNITY_STORAGE_KEY, emptyCommunityState, filterCommunityPosts, parseCommunityState, type CommunityState, type LocalPost } from '@/lib/community-local'
import DiscussionStarter from './DiscussionStarter'
import ShareDraft from './ShareDraft'
import { SHARE_KEY } from '@/lib/practice-record'
import { COMMUNITY_CURATED_POSTS } from '@/data/community-curated'

const avatarColors = ['bg-[#e8eee6] text-[#71816b]', 'bg-[#eeeae3] text-[#91816b]', 'bg-[#e8edf0] text-[#788b98]', 'bg-[#efe7e4] text-[#a08b80]']
const seedPosts = [...COMMUNITY_CURATED_POSTS, ...COMMUNITY_DEMO_POSTS]
const seedIds = new Set(seedPosts.map(post => post.id))
const timeFormatter = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
function formatDate(value: string) { return value ? timeFormatter.format(new Date(value)) : '时间未记录' }
function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  const color = avatarColors[Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0) % avatarColors.length]
  return <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full font-medium ${small ? 'h-6 w-6 text-[10px]' : 'h-7 w-7 text-[11px]'} ${color}`}>{name.slice(-2)}</span>
}

export default function LocalCommunity() {
  const [state, setState] = useState<CommunityState>(emptyCommunityState)
  const [ready, setReady] = useState(false)
  const [storageBlocked, setStorageBlocked] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const [topicFilter, setTopicFilter] = useState('全部')
  const [month, setMonth] = useState('全部')
  const [sort, setSort] = useState<'newest' | 'popular'>('newest')
  const [page, setPage] = useState(1)
  const [composing, setComposing] = useState(false)
  const [content, setContent] = useState('')
  const [topic, setTopic] = useState<CommunityTopic>('实践复盘')
  const [expanded, setExpanded] = useState<string[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const feedRef = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const composeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    try {
      // Hydrate browser-only records after SSR; the deterministic seed feed renders on both sides.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(parseCommunityState(localStorage.getItem(COMMUNITY_STORAGE_KEY), localStorage.getItem(LEGACY_COMMUNITY_STORAGE_KEY)))
      if (window.location.hash === '#discussion') {
        const draft = localStorage.getItem(SHARE_KEY)
        if (draft && draft.length <= 2000) { setContent(draft); setComposing(true) }
      }
    } catch {
      setStorageBlocked(true)
      setError('暂时无法读取保存的记录，原数据已保留。请检查浏览器存储设置后刷新。')
    }
    setReady(true)
  }, [])

  function save(next: CommunityState) {
    if (!ready || storageBlocked) return false
    try {
      localStorage.setItem(COMMUNITY_STORAGE_KEY, JSON.stringify(next))
      setState(next)
      setError('')
      return true
    } catch {
      setError('未能保存：浏览器存储空间不足或已被禁用。输入内容已保留，请检查后重试。')
      return false
    }
  }

  const posts: LocalPost[] = [
    ...state.posts,
    ...seedPosts.map(post => ({ ...post, liked: state.likedDemoIds.includes(post.id), likes: post.likes + (state.likedDemoIds.includes(post.id) ? 1 : 0), replies: [...post.replies, ...(state.demoReplies[post.id] || [])] })),
  ]
  const months = [...new Set(posts.filter(post => post.createdAt).map(post => post.createdAt.slice(0, 7)))].sort().reverse()
  const filtered = filterCommunityPosts(posts, query, topicFilter, month, sort)
  const pages = Math.max(1, Math.ceil(filtered.length / COMMUNITY_PAGE_SIZE))
  const currentPage = Math.min(page, pages)
  const visible = filtered.slice((currentPage - 1) * COMMUNITY_PAGE_SIZE, currentPage * COMMUNITY_PAGE_SIZE)
  const canWrite = ready && !storageBlocked

  function changePage(next: number) {
    setPage(next)
    feedRef.current?.focus({ preventScroll: true })
    feedRef.current?.scrollIntoView({ block: 'start' })
  }
  function toggleLike(post: LocalPost) {
    if (seedIds.has(post.id)) {
      save({ ...state, likedDemoIds: post.liked ? state.likedDemoIds.filter(id => id !== post.id) : [...state.likedDemoIds, post.id] })
    } else {
      save({ ...state, posts: state.posts.map(p => p.id === post.id ? { ...p, liked: !p.liked, likes: Math.max(0, p.likes + (p.liked ? -1 : 1)) } : p) })
    }
  }
  function addReply(post: DemoPost, text: string) {
    const reply: DemoReply = { id: crypto.randomUUID(), author: '我', content: text, createdAt: new Date().toISOString() }
    const next = seedIds.has(post.id)
      ? { ...state, demoReplies: { ...state.demoReplies, [post.id]: [...(state.demoReplies[post.id] || []), reply] } }
      : { ...state, posts: state.posts.map(p => p.id === post.id ? { ...p, replies: [...p.replies, reply] } : p) }
    if (!save(next)) return false
    setNotice('回复已保存。')
    return true
  }

  return <section id="discussion" aria-label="社群讨论" className="scroll-mt-8">
    <div className="mb-9 flex items-center justify-between gap-5">
      <div><h1 className="text-[30px] font-semibold tracking-tight text-[#24352e]">社群</h1><p className="mt-2 text-sm text-[#67756c]">聊聊工具，分享最近在做的事。</p></div>
      <button ref={composeButtonRef} type="button" onClick={() => { setComposing(true); requestAnimationFrame(() => composerRef.current?.focus()) }} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#2c7056] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#245c47]"><PenLine size={15} />发起讨论</button>
    </div>

    {composing && <div className="mb-8 rounded-xl border border-[#dce6df] bg-[#fafcfb] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between"><h2 className="font-medium text-[#24352e]">发起讨论</h2><button type="button" aria-label="收起发帖区" onClick={() => { setComposing(false); composeButtonRef.current?.focus() }} className="rounded p-1.5 text-[#67756c] hover:bg-[#edf2ef]"><X size={18} /></button></div>
      <form onSubmit={event => {
        event.preventDefault()
        if (!canWrite || !content.trim()) return
        const post: LocalPost = { id: crypto.randomUUID(), title: content.trim().split('\n')[0].slice(0, 60), topic, content: content.trim(), author: '我', role: '', createdAt: new Date().toISOString(), likes: 0, liked: false, replies: [], tags: [] }
        if (save({ ...state, posts: [post, ...state.posts] })) {
          setContent(''); setComposing(false); setQuery(''); setTopicFilter('全部'); setMonth('全部'); setSort('newest'); setPage(1); setNotice('已保存。'); composeButtonRef.current?.focus()
        }
      }}>
        <label className="text-xs text-[#67756c]">板块<select className="ml-3 rounded-md border border-[#dce6df] bg-white px-3 py-1.5 text-sm text-[#34473d]" value={topic} onChange={event => setTopic(event.target.value as CommunityTopic)}>{COMMUNITY_TOPICS.map(t => <option key={t}>{t}</option>)}</select></label>
        <textarea ref={composerRef} aria-label="帖子内容" required maxLength={2000} value={content} onChange={event => setContent(event.target.value)} className="my-4 w-full resize-y rounded-lg border border-[#e1e8e3] bg-white p-4 text-sm leading-7" rows={5} placeholder={'用第一行写个标题\n聊聊遇到的问题，或最近试过的方法。'} />
        <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs text-[#67756c]">{content.length}/2000 · 仅此设备可见</span><button disabled={!canWrite || !content.trim()} className="rounded-lg bg-[#2c7056] px-5 py-2 text-sm text-white">发布</button></div>
      </form>
      <details className="mt-4 border-t border-[#e6ece8] pt-3 text-xs text-[#67756c]"><summary>使用草稿或模板</summary><div className="pt-4"><ShareDraft onApply={setContent} /><DiscussionStarter content={content} onApply={(text, board) => { setContent(text); setTopic(board as CommunityTopic) }} /></div></details>
    </div>}
    {error && <p role="alert" className="mb-5 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">{error}</p>}
    <p role="status" className={notice ? 'mb-4 text-sm text-[#2c7056]' : 'sr-only'}>{notice}</p>

    <div className="grid items-start gap-8 md:grid-cols-[160px_minmax(0,1fr)] lg:gap-12">
      <aside className="min-w-0 md:sticky md:top-8">
        <nav aria-label="按板块筛选" className="flex gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {['全部', ...COMMUNITY_TOPICS].map(t => <button type="button" key={t} aria-pressed={topicFilter === t} onClick={() => { setTopicFilter(t); setPage(1) }} className={`flex shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors ${topicFilter === t ? 'bg-[#edf4ef] font-medium text-[#2c7056]' : 'text-[#67756c] hover:bg-[#f5f7f5] hover:text-[#34473d]'}`}><span>{t === '全部' ? '全部讨论' : t}</span><span className="hidden text-xs tabular-nums md:inline">{t === '全部' ? posts.length : posts.filter(post => post.topic === t).length}</span></button>)}
        </nav>
        <div className="mt-8 hidden border-t border-[#edf0ed] px-3.5 pt-5 md:block"><Link href="/practice" className="inline-flex items-center gap-2 text-xs text-[#67756c] hover:text-[#2c7056]">任务实践<ArrowUpRight size={13} /></Link><Link href="/" className="mt-4 block text-xs text-[#67756c] hover:text-[#2c7056]">浏览工具</Link></div>
      </aside>

      <div ref={feedRef} tabIndex={-1} className="min-w-0 scroll-mt-8 outline-none">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative min-w-36 flex-1"><Search className="absolute left-3 top-3 text-[#67756c]" size={16} /><input aria-label="搜索讨论" value={query} onChange={event => { setQuery(event.target.value); setPage(1) }} placeholder="搜索讨论" className="w-full rounded-lg border border-[#e6ece8] bg-[#fafcfb] py-2.5 pl-9 pr-9 text-sm placeholder:text-[#67756c]" />{query && <button type="button" aria-label="清除搜索" onClick={() => { setQuery(''); setPage(1) }} className="absolute right-1.5 top-1.5 rounded p-1.5 text-[#67756c]"><X size={16} /></button>}</div>
          <select aria-label="按月份筛选" value={month} onChange={event => { setMonth(event.target.value); setPage(1) }} className="max-w-28 bg-transparent py-2 text-xs text-[#67756c]"><option value="全部">全部时间</option>{months.map(m => <option key={m} value={m}>{m.slice(0, 4)} 年 {Number(m.slice(5))} 月</option>)}</select>
          <select aria-label="讨论排序" value={sort} onChange={event => { setSort(event.target.value as 'newest' | 'popular'); setPage(1) }} className="bg-transparent py-2 text-xs text-[#67756c]"><option value="newest">最近收录</option><option value="popular">最多点赞</option></select>
        </div>
        <div className="mb-1 flex items-center justify-between border-b border-[#e6ece8] pb-4"><h2 className="text-sm font-medium text-[#34473d]">{query ? '搜索结果' : topicFilter === '全部' ? '全部讨论' : topicFilter}</h2><p role="status" className="text-xs text-[#67756c]">{filtered.length} 条讨论</p></div>
        <div className="divide-y divide-[#edf0ed]" data-testid="discussion-feed">
          {visible.map(post => {
            const demo = seedIds.has(post.id)
            const open = expanded.includes(post.id)
            const author = post.source ? `${post.source.platform} / ${post.source.author}` : demo ? post.author : '我'
            return <article key={post.id} data-post-id={post.id} className="py-6 sm:py-7">
              <div className="mb-3 flex flex-wrap items-center gap-2.5"><Avatar name={author} /><span className="min-w-0 break-words text-[13px] font-medium text-[#34473d]">{author}</span><time className="shrink-0 text-xs text-[#67756c]" dateTime={post.createdAt || undefined}>{post.source ? `收录 ${post.createdAt.slice(0, 10).replaceAll('-', '/')}` : formatDate(post.createdAt)}</time><span className="ml-auto hidden text-xs text-[#67756c] sm:inline">{post.topic}</span></div>
              <h3 className="mb-2 break-words text-[17px] font-semibold leading-7 text-[#24352e]">{post.title}</h3>
              {post.content !== post.title && <p className="whitespace-pre-wrap break-words text-sm leading-[1.85] text-[#67756c]">{!demo && post.content.startsWith(`${post.title}\n`) ? post.content.slice(post.title.length + 1) : post.content}</p>}
              {post.source && <p className="mt-3 text-xs leading-5 text-[#67756c]">内容摘读 · 原帖 {formatDate(post.source.publishedAt)}<a href={post.source.url} target="_blank" rel="noopener noreferrer" title={post.source.title} className="ml-3 inline-flex items-center gap-1 text-[#2c7056] underline underline-offset-4">查看原帖<ArrowUpRight size={12} /></a></p>}
              <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-[#67756c]">
                <button type="button" aria-label={`${post.liked ? '取消点赞' : '点赞'}：${post.title}`} aria-pressed={post.liked} disabled={!canWrite} onClick={() => toggleLike(post)} className={`inline-flex items-center gap-1.5 ${post.liked ? 'text-[#2c7056]' : 'hover:text-[#2c7056]'}`}><ThumbsUp size={14} strokeWidth={1.5} fill={post.liked ? 'currentColor' : 'none'} /><span>{post.likes || '赞'}</span></button>
                <button type="button" aria-label={`${open ? '收起' : '展开'}回复：${post.title}`} aria-expanded={open} aria-controls={`replies-${post.id}`} onClick={() => setExpanded(old => open ? old.filter(id => id !== post.id) : [...old, post.id])} className="inline-flex items-center gap-1.5 hover:text-[#2c7056]"><MessageCircle size={14} strokeWidth={1.5} /><span>{post.source ? '查看讨论' : `${post.replies.length} 条回复`}</span></button>
                {post.tags.slice(0, 2).map(tag => <button type="button" key={tag} onClick={() => { setQuery(tag); setPage(1); feedRef.current?.focus({ preventScroll: true }); feedRef.current?.scrollIntoView({ block: 'start' }) }} className="hidden text-[#67756c] hover:text-[#2c7056] sm:inline"># {tag}</button>)}
                {!demo && <button type="button" disabled={!canWrite} onClick={() => setDeleteId(post.id)} className="ml-auto hover:text-red-700">删除</button>}
              </div>
              {deleteId === post.id && <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-[#f5f7f5] p-3 text-sm"><p>删除这条讨论及其回复？</p><button type="button" onClick={() => { if (save({ ...state, posts: state.posts.filter(p => p.id !== post.id) })) { setDeleteId(null); setNotice('已删除。') } }} className="text-red-700">确认删除</button><button type="button" onClick={() => setDeleteId(null)}>取消</button></div>}
              {open && <div id={`replies-${post.id}`} className="mt-5 rounded-lg bg-[#f7f9f7] p-4 sm:p-5">
                {post.source && post.replies.some(reply => reply.source) && <p className="mb-4 text-xs text-[#67756c]">讨论</p>}
                <div className="space-y-4">{post.replies.map(reply => <div key={reply.id} className="flex gap-2.5"><Avatar name={reply.author === '本地访客' ? '我' : reply.author} small /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><p className="text-xs font-medium text-[#34473d]">{reply.author === '本地访客' ? '我' : reply.author}</p><time className="text-[11px] text-[#67756c]" dateTime={reply.createdAt || undefined}>{formatDate(reply.createdAt)}</time></div><p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-[#67756c]">{reply.content}</p>{reply.source && <a href={reply.source.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-[#2c7056] underline underline-offset-4">原评论摘读</a>}</div></div>)}</div>
                {!post.replies.length && <p className="text-sm text-[#67756c]">还没有回复。</p>}
                <form className="mt-5 flex items-start gap-2" onSubmit={event => { event.preventDefault(); const form = event.currentTarget; const text = String(new FormData(form).get('reply') || '').trim(); if (text && text.length <= 500 && addReply(post, text)) form.reset() }}><input name="reply" aria-label={`回复 ${author} 的讨论`} maxLength={500} required placeholder="写下回复…" className="min-w-0 flex-1 rounded-md border border-[#e1e8e3] bg-white px-3 py-2 text-sm" /><button disabled={!canWrite} className="rounded-md bg-[#2c7056] px-4 py-2 text-sm text-white">回复</button></form>
              </div>}
            </article>
          })}
        </div>
        {!filtered.length && <div className="px-4 py-16 text-center"><h3 className="text-sm text-[#67756c]">没有找到相关讨论</h3><button type="button" onClick={() => { setQuery(''); setTopicFilter('全部'); setMonth('全部'); setPage(1) }} className="mt-4 text-xs text-[#2c7056] underline underline-offset-4">清除全部筛选</button></div>}
        {filtered.length > 0 && <nav aria-label="讨论分页" className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e6ece8] pt-6"><span className="text-xs text-[#67756c]">{currentPage} / {pages}</span><div className="flex max-w-full flex-wrap justify-end gap-1"><button type="button" aria-label="上一页" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} className="rounded-md p-2 text-[#67756c]"><ChevronLeft size={16} /></button>{Array.from({ length: pages }, (_, index) => index + 1).map(n => <button type="button" key={n} aria-label={`第 ${n} 页`} aria-current={n === currentPage ? 'page' : undefined} onClick={() => changePage(n)} className={`h-8 min-w-8 rounded-md px-2 text-xs ${n === currentPage ? 'bg-[#edf4ef] font-medium text-[#2c7056]' : 'text-[#67756c] hover:bg-[#f5f7f5]'}`}>{n}</button>)}<button type="button" aria-label="下一页" disabled={currentPage === pages} onClick={() => changePage(currentPage + 1)} className="rounded-md p-2 text-[#67756c]"><ChevronRight size={16} /></button></div></nav>}
      </div>
    </div>
  </section>
}
