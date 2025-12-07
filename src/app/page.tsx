'use client';

import { useState } from 'react';
import { Search, Wifi, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tool {
  id: string;
  name: string;
  desc: string;
  category: string;
  url: string;
  tags: string[];
}

const TOOLS_DATA: Tool[] = [
  // --- 聊天 ---
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
  
  // --- 视频 ---
  { id: "sora", name: "Sora", desc: "OpenAI王炸级视频生成，物理规律模拟逼真。", category: "视频", url: "https://openai.com/sora", tags: ["付费", "代理"] },
  { id: "runway", name: "Runway Gen-2", desc: "视频AI领域的Adobe，专业级控制功能。", category: "视频", url: "https://runwayml.com", tags: ["基础免费", "代理"] },
  { id: "pika", name: "Pika Labs", desc: "擅长生成动画风格视频，社区活跃。", category: "视频", url: "https://pika.art", tags: ["基础免费", "代理"] },
  { id: "keling", name: "可灵 AI", desc: "快手出品，视频清晰度和连贯性极高。", category: "视频", url: "https://keling.ai", tags: ["基础免费", "国产"] },
  { id: "jimeng", name: "即梦 (Jimeng)", desc: "字节出品的图像视频平台，创意落地快。", category: "视频", url: "https://jimeng.jianying.com", tags: ["免费", "国产"] },
  { id: "heygen", name: "HeyGen", desc: "数字人视频生成神器，口型同步率业界第一。", category: "视频", url: "https://www.heygen.com", tags: ["付费", "代理"] },
  { id: "vidu", name: "Vidu", desc: "主打流畅运镜的2D/3D动漫风视频生成。", category: "视频", url: "https://www.vidu.net", tags: ["基础免费", "国产"] },
  { id: "luma", name: "Luma Dream Machine", desc: "生成速度极快，效果惊艳的视频模型。", category: "视频", url: "https://lumalabs.ai", tags: ["基础免费", "代理"] },

  // --- 图片 ---
  { id: "midjourney", name: "Midjourney", desc: "目前公认审美最高的AI绘图工具。", category: "图片", url: "https://www.midjourney.com", tags: ["付费", "代理"] },
  { id: "stablediffusion", name: "Stable Diffusion", desc: "开源王者，本地部署后可控性无限。", category: "图片", url: "https://stability.ai", tags: ["免费", "代理"] },
  { id: "dalle", name: "DALL·E 3", desc: "理解语义能力最强，ChatGPT内直接画。", category: "图片", url: "https://openai.com/dall-e-3", tags: ["付费", "代理"] },
  { id: "flux", name: "Flux", desc: "近期大火的开源模型，手指和文字生成超越MJ。", category: "图片", url: "https://blackforestlabs.ai", tags: ["免费", "代理"] },
  { id: "leonardo", name: "Leonardo.ai", desc: "基于SD优化，界面友好，适合做游戏资产。", category: "图片", url: "https://leonardo.ai", tags: ["基础免费", "代理"] },
  { id: "canva-ai", name: "Canva AI", desc: "设计工具里的AI，一键生成海报素材。", category: "图片", url: "https://canva.com", tags: ["基础免费", "代理"] },
  { id: "tongyi-wanxiang", name: "通义万相", desc: "阿里图像生成，可控性高，适合电商设计。", category: "图片", url: "https://tongyi.aliyun.com/wanxiang", tags: ["免费", "国产"] },
  
  // --- 音乐 ---
  { id: "suno", name: "Suno", desc: "音乐界的ChatGPT，输入歌词生成完整歌曲。", category: "音乐", url: "https://suno.com", tags: ["基础免费", "代理"] },
  { id: "udio", name: "Udio", desc: "Suno的劲敌，音质和编曲更专业。", category: "音乐", url: "https://www.udio.com", tags: ["基础免费", "代理"] },
  { id: "elevenlabs", name: "ElevenLabs", desc: "地表最强语音合成，情感极其丰富。", category: "音乐", url: "https://elevenlabs.io", tags: ["基础免费", "代理"] },
  { id: "hailuo-audio", name: "海螺AI Audio", desc: "中文语音克隆领先者，情绪表现力强。", category: "音乐", url: "https://hailuoai.com", tags: ["免费", "国产"] },
  
  // --- 代码 ---
  { id: "cursor", name: "Cursor", desc: "能读懂你整个项目的AI代码编辑器，新手神器。", category: "代码", url: "https://cursor.sh", tags: ["基础免费", "代理"] },
  { id: "github-copilot", name: "GitHub Copilot", desc: "集成在IDE中的AI助手，实时补全代码。", category: "代码", url: "https://github.com/features/copilot", tags: ["付费", "代理"] },
  { id: "v0", name: "v0.dev", desc: "Vercel出品，用文字描述直接生成UI界面。", category: "代码", url: "https://v0.dev", tags: ["基础免费", "代理"] },
  { id: "replit", name: "Replit AI", desc: "在线编程环境，一键生成和部署应用。", category: "代码", url: "https://replit.com", tags: ["基础免费", "代理"] },
 
  // --- 生产力 ---
  { id: "notion-ai", name: "Notion AI", desc: "笔记里的AI，整理文档、改写润色。", category: "生产力", url: "https://www.notion.so", tags: ["付费", "代理"] },
  { id: "gamma", name: "Gamma", desc: "输入大纲，一键生成精美的PPT。", category: "生产力", url: "https://gamma.app", tags: ["基础免费", "代理"] },
  { id: "notebooklm", name: "NotebookLM", desc: "Google出品，导入资料自动生成播客和摘要。", category: "生产力", url: "https://notebooklm.google.com", tags: ["免费", "代理"] },
  { id: "microsoft-copilot", name: "MS Copilot", desc: "Office全家桶AI，做Excel PPT必备。", category: "生产力", url: "https://copilot.microsoft.com", tags: ["基础免费", "代理"] }
];

const CATEGORIES = ["全部", "聊天", "视频", "图片", "音乐", "代码", "生产力"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [showModal, setShowModal] = useState(false);

  const filteredTools = TOOLS_DATA.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "全部" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVisitTool = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-teal-600">AI Navigator</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filter Bar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">分类</h2>
              
              {/* Desktop Sidebar */}
              <nav className="hidden lg:block space-y-1">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-teal-50 text-teal-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>

              {/* Mobile Horizontal Scroll */}
              <div className="lg:hidden overflow-x-auto pb-2">
                <div className="flex space-x-2 min-w-max">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? 'bg-teal-50 text-teal-600 font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Tool Grid */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-800">{tool.name}</h3>
                      {tool.tags.includes("代理") && (
                        <button
                          onClick={() => setShowModal(true)}
                          className="text-slate-400 hover:text-teal-500 transition-colors"
                        >
                          <Wifi className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tool.desc}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              tag === "国产"
                                ? 'bg-green-100 text-green-800'
                                : tag === "代理"
                                ? 'bg-orange-100 text-orange-800'
                                : tag === "免费"
                                ? 'bg-blue-100 text-blue-800'
                                : tag === "基础免费"
                                ? 'bg-purple-100 text-purple-800'
                                : tag === "付费"
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {tag === "国产" && "🇨🇳 "}
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleVisitTool(tool.url)}
                        className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
                      >
                        打开
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">没有找到相关工具</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Network Guide Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">连接状态提示</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-slate-600 mb-4">
                该工具服务器位于海外，国内直连可能会出现响应超时或无法加载的情况。
              </p>
              
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
                <p className="text-teal-800 text-sm font-medium mb-2">
                  如需稳定访问，建议配置网络加速服务。
                </p>
                <a
                  href="/guide"
                  className="inline-flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
                >
                  📄 点击获取配置教程 (提取码: 8888)
                </a>
              </div>
              
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}