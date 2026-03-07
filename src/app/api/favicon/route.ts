export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target) {
    return new Response('Missing url', { status: 400 });
  }

  let origin: string;
  try {
    origin = new URL(target).origin;
  } catch {
    return new Response('Invalid url', { status: 400 });
  }

  const candidates: string[] = [
    `${origin}/favicon.ico`,
    `${origin}/favicon.png`,
    `${origin}/apple-touch-icon.png`,
    `${origin}/apple-touch-icon-precomposed.png`,
    // Google favicon service作为兜底方案
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(origin)}&sz=64`,
  ];

  for (const iconUrl of candidates) {
    try {
      const res = await fetch(iconUrl, {
        redirect: 'follow',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*;q=0.8,*/*;q=0.5',
        },
      });

      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || 'image/x-icon';
      const buf = await res.arrayBuffer();

      // 简单验证：内容大小>0
      if (buf.byteLength === 0) continue;

      return new Response(buf, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400',
        },
      });
    } catch {
      // 跳过当前候选，尝试下一个
      continue;
    }
  }

  return new Response('Icon not found', { status: 404 });
}