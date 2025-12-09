# AI Navigator — 更新与部署说明

> 面向后续迭代维护的快速指引。包含本地开发、数据更新、教程页、部署与常见问题。

## 项目概览
- 技术栈：Next.js 16、React 19、Tailwind CSS、Lucide React、Framer Motion
- 主要文件：
  - 工具数据：`ai-navigator/src/data/tools.ts`
  - 页面与交互：`ai-navigator/src/app/page.tsx`
  - 教程子页：`ai-navigator/src/app/guide/page.tsx`
  - 部署配置：`ai-navigator/vercel.json`

## 本地开发
- 安装依赖：
```bash
npm install
```
- 启动开发：
```bash
npm run dev
# 打开 http://localhost:3000
```
- 构建与本地生产运行：
```bash
npm run build
npm run start
```

## 代码结构（关键位置）
- 工具数据源 `TOOLS_DATA` 与类型 `Category`：`ai-navigator/src/data/tools.ts`
- 分类中文映射 `categoryLabels` 与筛选/排序：`ai-navigator/src/app/page.tsx`
- Wifi 图标触发“网络连接诊断”弹窗：`ai-navigator/src/app/page.tsx`
- 顶部“无法访问？查看解决方案”入口：`ai-navigator/src/app/page.tsx`
- 教程子页面路由（如需站内页）：`ai-navigator/src/app/guide/page.tsx`

## 数据更新指南
### A. 添加或编辑工具（增量更新）
- 打开 `ai-navigator/src/data/tools.ts`
- 在 `TOOLS_DATA` 数组中新增/修改一项，字段示例：
```ts
{ id: "example", name: "示例工具", desc: "一句中文简介。", category: "Chat", url: "https://example.com", tags: ["Freemium", "Proxy"] }
```
- 字段说明：
  - `category` 必须属于 15 类之一：`Search | Agent | Chat | Learning | Coding | Video | Image | Music | Dubbing | DigitalHuman | Model3D | Job | Office | Creation | Efficiency`
  - `tags` 支持中英双写：`免费/Free`、`付费/Paid`、`基础免费/Freemium`、`代理/Proxy`、`国产/Domestic`（页面会自动映射中文徽章与颜色）
  - 当包含 `代理/Proxy` 时，页面会隐藏“代理”文本标签，仅在卡片右上角显示可点击的 `Wifi` 图标触发“网络连接诊断”弹窗。

### B. 新增类别（增量更新）
1. 在 `ai-navigator/src/data/tools.ts` 顶部的 `export type Category` 联合类型中加入新分类标识（英文）。
2. 在 `ai-navigator/src/app/page.tsx` 的 `categoryLabels` 中为新分类添加中文展示名称。
3. 如需让新分类的热门工具优先显示，可在 `ai-navigator/src/app/page.tsx` 的热度排序 `popularity` 映射中新增对应 `id` 的权重（分值越高越靠前）。
4. 运行 `npm run build` 验证筛选与排序表现是否符合预期。

### C. 热度排序（可选）
- 位置：`ai-navigator/src/app/page.tsx`（在筛选后进行 `.sort`）
- 规则：先按 `popularity[id]` 从高到低排序，再按名称字典序作为次序。
- 用途：让 ChatGPT、Claude、Midjourney 等核心工具置顶展示。

## 网络排查入口与安全做法
- 顶部入口：Header 右侧的“无法访问？查看解决方案”链接（新开页）
- 弹窗入口：点击卡片右上角 `Wifi` 图标后，在弹窗内的教程链接（新开页）
- 外部链接推荐：将文档放在飞书/Notion/网盘（如 `https://ccn3midetoxm.feishu.cn/wiki/VgJyw9bdQiTkjQk4nNOcA1kCnhN`），页面仅提供跳转，避免在站内放置含敏感词的 PDF。

## 部署与上线
### 方式 A：GitHub 自动部署（推荐）
1. 仓库：`https://github.com/Sherlock-Shuang/AI-navigator`
2. 在 Vercel Dashboard 创建项目并关联该仓库（Framework 选择 Next.js）
3. 将 Production Branch 设置为 `master`
4. 每次 `git push` 到 `master`：
   - 自动生成预览部署（其他分支）和生产部署（master）
   - 生产域名指向最新部署

### 方式 B：命令行手动部署
- 先登录并链接：
```bash
npx vercel login
npx vercel link
```
- 触发生产部署：
```bash
npx vercel --prod --yes
```
- 部署成功后，命令行会输出生产域名（例如：`https://ai-navigator-xxxxx.vercel.app`）

### 自定义域名（可选）
- 在 Vercel 项目 Settings → Domains 添加你的自有域名并指向生产部署。

## 常见问题
- 404: NOT_FOUND（含 `sin1::...`）
  - 含数据中心标识的 404 是 Vercel 路由器级错误，通常是“域名未绑定到有效部署”或“预览域过期”。确保存在最新生产部署并正确绑定域名。
- `net::ERR_ABORTED`
  - 多为网络层或 CDN/证书传播问题。尝试无痕模式、清缓存或更换网络；等待数分钟再试。
- 多区域函数限制
  - Hobby 计划不支持多区域函数部署。确保 `vercel.json` 不设置 `regions: ["all"]` 等触发多区域的配置。

## 版本与依赖
- Next.js：`16.0.7`
- React：`19.2.0`
- 其他：`framer-motion`、`lucide-react`、`tailwindcss`

## 迭代流程建议
1. 本地开发与自测：更新 `src/data/tools.ts` / 新分类类型 / `categoryLabels` → `npm run dev`
2. 代码检查与构建：`npm run build`
3. 提交与推送：
```bash
git add .
git commit -m "更新工具数据/教程页"
git push
```
4. 部署与验证：等待 Vercel 完成构建 → 使用生产域名验证页面与新路由（如 `/guide`）。

---
如需我将 `/guide` 填充具体内容或更改为外部教程链接，请提供目标文案或链接地址。
