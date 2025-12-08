# AI Navigator — 更新与部署说明

> 面向后续迭代维护的快速指引。包含本地开发、数据更新、教程页、部署与常见问题。

## 项目概览
- 技术栈：Next.js 16、React 19、Tailwind CSS、Lucide React、Framer Motion
- 主要文件：
  - 数据与页面：`ai-navigator/src/app/page.tsx`
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
- 工具数据源 `TOOLS_DATA`：`ai-navigator/src/app/page.tsx:16-65`
- 分类常量 `CATEGORIES`：`ai-navigator/src/app/page.tsx:67`
- “代理”图标触发弹窗：`ai-navigator/src/app/page.tsx:174-181`
- 弹窗内容（包含教程链接）：`ai-navigator/src/app/page.tsx:232-282`
- 教程子页面路由：`ai-navigator/src/app/guide/page.tsx`

## 数据更新指南
### 1. 添加或编辑一个工具
- 打开 `ai-navigator/src/app/page.tsx`
- 在 `TOOLS_DATA` 数组中新增/修改一项，字段示例：
```ts
{ id: "example", name: "示例工具", desc: "一句中文简介。", category: "聊天", url: "https://example.com", tags: ["基础免费", "代理"] }
```
- 字段说明：
  - `category` 必须属于 `CATEGORIES` 中的一个：`["全部", "聊天", "视频", "图片", "音乐", "代码", "生产力"]`
  - `tags` 推荐取值：`"免费" | "付费" | "基础免费" | "代理" | "国产"`
  - 当 `tags` 包含 `"代理"` 时，卡片右上角会显示 `Wifi` 图标，点击弹出网络指南。

### 2. 修改分类
- 打开 `CATEGORIES` 常量：`ai-navigator/src/app/page.tsx:67`
- 增加或调整分类时，确保 `TOOLS_DATA` 中 `category` 使用一致的中文命名。

### 3. 调整标签与样式
- 标签的样式映射在卡片渲染处：`ai-navigator/src/app/page.tsx:186-207`
- 如需新增标签类型，可在该位置为新标签添加对应的颜色样式分支。

## 教程页与弹窗链接
### 1. 跳转链接位置
- 弹窗中的教程链接位于：`ai-navigator/src/app/page.tsx:265-270`
- 目前链接指向站内子路由：`/guide`

### 2. 教程子页
- 文件：`ai-navigator/src/app/guide/page.tsx`
- 该页当前为空白，后续可直接在此页填充说明内容或跳转外部地址。
- 如需改为外部链接，将弹窗中的 `href` 改为目标 URL 即可。

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
1. 本地开发与自测：更新 `TOOLS_DATA` / 分类 / 教程页 → `npm run dev`
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
