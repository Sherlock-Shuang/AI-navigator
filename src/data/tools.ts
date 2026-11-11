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
  sourceUrl?: string;
  checkedAt?: string;
  reviewStatus: "官方资料已核查" | "待复核";
}

export const TOOLS_DATA: Tool[] = [
  {
    "id": "qwen",
    "name": "Qwen",
    "desc": "多模态 AI 助手，辅助内容理解与创作。",
    "category": "Chat",
    "url": "https://chat.qwen.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://qwen.ai/",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "canva",
    "name": "Canva AI",
    "desc": "辅助演示与视觉设计，适合课程展示和社群物料。",
    "category": "Office",
    "url": "https://www.canva.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.canva.com/pricing/",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "perplexity",
    "name": "Perplexity",
    "desc": "AI搜索引擎，直接给出答案和引用来源。",
    "category": "Search",
    "url": "https://www.perplexity.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "metaso",
    "name": "秘塔AI搜索",
    "desc": "中文资料搜索与来源整理，适合研究问题初筛。",
    "category": "Search",
    "url": "https://metaso.cn",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "genspark",
    "name": "Genspark",
    "desc": "AI 工作空间，围绕调研、文档、演示和多步骤任务组织智能体。",
    "category": "Agent",
    "url": "https://www.genspark.ai",
    "tags": [
      "办公智能体",
      "调研",
      "演示"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.genspark.ai",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "coze-cn",
    "name": "扣子",
    "desc": "面向写作、PPT、表格、设计和播客的一站式 AI 办公平台。",
    "category": "Agent",
    "url": "https://www.coze.cn",
    "tags": [
      "办公智能体",
      "中文"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.coze.cn",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "dify",
    "name": "Dify",
    "desc": "构建包含知识库、模型调用与工具执行的智能体工作流，可自托管。",
    "category": "Agent",
    "url": "https://dify.ai",
    "tags": [
      "工作流",
      "知识库",
      "自托管"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://dify.ai",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "autogpt",
    "name": "AutoGPT",
    "desc": "自动化智能体项目，使用前核查部署要求与维护状态。",
    "category": "Agent",
    "url": "https://news.agpt.co",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "eigent",
    "name": "Eigent AI",
    "desc": "面向多智能体协作的桌面工具。",
    "category": "Agent",
    "url": "https://eigent.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "manus",
    "name": "Manus",
    "desc": "执行调研与创作任务，提供网站、演示、设计等交付入口。",
    "category": "Agent",
    "url": "https://manus.im",
    "tags": [
      "智能体",
      "调研",
      "网站"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://manus.im",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "notebooklm",
    "name": "NotebookLM",
    "desc": "围绕用户资料进行问答与摘要，支持来源追溯。",
    "category": "Learning",
    "url": "https://notebooklm.google.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "scispace",
    "name": "SciSpace",
    "desc": "辅助查找、阅读与理解学术论文。",
    "category": "Learning",
    "url": "https://typeset.io",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "consensus",
    "name": "Consensus",
    "desc": "基于论文检索研究结论，引用需核对原文。",
    "category": "Learning",
    "url": "https://consensus.app",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "kimi",
    "name": "Kimi",
    "desc": "支持对话、项目与智能体任务的工作入口，覆盖编程和资料处理。",
    "category": "Chat",
    "url": "https://www.kimi.com",
    "tags": [
      "中文",
      "智能体",
      "文档"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.kimi.com",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "alphaxiv",
    "name": "AlphaXiv",
    "desc": "围绕 arXiv 论文进行阅读与讨论。",
    "category": "Learning",
    "url": "https://alphaxiv.org",
    "tags": [
      "Research",
      "Paper Reading",
      "Community"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "heygen",
    "name": "HeyGen",
    "desc": "生成数字人演示视频，并进行视频翻译与配音。",
    "category": "DigitalHuman",
    "url": "https://www.heygen.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "synthesia",
    "name": "Synthesia",
    "desc": "制作数字人讲解与培训视频。",
    "category": "DigitalHuman",
    "url": "https://www.synthesia.io",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "silicon",
    "name": "硅基智能",
    "desc": "数字人相关服务，具体产品与接入方式以官网为准。",
    "category": "DigitalHuman",
    "url": "https://www.guijinews.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "elevenlabs",
    "name": "ElevenLabs",
    "desc": "提供语音生成、配音及音频创作工具；使用前核对声音授权。",
    "category": "Dubbing",
    "url": "https://elevenlabs.io",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "checkedAt": "2026-11-05",
    "sourceUrl": "https://elevenlabs.io/"
  },
  {
    "id": "rask",
    "name": "Rask AI",
    "desc": "视频翻译与配音工具，输出需核对人名和术语。",
    "category": "Dubbing",
    "url": "https://rask.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "hailuo-audio",
    "name": "MiniMax Audio",
    "desc": "MiniMax 的音频与音乐创作入口，与海螺视频产品分开使用。",
    "category": "Dubbing",
    "url": "https://www.minimax.io/audio",
    "tags": [
      "配音",
      "音乐"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.minimax.io/audio",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "tripo",
    "name": "Tripo AI",
    "desc": "从文字或图像生成 3D 资产。",
    "category": "Model3D",
    "url": "https://www.tripo3d.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "meshy",
    "name": "Meshy",
    "desc": "用于 3D 资产生成与纹理制作。",
    "category": "Model3D",
    "url": "https://www.meshy.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "rodin",
    "name": "Rodin (Deemos)",
    "desc": "面向图像到 3D 资产的生成工具。",
    "category": "Model3D",
    "url": "https://hyperhuman.deemos.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "kickresume",
    "name": "Kickresume",
    "desc": "辅助简历撰写与排版，经历需如实填写。",
    "category": "Job",
    "url": "https://www.kickresume.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "resumeworded",
    "name": "Resume Worded",
    "desc": "针对简历与职业档案提供修改建议。",
    "category": "Job",
    "url": "https://resumeworded.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "gamma",
    "name": "Gamma",
    "desc": "辅助制作演示、文档与网页，支持编辑及导出。",
    "category": "Office",
    "url": "https://gamma.app",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "checkedAt": "2026-11-05",
    "sourceUrl": "https://gamma.app/"
  },
  {
    "id": "copilot",
    "name": "MS Copilot",
    "desc": "Microsoft 通用 AI 助手；Microsoft 365 集成能力取决于对应产品与方案。",
    "category": "Office",
    "url": "https://copilot.microsoft.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "chatdoc",
    "name": "ChatDOC",
    "desc": "围绕上传文档进行问答与信息提取。",
    "category": "Office",
    "url": "https://chatdoc.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "notion-ai",
    "name": "Notion AI",
    "desc": "在工作空间中搜索信息、记录会议，并用智能体自动推进任务。",
    "category": "Office",
    "url": "https://www.notion.com/product/ai",
    "tags": [
      "知识管理",
      "会议",
      "智能体"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.notion.com/product/ai",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "jasper",
    "name": "Jasper",
    "desc": "面向营销团队的文案与内容创作。",
    "category": "Creation",
    "url": "https://www.jasper.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "raycast",
    "name": "Raycast AI",
    "desc": "桌面效率工具，提供 AI 交互与工作流入口。",
    "category": "Efficiency",
    "url": "https://www.raycast.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "zapier",
    "name": "Zapier",
    "desc": "连接应用与自动化流程，适合跨工具任务。",
    "category": "Efficiency",
    "url": "https://zapier.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "chatgpt",
    "name": "ChatGPT",
    "desc": "通用 AI 助手，学习模式可辅助分步骤理解问题。",
    "category": "Chat",
    "url": "https://chatgpt.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "claude",
    "name": "Claude",
    "desc": "支持写作、分析、编程与学习的通用助手。",
    "category": "Chat",
    "url": "https://claude.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.anthropic.com/education",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "gemini",
    "name": "Gemini",
    "desc": "Google 多模态 AI 助手，支持资料理解与内容创作。",
    "category": "Chat",
    "url": "https://gemini.google.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "doubao",
    "name": "豆包",
    "desc": "中文 AI 助手，辅助对话、学习和内容创作。",
    "category": "Chat",
    "url": "https://doubao.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "deepseek",
    "name": "DeepSeek",
    "desc": "对话、推理与编程辅助，重要结论需核查。",
    "category": "Chat",
    "url": "https://www.deepseek.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.deepseek.com/en/download/",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "wenxin",
    "name": "文心一言",
    "desc": "百度 AI 对话入口，当前产品名称与功能需以官网为准。",
    "category": "Chat",
    "url": "https://yiyan.baidu.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "mistral",
    "name": "Mistral",
    "desc": "Mistral 的模型与产品平台，对话产品为 Le Chat。",
    "category": "Chat",
    "url": "https://mistral.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "runway",
    "name": "Runway",
    "desc": "在统一创作空间中生成、编辑视频、图像与音频。",
    "category": "Video",
    "url": "https://runway.com",
    "tags": [
      "视频编辑",
      "多模态"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://runway.com",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "keling",
    "name": "可灵 AI",
    "desc": "可灵的视频生成入口，适合图生视频与镜头创作。",
    "category": "Video",
    "url": "https://keling.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "jimeng",
    "name": "即梦 AI",
    "desc": "文生图、图生视频、首尾帧控制与智能画布，适合分镜和短片制作。",
    "category": "Video",
    "url": "https://jimeng.jianying.com",
    "tags": [
      "图像视频",
      "中文",
      "画布"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://jimeng.jianying.com",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "veo",
    "name": "Veo",
    "desc": "Google's most capable video generation model with native audio.",
    "category": "Video",
    "url": "https://deepmind.google/models/veo/",
    "tags": [
      "Google",
      "Video Gen",
      "Native Audio"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "midjourney",
    "name": "Midjourney",
    "desc": "图像与视频生成工具，适合风格探索和视觉创意。",
    "category": "Image",
    "url": "https://www.midjourney.com",
    "tags": [
      "视觉创意",
      "图像视频"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.midjourney.com",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "flux",
    "name": "FLUX",
    "desc": "Black Forest Labs 的生成模型系列，官网提供图像与视频创作入口。",
    "category": "Image",
    "url": "https://bfl.ai",
    "tags": [
      "图像编辑",
      "多模态"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://bfl.ai",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "nano-banana",
    "name": "Nano Banana 2",
    "desc": "Google 图像生成与编辑模型，可通过 Gemini 等产品使用；这里链接到应用入口。",
    "category": "Image",
    "url": "https://gemini.google.com",
    "tags": [
      "图像编辑",
      "模型入口"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "stablediffusion",
    "name": "Stable Diffusion",
    "desc": "图像生成模型与工具生态，部署方式和许可因版本而异。",
    "category": "Image",
    "url": "https://stability.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "leonardo",
    "name": "Leonardo.ai",
    "desc": "图像生成与视觉设计平台，适合创意资产制作。",
    "category": "Image",
    "url": "https://leonardo.ai",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "tongyi-wanxiang",
    "name": "通义万相",
    "desc": "通义系列视觉生成入口，使用前核对当前产品地址。",
    "category": "Image",
    "url": "https://tongyi.aliyun.com/wanxiang",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "suno",
    "name": "Suno",
    "desc": "通过提示词创作歌曲，并使用编辑工具继续修改。",
    "category": "Music",
    "url": "https://suno.com",
    "tags": [
      "音乐",
      "歌曲"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://suno.com",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "udio",
    "name": "Udio",
    "desc": "AI 音乐创作平台，下载与授权范围需在官网确认。",
    "category": "Music",
    "url": "https://www.udio.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "cursor",
    "name": "Cursor",
    "desc": "围绕代码库理解、功能开发、调试与审查协作的编程智能体。",
    "category": "Coding",
    "url": "https://cursor.com",
    "tags": [
      "编程智能体",
      "IDE"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://cursor.com",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "v0",
    "name": "v0",
    "desc": "通过对话构建完整 Web 应用，支持预览与发布。",
    "category": "Coding",
    "url": "https://v0.app",
    "tags": [
      "应用生成",
      "全栈"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://v0.app",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "github-copilot",
    "name": "GitHub Copilot",
    "desc": "在开发工具中协作编写、审查与改进代码。",
    "category": "Coding",
    "url": "https://github.com/features/copilot",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "replit",
    "name": "Replit AI",
    "desc": "通过 AI 辅助构建应用，并在在线环境中运行与发布。",
    "category": "Coding",
    "url": "https://replit.com",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "trae",
    "name": "Trae",
    "desc": "面向中文用户的 AI 开发工具入口。",
    "category": "Coding",
    "url": "https://www.trae.cn",
    "tags": [
      "工具入口"
    ],
    "reviewStatus": "待复核"
  },
  {
    "id": "trae-global",
    "name": "TRAE",
    "desc": "AI 开发协作工具，提供桌面下载与 TRAE Web 入口。",
    "category": "Coding",
    "url": "https://www.trae.ai",
    "tags": [
      "编程智能体",
      "IDE"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.trae.ai",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "antigravity",
    "name": "Google Antigravity",
    "desc": "面向智能体协作的开发平台，提供开发与远程控制入口。",
    "category": "Coding",
    "url": "https://antigravity.google",
    "tags": [
      "编程智能体",
      "IDE"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://antigravity.google",
    "checkedAt": "2026-10-31"
  },
  {
    "id": "codex",
    "name": "Codex",
    "category": "Coding",
    "url": "https://openai.com/codex/",
    "desc": "在桌面、终端、IDE 与云端协作完成编程任务，支持并行任务与代码审查。",
    "tags": [
      "编程智能体",
      "多任务"
    ],
    "sourceUrl": "https://openai.com/index/introducing-the-codex-app/",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "claude-code",
    "name": "Claude Code",
    "category": "Coding",
    "url": "https://claude.com/product/claude-code",
    "desc": "在终端、IDE 或网页中执行开发任务，辅助修改代码、测试与迁移。",
    "tags": [
      "编程智能体",
      "终端"
    ],
    "sourceUrl": "https://claude.com/product/claude-code",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "claude-work",
    "name": "Claude 工作能力（原 Cowork）",
    "category": "Agent",
    "url": "https://claude.com/product/cowork",
    "desc": "Cowork 能力正在并入 Claude，可在授权文件与工具中执行知识工作任务。",
    "tags": [
      "办公智能体",
      "文件处理"
    ],
    "sourceUrl": "https://claude.com/product/cowork",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "lovable",
    "name": "Lovable",
    "category": "Coding",
    "url": "https://lovable.dev",
    "desc": "通过自然语言构建、预览与迭代应用，适合产品原型。",
    "tags": [
      "应用生成",
      "原型"
    ],
    "sourceUrl": "https://lovable.dev",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "bolt",
    "name": "Bolt",
    "category": "Coding",
    "url": "https://bolt.new",
    "desc": "通过对话构建网站、应用和交互原型。",
    "tags": [
      "应用生成",
      "原型"
    ],
    "sourceUrl": "https://bolt.new",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "n8n",
    "name": "n8n",
    "category": "Efficiency",
    "url": "https://n8n.io",
    "desc": "用可观察的工作流连接 AI 智能体与业务工具，适合自动化实践。",
    "tags": [
      "自动化",
      "工作流"
    ],
    "sourceUrl": "https://n8n.io",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "elicit",
    "name": "Elicit",
    "category": "Learning",
    "url": "https://elicit.com",
    "desc": "围绕研究问题检索论文、整理证据并生成带引用的研究报告。",
    "tags": [
      "论文",
      "证据整理"
    ],
    "sourceUrl": "https://elicit.com",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "flow",
    "name": "Google Flow",
    "category": "Video",
    "url": "https://flow.google.com",
    "desc": "将图像生成、参考素材与 Veo 视频创作连接在一个工作空间。",
    "tags": [
      "视频工作流",
      "图像视频"
    ],
    "sourceUrl": "https://blog.google/innovation-and-ai/models-and-research/google-labs/flow-updates-february-2026/",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "hailuo",
    "name": "海螺 AI",
    "category": "Video",
    "url": "https://hailuoai.video",
    "desc": "MiniMax 视频创作入口，提供参考素材驱动的视频生成。",
    "tags": [
      "视频",
      "参考素材"
    ],
    "sourceUrl": "https://hailuoai.video",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "minimax-code",
    "name": "MiniMax Code",
    "category": "Coding",
    "url": "https://agent.minimax.io",
    "desc": "MiniMax 官网提供的编码智能体入口。",
    "tags": [
      "编程智能体"
    ],
    "sourceUrl": "https://www.minimax.io/",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "minimax-design",
    "name": "MiniMax Design",
    "category": "Image",
    "url": "https://design.minimax.io",
    "desc": "MiniMax 官网提供的 AI 设计产品入口。",
    "tags": [
      "设计"
    ],
    "sourceUrl": "https://www.minimax.io/",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "ai-studio",
    "name": "Google AI Studio",
    "category": "Coding",
    "url": "https://aistudio.google.com",
    "desc": "面向 Gemini API 的开发与试验入口。",
    "tags": [
      "模型试验",
      "开发者"
    ],
    "sourceUrl": "https://aistudio.google.com",
    "checkedAt": "2026-10-31",
    "reviewStatus": "官方资料已核查"
  },
  {
    "id": "devin-desktop",
    "name": "Devin Desktop",
    "category": "Coding",
    "url": "https://devin.ai/desktop",
    "desc": "集中管理本地与云端编程智能体，组织开发任务、代码审查与会话。Windsurf 官网当前跳转至此。",
    "tags": [
      "Windsurf",
      "编程智能体",
      "多智能体",
      "代码审查"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://devin.ai/desktop",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "cline",
    "name": "Cline",
    "category": "Coding",
    "url": "https://cline.bot/",
    "desc": "开源编程智能体，支持编辑器、终端与桌面入口，辅助跨文件修改和运行测试。",
    "tags": [
      "开源",
      "编程智能体",
      "MCP",
      "终端"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://cline.bot/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "aider",
    "name": "Aider",
    "category": "Coding",
    "url": "https://aider.chat/",
    "desc": "终端中的 AI 结对编程工具，结合代码仓库、Git、代码检查与测试修改现有项目。",
    "tags": [
      "开源",
      "终端",
      "Git",
      "代码修改"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://aider.chat/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "kiro",
    "name": "Kiro",
    "category": "Coding",
    "url": "https://kiro.dev/",
    "desc": "把需求转为规格、设计和开发任务，结合编程智能体与属性测试实现项目。",
    "tags": [
      "规格驱动",
      "编程智能体",
      "测试"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://kiro.dev/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "opencode",
    "name": "OpenCode",
    "category": "Coding",
    "url": "https://opencode.ai/",
    "desc": "开源编程智能体，提供终端、桌面和编辑器入口，可连接不同模型提供商。",
    "tags": [
      "开源",
      "终端",
      "多模型",
      "编程智能体"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://opencode.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "qoder",
    "name": "Qoder",
    "category": "Coding",
    "url": "https://qoder.com/",
    "desc": "智能体编程平台，提供桌面、IDE、CLI 等入口，围绕项目开展开发和迭代。",
    "tags": [
      "编程智能体",
      "IDE",
      "终端",
      "应用开发"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://qoder.com/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "recraft",
    "name": "Recraft",
    "category": "Image",
    "url": "https://www.recraft.ai/ai-vector-generator",
    "desc": "生成和编辑矢量图、图标与插画，适合制作可缩放的视觉素材与 SVG。",
    "tags": [
      "矢量图",
      "SVG",
      "图标",
      "设计"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.recraft.ai/ai-vector-generator",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "ideogram",
    "name": "Ideogram",
    "category": "Image",
    "url": "https://ideogram.ai/",
    "desc": "图像生成与编辑平台，提供背景移除、颜色变体和可编辑文字图层等创作入口。",
    "tags": [
      "图片编辑",
      "文字图层",
      "设计"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://ideogram.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "krea",
    "name": "Krea",
    "category": "Image",
    "url": "https://www.krea.ai/",
    "desc": "整合图像、视频、实时生成和画质增强，通过节点工作流组织视觉创作。",
    "tags": [
      "实时生成",
      "画质增强",
      "视频",
      "节点工作流"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.krea.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "firefly",
    "name": "Adobe Firefly",
    "category": "Image",
    "url": "https://www.adobe.com/products/firefly.html",
    "desc": "提供图像与视频生成、图片编辑、分镜和情绪板等创意工具。",
    "tags": [
      "图片编辑",
      "视频",
      "分镜",
      "情绪板"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.adobe.com/products/firefly.html",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "pika",
    "name": "Pika",
    "category": "Video",
    "url": "https://pika.art/",
    "desc": "提供视频生成、镜头延长、动作迁移及图像和声音创作工具。",
    "tags": [
      "视频生成",
      "动作迁移",
      "视频延长"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://pika.art/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "descript",
    "name": "Descript",
    "category": "Video",
    "url": "https://www.descript.com/",
    "desc": "通过编辑转写文本剪辑音视频，支持字幕、播客编辑和声音增强。",
    "tags": [
      "文本剪辑",
      "字幕",
      "播客",
      "转写"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.descript.com/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "opusclip",
    "name": "OpusClip",
    "category": "Video",
    "url": "https://www.opus.pro/",
    "desc": "从长视频中选取并剪辑短片，辅助制作字幕、调整画幅和内容分发。",
    "tags": [
      "长视频转短片",
      "字幕",
      "画幅调整"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.opus.pro/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "higgsfield",
    "name": "Higgsfield",
    "category": "Video",
    "url": "https://higgsfield.ai/",
    "desc": "整合图像、视频与音频创作，提供 Cinema Studio、特效和画布等制作入口。",
    "tags": [
      "创意短片",
      "特效",
      "画布",
      "影像创作"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://higgsfield.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "make",
    "name": "Make",
    "category": "Efficiency",
    "url": "https://www.make.com/",
    "desc": "以可视化流程连接应用、数据源和 AI 模型，构建自动化与智能体任务。",
    "tags": [
      "自动化",
      "工作流",
      "应用连接"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.make.com/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "langflow",
    "name": "Langflow",
    "category": "Agent",
    "url": "https://www.langflow.org/",
    "desc": "以可视化组件构建智能体、检索增强应用与 MCP 服务，连接模型和向量数据库。",
    "tags": [
      "工作流",
      "RAG",
      "MCP",
      "低代码"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.langflow.org/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "ollama",
    "name": "Ollama",
    "category": "Efficiency",
    "url": "https://ollama.com/",
    "desc": "运行和使用开放模型，提供本地与云端模型入口，适合模型体验和开发集成。",
    "tags": [
      "本地模型",
      "开放模型",
      "开发工具"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://ollama.com/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "lm-studio",
    "name": "LM Studio / Bionic",
    "category": "Agent",
    "url": "https://lmstudio.ai/",
    "desc": "围绕开放模型提供本地运行与 Bionic 工作智能体，辅助文档、编程和自动化任务。",
    "tags": [
      "本地模型",
      "桌面智能体",
      "文档",
      "自动化"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://lmstudio.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "researchrabbit",
    "name": "ResearchRabbit",
    "category": "Learning",
    "url": "https://www.researchrabbit.ai/",
    "desc": "从种子论文探索相关研究和文献关系，帮助拓展阅读范围与整理研究脉络。",
    "tags": [
      "文献发现",
      "论文",
      "文献图谱"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.researchrabbit.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "scite",
    "name": "Scite",
    "category": "Learning",
    "url": "https://scite.ai/",
    "desc": "提供文献与引用检索、研究助手和论文集合，辅助查找与问题有关的研究证据。",
    "tags": [
      "引用检索",
      "论文",
      "研究证据"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://scite.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "litmaps",
    "name": "Litmaps",
    "category": "Learning",
    "url": "https://www.litmaps.com/",
    "desc": "检索和可视化相关论文，监测研究主题的新文献并与同伴共享文献地图。",
    "tags": [
      "文献图谱",
      "论文",
      "文献追踪"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.litmaps.com/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "jenni",
    "name": "Jenni",
    "category": "Learning",
    "url": "https://jenni.ai/",
    "desc": "整合学术阅读、写作和引用的研究工作空间；引用与生成内容需回到原文核对。",
    "tags": [
      "学术写作",
      "论文",
      "引用"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://jenni.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "felo",
    "name": "Felo",
    "category": "Search",
    "url": "https://felo.ai/search",
    "desc": "结合 AI 搜索、文档与内容创作，提供演示文稿和智能体等入口。",
    "tags": [
      "AI搜索",
      "文档",
      "PPT"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://felo.ai/search",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "you",
    "name": "You.com",
    "category": "Search",
    "url": "https://you.com/",
    "desc": "面向 AI 应用提供网页搜索、内容获取、回答与研究接口，适合开发者集成检索。",
    "tags": [
      "搜索API",
      "开发者",
      "研究检索"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://you.com/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "napkin",
    "name": "Napkin AI",
    "category": "Office",
    "url": "https://www.napkin.ai/",
    "desc": "把文本组织为可编辑的流程图、思维导图和信息图，辅助课程展示与观点表达。",
    "tags": [
      "流程图",
      "思维导图",
      "信息图",
      "PPT"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.napkin.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "otter",
    "name": "Otter",
    "category": "Office",
    "url": "https://otter.ai/",
    "desc": "将会议语音转为可搜索的转写和知识记录，辅助会前准备与会后跟进。",
    "tags": [
      "会议纪要",
      "转写",
      "协作"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://otter.ai/",
    "checkedAt": "2026-11-05"
  },
  {
    "id": "fathom",
    "name": "Fathom",
    "category": "Office",
    "url": "https://www.fathom.ai/",
    "desc": "记录会议并生成摘要、行动项与后续跟进信息，帮助团队整理讨论内容。",
    "tags": [
      "会议纪要",
      "摘要",
      "行动项"
    ],
    "reviewStatus": "官方资料已核查",
    "sourceUrl": "https://www.fathom.ai/",
    "checkedAt": "2026-11-05"
  }
];
