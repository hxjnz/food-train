# 🚀 Vercel 部署完整指南

## 📋 部署前检查清单

### 1. 确认本地功能正常
- [ ] 本地开发服务器运行正常
- [ ] 用户注册/登录功能正常
- [ ] 餐厅添加/编辑/删除功能正常
- [ ] 照片上传功能正常
- [ ] 筛选和随机选择功能正常
- [ ] 访客模式正常
- [ ] 双语切换正常

### 2. 确认环境变量
- [ ] `.env.local` 文件已配置
- [ ] Supabase URL 正确
- [ ] Supabase Anon Key 正确

### 3. 确认 Git 状态
- [ ] 所有更改已提交
- [ ] 有 GitHub 账号
- [ ] 有 Vercel 账号

---

## 步骤 1: 提交代码到 Git

### 1.1 检查 Git 状态

```bash
cd /Users/ehan055/my-projects/food-train
git status
```

### 1.2 添加所有文件

```bash
git add .
```

### 1.3 提交更改

```bash
git commit -m "feat: Complete Food Train app with mobile-first design

- Implemented user authentication (login/signup)
- Restaurant CRUD with photo upload
- Filter and random picker features
- Guest mode for viewing
- English/Chinese bilingual support
- Mobile-first responsive UI design
- Bottom navigation for mobile
- Supabase integration complete"
```

---

## 步骤 2: 创建 GitHub 仓库并推送

### 2.1 在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 仓库名称：`food-train`
3. 描述：`Team lunch restaurant recommendation app`
4. 选择：**Public** 或 **Private**
5. **不要**勾选 "Initialize with README"
6. 点击 "Create repository"

### 2.2 连接并推送到 GitHub

```bash
# 如果还没有设置远程仓库
git remote add origin https://github.com/你的用户名/food-train.git

# 如果已经设置了，先删除旧的
# git remote remove origin
# git remote add origin https://github.com/你的用户名/food-train.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**注意**：将 `你的用户名` 替换为你的 GitHub 用户名

---

## 步骤 3: 部署到 Vercel

### 3.1 访问 Vercel

1. 打开 https://vercel.com
2. 点击 "Sign Up" 或 "Login"
3. 选择 "Continue with GitHub"
4. 授权 Vercel 访问你的 GitHub

### 3.2 导入项目

1. 在 Vercel Dashboard，点击 "Add New..."
2. 选择 "Project"
3. 找到 `food-train` 仓库
4. 点击 "Import"

### 3.3 配置项目

在 "Configure Project" 页面：

**Framework Preset**: Next.js (自动检测) ✅

**Root Directory**: `./` (保持默认)

**Build Command**: `npm run build` (保持默认)

**Output Directory**: `.next` (保持默认)

---

## 步骤 4: 配置环境变量 ⚠️ **重要**

在 "Environment Variables" 部分，添加以下变量：

### 4.1 添加 Supabase URL

- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://whnwbwafyvpwyyhbvzvc.supabase.co`
- **Environment**: 选择所有（Production, Preview, Development）

### 4.2 添加 Supabase Anon Key

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `sb_publishable_p8H73gEAp5OEZEP1gGBaBw_hN_ae4wm`
- **Environment**: 选择所有（Production, Preview, Development）

### 4.3 确认配置

应该看到：
```
✓ NEXT_PUBLIC_SUPABASE_URL
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 步骤 5: 部署

### 5.1 开始部署

点击 **"Deploy"** 按钮

### 5.2 等待构建

你会看到：
- ⏳ Building...
- ⏳ Deploying...
- ✅ Deployment Ready

通常需要 2-3 分钟

### 5.3 获取部署 URL

部署成功后，你会看到：
```
🎉 Your project is now live!
https://food-train-xxx.vercel.app
```

---

## 步骤 6: 更新 Supabase 配置

### 6.1 配置认证重定向 URL

1. 访问 Supabase Dashboard
2. 进入 **Authentication** > **URL Configuration**
3. 在 **Site URL** 添加：
   ```
   https://food-train-xxx.vercel.app
   ```
4. 在 **Redirect URLs** 添加：
   ```
   https://food-train-xxx.vercel.app/**
   http://localhost:3000/**
   ```

### 6.2 保存设置

点击 "Save" 保存配置

---

## 步骤 7: 测试部署

### 7.1 访问网站

打开你的 Vercel URL：`https://food-train-xxx.vercel.app`

### 7.2 完整测试流程

#### 作为访客
- [ ] 访问首页，看到访客横幅
- [ ] 查看餐厅列表
- [ ] 使用筛选功能
- [ ] 使用随机选择功能
- [ ] 切换语言（中文/英文）

