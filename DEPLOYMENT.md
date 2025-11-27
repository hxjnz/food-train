# 🚀 部署指南

本指南将帮助你将食堂列车应用部署到 Vercel。

## 前置准备

### 1. Supabase 项目配置

在部署之前，确保你已经完成 Supabase 设置：

#### a) 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "New Project"
3. 填写项目名称和数据库密码
4. 选择区域（建议选择离用户最近的）
5. 等待项目创建完成（约 2 分钟）

#### b) 执行数据库初始化脚本

1. 进入项目 Dashboard
2. 点击左侧菜单 "SQL Editor"
3. 点击 "New Query"
4. 复制粘贴 `supabase-setup.sql` 的全部内容
5. 点击 "Run" 执行脚本
6. 确认所有命令执行成功（绿色勾号）

#### c) 配置认证

1. 点击左侧菜单 "Authentication"
2. 进入 "Providers" 标签
3. 确保 "Email" 已启用
4. （可选）配置邮件模板
5. （可选）启用其他登录方式（Google、GitHub 等）

#### d) 配置 Storage

1. 点击左侧菜单 "Storage"
2. 确认 `restaurant-images` bucket 已创建
3. 点击 bucket，进入 "Policies" 标签
4. 确认已有适当的访问策略

#### e) 获取 API 凭据

1. 点击左侧菜单底部的 "Settings" 图标
2. 进入 "API" 标签
3. 复制以下信息：
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public** key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## 部署到 Vercel

### 方法一：通过 GitHub（推荐）

#### 1. 推送代码到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Food Train app"

# 添加远程仓库
git remote add origin https://github.com/你的用户名/food-train.git

# 推送到 GitHub
git push -u origin main
```

#### 2. 导入到 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New..." > "Project"
4. 从列表中选择 `food-train` 仓库
5. 点击 "Import"

#### 3. 配置项目

在 "Configure Project" 页面：

**Framework Preset**: Next.js（自动检测）

**Environment Variables**:
点击 "Environment Variables" 添加：

```
NEXT_PUBLIC_SUPABASE_URL=你的-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的-supabase-anon-key
```

**提示**: 从 Supabase Dashboard > Settings > API 复制这些值

#### 4. 部署

1. 点击 "Deploy"
2. 等待构建完成（约 2-3 分钟）
3. 部署成功后，会显示你的网站 URL

### 方法二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 按提示操作，添加环境变量
```

## 部署后配置

### 1. 更新 Supabase 认证重定向 URL

1. 回到 Supabase Dashboard
2. 进入 Authentication > URL Configuration
3. 在 "Site URL" 中添加你的 Vercel 域名：
   ```
   https://你的应用.vercel.app
   ```
4. 在 "Redirect URLs" 中添加：
   ```
   https://你的应用.vercel.app/**
   ```

### 2. 测试应用

访问你的 Vercel URL 并测试：

- ✅ 用户注册
- ✅ 用户登录
- ✅ 添加餐厅
- ✅ 上传照片
- ✅ 筛选功能
- ✅ 随机选择
- ✅ 编辑/删除餐厅

### 3. 配置自定义域名（可选）

1. 在 Vercel 项目设置中
2. 进入 "Domains" 标签
3. 添加你的自定义域名
4. 按照指示配置 DNS

## 自动部署

配置完成后，每次推送到 `main` 分支都会自动触发部署：

```bash
git add .
git commit -m "Update feature"
git push
```

Vercel 会自动：
1. 检测代码变更
2. 运行构建
3. 部署新版本
4. 提供预览 URL

## 环境变量管理

### 更新环境变量

1. 在 Vercel Dashboard 中
2. 进入你的项目
3. 点击 "Settings" > "Environment Variables"
4. 添加/编辑/删除变量
5. 重新部署以使更改生效

### 不同环境的配置

- **Production**: 生产环境变量
- **Preview**: 预览部署（PR）的变量
- **Development**: 本地开发变量

## 监控和日志

### 查看部署日志

1. 在 Vercel Dashboard 中
2. 点击最近的部署
3. 查看 "Build Logs" 和 "Function Logs"

### 查看分析数据

1. 进入项目 "Analytics" 标签
2. 查看：
   - 页面访问量
   - 性能指标
   - Web Vitals

## 常见问题

### 部署失败

**症状**: 构建失败或部署错误

**解决方案**:
1. 检查构建日志中的错误信息
2. 确保所有环境变量已正确设置
3. 确保 `package.json` 中的依赖版本正确
4. 本地运行 `npm run build` 测试

### 认证不工作

**症状**: 登录或注册失败

**解决方案**:
1. 检查 Supabase URL 和 Key 是否正确
2. 确保 Supabase 中已配置正确的重定向 URL
3. 检查浏览器控制台的错误信息

### 图片上传失败

**症状**: 上传照片时出错

**解决方案**:
1. 确保 Supabase Storage bucket 已创建
2. 检查 Storage policies 是否正确配置
3. 确认 bucket 为 public

### 数据库连接问题

**症状**: 无法读取或写入数据

**解决方案**:
1. 确保执行了 `supabase-setup.sql` 脚本
2. 检查 RLS policies 是否正确
3. 在 Supabase SQL Editor 中测试查询

## 性能优化

### 1. 启用 Vercel 边缘缓存

在 `next.config.ts` 中配置缓存策略

### 2. 图片优化

- 使用 Next.js Image 组件（已配置）
- 考虑使用 WebP 格式
- 设置合适的图片尺寸限制

### 3. 数据库优化

- 为常用查询创建索引
- 使用 Supabase 的实时功能（可选）
- 考虑启用数据库连接池

## 成本估算

### 免费额度

- **Vercel**: 
  - ✅ 无限部署
  - ✅ 100GB 带宽/月
  - ✅ 无限团队成员

- **Supabase**:
  - ✅ 500MB 数据库
  - ✅ 1GB 存储空间
  - ✅ 50K 月活用户

### 何时需要升级

- 超过 50 人的团队
- 存储超过 10,000 张照片
- 每月超过 100GB 流量

## 安全建议

1. ✅ 定期更新依赖包
2. ✅ 启用 Supabase RLS
3. ✅ 使用环境变量存储密钥
4. ✅ 配置 CORS 策略
5. ✅ 定期备份数据库

## 支持

如遇问题：
1. 查看本文档的常见问题部分
2. 检查项目的 GitHub Issues
3. 查阅 [Vercel 文档](https://vercel.com/docs)
4. 查阅 [Supabase 文档](https://supabase.com/docs)

---

祝部署顺利！🚀

