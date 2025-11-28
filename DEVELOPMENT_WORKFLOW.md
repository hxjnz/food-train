# 🔄 开发和部署工作流程

## 📋 分支策略

### 分支说明

- **`dev`** 分支：日常开发分支，push 不触发生产部署
- **`main`** 分支：生产分支，push 触发自动部署到生产环境

---

## 🛠️ 日常开发流程

### 步骤 1: 切换到 dev 分支

```bash
cd /Users/ehan055/my-projects/food-train
git checkout dev
```

### 步骤 2: 开发新功能

```bash
# 修改代码...
# 测试功能...
```

### 步骤 3: 提交到 dev 分支

```bash
git add .
git commit -m "feat: add new feature"
git push origin dev
```

**结果**：✅ 代码推送到 GitHub，❌ **不会**触发生产部署

---

## 🚀 准备部署到生产环境

### 当你说"部署"时

```bash
# 1. 确保在 dev 分支，所有更改已提交
git checkout dev
git status  # 确认没有未提交的更改

# 2. 切换到 main 分支
git checkout main

# 3. 合并 dev 分支的更改
git merge dev

# 4. 推送到 main 分支（触发生产部署）
git push origin main

# 5. 切回 dev 分支继续开发
git checkout dev
```

**结果**：✅ 代码推送到 main，✅ **自动触发**生产部署

---

## 📝 常用命令速查

### 查看当前分支

```bash
git branch
# * dev      ← 带 * 的是当前分支
#   main
```

### 切换分支

```bash
git checkout dev   # 切换到开发分支
git checkout main  # 切换到生产分支
```

### 查看分支状态

```bash
git status  # 查看当前更改
git log --oneline -5  # 查看最近 5 次提交
```

### 查看分支差异

```bash
# 查看 dev 和 main 的区别
git diff main..dev
```

---

## 🎯 完整工作流示例

### 场景：开发多个功能后统一部署

```bash
# === 开发阶段 ===
git checkout dev

# 开发功能 1
# ... 修改代码 ...
git add .
git commit -m "feat: add feature 1"
git push origin dev

# 开发功能 2
# ... 修改代码 ...
git add .
git commit -m "feat: add feature 2"
git push origin dev

# 开发功能 3
# ... 修改代码 ...
git add .
git commit -m "feat: add feature 3"
git push origin dev

# === 准备部署（你说"部署"时）===
git checkout main
git merge dev
git push origin main  # ← 触发生产部署 🚀

# === 继续开发 ===
git checkout dev
```

---

## 🔧 Vercel 配置

### 在 Vercel Dashboard 中配置

1. 访问 https://vercel.com/eric-hans-projects-28fef254/food-train/settings/git
2. 找到 **Production Branch** 设置
3. 确认设置为：`main`
4. **Ignored Build Step** 保持默认

**结果**：
- Push 到 `main` → ✅ 触发生产部署
- Push 到 `dev` → ✅ 创建预览部署（可选）
- Push 到其他分支 → ❌ 不触发部署

### 可选：禁用 dev 分支的预览部署

如果你不想 dev 分支创建预览部署：

1. 在 Vercel Settings > Git
2. 找到 **Ignored Build Step**
3. 添加配置：
```bash
#!/bin/bash
if [ "$VERCEL_GIT_COMMIT_REF" = "dev" ]; then
  exit 0  # 跳过构建
else
  exit 1  # 继续构建
fi
```

---

## 📊 工作流对比

### 之前（每次都部署）

```
修改代码 → git push → 自动部署 🚀
修改代码 → git push → 自动部署 🚀
修改代码 → git push → 自动部署 🚀
```

**问题**：频繁部署，可能有未完成的功能

### 现在（可控部署）

```
修改代码 → git push origin dev → ❌ 不部署
修改代码 → git push origin dev → ❌ 不部署
修改代码 → git push origin dev → ❌ 不部署

准备好了 → 说"部署" → 
    git checkout main
    git merge dev
    git push origin main → ✅ 部署 🚀
```

**优势**：完全控制部署时机

---

## 🎮 快捷脚本

### 创建快捷命令

可以创建一些快捷脚本简化操作：

#### 1. 快速部署脚本

创建 `deploy.sh`:

```bash
#!/bin/bash
echo "🚀 开始部署到生产环境..."

# 确保 dev 分支干净
git checkout dev
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ dev 分支有未提交的更改，请先提交"
  exit 1
fi

# 合并到 main 并部署
git checkout main
git pull origin main
git merge dev --no-edit
git push origin main

echo "✅ 部署已触发！"
echo "📍 查看部署状态："
echo "   https://vercel.com/eric-hans-projects-28fef254/food-train"

# 切回 dev 分支
git checkout dev
```

使用方法：
```bash
chmod +x deploy.sh
./deploy.sh
```

#### 2. 快速开发提交脚本

创建 `dev-commit.sh`:

```bash
#!/bin/bash
git checkout dev
git add .
git commit -m "$1"
git push origin dev
echo "✅ 已推送到 dev 分支（不会触发部署）"
```

使用方法：
```bash
chmod +x dev-commit.sh
./dev-commit.sh "feat: add new feature"
```

---

## 💡 最佳实践

### 1. 保持 dev 分支干净

```bash
# 定期同步 main 的更改到 dev
git checkout dev
git merge main
```

### 2. 部署前测试

```bash
# 在 dev 分支本地测试
npm run build
npm run start
# 确认无误后再部署
```

### 3. 使用有意义的提交信息

```bash
git commit -m "feat: 添加摇一摇功能"    # ✅ 好
git commit -m "update"                 # ❌ 不好
```

### 4. 定期清理分支

```bash
# 查看所有分支
git branch -a

# 删除不需要的本地分支
git branch -d old-feature
```

---

## 🔍 故障排除

### 问题 1: 不确定当前在哪个分支

```bash
git branch
# * dev      ← 当前分支（带 *）
#   main
```

### 问题 2: 合并时有冲突

```bash
git checkout main
git merge dev

# 如果有冲突：
# 1. 手动解决冲突文件
# 2. git add .
# 3. git commit -m "merge: resolve conflicts"
# 4. git push origin main
```

### 问题 3: 误推送到 main

```bash
# 如果还没构建完成，可以快速回滚
git checkout main
git reset --hard HEAD~1  # 回退一个提交
git push origin main --force  # 强制推送（谨慎使用）
```

### 问题 4: dev 和 main 差异太大

```bash
# 查看差异
git diff main..dev

# 查看提交日志差异
git log main..dev --oneline
```

---

## 📈 Git 可视化工具

### 推荐工具

1. **命令行**：
   ```bash
   git log --graph --oneline --all
   ```

2. **VS Code**：
   - GitLens 插件
   - Git Graph 插件

3. **桌面应用**：
   - GitHub Desktop
   - GitKraken
   - Sourcetree

---

## 🎯 总结

### 日常开发

```bash
# 在 dev 分支工作
git checkout dev
# ... 开发、提交、推送 ...
git push origin dev  # ❌ 不触发部署
```

### 准备部署

```bash
# 合并到 main
git checkout main
git merge dev
git push origin main  # ✅ 触发部署
git checkout dev  # 切回开发
```

### 关键点

- ✅ dev 分支：日常开发，随意推送
- ✅ main 分支：生产代码，谨慎推送
- ✅ 完全控制部署时机
- ✅ 支持多功能积累后统一部署

---

**当前分支**: dev (开发分支)  
**生产分支**: main  
**部署触发**: 仅 main 分支

---

需要部署时，告诉我"部署"或"deploy"，我会帮你执行完整的部署流程！🚀

