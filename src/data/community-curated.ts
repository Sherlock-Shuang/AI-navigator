import type { DemoPost } from './community-demo.ts'

// Editorial summaries of verified public discussions, not original posts by local members.
// Original dates and author attribution are preserved in source; createdAt is the collection time.
// Engagement counts start at zero here; source-site votes are not imported.
export const COMMUNITY_CURATED_POSTS: DemoPost[] = [
  {
    "id": "source-post-v2ex-1180155",
    "topic": "实践复盘",
    "title": "Cursor AI 编程心得",
    "content": "ZoBoat 的做法是：人先定架构和规范，复杂任务先讨论方案，再交给助手实现。项目中反复遇到的问题则写进规则，边开发边更新。他还提到让工具读取需求和接口材料，避免每次只凭零散的聊天上下文改代码。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "Cursor",
      "协作流程",
      "项目规则"
    ],
    "source": {
      "platform": "V2EX",
      "url": "https://www.v2ex.com/t/1180155",
      "title": "Cursor AI 编程心得",
      "author": "ZoBoat",
      "publishedAt": "2025-12-20T16:51:17+08:00",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-v2ex-1180155-1",
        "author": "shmilypeter",
        "content": "回复者认为，了解项目的边界条件，才更容易把任务说明白；完全不懂实现细节时，复杂系统的问题也更容易漏掉。",
        "createdAt": "2025-12-20T18:21:36+08:00",
        "source": {
          "platform": "V2EX",
          "url": "https://www.v2ex.com/t/1180155#r_17119394",
          "title": "Cursor AI 编程心得",
          "author": "shmilypeter",
          "publishedAt": "2025-12-20T18:21:36+08:00",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-v2ex-1188070",
    "topic": "实践复盘",
    "title": "[ AI 与编程] 近半年工作使用 Cursor 的感受",
    "content": "一位前端开发者回顾了半年的使用经历：代码补全减少了重复输入，但整段生成的代码仍要花时间理解、检查和自测。他更习惯自己构思功能实现，再让工具补齐细节。帖子也提到，提示方式和熟练程度可能影响这种使用感受。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "Cursor",
      "代码补全",
      "代码审查"
    ],
    "source": {
      "platform": "V2EX",
      "url": "https://www.v2ex.com/t/1188070",
      "title": "[ AI 与编程] 近半年工作使用 Cursor 的感受",
      "author": "lenglengyuchen",
      "publishedAt": "2026-01-24T17:10:02+08:00",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-v2ex-1188070-1",
        "author": "murmur",
        "content": "murmur 补充了自己遇到连接中断、对话卡住的情况，提到网络条件也会打断开发流程。",
        "createdAt": "2026-01-24T18:20:05+08:00",
        "source": {
          "platform": "V2EX",
          "url": "https://www.v2ex.com/t/1188070#r_17249636",
          "title": "[ AI 与编程] 近半年工作使用 Cursor 的感受",
          "author": "murmur",
          "publishedAt": "2026-01-24T18:20:05+08:00",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-v2ex-1210849",
    "topic": "工具问答",
    "title": "AI 编程工具大家实际使用中哪个综合下来最好用？",
    "content": "fireeeeee 看过一些工具测评后，仍想知道大家在日常项目里用得怎样。他把多款编程助手放在一起征询经验，关心实际使用的整体感受。讨论里有人按开发、检查等任务搭配工具，也有人更在意编辑器里的操作方式。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "编程助手",
      "工具选择",
      "工作流"
    ],
    "source": {
      "platform": "V2EX",
      "url": "https://www.v2ex.com/t/1210849",
      "title": "AI 编程工具大家实际使用中哪个综合下来最好用？",
      "author": "fireeeeee",
      "publishedAt": "2026-05-07T14:11:17+08:00",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-v2ex-1210849-1",
        "author": "P233",
        "content": "P233 分享的搭配是让 Claude Code 参与功能开发，再用 Codex 检查，同时自己掌握项目方向。",
        "createdAt": "2026-05-07T14:32:40+08:00",
        "source": {
          "platform": "V2EX",
          "url": "https://www.v2ex.com/t/1210849#r_17607477",
          "title": "AI 编程工具大家实际使用中哪个综合下来最好用？",
          "author": "P233",
          "publishedAt": "2026-05-07T14:32:40+08:00",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-v2ex-1181949",
    "topic": "实践复盘",
    "title": "使用 Cursor 进行 AI 编程的年度总结",
    "content": "glumess 回顾了使用 Cursor 的一年，也写到过度依赖生成代码后遇到的问题：没有先定方案、开发时又缺少记录，换个环境就很难接上原来的思路。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "Cursor",
      "设计记录",
      "开发复盘"
    ],
    "source": {
      "platform": "V2EX",
      "url": "https://www.v2ex.com/t/1181949",
      "title": "使用 Cursor 进行 AI 编程的年度总结",
      "author": "glumess",
      "publishedAt": "2025-12-29T16:25:55+08:00",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-v2ex-1181949-1",
        "author": "axisray",
        "content": "axisray 提到自己做过工单预筛选工具，让 AI 先处理一遍，再人工查看和跟进结果。",
        "createdAt": "2025-12-31T10:10:30+08:00",
        "source": {
          "platform": "V2EX",
          "url": "https://www.v2ex.com/t/1181949#r_17158235",
          "title": "使用 Cursor 进行 AI 编程的年度总结",
          "author": "axisray",
          "publishedAt": "2025-12-31T10:10:30+08:00",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-reddit-1l9mrb6",
    "topic": "工具问答",
    "title": "大家做文献综述的完整流程是怎样的？",
    "content": "一位博士生把自己的文献流程列了出来：在 Google Scholar 找论文，下载后放进 NotebookLM，提问整理主题，再回原文找引用、交给 Zotero 管理。最让他头疼的是下载、上传和引用整理互相断开，所以想听听别人怎样把这些步骤接起来。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "NotebookLM",
      "Zotero",
      "文献综述"
    ],
    "source": {
      "platform": "Reddit",
      "url": "https://www.reddit.com/r/notebooklm/comments/1l9mrb6/what_is_your_full_literature_review_workflow/",
      "title": "What is your full literature review workflow?",
      "author": "userQKD",
      "publishedAt": "2025-06-12T13:40:18Z",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-reddit-1l9mrb6-1",
        "author": "Suitable_Pie_Drama",
        "content": "回复者建议先沿相关论文扩展资料，把引用格式模板一同作为来源，再生成摘要并人工校订。",
        "createdAt": "2025-06-12T14:03:23Z",
        "source": {
          "platform": "Reddit",
          "url": "https://www.reddit.com/r/notebooklm/comments/1l9mrb6/what_is_your_full_literature_review_workflow/mxdshqw/",
          "title": "What is your full literature review workflow?",
          "author": "Suitable_Pie_Drama",
          "publishedAt": "2025-06-12T14:03:23Z",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-reddit-1lj3yg3",
    "topic": "工具问答",
    "title": "硕士论文与 NotebookLM：求工作流建议",
    "content": "发帖人准备开始硕士论文，此前只短暂试过 NotebookLM。他想听研究生分享具体做法：是先读材料再上传，还是边提问边整理；哪些环节适合交给工具，哪些仍要自己完成。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "NotebookLM",
      "论文阅读"
    ],
    "source": {
      "platform": "Reddit",
      "url": "https://www.reddit.com/r/notebooklm/comments/1lj3yg3/masters_thesis_notebooklm_looking_for_workflow/",
      "title": "Master's Thesis & NotebookLM: Looking for Workflow Tips",
      "author": "Sorry_Fan_2056",
      "publishedAt": "2025-06-24T06:34:15Z",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-reddit-1lj3yg3-1",
        "author": "Youzernayme",
        "content": "回复者把上传文件命名为作者与年份，方便辨认引用；同时强调上传前先阅读材料，不能依赖工具找全重点。",
        "createdAt": "2025-06-24T11:51:53Z",
        "source": {
          "platform": "Reddit",
          "url": "https://www.reddit.com/r/notebooklm/comments/1lj3yg3/masters_thesis_notebooklm_looking_for_workflow/mzhw952/",
          "title": "Master's Thesis & NotebookLM: Looking for Workflow Tips",
          "author": "Youzernayme",
          "publishedAt": "2025-06-24T11:51:53Z",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-reddit-1o35iiz",
    "topic": "工具问答",
    "title": "怎样让 NotebookLM 在报告里引用来源？",
    "content": "作者希望输出同时保留文件名和可点击的引用编号。这套提示在普通对话里有用，生成报告时却没有稳定沿用，所以发帖询问有没有更合适的做法。他后来补充，自己已用引用键给文件命名，希望减少从正文猜测文献出处的步骤。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "NotebookLM",
      "引用核对"
    ],
    "source": {
      "platform": "Reddit",
      "url": "https://www.reddit.com/r/notebooklm/comments/1o35iiz/best_practices_to_make_notebooklm_cite_the/",
      "title": "Best practices to make NotebookLM cite the sources in reports",
      "author": "AnimusAstralis",
      "publishedAt": "2025-10-10T16:21:42Z",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-reddit-1o35iiz-1",
        "author": "AnimusAstralis",
        "content": "作者在后续回复中说，自己用引用键命名文件，希望工具直接引用文件名，减少从正文猜测文献身份。",
        "createdAt": "2025-10-10T17:03:40Z",
        "source": {
          "platform": "Reddit",
          "url": "https://www.reddit.com/r/notebooklm/comments/1o35iiz/best_practices_to_make_notebooklm_cite_the/niswwpx/",
          "title": "Best practices to make NotebookLM cite the sources in reports",
          "author": "AnimusAstralis",
          "publishedAt": "2025-10-10T17:03:40Z",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-reddit-1qy9sjp",
    "topic": "工具问答",
    "title": "用 AI 做文献综述？",
    "content": "一位硕士生想用 AI 辅助文献综述，问题包括怎样发现可靠论文、找到关键作者与概念、比较不同研究的观点。他希望先形成自己的理解再写作，也特别在意引用会不会被编造，因此向社区征集不同工具之间的配合方法。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "文献综述",
      "科研工作流"
    ],
    "source": {
      "platform": "Reddit",
      "url": "https://www.reddit.com/r/notebooklm/comments/1qy9sjp/using_ai_for_a_literature_review/",
      "title": "Using AI for a literature review?",
      "author": "Healthy_Try4444",
      "publishedAt": "2026-02-07T09:46:48Z",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": [
      {
        "id": "source-reply-reddit-1qy9sjp-1",
        "author": "Pasid3nd3",
        "content": "回复者建议用工具初步探索主题，但自己负责选择与筛查文献，再让 NotebookLM 辅助后续处理。",
        "createdAt": "2026-02-07T12:54:57Z",
        "source": {
          "platform": "Reddit",
          "url": "https://www.reddit.com/r/notebooklm/comments/1qy9sjp/using_ai_for_a_literature_review/o42mdnd/",
          "title": "Using AI for a literature review?",
          "author": "Pasid3nd3",
          "publishedAt": "2026-02-07T12:54:57Z",
          "collectedAt": "2026-11-08T11:36:37Z"
        }
      }
    ]
  },
  {
    "id": "source-post-v2ex-1255354",
    "topic": "实践复盘",
    "title": "纯外行做了一个微信割草小游戏,分享一些经验之谈",
    "content": "DearFox 分享了从零制作微信小游戏的经历：AI 帮他实现了不少玩法，但代码跑起来以后，美术、界面和特效成了新的难点。他发现自己只能笼统地要求“好看”，却说不清具体该怎样改。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-08T11:36:37Z",
    "likes": 0,
    "tags": [
      "AI 编程",
      "小游戏",
      "视觉设计"
    ],
    "source": {
      "platform": "V2EX",
      "url": "https://www.v2ex.com/t/1255354",
      "title": "纯外行做了一个微信割草小游戏,分享一些经验之谈",
      "author": "DearFox",
      "publishedAt": "2026-11-08T08:14:59Z",
      "collectedAt": "2026-11-08T11:36:37Z"
    },
    "replies": []
  },
  {
    "id": "source-post-csdn-145549690",
    "topic": "实践复盘",
    "title": "测试使用Cursor中的deepseek-V3大模型辅助开发一个小程序",
    "content": "ziwend 先生成小程序框架，再用 Cursor 和 DeepSeek 修改，回到微信开发者工具里调试。功能变多后，他发现部分旧逻辑被改没了；此前又没有开启版本管理，恢复很费劲。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-11T05:21:00Z",
    "likes": 0,
    "tags": [
      "Cursor",
      "DeepSeek",
      "小程序"
    ],
    "source": {
      "platform": "CSDN",
      "url": "https://blog.csdn.net/u010438035/article/details/145549690",
      "title": "测试使用Cursor中的deepseek-V3大模型辅助开发一个小程序",
      "author": "ziwend",
      "publishedAt": "2025-02-18T11:40:32+08:00",
      "collectedAt": "2026-11-11T05:21:00Z"
    },
    "replies": []
  },
  {
    "id": "source-post-csdn-144829518",
    "topic": "实践复盘",
    "title": "试用ChatGPT的copilot编写一个程序从笔记本电脑获取语音输入和图像输入并调用开源大模型进行解析",
    "content": "这次尝试把录音、转写、模型问答和语音播放拆开实现，每完成一步就运行检查。作者也接上了本地 LLaVA 处理图片。基础功能能用，但中英混说的识别、接口调用限制和图片处理耗时仍有问题。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-11T05:21:00Z",
    "likes": 0,
    "tags": [
      "ChatGPT",
      "Ollama",
      "语音助手"
    ],
    "source": {
      "platform": "CSDN",
      "url": "https://blog.csdn.net/u010438035/article/details/144829518",
      "title": "试用ChatGPT的copilot编写一个程序从笔记本电脑获取语音输入和图像输入并调用开源大模型进行解析",
      "author": "ziwend",
      "publishedAt": "2024-12-31T10:56:55+08:00",
      "collectedAt": "2026-11-11T05:21:00Z"
    },
    "replies": []
  },
  {
    "id": "source-post-csdn-144606736",
    "topic": "实践复盘",
    "title": "tts语音合成相关开源项目试用对比",
    "content": "作者试用了 ChatTTS、CosyVoice、GPT-SoVITS 等工具，分别记录部署和试听结果。有的换成自己的文本后会漏掉句子，有的音量或音色不稳定，也有参考音频长度不合要求的报错。记录针对当时的测试版本。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-11T05:21:00Z",
    "likes": 0,
    "tags": [
      "ChatTTS",
      "CosyVoice",
      "语音合成"
    ],
    "source": {
      "platform": "CSDN",
      "url": "https://blog.csdn.net/u010438035/article/details/144606736",
      "title": "tts语音合成相关开源项目试用对比",
      "author": "ziwend",
      "publishedAt": "2024-12-23T16:35:15+08:00",
      "collectedAt": "2026-11-11T05:21:00Z"
    },
    "replies": []
  },
  {
    "id": "source-post-csdn-146515197",
    "topic": "实践复盘",
    "title": "dify案例分享：Markdown 转 Word 自定义智能体",
    "content": "海虎哥记录了一次文档导出折腾：Markdown 转 Word 插件已经生成文件，但下载链接报错，文件其实还在容器里。于是他把转换拆成单独的 HTTP 服务，再通过 Dify 工作流调用，最后让智能体使用这个工具。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-11T05:21:00Z",
    "likes": 0,
    "tags": [
      "Dify",
      "Word",
      "文件导出"
    ],
    "replies": [],
    "source": {
      "platform": "CSDN",
      "url": "https://blog.csdn.net/wwwzhouhui/article/details/146515197",
      "title": "35-dify案例分享-手把手教你打造 Markdown 转 Word 自定义智能体",
      "author": "海虎哥AI编程",
      "publishedAt": "2025-03-26T08:00:00+08:00",
      "collectedAt": "2026-11-11T05:21:00Z"
    }
  },
  {
    "id": "source-post-csdn-151098375",
    "topic": "资源分享",
    "title": "第五章 Dify社区版使用篇-工具-自定义",
    "content": "作者拿天气查询练习 Dify 的自定义工具：从内置示例开始，把服务地址和请求路径改成高德天气接口，再单独设置鉴权。测试时传入城市编码，确认拿到返回值后才保存工具。文章也逐项解释了接口描述里的参数、响应和认证字段。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-11T05:21:00Z",
    "likes": 0,
    "tags": [
      "Dify",
      "自定义工具",
      "OpenAPI"
    ],
    "replies": [],
    "source": {
      "platform": "CSDN",
      "url": "https://blog.csdn.net/ldp19850914/article/details/151098375",
      "title": "第五章 Dify社区版使用篇-工具-自定义",
      "author": "瑞瑞绮绮",
      "publishedAt": "2025-09-02T23:00:00+08:00",
      "collectedAt": "2026-11-11T05:21:00Z"
    }
  },
  {
    "id": "source-post-csdn-149690284",
    "topic": "实践复盘",
    "title": "开源版 COZE：Coze Studio 本地安装教程",
    "content": "这篇记录了作者在 Windows 上尝试早期开源版 Coze Studio 的过程。他先配置模型接入点，再转到 WSL 启动容器，途中遇到了脚本兼容和端口占用。文中提醒，模型名称、接入点 ID 和密钥要分别核对，别直接照抄截图；本机已有数据库时，也要调整端口映射。",
    "author": "社区摘读",
    "role": "",
    "createdAt": "2026-11-11T05:21:00Z",
    "likes": 0,
    "tags": [
      "Coze",
      "本地部署",
      "排错"
    ],
    "replies": [],
    "source": {
      "platform": "CSDN",
      "url": "https://blog.csdn.net/wwwzhouhui/article/details/149690284",
      "title": "01-开源版COZE-字节 Coze Studio 重磅开源！保姆级本地安装教程，手把手带你体验",
      "author": "海虎哥AI编程",
      "publishedAt": "2025-07-27T14:55:16+08:00",
      "collectedAt": "2026-11-11T05:21:00Z"
    }
  }
]
