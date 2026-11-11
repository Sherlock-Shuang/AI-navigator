import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COMMUNITY_DEMO_POSTS, type DemoPost } from '../src/data/community-demo.ts'
import {
  emptyCommunityState,
  filterCommunityPosts,
  parseCommunityState,
  type CommunityState,
  type LocalPost,
} from '../src/lib/community-local.ts'

const post = (patch: Partial<LocalPost> = {}): LocalPost => ({
  id: 'local-001',
  title: '比较 DeepSeek 的实验',
  content: '把同一篇论文整理为阅读卡片，逐条核对引用。',
  author: '阿宁',
  role: '我的本地记录',
  topic: '实践复盘',
  createdAt: '2026-06-12T10:00:00+08:00',
  likes: 7,
  liked: false,
  tags: ['证据核验'],
  replies: [{ id: 'reply-001', author: '小满', content: '补上原文页码会更方便复查。', createdAt: '2026-06-12T11:00:00+08:00' }],
  ...patch,
})

test('the historical demo contains 76 distinct discussions across four topics and March–June', () => {
  assert.equal(COMMUNITY_DEMO_POSTS.length, 76)
  assert.equal(new Set(COMMUNITY_DEMO_POSTS.map(p => p.id)).size, 76)
  assert.equal(new Set(COMMUNITY_DEMO_POSTS.map(p => p.title)).size, 76)
  assert.equal(new Set(COMMUNITY_DEMO_POSTS.map(p => p.content)).size, 76)
  assert.deepEqual(new Set(COMMUNITY_DEMO_POSTS.map(p => p.topic)), new Set(['实践复盘', '工具问答', '项目组队', '资源分享']))
  assert.deepEqual(new Set(COMMUNITY_DEMO_POSTS.map(p => p.createdAt.slice(0, 7))), new Set(['2026-03', '2026-04', '2026-05', '2026-06']))
  for (const entry of COMMUNITY_DEMO_POSTS) {
    assert.match(entry.id, /^demo-post-\d{3}$/)
    assert.ok(entry.title.trim() && entry.content.trim() && entry.author.trim())
    assert.ok(entry.content.length <= 2000)
    assert.ok(Number.isFinite(Date.parse(entry.createdAt)))
  }
})

test('152 demo replies are individually written and follow their parent discussion chronologically', () => {
  const replies = COMMUNITY_DEMO_POSTS.flatMap(p => p.replies)
  assert.equal(replies.length, 152)
  assert.equal(new Set(replies.map(r => r.id)).size, 152)
  assert.equal(new Set(replies.map(r => r.content)).size, 152)
  for (const entry of COMMUNITY_DEMO_POSTS) {
    let previousTime = Date.parse(entry.createdAt)
    for (const reply of entry.replies) {
      assert.ok(reply.author.trim() && reply.content.trim())
      assert.ok(reply.content.length <= 500)
      const time = Date.parse(reply.createdAt)
      assert.ok(Number.isFinite(time) && time >= previousTime, `${entry.id}: reply predates its discussion or preceding reply`)
      previousTime = time
    }
  }
})

test('legacy migration retains content, likes and replies without fabricating timestamps', () => {
  const legacy = [
    { id: 'old-1', topic: '工具问答', content: '第一行标题\n第二行正文，保留换行。', likes: 9, liked: true, replies: ['第一条回复', '第二条\n多行回复'] },
    { id: 'old-2', topic: '资源分享', content: '另一条原有记录', likes: 0, liked: false, replies: [] },
  ]
  const state = parseCommunityState(null, JSON.stringify(legacy))
  assert.equal(state.version, 2)
  assert.equal(state.posts.length, 2)
  assert.deepEqual(state.likedDemoIds, [])
  assert.deepEqual(state.demoReplies, {})
  state.posts.forEach((entry, index) => {
    const original = legacy[index]
    assert.equal(entry.id, original.id)
    assert.equal(entry.topic, original.topic)
    assert.equal(entry.content, original.content)
    assert.equal(entry.likes, original.likes)
    assert.equal(entry.liked, original.liked)
    assert.equal(entry.createdAt, '')
    assert.deepEqual(entry.replies.map(r => r.content), original.replies)
    assert.ok(entry.replies.every(r => r.createdAt === ''))
  })
  assert.equal(state.posts[0].title, '第一行标题')
  assert.deepEqual(parseCommunityState(JSON.stringify(state)), state)
})

test('old optional metadata receives safe defaults while empty storage creates independent state', () => {
  const migrated = parseCommunityState(null, JSON.stringify([{ id: 'legacy', content: '保留的正文', replies: [] }]))
  assert.equal(migrated.posts[0].topic, '实践复盘')
  assert.equal(migrated.posts[0].likes, 0)
  assert.equal(migrated.posts[0].liked, false)
  const first = parseCommunityState(null)
  const second = parseCommunityState(null)
  first.posts.push(post())
  assert.deepEqual(second, emptyCommunityState())
})

