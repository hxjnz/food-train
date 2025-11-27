# ⚡ 快速开始指南

只需 10 分钟，让你的食堂列车应用上线！

## 第一步：克隆并安装 (2 分钟)

```bash
# 进入项目目录
cd food-train

# 安装依赖
npm install
```

## 第二步：配置 Supabase (5 分钟)

### 1. 创建 Supabase 项目

访问 https://supabase.com → 注册/登录 → 新建项目

### 2. 执行数据库脚本

- 打开 Supabase Dashboard
- 进入 "SQL Editor"
- 粘贴 `supabase-setup.sql` 的内容
- 点击 "Run"

### 3. 获取 API 密钥

- 进入 Settings > API
- 复制以下信息：
  - Project URL
  - anon public key

### 4. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的-anon-key
```

## 第三步：本地运行 (1 分钟)

```bash
npm run dev
```

访问 http://localhost:3000

## 第四步：测试功能 (2 分钟)

1. 注册一个新账号
2. 添加一家餐厅
3. 尝试随机选择功能

## 🚀 部署到 Vercel (额外 5 分钟)

### 方式 1: GitHub + Vercel（推荐）

```bash
# 推送到 GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

然后：
1. 访问 https://vercel.com
2. 导入 GitHub 仓库
3. 添加环境变量（同上）
4. 点击 Deploy

### 方式 2: Vercel CLI

```bash
# 安装并部署
npm i -g vercel
vercel
```

## ✅ 完成！

你的应用现在已经上线了！分享 URL 给你的团队成员吧。

## 🆘 遇到问题？

- **数据库错误**: 确保执行了 SQL 脚本
- **认证失败**: 检查环境变量是否正确
- **图片上传失败**: 确认 Storage bucket 已创建

详细文档：
- 📖 [完整安装指南](SETUP.md)
- 🚀 [部署指南](DEPLOYMENT.md)
- 📋 [项目文档](README.md)

---

**需要帮助？** 查看 PROJECT_SUMMARY.md 了解更多信息

