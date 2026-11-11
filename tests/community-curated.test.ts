import { test } from 'node:test'
import assert from 'node:assert/strict'
import { COMMUNITY_CURATED_POSTS } from '../src/data/community-curated.ts'
import { COMMUNITY_DEMO_POSTS, type CommunitySource, type DemoReply } from '../src/data/community-demo.ts'
import { emptyCommunityState, filterCommunityPosts, parseCommunityState, type CommunityState, type LocalPost } from '../src/lib/community-local.ts'

const expectedAuthors = new Map([
  ['source-post-v2ex-1180155', 'ZoBoat'],
  ['source-post-v2ex-1188070', 'lenglengyuchen'],
  ['source-post-v2ex-1210849', 'fireeeeee'],
  ['source-post-v2ex-1181949', 'glumess'],
  ['source-post-reddit-1l9mrb6', 'userQKD'],
  ['source-post-reddit-1lj3yg3', 'Sorry_Fan_2056'],
  ['source-post-reddit-1o35iiz', 'AnimusAstralis'],
  ['source-post-reddit-1qy9sjp', 'Healthy_Try4444'],
  ['source-post-v2ex-1255354', 'DearFox'],
  ['source-post-csdn-145549690', 'ziwend'],
  ['source-post-csdn-144829518', 'ziwend'],
  ['source-post-csdn-144606736', 'ziwend'],
  ['source-post-csdn-146515197', '海虎哥AI编程'],
  ['source-post-csdn-151098375', '瑞瑞绮绮'],
  ['source-post-csdn-149690284', '海虎哥AI编程'],
])
const expectedReplyAuthors = new Map([
  ['source-post-v2ex-1180155', 'shmilypeter'],
  ['source-post-v2ex-1188070', 'murmur'],
  ['source-post-v2ex-1210849', 'P233'],
  ['source-post-v2ex-1181949', 'axisray'],
  ['source-post-reddit-1l9mrb6', 'Suitable_Pie_Drama'],
  ['source-post-reddit-1lj3yg3', 'Youzernayme'],
  ['source-post-reddit-1o35iiz', 'AnimusAstralis'],
  ['source-post-reddit-1qy9sjp', 'Pasid3nd3'],
])
const localReply = (): DemoReply => ({ id: 'my-reply', author: '我', content: '读完原帖后，我也想试试。', createdAt: '2026-11-08T12:30:00Z' })
const localPost = (): LocalPost => ({
  id: 'my-post', title: '我的阅读记录', content: '看了讨论后整理的一点想法。', author: '我', role: '', topic: '实践复盘',
  createdAt: '2026-11-08T12:30:00Z', likes: 0, liked: false, replies: [], tags: [],
})
const sourceMetadata = (): CommunitySource => {
  const source = COMMUNITY_CURATED_POSTS[0].source
  assert.ok(source)
  return structuredClone(source)
}

