export type Category =
  | 'Search'
  | 'Agent'
  | 'Chat'
  | 'Learning'
  | 'Coding'
  | 'Video'
  | 'Image'
  | 'Music'
  | 'Dubbing'
  | 'DigitalHuman'
  | 'Model3D'
  | 'Job'
  | 'Office'
  | 'Creation'
  | 'Efficiency';

export interface Tool {
  id: string;
  name: string;
  desc: string;
  category: Category;
  url: string;
  tags: string[];
}

export const TOOLS_DATA: Tool[] = [
  // --- 🔎 Search ---
  { id: 'perplexity', name: 'Perplexity', desc: 'AI搜索引擎，直接给出答案和引用来源。', category: 'Search', url: 'https://www.perplexity.ai', tags: ['Freemium', 'Proxy'] },
  { id: 'metaso', name: '秘塔AI搜索', desc: '无广告、无干扰的学术级AI搜索，国产良心。', category: 'Search', url: 'https://metaso.cn', tags: ['Free', 'Domestic'] },
  { id: 'genspark', name: 'Genspark', desc: '生成式搜索，把结果整合成一篇Wiki。', category: 'Search', url: 'https://genspark.ai', tags: ['Free', 'Proxy'] },
  { id: '360ai', name: '纳米AI', desc: '整合360智脑的搜索，对中文索引很全。', category: 'Search', url: 'https://so.360.com', tags: ['Free', 'Domestic'] },

  // --- 🤖 Agent ---
  { id: 'coze-cn', name: '扣子 (Coze)', desc: '字节出品，拖拽即可做自己的AI Bot。', category: 'Agent', url: 'https://www.coze.cn', tags: ['Free', 'Domestic'] },
  { id: 'dify', name: 'Dify', desc: '开源LLM应用开发平台，适合企业级Agent。', category: 'Agent', url: 'https://dify.ai', tags: ['Free', 'Domestic'] },
  { id: 'autogpt', name: 'AutoGPT', desc: '让AI自主拆解任务并执行的鼻祖项目。', category: 'Agent', url: 'https://news.agpt.co', tags: ['Free', 'Proxy'] },
  { id: 'eigent', name: 'Eigent AI', desc: '桌面端多智能体系统，可自定义AI团队。', category: 'Agent', url: 'https://eigent.ai', tags: ['Paid', 'Proxy'] },
  { id: 'manus', name: 'Manus', desc: '通用助手（Agent），将想法转化为行动。', category: 'Agent', url: 'https://manus.so', tags: ['基础免费', 'Proxy'] },

  // --- 🎓 Learning ---
  { id: 'notebooklm', name: 'NotebookLM', desc: 'Google出品，导入PDF自动生成播客和摘要。', category: 'Learning', url: 'https://notebooklm.google.com', tags: ['Free', 'Proxy'] },
  { id: 'scispace', name: 'SciSpace', desc: '专门读论文的AI，能解释复杂数学公式。', category: 'Learning', url: 'https://typeset.io', tags: ['Freemium', 'Proxy'] },
  { id: 'consensus', name: 'Consensus', desc: '基于科学文献回答问题的AI，结果可查。', category: 'Learning', url: 'https://consensus.app', tags: ['Freemium', 'Proxy'] },
  { id: 'kimi', name: 'Kimi', desc: '支持超长文档上下文，读研报与长文神器。', category: 'Learning', url: 'https://kimi.moonshot.cn', tags: ['Free', 'Domestic'] },
  { id: 'alphaxiv', name: 'AlphaXiv', desc: 'Open discussion layer for arXiv papers.', category: 'Learning', url: 'https://alphaxiv.org', tags: ['Research', 'Paper Reading', 'Community'] },

  // --- 👤 Digital Human ---
  { id: 'heygen', name: 'HeyGen', desc: '数字人视频生成，口型同步率极高。', category: 'DigitalHuman', url: 'https://www.heygen.com', tags: ['Paid', 'Proxy'] },
  { id: 'synthesia', name: 'Synthesia', desc: '老牌数字人平台，适合企业培训视频。', category: 'DigitalHuman', url: 'https://www.synthesia.io', tags: ['Paid', 'Proxy'] },
  { id: 'silicon', name: '硅基智能', desc: '国产数字人头部，支持直播带货场景。', category: 'DigitalHuman', url: 'https://www.guijinews.com', tags: ['Paid', 'Domestic'] },

  // --- 🎙️ Dubbing ---
  { id: 'elevenlabs', name: 'ElevenLabs', desc: 'AI语音合成，情感表现力惊人。', category: 'Dubbing', url: 'https://elevenlabs.io', tags: ['Freemium', 'Proxy'] },
  { id: 'rask', name: 'Rask AI', desc: '视频自动翻译+配音，口型可对齐。', category: 'Dubbing', url: 'https://rask.ai', tags: ['Paid', 'Proxy'] },
  { id: 'hailuo-audio', name: '海螺AI Audio', desc: '字节旗下，生成速度快，音色丰富。', category: 'Dubbing', url: 'https://hailuoai.com', tags: ['Free', 'Domestic'] },

  // --- 🧊 Model3D ---
  { id: 'tripo', name: 'Tripo AI', desc: '文字或图片，几秒生成3D模型。', category: 'Model3D', url: 'https://www.tripo3d.ai', tags: ['Freemium', 'Proxy'] },
  { id: 'meshy', name: 'Meshy', desc: '专注游戏资产生成的3D AI工具。', category: 'Model3D', url: 'https://www.meshy.ai', tags: ['Freemium', 'Proxy'] },
  { id: 'rodin', name: 'Rodin (Deemos)', desc: '国产3D生成模型，拓扑结构优秀。', category: 'Model3D', url: 'https://hyperhuman.deemos.com', tags: ['Paid', 'Domestic'] },

  // --- 💼 Job ---
  { id: 'kickresume', name: 'Kickresume', desc: 'AI写简历，并按职位优化内容。', category: 'Job', url: 'https://www.kickresume.com', tags: ['Freemium', 'Proxy'] },
  { id: 'resumeworded', name: 'Resume Worded', desc: '像HR一样给你的简历打分与建议。', category: 'Job', url: 'https://resumeworded.com', tags: ['Freemium', 'Proxy'] },
  { id: 'zhilian-ai', name: '智联AI改简历', desc: '国内平台自带工具，针对中文优化。', category: 'Job', url: 'https://www.zhaopin.com', tags: ['Free', 'Domestic'] },

  // --- 🏢 Office ---
  { id: 'gamma', name: 'Gamma', desc: '输入大纲一键生成精美PPT。', category: 'Office', url: 'https://gamma.app', tags: ['Freemium', 'Proxy'] },
  { id: 'copilot', name: 'MS Copilot', desc: 'Office全家桶AI助手，Excel神器。', category: 'Office', url: 'https://copilot.microsoft.com', tags: ['Paid', 'Proxy'] },
  { id: 'chatdoc', name: 'ChatDOC', desc: '文档问答助手，表格解析能力强。', category: 'Office', url: 'https://chatdoc.com', tags: ['Freemium', 'Domestic'] },

  // --- ✍️ Creation ---
  { id: 'notion-ai', name: 'Notion AI', desc: '在笔记里润色与扩写内容。', category: 'Creation', url: 'https://www.notion.so', tags: ['Paid', 'Proxy'] },
  { id: 'jasper', name: 'Jasper', desc: '为营销设计的文案生成工具。', category: 'Creation', url: 'https://www.jasper.ai', tags: ['Paid', 'Proxy'] },
  { id: 'xiaohongshu', name: '小红书文案AI', desc: '面向小红书风格的文案生成器集合。', category: 'Creation', url: '#', tags: ['Free', 'Domestic'] },

  // --- ⚡ Efficiency ---
  { id: 'raycast', name: 'Raycast AI', desc: 'Mac最强启动器，快捷键唤起AI。', category: 'Efficiency', url: 'https://www.raycast.com', tags: ['Freemium', 'Proxy'] },
  { id: 'zapier', name: 'Zapier', desc: '连接不同App，让AI自动跑流程。', category: 'Efficiency', url: 'https://zapier.com', tags: ['Freemium', 'Proxy'] },

  // --- 💬 Chat ---
  { id: 'chatgpt', name: 'ChatGPT', desc: '通用对话AI。', category: 'Chat', url: 'https://chatgpt.com', tags: ['Freemium', 'Proxy'] },
  { id: 'claude', name: 'Claude', desc: '代码与逻辑推理能力顶尖。', category: 'Chat', url: 'https://claude.ai', tags: ['Freemium', 'Proxy'] },
  { id: 'gemini', name: 'Gemini', desc: 'Google原生多模态模型，生态整合能力强。', category: 'Chat', url: 'https://gemini.google.com', tags: ['Free', 'Proxy'] },
  { id: 'doubao', name: '豆包', desc: '字节出品，语音交互体验极佳。', category: 'Chat', url: 'https://doubao.com', tags: ['Free', 'Domestic'] },
  { id: 'deepseek', name: 'DeepSeek', desc: '国产数学/代码最强黑马。', category: 'Chat', url: 'https://www.deepseek.com', tags: ['Free', 'Domestic'] },
  { id: 'wenxin', name: '文心一言', desc: '百度大模型，中文理解能力顶尖。', category: 'Chat', url: 'https://yiyan.baidu.com', tags: ['Freemium', 'Domestic'] },
  { id: 'mistral', name: 'Mistral', desc: '欧洲最强开源模型，性能强悍。', category: 'Chat', url: 'https://mistral.ai', tags: ['Free', 'Proxy'] },

  // --- 🎥 Video ---
  { id: 'sora', name: 'Sora', desc: 'OpenAI王炸级视频生成（暂未公测）。', category: 'Video', url: 'https://openai.com/sora', tags: ['Paid', 'Proxy'] },
  { id: 'runway', name: 'Runway', desc: '视频AI领域的Adobe，专业级控制。', category: 'Video', url: 'https://runwayml.com', tags: ['Freemium', 'Proxy'] },
  { id: 'keling', name: '可灵 AI', desc: '国产视频生成效果第一梯队。', category: 'Video', url: 'https://keling.ai', tags: ['Freemium', 'Domestic'] },
  { id: 'jimeng', name: '即梦AI (Jimeng AI)', desc: '字节跳动出品的图像与视频生成平台，中文理解与画面控制力强。', category: 'Video', url: 'https://jimeng.jianying.com', tags: ['基础免费', 'Domestic'] },
  { id: 'veo', name: 'Veo 3.0', desc: "Google's most capable video generation model with native audio.", category: 'Video', url: 'https://deepmind.google/models/veo/', tags: ['Google', 'Video Gen', 'Native Audio', 'Proxy'] },

  // --- 🎨 Image ---
  { id: 'midjourney', name: 'Midjourney', desc: '艺术审美最高的AI绘图。', category: 'Image', url: 'https://www.midjourney.com', tags: ['Paid', 'Proxy'] },
  { id: 'flux', name: 'Flux', desc: '强力开源绘图模型，文字生成极强。', category: 'Image', url: 'https://blackforestlabs.ai', tags: ['Free', 'Proxy'] },
  { id: 'nano-banana', name: 'Nano Banana (Gemini 2.5)', desc: 'Google最新Flash Image模型，支持角色一致性保持与自然语言修图。', category: 'Image', url: 'https://aistudio.google.com', tags: ['Free', 'Proxy'] },
  { id: 'nano-banana-pro', name: 'Nano Banana Pro', desc: '基于Gemini 3 Pro的影像模型，支持多图合成与口语化精细编辑。', category: 'Image', url: 'https://gemini.google.com', tags: ['Paid', 'Proxy'] },
  { id: 'stablediffusion', name: 'Stable Diffusion', desc: '开源王者，本地部署后可控性无限。', category: 'Image', url: 'https://stability.ai', tags: ['Free', 'Proxy'] },
  { id: 'leonardo', name: 'Leonardo.ai', desc: '基于SD优化，界面友好，适合做游戏资产。', category: 'Image', url: 'https://leonardo.ai', tags: ['Freemium', 'Proxy'] },
  { id: 'tongyi-wanxiang', name: '通义万相', desc: '阿里图像生成，可控性高，适合电商设计。', category: 'Image', url: 'https://tongyi.aliyun.com/wanxiang', tags: ['Free', 'Domestic'] },

  // --- 🎵 Music ---
  { id: 'suno', name: 'Suno', desc: '音乐界的ChatGPT，输入歌词生成完整歌曲。', category: 'Music', url: 'https://suno.com', tags: ['Freemium', 'Proxy'] },
  { id: 'udio', name: 'Udio', desc: 'Suno的劲敌，音质和编曲更专业。', category: 'Music', url: 'https://www.udio.com', tags: ['Freemium', 'Proxy'] },

  // --- 💻 Coding ---
  { id: 'cursor', name: 'Cursor', desc: '能读懂你整个项目的AI代码编辑器。', category: 'Coding', url: 'https://cursor.sh', tags: ['Freemium', 'Proxy'] },
  { id: 'v0', name: 'v0.dev', desc: '用文字直接生成精美UI代码。', category: 'Coding', url: 'https://v0.dev', tags: ['Freemium', 'Proxy'] }
  ,
  { id: 'github-copilot', name: 'GitHub Copilot', desc: '集成在IDE中的AI助手，实时补全代码。', category: 'Coding', url: 'https://github.com/features/copilot', tags: ['Paid', 'Proxy'] },
  { id: 'replit', name: 'Replit AI', desc: '在线编程环境，一键生成和部署应用。', category: 'Coding', url: 'https://replit.com', tags: ['Freemium', 'Proxy'] },
  { id: 'trae', name: 'Trae', desc: '字节跳动的vibe-coding IDE', category: 'Coding', url: 'https://www.trae.cn', tags: ['Free', 'Domestic'] },
  { id: 'trae-global', name: 'Trae (海外版)', desc: 'Trae的国际版本，支持更多海外模型。', category: 'Coding', url: 'https://www.trae.ai', tags: ['Free', 'Proxy'] },
  { id: 'antigravity', name: 'Antigravity', desc: '谷歌出品的编码IDE', category: 'Coding', url: 'https://antigravity.google', tags: ['Free', 'Proxy'] }
];