export interface Tool {
  id: string;
  name: string;
  desc: string;
  category: string;
  url: string;
  tags: string[];
}

export const TOOLS_DATA: Tool[] = [
  { id: "chatgpt", name: "ChatGPT", desc: "OpenAI出品，目前最聪明的对话AI，支持GPT-4。", category: "聊天", url: "https://chatgpt.com", tags: ["基础免费", "代理"] },
  { id: "claude", name: "Claude 3", desc: "擅长长文本分析和写作，更有'人味'的AI。", category: "聊天", url: "https://claude.ai", tags: ["基础免费", "代理"] },
  { id: "gemini", name: "Gemini", desc: "Google原生多模态模型，生态整合能力强。", category: "聊天", url: "https://gemini.google.com", tags: ["免费", "代理"] },
  { id: "kimi", name: "Kimi (月之暗面)", desc: "国产之光，支持超长文档阅读，完全免费。", category: "聊天", url: "https://kimi.moonshot.cn", tags: ["免费", "国产"] },
  { id: "doubao", name: "豆包", desc: "字节跳动出品，语音交互体验极佳，简单好用。", category: "聊天", url: "https://doubao.com", tags: ["免费", "国产"] },
  { id: "deepseek", name: "DeepSeek", desc: "深度求索，代码和数学逻辑极强的国产黑马。", category: "聊天", url: "https://www.deepseek.com", tags: ["免费", "国产"] },
  { id: "wenxin", name: "文心一言", desc: "百度大模型，中文理解能力顶尖。", category: "聊天", url: "https://yiyan.baidu.com", tags: ["基础免费", "国产"] },
  { id: "perplexity", name: "Perplexity", desc: "AI搜索引擎，直接给出答案和引用来源。", category: "聊天", url: "https://www.perplexity.ai", tags: ["基础免费", "代理"] },
  { id: "metaso", name: "秘塔AI搜索", desc: "无广告的学术级AI搜索，适合查资料。", category: "聊天", url: "https://metaso.cn", tags: ["免费", "国产"] },
  { id: "mistral", name: "Mistral", desc: "欧洲最强开源模型，性能强悍。", category: "聊天", url: "https://mistral.ai", tags: ["免费", "代理"] },

  { id: "sora", name: "Sora", desc: "OpenAI王炸级视频生成，物理规律模拟逼真。", category: "视频", url: "https://openai.com/sora", tags: ["付费", "代理"] },
  { id: "runway", name: "Runway Gen-2", desc: "视频AI领域的Adobe，专业级控制功能。", category: "视频", url: "https://runwayml.com", tags: ["基础免费", "代理"] },
  { id: "pika", name: "Pika Labs", desc: "擅长生成动画风格视频，社区活跃。", category: "视频", url: "https://pika.art", tags: ["基础免费", "代理"] },
  { id: "keling", name: "可灵 AI", desc: "快手出品，视频清晰度和连贯性极高。", category: "视频", url: "https://keling.ai", tags: ["基础免费", "国产"] },
  { id: "jimeng", name: "即梦 (Jimeng)", desc: "字节出品的图像视频平台，创意落地快。", category: "视频", url: "https://jimeng.jianying.com", tags: ["免费", "国产"] },
  { id: "heygen", name: "HeyGen", desc: "数字人视频生成神器，口型同步率业界第一。", category: "视频", url: "https://www.heygen.com", tags: ["付费", "代理"] },
  { id: "vidu", name: "Vidu", desc: "主打流畅运镜的2D/3D动漫风视频生成。", category: "视频", url: "https://www.vidu.net", tags: ["基础免费", "国产"] },
  { id: "luma", name: "Luma Dream Machine", desc: "生成速度极快，效果惊艳的视频模型。", category: "视频", url: "https://lumalabs.ai", tags: ["基础免费", "代理"] },

  { id: "midjourney", name: "Midjourney", desc: "目前公认审美最高的AI绘图工具。", category: "图片", url: "https://www.midjourney.com", tags: ["付费", "代理"] },
  { id: "stablediffusion", name: "Stable Diffusion", desc: "开源王者，本地部署后可控性无限。", category: "图片", url: "https://stability.ai", tags: ["免费", "代理"] },
  { id: "dalle", name: "DALL·E 3", desc: "理解语义能力最强，ChatGPT内直接画。", category: "图片", url: "https://openai.com/dall-e-3", tags: ["付费", "代理"] },
  { id: "flux", name: "Flux", desc: "近期大火的开源模型，手指和文字生成超越MJ。", category: "图片", url: "https://blackforestlabs.ai", tags: ["免费", "代理"] },
  { id: "leonardo", name: "Leonardo.ai", desc: "基于SD优化，界面友好，适合做游戏资产。", category: "图片", url: "https://leonardo.ai", tags: ["基础免费", "代理"] },
  { id: "canva-ai", name: "Canva AI", desc: "设计工具里的AI，一键生成海报素材。", category: "图片", url: "https://canva.com", tags: ["基础免费", "代理"] },
  { id: "tongyi-wanxiang", name: "通义万相", desc: "阿里图像生成，可控性高，适合电商设计。", category: "图片", url: "https://tongyi.aliyun.com/wanxiang", tags: ["免费", "国产"] },

  { id: "suno", name: "Suno", desc: "音乐界的ChatGPT，输入歌词生成完整歌曲。", category: "音乐", url: "https://suno.com", tags: ["基础免费", "代理"] },
  { id: "udio", name: "Udio", desc: "Suno的劲敌，音质和编曲更专业。", category: "音乐", url: "https://www.udio.com", tags: ["基础免费", "代理"] },
  { id: "elevenlabs", name: "ElevenLabs", desc: "地表最强语音合成，情感极其丰富。", category: "音乐", url: "https://elevenlabs.io", tags: ["基础免费", "代理"] },
  { id: "hailuo-audio", name: "海螺AI Audio", desc: "中文语音克隆领先者，情绪表现力强。", category: "音乐", url: "https://hailuoai.com", tags: ["免费", "国产"] },

  { id: "cursor", name: "Cursor", desc: "能读懂你整个项目的AI代码编辑器，新手神器。", category: "代码", url: "https://cursor.sh", tags: ["基础免费", "代理"] },
  { id: "github-copilot", name: "GitHub Copilot", desc: "集成在IDE中的AI助手，实时补全代码。", category: "代码", url: "https://github.com/features/copilot", tags: ["付费", "代理"] },
  { id: "v0", name: "v0.dev", desc: "Vercel出品，用文字描述直接生成UI界面。", category: "代码", url: "https://v0.dev", tags: ["基础免费", "代理"] },
  { id: "replit", name: "Replit AI", desc: "在线编程环境，一键生成和部署应用。", category: "代码", url: "https://replit.com", tags: ["基础免费", "代理"] },

  { id: "notion-ai", name: "Notion AI", desc: "笔记里的AI，整理文档、改写润色。", category: "生产力", url: "https://www.notion.so", tags: ["付费", "代理"] },
  { id: "gamma", name: "Gamma", desc: "输入大纲，一键生成精美的PPT。", category: "生产力", url: "https://gamma.app", tags: ["基础免费", "代理"] },
  { id: "notebooklm", name: "NotebookLM", desc: "Google出品，导入资料自动生成播客和摘要。", category: "生产力", url: "https://notebooklm.google.com", tags: ["免费", "代理"] },
  { id: "microsoft-copilot", name: "MS Copilot", desc: "Office全家桶AI，做Excel PPT必备。", category: "生产力", url: "https://copilot.microsoft.com", tags: ["基础免费", "代理"] }
];