#### 注册和登录
- [ ] 点击"注册"
- [ ] 填写邮箱和密码
- [ ] 注册成功并自动登录
- [ ] 退出登录
- [ ] 重新登录

#### 餐厅管理（需要登录）
- [ ] 点击底部"添加"按钮
- [ ] 填写餐厅信息
- [ ] 上传照片
- [ ] 保存餐厅
- [ ] 在列表中看到新餐厅
- [ ] 点击查看详情
- [ ] 编辑餐厅信息
- [ ] 删除餐厅

#### 移动端测试
- [ ] 在手机浏览器打开
- [ ] 底部导航栏显示正常
- [ ] 点击和滑动流畅
- [ ] 所有功能正常

---

## 步骤 8: 配置自定义域名（可选）

### 8.1 在 Vercel 添加域名

1. 进入项目 Settings
2. 选择 "Domains"
3. 输入你的域名（如：`lunch.yourdomain.com`）
4. 点击 "Add"

### 8.2 配置 DNS

在你的域名提供商处添加：

**CNAME 记录**:
- Name: `lunch`（或其他子域名）
- Value: `cname.vercel-dns.com`

### 8.3 等待生效

通常需要几分钟到几小时

---

## 🎯 常见问题和解决方案

### 问题 1: 构建失败

**症状**: Build Failed

**解决方案**:
1. 检查 Vercel 构建日志
2. 确保本地 `npm run build` 成功
3. 检查是否有 TypeScript 错误
4. 确保所有依赖都在 `package.json` 中

### 问题 2: 认证不工作

**症状**: 登录后出错或无限重定向

**解决方案**:
1. 确认 Supabase 环境变量正确
2. 在 Supabase 中添加了正确的 Redirect URL
3. 清除浏览器缓存
4. 检查浏览器控制台错误

### 问题 3: 图片不显示

**症状**: 餐厅照片不加载

**解决方案**:
1. 检查 Supabase Storage bucket 是否 public
2. 确认图片 URL 正确
3. 检查 `next.config.ts` 中的 hostname 配置

### 问题 4: 环境变量不生效

**症状**: 无法连接 Supabase

**解决方案**:
1. 确认环境变量名称正确（区分大小写）
2. 确认选择了所有环境（Production, Preview, Development）
3. 重新部署项目（Vercel Dashboard > Deployments > Redeploy）

### 问题 5: 移动端样式问题

**症状**: 移动端显示不正常

**解决方案**:
1. 清除浏览器缓存
2. 强制刷新（Ctrl/Cmd + Shift + R）
3. 检查浏览器控制台错误

---

## 📊 部署后监控

### Vercel Analytics

1. 进入项目 Dashboard
2. 选择 "Analytics"
3. 查看：
   - 页面访问量
   - 性能指标
   - Web Vitals

### Supabase 使用情况

1. 访问 Supabase Dashboard
2. 查看 "Usage"
3. 监控：
   - 数据库大小
   - Storage 使用
   - API 请求数

---

## 🔄 更新部署

### 方式 1: 推送到 GitHub（推荐）

```bash
# 修改代码后
git add .
git commit -m "feat: update feature"
git push

# Vercel 会自动检测并重新部署
```

### 方式 2: Vercel Dashboard 手动部署

1. 进入 Vercel Dashboard
2. 选择 "Deployments"
3. 点击 "Redeploy"

---

## 📱 分享给团队

### 分享链接

将 Vercel URL 发送给团队成员：
```
🚂 食堂列车 / Food Train
https://food-train-xxx.vercel.app

今天中午吃什么？随机选择帮你决定！
```

### 使用说明

**对于新用户**:
1. 打开链接
2. 可以作为访客浏览
3. 或注册账号添加餐厅

**对于团队**:
- 每人注册一个账号
- 添加自己推荐的餐厅
- 使用随机选择决定午餐

---

## ✅ 部署成功检查清单

- [ ] 网站可以访问
- [ ] 访客模式正常
- [ ] 注册/登录正常
- [ ] 添加餐厅正常
- [ ] 照片上传正常
- [ ] 筛选功能正常
- [ ] 随机选择正常
- [ ] 语言切换正常
- [ ] 移动端显示正常
- [ ] 已分享给团队成员

---

## 🎉 恭喜！

你的食堂列车应用现已成功部署到生产环境！

**下一步**:
1. 分享给团队成员
2. 收集反馈
3. 持续改进

---

**部署时间**: 预计 10-15 分钟  
**难度**: ⭐⭐☆☆☆  
**成本**: $0/月（免费）