test('v2 roundtrip preserves new local posts and independent interactions with demo posts', () => {
  const state: CommunityState = {
    version: 2,
    posts: [post({ content: '首行\n保留 "引号" 与 emoji 🧪', liked: true })],
    likedDemoIds: ['demo-post-001', 'demo-post-076'],
    demoReplies: { 'demo-post-001': [{ id: 'local-reply-1', author: '本地访客', content: '我试了另一种方法。', createdAt: '2026-11-08T12:00:00+08:00' }] },
  }
  assert.deepEqual(parseCommunityState(JSON.stringify(state)), state)
  assert.deepEqual(parseCommunityState(JSON.stringify(state), '{broken legacy'), state)
})

test('corrupt v2 data is rejected rather than silently replaced with legacy or seed data', () => {
  const valid = { ...emptyCommunityState(), posts: [post()] }
  const invalidPostPatches: Partial<LocalPost>[] = [
    { id: 'demo-post-001' },
    { content: 'x'.repeat(2001) },
    { title: 'x'.repeat(201) },
    { createdAt: 'not-a-date' },
    { likes: -1 },
    { likes: 1.5 },
  ]
  const invalid = [
    'null', '[]', '{',
    JSON.stringify({ ...valid, version: 1 }),
    JSON.stringify({ ...valid, posts: [null] }),
    JSON.stringify({ ...valid, posts: [post({ topic: '未知板块' as LocalPost['topic'] })] }),
    JSON.stringify({ ...valid, posts: [post({ replies: [{ id: 'bad-reply', author: '访客', content: 'x'.repeat(501), createdAt: '' }] })] }),
    JSON.stringify({ ...valid, likedDemoIds: ['local-001'] }),
    JSON.stringify({ ...valid, demoReplies: { 'local-001': [] } }),
    JSON.stringify({ ...valid, demoReplies: { 'demo-post-001': [null] } }),
    ...invalidPostPatches.map(patch => JSON.stringify({ ...valid, posts: [post(patch)] })),
  ]
  for (const raw of invalid) assert.throws(() => parseCommunityState(raw, '[]'))
})

test('malformed legacy records are rejected instead of dropping user content silently', () => {
  for (const raw of [
    'null', '{}', '[null]', '{',
    JSON.stringify([{ id: 'old-1', content: '正文', replies: [null] }]),
    JSON.stringify([{ id: 'old-1', content: 'x'.repeat(2001), replies: [] }]),
    JSON.stringify([{ id: 'old-1', content: '正文', replies: ['x'.repeat(501)] }]),
  ]) assert.throws(() => parseCommunityState(null, raw))
})

test('search finds titles, body, authors, tags and replies, using case-insensitive AND terms', () => {
  const entries = [post(), post({ id: 'local-002', title: '准备校园短片', content: '这次先画分镜。', author: '小岛', topic: '项目组队', tags: ['影像'], replies: [] })]
  for (const query of ['deepseek', '论文', '阿宁', '证据核验', '小满', '原文页码', '  DEEPSEEK   页码  ']) {
    assert.deepEqual(filterCommunityPosts(entries, query, '全部', '全部', 'newest').map(p => p.id), ['local-001'], query)
  }
  assert.deepEqual(filterCommunityPosts(entries, 'deepseek 分镜', '全部', '全部', 'newest'), [])
  assert.deepEqual(filterCommunityPosts(entries, '不存在的关键词', '全部', '全部', 'newest'), [])
})

test('topic and month filters intersect with search, leaving undated legacy entries in all months only', () => {
  const entries = [
    post({ id: 'june-review' }),
    post({ id: 'may-review', createdAt: '2026-05-12T10:00:00+08:00' }),
    post({ id: 'june-question', topic: '工具问答' }),
    post({ id: 'legacy-review', createdAt: '' }),
  ]
  assert.deepEqual(filterCommunityPosts(entries, 'DeepSeek', '实践复盘', '2026-06', 'newest').map(p => p.id), ['june-review'])
  assert.deepEqual(filterCommunityPosts(entries, '', '工具问答', '2026-05', 'newest'), [])
  assert.equal(filterCommunityPosts(entries, '', '全部', '全部', 'newest').length, 4)
  assert.equal(filterCommunityPosts(entries, '', '全部', '2026-06', 'newest').length, 2)
})

test('newest and popular ordering are deterministic and do not reorder or mutate their source', () => {
  const entries: DemoPost[] = [
    post({ id: 'b', likes: 4 }),
    post({ id: 'older-popular', likes: 20, createdAt: '2026-03-02T10:00:00+08:00' }),
    post({ id: 'undated', likes: 1, createdAt: '' }),
    post({ id: 'a', likes: 4 }),
  ]
  const snapshot = structuredClone(entries)
  assert.deepEqual(filterCommunityPosts(entries, '', '全部', '全部', 'newest').map(p => p.id), ['a', 'b', 'older-popular', 'undated'])
  assert.deepEqual(filterCommunityPosts(entries, '', '全部', '全部', 'popular').map(p => p.id), ['older-popular', 'a', 'b', 'undated'])
  assert.deepEqual(entries, snapshot)
})