function assertPublicSource(source: CommunitySource) {
  const url = new URL(source.url)
  assert.ok(['V2EX', 'Reddit', 'CSDN'].includes(source.platform))
  assert.equal(url.protocol, 'https:')
  assert.equal(url.username, '')
  assert.equal(url.password, '')
  assert.equal(url.port, '')
  const allowedHosts = {
    V2EX: ['v2ex.com', 'www.v2ex.com'],
    Reddit: ['reddit.com', 'www.reddit.com'],
    CSDN: ['blog.csdn.net'],
  }[source.platform]
  assert.ok(allowedHosts.includes(url.hostname), `Unexpected source host: ${url.hostname}`)
  if (source.platform === 'V2EX') assert.match(url.pathname, /^\/t\/\d+\/?$/)
  else if (source.platform === 'Reddit') assert.match(url.pathname, /^\/r\/[^/]+\/comments\/[a-z0-9]+\//)
  else assert.match(url.pathname, /^\/[^/]+\/article\/details\/\d+\/?$/)
  assert.ok(source.title.trim())
  assert.ok(source.author.trim())
  assert.ok(Number.isFinite(Date.parse(source.publishedAt)))
  assert.ok(Number.isFinite(Date.parse(source.collectedAt)))
}

test('fifteen curated discussions and eight reply summaries have distinct public source links', () => {
  assert.equal(COMMUNITY_CURATED_POSTS.length, 15)
  const replies = COMMUNITY_CURATED_POSTS.flatMap(post => post.replies)
  assert.equal(replies.length, 8)
  const ids = [...COMMUNITY_CURATED_POSTS.map(post => post.id), ...replies.map(reply => reply.id)]
  assert.equal(new Set(ids).size, 23)
  assert.equal(new Set(COMMUNITY_CURATED_POSTS.map(post => post.source?.url)).size, 15)
  assert.equal(new Set(replies.map(reply => reply.source?.url)).size, 8)
  assert.ok(ids.every(id => !COMMUNITY_DEMO_POSTS.some(post => post.id === id)))
  for (const post of COMMUNITY_CURATED_POSTS) {
    assert.match(post.id, /^source-post-(?:(?:v2ex|reddit)-[a-z0-9]+|csdn-\d+)$/)
    assert.ok(post.source)
    assertPublicSource(post.source)
    if (post.source.platform === 'CSDN') {
      assert.equal(post.id, `source-post-csdn-${new URL(post.source.url).pathname.split('/').filter(Boolean).at(-1)}`)
      assert.equal(post.replies.length, 0)
    }
    for (const reply of post.replies) {
      assert.ok(reply.source)
      assertPublicSource(reply.source)
      const link = new URL(reply.source.url)
      if (reply.source.platform === 'V2EX') {
        assert.match(link.hash, /^#r_\d+$/)
        assert.equal(link.pathname, new URL(post.source.url).pathname)
      } else {
        assert.match(link.pathname, /\/[a-z0-9]+\/$/)
        assert.ok(link.pathname.startsWith(new URL(post.source.url).pathname))
      }
      assert.notEqual(reply.source.url, post.source.url)
    }
  }
})

test('editorial identity stays separate from verified original authors and fictional demo members', () => {
  const fictionalAuthors = new Set(COMMUNITY_DEMO_POSTS.flatMap(post => [post.author, ...post.replies.map(reply => reply.author)]))
  for (const post of COMMUNITY_CURATED_POSTS) {
    assert.ok(post.source)
    assert.equal(post.author, '社区摘读')
    assert.equal(post.source.author, expectedAuthors.get(post.id))
    assert.equal(fictionalAuthors.has(post.source.author), false)
    if (expectedReplyAuthors.has(post.id)) assert.equal(post.replies.length, 1)
    else assert.equal(post.replies.length, 0)
    for (const reply of post.replies) {
      assert.ok(reply.source)
      assert.equal(reply.source.author, expectedReplyAuthors.get(post.id))
      assert.equal(reply.author, reply.source.author)
      assert.equal(fictionalAuthors.has(reply.source.author), false)
    }
  }
})

test('original publication dates and reply chronology are retained separately from collection time', () => {
  for (const post of COMMUNITY_CURATED_POSTS) {
    assert.ok(post.source)
    const published = Date.parse(post.source.publishedAt)
    const collected = Date.parse(post.source.collectedAt)
    assert.equal(post.createdAt, post.source.collectedAt)
    assert.ok(published <= collected, post.id)
    for (const reply of post.replies) {
      assert.ok(reply.source)
      const replied = Date.parse(reply.source.publishedAt)
      assert.ok(replied >= published, `${reply.id} predates the original post`)
      assert.ok(replied <= Date.parse(reply.source.collectedAt), `${reply.id} was collected before publication`)
      assert.equal(reply.createdAt, reply.source.publishedAt)
      assert.equal(reply.source.collectedAt, post.source.collectedAt)
      assert.equal(reply.source.platform, post.source.platform)
    }
  }
})

test('source-site engagement is not imported and each combined summary stays within 200 characters', () => {
  for (const post of COMMUNITY_CURATED_POSTS) {
    assert.equal(post.likes, 0, post.id)
    assert.ok(post.content.trim())
    const summary = post.content + post.replies.map(reply => reply.content).join('')
    assert.ok(Array.from(summary).length <= 200, `${post.id}: ${Array.from(summary).length} characters`)
  }
})

test('local likes and replies roundtrip for CSDN, V2EX, Reddit and older demo discussions without copying source metadata', () => {
  const state: CommunityState = {
    ...emptyCommunityState(),
    posts: [localPost()],
    likedDemoIds: ['source-post-csdn-145549690', 'source-post-v2ex-1180155', 'source-post-reddit-1l9mrb6', 'demo-post-001'],
    demoReplies: {
      'source-post-csdn-145549690': [{ ...localReply(), id: 'my-csdn-reply' }],
      'source-post-v2ex-1180155': [localReply()],
      'source-post-reddit-1l9mrb6': [{ ...localReply(), id: 'my-reddit-reply' }],
      'demo-post-001': [{ ...localReply(), id: 'my-demo-reply' }],
    },
  }
  const snapshot = structuredClone(COMMUNITY_CURATED_POSTS)
  assert.deepEqual(parseCommunityState(JSON.stringify(state)), state)
  assert.deepEqual(COMMUNITY_CURATED_POSTS, snapshot)
  assert.ok(Object.values(state.demoReplies).flat().every(reply => !('source' in reply)))
  for (const id of ['source-post-csdn-forged', 'source-post-csdn-', 'source-post-csdn-123abc']) {
    assert.throws(() => parseCommunityState(JSON.stringify({ ...emptyCommunityState(), likedDemoIds: [id] })), /Invalid community data/)
    assert.throws(() => parseCommunityState(JSON.stringify({ ...emptyCommunityState(), demoReplies: { [id]: [localReply()] } })), /Invalid community data/)
  }
})

test('stored local posts and replies cannot inject trusted source attribution', () => {
  for (const source of [sourceMetadata(), null]) {
    const injectedPost = { ...emptyCommunityState(), posts: [{ ...localPost(), source }] }
    const injectedPostReply = { ...emptyCommunityState(), posts: [{ ...localPost(), replies: [{ ...localReply(), source }] }] }
    const injectedSourceReply = { ...emptyCommunityState(), demoReplies: { 'source-post-v2ex-1180155': [{ ...localReply(), source }] } }
    const injectedDemoReply = { ...emptyCommunityState(), demoReplies: { 'demo-post-001': [{ ...localReply(), source }] } }
    for (const value of [injectedPost, injectedPostReply, injectedSourceReply, injectedDemoReply]) {
      assert.throws(() => parseCommunityState(JSON.stringify(value)), /Invalid community data/)
    }
  }
})

test('user posts cannot occupy source IDs in either current storage or legacy migration', () => {
  for (const id of ['source-post-csdn-145549690', 'source-post-v2ex-1180155', 'source-post-reddit-1l9mrb6', 'source-post-v2ex-forged']) {
    assert.throws(() => parseCommunityState(JSON.stringify({ ...emptyCommunityState(), posts: [{ ...localPost(), id }] })))
    assert.throws(() => parseCommunityState(null, JSON.stringify([{ id, topic: '工具问答', content: '尝试覆盖来源帖子', likes: 0, liked: false, replies: [] }])))
  }
  const legacyWithUntrustedMetadata = [{ id: 'old-local-post', topic: '工具问答', content: '旧版正文', replies: [], source: sourceMetadata() }]
  const migrated = parseCommunityState(null, JSON.stringify(legacyWithUntrustedMetadata))
  assert.equal(migrated.posts[0].content, '旧版正文')
  assert.equal('source' in migrated.posts[0], false)
})

test('search includes original attribution while month filtering uses collection time', () => {
  assert.deepEqual(filterCommunityPosts(COMMUNITY_CURATED_POSTS, 'ZoBoat', '全部', '2026-11', 'newest').map(post => post.id), ['source-post-v2ex-1180155'])
  assert.deepEqual(filterCommunityPosts(COMMUNITY_CURATED_POSTS, 'userQKD literature', '全部', '全部', 'newest').map(post => post.id), ['source-post-reddit-1l9mrb6'])
  assert.equal(filterCommunityPosts(COMMUNITY_CURATED_POSTS, 'Reddit', '全部', '全部', 'newest').length, 4)
  assert.equal(filterCommunityPosts(COMMUNITY_CURATED_POSTS, 'CSDN', '全部', '2026-11', 'newest').length, 6)
  assert.equal(filterCommunityPosts(COMMUNITY_CURATED_POSTS, 'CSDN ziwend', '全部', '全部', 'newest').length, 3)
  assert.equal(filterCommunityPosts(COMMUNITY_CURATED_POSTS, '', '全部', '2025-12', 'newest').length, 0)
})
