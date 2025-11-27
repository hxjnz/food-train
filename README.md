# 🚂 食堂列车 (Food Train)

一个帮助团队成员管理和选择午餐餐厅的 Web 应用。解决"今天吃什么"的难题！

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e)

## ✨ 功能特性

- 🔐 **用户认证** - 安全的邮箱注册/登录系统
- 📝 **餐厅管理** - 添加、编辑、删除餐厅信息
- 📸 **照片上传** - 为餐厅添加美食照片
- 🎲 **随机选择** - 使用抽奖动画随机选择今天的餐厅
- 🔍 **智能筛选** - 按菜系、价格、距离筛选餐厅
- 📱 **响应式设计** - 完美支持手机、平板和桌面端
- 🎨 **现代化 UI** - 使用 shadcn/ui 组件库

## 🛠️ 技术栈

- **前端框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **数据库**: [Supabase](https://supabase.com/) (PostgreSQL)
- **认证**: Supabase Auth
- **存储**: Supabase Storage
- **部署**: [Vercel](https://vercel.com/)

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- Supabase 账号（免费）

### 安装步骤

1. **克隆仓库**

```bash
git clone <your-repo-url>
cd food-train
```

2. **安装依赖**

```bash
npm install
```

3. **配置环境变量**

创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的-supabase-anon-key
```

获取 Supabase 凭据：
- 访问 [supabase.com](https://supabase.com) 创建项目
- 进入 Project Settings > API
- 复制 Project URL 和 anon public key

4. **初始化数据库**

- 在 Supabase Dashboard 中，进入 SQL Editor
- 执行 `supabase-setup.sql` 文件中的 SQL 脚本

5. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用

## 📁 项目结构

```
food-train/
├── app/                      # Next.js App Router 页面
│   ├── login/               # 登录页面
│   ├── signup/              # 注册页面
│   ├── restaurants/         # 餐厅相关页面
│   │   ├── new/            # 添加新餐厅
│   │   └── [id]/           # 餐厅详情和编辑
│   └── page.tsx            # 主页（餐厅列表）
├── components/              # React 组件
│   ├── auth/               # 认证相关组件
│   ├── restaurant/         # 餐厅组件
│   ├── filters/            # 筛选组件
│   ├── random-picker/      # 随机选择器
│   └── ui/                 # shadcn/ui 组件
├── lib/                     # 工具函数和类型
│   ├── supabase/           # Supabase 客户端配置
│   └── types.ts            # TypeScript 类型定义
└── supabase-setup.sql      # 数据库初始化脚本
```

## 🗄️ 数据库设计

### restaurants 表
- 餐厅基本信息（名称、菜系、价格、地址等）
- 照片 URL
- 创建者关联

### user_profiles 表
- 用户资料信息
- 关联认证用户

### Row Level Security (RLS)
- 餐厅：所有用户可读，仅创建者可编辑/删除
- 用户资料：用户只能查看和编辑自己的资料

## 📦 部署到 Vercel

1. **推送到 GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **导入到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "Import Project"
   - 选择你的 GitHub 仓库

3. **配置环境变量**

在 Vercel 项目设置中添加：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **部署**

点击 "Deploy" - Vercel 将自动构建和部署

## 🎯 使用指南

### 添加餐厅
1. 点击右上角"添加餐厅"按钮
2. 填写餐厅信息（名称、菜系、价格等）
3. 可选：上传餐厅照片
4. 点击"添加餐厅"保存

### 随机选择餐厅
1. 点击"随机选择"按钮
2. 可选：先使用筛选条件缩小范围
3. 点击"开始抽取"观看动画
4. 查看结果，可以"再抽一次"

### 筛选餐厅
- 按菜系类型筛选（如：川菜、粤菜）
- 按价格范围筛选（$、$$、$$$）
- 按距离筛选
- 点击"应用"查看结果

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 许可证

MIT License

## 📮 联系方式

如有问题或建议，请提交 Issue。

---

Made with ❤️ for solving "What's for lunch?" dilemma
