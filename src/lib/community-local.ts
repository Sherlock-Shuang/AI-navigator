import type { CommunityTopic, DemoPost, DemoReply } from '../data/community-demo.ts'

export const COMMUNITY_STORAGE_KEY = 'navigator-community-v2'
export const LEGACY_COMMUNITY_STORAGE_KEY = 'navigator-community-v1'
export const COMMUNITY_PAGE_SIZE = 10

export type LocalPost = DemoPost & { liked: boolean }
export type CommunityState = {
  version: 2
  posts: LocalPost[]
  likedDemoIds: string[]
  demoReplies: Record<string, DemoReply[]>
}
export const emptyCommunityState = (): CommunityState => ({ version: 2, posts: [], likedDemoIds: [], demoReplies: {} })
const topics = ['实践复盘', '工具问答', '项目组队', '资源分享']
const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value)
const validText = (value: unknown, max: number) => typeof value === 'string' && value.length <= max
const validDate = (value: unknown) => typeof value === 'string' && (value === '' || Number.isFinite(Date.parse(value)))
const isSeedId = (value: unknown) => typeof value === 'string' && /^(?:demo-post-\d{3}|source-post-(?:v2ex|reddit)-[a-z0-9]+|source-post-csdn-\d+)$/.test(value)
const validReply = (value: unknown): value is DemoReply => isObject(value) && !('source' in value) && validText(value.id, 100) && validText(value.author, 100) && validText(value.content, 500) && validDate(value.createdAt)
const validPost = (value: unknown): value is LocalPost => isObject(value) && !('source' in value) && validText(value.id, 100) && !/^(?:demo-|source-)/.test(value.id as string) && topics.includes(value.topic as string) && validText(value.title, 200) && validText(value.content, 2000) && validText(value.author, 100) && validText(value.role, 100) && validDate(value.createdAt) && Number.isInteger(value.likes) && (value.likes as number) >= 0 && typeof value.liked === 'boolean' && Array.isArray(value.replies) && value.replies.every(validReply) && Array.isArray(value.tags) && value.tags.every(t => validText(t, 100))

// Read old records without changing their stored source or inventing publication dates.
export function parseCommunityState(raw: string | null, legacyRaw: string | null = null): CommunityState {
  if (raw !== null) {
    const value: unknown = JSON.parse(raw)
    if (!isObject(value) || value.version !== 2 || !Array.isArray(value.posts) || !value.posts.every(validPost) || !Array.isArray(value.likedDemoIds) || !value.likedDemoIds.every(isSeedId) || !isObject(value.demoReplies) || !Object.entries(value.demoReplies).every(([id, replies]) => isSeedId(id) && Array.isArray(replies) && replies.every(validReply))) throw new Error('Invalid community data')
    return value as CommunityState
  }
  if (legacyRaw === null) return emptyCommunityState()
  const legacy: unknown = JSON.parse(legacyRaw)
  if (!Array.isArray(legacy)) throw new Error('Invalid legacy community data')
  const posts = legacy.map((entry): LocalPost => {
    if (!isObject(entry) || !validText(entry.id, 100) || /^(?:demo-|source-)/.test(entry.id as string) || !validText(entry.content, 2000) || !Array.isArray(entry.replies) || !entry.replies.every(reply => validText(reply, 500))) throw new Error('Invalid legacy post')
    return {
      id: entry.id as string,
      title: (entry.content as string).split('\n')[0].slice(0, 60),
      content: entry.content as string,
      topic: (topics.includes(entry.topic as string) ? entry.topic : '实践复盘') as CommunityTopic,
      author: '本地访客', role: '我的本地记录', createdAt: '', tags: [],
      liked: entry.liked === true,
      likes: Number.isInteger(entry.likes) && (entry.likes as number) >= 0 ? entry.likes as number : 0,
      replies: entry.replies.map((content, index) => ({ id: `legacy-${entry.id}-${index}`, author: '本地访客', content: content as string, createdAt: '' })),
    }
  })
  return { ...emptyCommunityState(), posts }
}

export function filterCommunityPosts<T extends DemoPost>(posts: T[], query: string, topic: string, month: string, sort: 'newest' | 'popular'): T[] {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return posts.filter(post => {
    const haystack = [post.title, post.content, post.author, post.topic, post.source?.platform || '', post.source?.author || '', post.source?.title || '', ...post.tags, ...post.replies.map(reply => `${reply.author} ${reply.content}`)].join(' ').toLocaleLowerCase()
    return (topic === '全部' || post.topic === topic) && (month === '全部' || post.createdAt.startsWith(month)) && words.every(word => haystack.includes(word))
  }).sort((a, b) => {
    if (sort === 'popular' && a.likes !== b.likes) return b.likes - a.likes
    // Undated legacy records remain visible without a fabricated historical timestamp.
    return (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0) || a.id.localeCompare(b.id)
  })
}
