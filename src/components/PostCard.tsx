'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { PostWithProfile, CommentWithProfile, supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/hooks/useToast'

interface PostCardProps {
  post: PostWithProfile
  onLike?: (postId: string, liked: boolean) => void
  onCommentSuccess?: () => void
}

export default function PostCard({ post, onLike, onCommentSuccess }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<CommentWithProfile[]>([])
  const [newComment, setNewComment] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)
  const [submittingComment, setSubmittingComment] = useState(false)
  
  const user = useAuthStore((state) => state.user)
  const { showToast } = useToast()

  // 初始化点赞状态
  useEffect(() => {
    setLiked(!!post.user_has_liked)
    setLikesCount(post.likes_count)
  }, [post.user_has_liked, post.likes_count])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return '刚刚'
    if (diffInMinutes < 60) return `${diffInMinutes}分钟前`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}小时前`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays}天前`
    
    return date.toLocaleDateString('zh-CN')
  }

  const handleLike = async () => {
    if (!user) {
      showToast('请先登录后再点赞', 'info')
      return
    }
    
    // 乐观更新
    const newLiked = !liked
    const newCount = newLiked ? likesCount + 1 : likesCount - 1
    setLiked(newLiked)
    setLikesCount(newCount)

    try {
      if (newLiked) {
        const { error } = await supabase
          .from('post_likes')
          .insert({ user_id: user.id, post_id: post.id })
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .match({ user_id: user.id, post_id: post.id })
        if (error) throw error
      }
      onLike?.(post.id, newLiked)
    } catch (error) {
      // 回滚
      setLiked(!newLiked)
      setLikesCount(likesCount)
      console.error('点赞失败:', error)
      showToast('操作失败，请重试', 'error')
    }
  }

  const fetchComments = async () => {
    if (loadingComments) return
    setLoadingComments(true)
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles!inner(*)
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('获取评论失败:', error)
      showToast('获取评论失败', 'error')
    } finally {
      setLoadingComments(false)
    }
  }

  const toggleComments = () => {
    if (!showComments && comments.length === 0) {
      fetchComments()
    }
    setShowComments(!showComments)
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return
    
    setSubmittingComment(true)
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: post.id,
          user_id: user.id,
          content: newComment.trim()
        })
        .select(`
          *,
          profiles!inner(*)
        `)
        .single()

      if (error) throw error

      if (data) {
        setComments([...comments, data])
        setNewComment('')
        onCommentSuccess?.()
      }
    } catch (error) {
      console.error('发表评论失败:', error)
      showToast('发表评论失败', 'error')
    } finally {
      setSubmittingComment(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      {/* 帖子头部 - 用户信息 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`}
            alt={post.profiles?.username || '用户'}
            className="w-10 h-10 rounded-full border border-slate-200"
          />
          <div>
            <h3 className="font-medium text-slate-800">
              {post.profiles?.username || '匿名用户'}
            </h3>
            <p className="text-sm text-slate-500">
              {formatTimeAgo(post.created_at)}
            </p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* 帖子内容 */}
      <div className="mb-4">
        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* 帖子底部 - 操作按钮 */}
      <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
            liked
              ? 'text-red-600 bg-red-50'
              : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">
            {likesCount}
          </span>
        </button>

        <button
          onClick={toggleComments}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
            showComments
              ? 'text-teal-600 bg-teal-50'
              : 'text-slate-600 hover:text-teal-600 hover:bg-teal-50'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            {showComments ? '收起评论' : '评论'}
          </span>
        </button>
      </div>

      {/* 评论区 */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
          {/* 评论列表 */}
          <div className="space-y-4 mb-4">
            {loadingComments ? (
              <div className="text-center py-4 text-slate-500 text-sm">加载评论中...</div>
            ) : comments.length === 0 ? (
              <div className="text-center py-4 text-slate-400 text-sm">暂无评论，快来抢沙发~</div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}`}
                    alt={comment.profiles?.username || '用户'}
                    className="w-8 h-8 rounded-full border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-slate-700">
                        {comment.profiles?.username || '匿名用户'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 发表评论框 */}
          {user ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="写下你的评论..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmitComment()
                  }
                }}
              />
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || submittingComment}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center py-3 bg-slate-50 rounded-lg text-sm text-slate-500">
              请先登录后发表评论
            </div>
          )}
        </div>
      )}
    </div>
  )
}
