# 食堂列车 (Food Train) - 设置指南

## 前置要求

- Node.js 18+ 
- npm 或 yarn
- Supabase 账号（免费）
- Vercel 账号（免费，用于部署）

## 本地开发设置

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Supabase

1. 访问 [supabase.com](https://supabase.com) 并创建一个新项目
2. 在项目创建完成后，进入 "Project Settings" > "API"
3. 复制 `Project URL` 和 `anon public` key
4. 在项目根目录创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的-supabase-anon-key
```

### 3. 初始化数据库

1. 在 Supabase Dashboard 中，进入 "SQL Editor"
2. 创建新查询
3. 复制 `supabase-setup.sql` 文件的内容并执行
4. 这将创建所有必要的表、RLS 策略和 Storage bucket

### 4. 配置认证

1. 在 Supabase Dashboard 中，进入 "Authentication" > "Providers"
2. 启用 "Email" 认证
3. （可选）启用 Google OAuth 或其他社交登录

### 5. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用

## 部署到 Vercel

### 1. 连接 GitHub

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库

### 2. 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. 部署

点击 "Deploy" 按钮，Vercel 将自动构建和部署你的应用。

## 功能说明

### 用户功能
- ✅ 用户注册/登录
- ✅ 查看所有餐厅列表
- ✅ 添加新餐厅（带照片上传）
- ✅ 编辑/删除自己添加的餐厅
- ✅ 按菜系、价格、距离筛选餐厅
- ✅ 随机选择今天的午餐餐厅

### 技术栈
- **前端**: Next.js 14 (App Router) + TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **存储**: Supabase Storage
- **部署**: Vercel

## 常见问题

### 如何重置数据库？

在 Supabase SQL Editor 中运行：

```sql
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
```

然后重新运行 `supabase-setup.sql`

### 如何更改 Storage bucket 名称？

1. 修改 `supabase-setup.sql` 中的 bucket 名称
2. 更新代码中所有引用该 bucket 的地方

## 许可证

MIT

