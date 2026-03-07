'use client'

import { useState } from 'react'
import { Bot, Send, X } from 'lucide-react'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function CornerAI() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const send = async () => {
    const content = input.trim()
    if (!content || loading) return
    setError('')
    setLoading(true)
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    try {
      const resp = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data?.error || '请求失败')
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content || '' }])
    } catch (e) {
      const msg = e instanceof Error ? e.message : '请求失败'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-teal-500 hover:bg-teal-600 text-white p-3 shadow-lg"
        aria-label="打开内置AI"
      >
        <Bot className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[320px] rounded-xl bg-white border border-slate-200 shadow-xl">
          <div className="flex items-center justify-between p-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-medium">
              <Bot className="w-4 h-4 text-teal-600" />
              小AI助手
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600"
              aria-label="关闭"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="text-slate-400 text-sm">你好，我在这里为你提供简短的帮助。</div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed ${
                  m.role === 'user' ? 'text-slate-800' : 'text-slate-700'
                }`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    m.role === 'user' ? 'bg-teal-50' : 'bg-slate-100'
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            {error && (
              <div className="text-red-600 text-xs">{error}</div>
            )}
          </div>

          <div className="p-3 border-t border-slate-100 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send()
              }}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              placeholder="输入问题..."
            />
            <button
              onClick={send}
              disabled={loading}
              className="px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
