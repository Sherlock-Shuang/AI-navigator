export async function POST(req: Request) {
  const dashKey = process.env.DASHSCOPE_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  const body = await req.json().catch(() => null)
  const messages = Array.isArray(body?.messages) ? body.messages : []

  if (!messages.length) {
    return new Response(JSON.stringify({ error: 'Missing messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const isDash = !!dashKey
  const endpoint = isDash
    ? 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions'
  const key = isDash ? dashKey : openaiKey

  if (!key) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    })

    if (!resp.ok) {
      const err = await resp.text()
      return new Response(JSON.stringify({ error: err || 'LLM request failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const data = await resp.json()
    const content = data?.choices?.[0]?.message?.content ?? ''
    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
