'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Send, User, LogOut, MessageSquare } from 'lucide-react'
import PostCard from '@/components/PostCard'
import EmailLoginModal from '@/components/EmailLoginModal'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { PostWithProfile } from '@/lib/supabase'
import { useToast, ToastContainer } from '@/hooks/useToast'

export default function CommunityPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<PostWithProfile[]>([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginCallback, setLoginCallback] = useState<(() => void) | null>(null)
  const [fetchError, setFetchError] = useState('')
  
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const { toasts, showToast } = useToast()
  const isFetchingRef = useRef(false)
  const lastFetchAtRef = useRef(0)
  const backoffUntilRef = useRef(0)

  // 获取帖子列表
  const fetchPosts = useCallback(async () => {
    if (isFetchingRef.current) return
    const now0 = Date.now()
    if (now0 < backoffUntilRef.current) {
      setLoading(false)
      setFetchError('资源配额已超限，请稍后重试或升级套餐')
      return
    }
    const now = Date.now()
    if (now - lastFetchAtRef.current < 5000) {
      setLoading(false)
      return
    }
    isFetchingRef.current = true
    lastFetchAtRef.current = now
    try {
      const resp = await fetch('/api/posts')
      if (resp.ok) {
        const json = await resp.json()
        const merged = (json?.posts || []) as PostWithProfile[]
        setPosts(merged)
        setFetchError('')
      } else {
        throw new Error(await resp.text())
      }
    } catch (error) {
      const err = error as Error
      console.warn('服务端获取失败，回退到客户端查询:', err.message)
      try {
        const { data: postData, error: postErr } = await supabase
          .from('posts')
          .select('*, profiles:profiles(*)')
          .order('created_at', { ascending: false })
          .limit(20)
        if (postErr) throw new Error(postErr.message || '客户端查询失败')

        const merged: PostWithProfile[] = (postData as any[] | null || []).map((p: any) => ({
          id: p.id,
          user_id: p.user_id,
          content: p.content,
          created_at: p.created_at,
          likes_count: p.likes_count,
          profiles: p.profiles || null,
        }))
        setPosts(merged)
        setFetchError('')
      } catch (fallbackErr) {
        console.error('获取帖子失败:', fallbackErr)
        console.error('错误详情:', (fallbackErr as any)?.message ?? String(fallbackErr))
        showToast(`获取帖子失败: ${(fallbackErr as Error).message || '未知错误'}`, 'error')
        const msg = (fallbackErr as Error)?.message || ''
        const isQuota = msg.includes('套餐配额') || msg.includes('超限') || msg.includes('quota')
        const now2 = Date.now()
        backoffUntilRef.current = now2 + (isQuota ? 60000 : 10000)
        setFetchError(isQuota ? '资源配额已超限，请稍后重试或升级套餐' : '网络或服务异常，请稍后重试')
      }
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }, [showToast])

  // 监听认证状态
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      // 仅在切换为有会话时刷新一次，避免频繁触发
      if (session?.user) fetchPosts()
    })

    // 检查当前会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      fetchPosts()
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [fetchPosts, setUser])

  // 内容合规性检查（预留函数）
  const checkContent = (content: string): boolean => {
    // TODO: 接入文本敏感词过滤API
    if (content.length < 1) return false
    if (content.length > 1000) return false
    return true
  }

  // 发布帖子
  const handleSubmitPost = async () => {
    if (!newPost.trim()) return

    // 检查登录状态
    if (!user) {
      setLoginCallback(() => handleSubmitPost)
      setShowLoginModal(true)
      return
    }

    // 内容检查
    if (!checkContent(newPost)) {
      showToast('内容不符合规范，请检查后重试', 'error')
      return
    }

    try {
      setPosting(true)
      
      const { data: post, error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: newPost.trim(),
          likes_count: 0,
        })
        .select('*')
        .single()

      if (error) throw error

      if (post) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('id, username, avatar_url, updated_at, website')
          .eq('id', user.id)
          .single()
        const merged: PostWithProfile = { 
          ...post, 
          profiles: prof || null,
          user_has_liked: false
        }
        setPosts([merged, ...posts])
        setNewPost('')
      }
    } catch (error) {
      console.error('发布帖子失败:', error)
      showToast('发布失败，请重试', 'error')
    } finally {
      setPosting(false)
    }
  }

  // 处理登录成功后的回调
  const handleLoginSuccess = () => {
    if (loginCallback) {
      loginCallback()
      setLoginCallback(null)
    }
  }

  // 处理输入框点击（未登录时）
  const handleInputClick = () => {
    if (!user) {
      setLoginCallback(() => () => {
        // 登录成功后聚焦输入框
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement
        if (textarea) textarea.focus()
      })
      setShowLoginModal(true)
    }
  }

  // 退出登录
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('退出登录失败:', error)
      showToast('退出登录失败', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                ← AI Navigator
              </button>
              <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                社区论坛
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="w-4 h-4" />
                    <span>欢迎回来</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    退出
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600 transition-colors"
                >
                  登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {fetchError && (
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-lg text-sm">
            {fetchError}
          </div>
        )}
        {/* 发布框 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            onClick={handleInputClick}
            placeholder={user ? '分享你的想法...' : '请先登录参与讨论'}
            className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            rows={3}
            maxLength={1000}
          />
          
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-slate-500">
              {newPost.length}/1000
            </div>
            
            <button
              onClick={handleSubmitPost}
              disabled={!newPost.trim() || posting}
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
              {posting ? '发布中...' : '发布'}
            </button>
          </div>
        </div>

        {/* 帖子列表 */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-2">还没有帖子</p>
              <p className="text-sm text-slate-400">成为第一个发言的人吧！</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={(postId, liked) => {
                  // 可选：在这里更新本地 posts 状态，或者依赖 PostCard 内部状态
                  console.log('点赞更新:', postId, liked)
                }}
                onCommentSuccess={() => {
                  console.log('评论成功')
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* 登录模态框 */}
      <EmailLoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false)
          setLoginCallback(null)
        }}
        onSuccess={handleLoginSuccess}
      />

      {/* Toast 消息提示 */}
      <ToastContainer toasts={toasts} />
    </div>
  )
}
