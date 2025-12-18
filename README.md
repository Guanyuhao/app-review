# App Review Pages

用于 App Store 审核的静态页面生成系统（基于 Next.js + Markdown）。

## 特性

- ✅ **Markdown 驱动**：只需编写 Markdown 文件即可生成页面
- ✅ **中英文支持**：自动生成中英文版本
- ✅ **固定模板**：隐私政策、支持与联系、服务条款、审核备注
- ✅ **截图生成**：一键生成 iPhone 6.5 和 iPad 13 寸截图
- ✅ **静态导出**：生成纯静态 HTML，部署到 Cloudflare Workers/Pages

## 快速开始

### 1. 添加新 App

在 `appstore/` 目录下创建新目录，例如 `appstore/my-app/`：

```bash
mkdir -p appstore/my-app/content appstore/my-app/img/iphone_65_1242x2688
```

### 2. 创建元数据文件

创建 `appstore/my-app/content/_meta.md`：

```yaml
---
appName: 我的应用（My App）
supportEmail: support@example.com
baseUrl: https://your-domain.com
bundleId: com.example.myapp
privacyUpdatedAt: 2025-12-16
---
```

### 3. 创建内容文件

创建以下 Markdown 文件（每个页面需要中英文两个版本）：

- `privacy.md` / `privacy.en.md` - 隐私政策
- `support.md` / `support.en.md` - 支持与联系
- `terms.md` / `terms.en.md` - 服务条款
- `review-notes.md` / `review-notes.en.md` - 审核备注

每个文件格式：

```markdown
---
title: 页面标题
description: "页面描述（如果包含冒号，需要用引号包裹）"
---

这里是 Markdown 内容...
```

### 4. 生成截图

将 iPhone 6.5 寸截图（1242×2688）放入 `appstore/my-app/img/iphone_65_1242x2688/`，然后运行：

```bash
pnpm gen:imgs --app my-app
```

这会自动生成 iPad 13 寸（2064×2752）截图到 `appstore/my-app/img/ipad_13_2064x2752/`。

### 5. 构建和部署

```bash
# 本地开发
pnpm dev

# 构建静态站点
pnpm build

# 部署到 Cloudflare Workers
pnpm deploy:worker
```

## 目录结构

```
appstore/
  <app-slug>/
    content/
      _meta.md              # 应用元数据（必填）
      privacy.md            # 隐私政策（中文）
      privacy.en.md         # 隐私政策（英文）
      support.md            # 支持与联系（中文）
      support.en.md         # 支持与联系（英文）
      terms.md              # 服务条款（中文）
      terms.en.md           # 服务条款（英文）
      review-notes.md       # 审核备注（中文）
      review-notes.en.md    # 审核备注（英文）
    img/
      iphone_65_1242x2688/  # iPhone 6.5 寸截图（输入）
      ipad_13_2064x2752/    # iPad 13 寸截图（脚本生成）
```

## 路由

- 首页：`/`
- App 首页：`/<app-slug>/`
- 中文页面：`/<app-slug>/<page-type>/`
- 英文页面：`/<app-slug>/en/<page-type>/`

`<page-type>` 可以是：`privacy`、`support`、`terms`、`review-notes`

## 脚本命令

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建静态站点（自动生成 sitemap.xml）
- `pnpm lint` - 代码检查
- `pnpm format` - 格式化代码
- `pnpm gen:imgs --app <app-slug>` - 生成 iPad 截图
- `pnpm gen:sitemap` - 手动生成 sitemap.xml
- `pnpm deploy:worker` - 构建并部署到 Cloudflare Workers

## 部署到 Cloudflare Workers

1. 确保 `wrangler.jsonc` 配置正确
2. 运行 `pnpm deploy:worker`
3. 访问 `https://<name>.<your-account>.workers.dev`

## 注意事项

- Markdown frontmatter 中如果 `description` 包含冒号，需要用引号包裹
- `privacyUpdatedAt` 必须是 `YYYY-MM-DD` 格式的字符串
- 截图脚本需要 ImageMagick（`magick` 命令）
- 构建时会自动生成 `public/sitemap.xml`
