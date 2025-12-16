# app-review-pages

这是一个用于 **App Store 审核** 的静态站点仓库：只包含 HTML（由 Next.js 静态导出生成），部署到 **Cloudflare Pages** 后，把链接填到 App Store Connect 即可。

## 已支持的 App

- `cold-wallet`：`/cold-wallet/`（隐私/支持/条款）

## 本地开发

```bash
npm install
npm run dev
```

## Cloudflare Pages 部署

- **Framework preset**：Next.js（或 None 也行）
- **Build command**：`npm run build`
- **Build output directory**：`out`

> 本项目在 `next.config.js` 中启用了 `output: "export"`，`next build` 会输出纯静态目录 `out/`。

## App Store Connect 里常用填写（示例）

- **Support URL**：`https://<你的域名>/cold-wallet/support/`
- **Privacy Policy URL**：`https://<你的域名>/cold-wallet/privacy/`

## 需要你补齐的真实信息（否则只是模板）

当前 `cold-wallet` 的联系信息仍是占位符：

- 邮箱：`support@your-domain.com`
- 网站：`https://your-domain.com`
- 隐私政策更新日期：`YYYY-MM-DD`

把你的真实 **域名、支持邮箱、更新日期** 发我，我会直接替换到代码里。


