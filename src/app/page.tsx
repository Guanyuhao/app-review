import Link from "next/link";
import { APPS } from "../lib/apps";

export default function HomePage() {
  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">App 审核信息页面</h1>
          <p className="subtitle">
            这里集中提供 App Store 审核常见需要的链接：隐私政策、支持与联系、服务条款。
          </p>
        </div>
        <div className="pill">Cloudflare Pages · Next.js 静态导出</div>
      </header>

      <section className="grid">
        {APPS.map((app) => (
          <article key={app.slug} className="card">
            <h2>{app.displayName}</h2>
            <p>{app.shortDescription}</p>
            <div className="actions">
              <Link className="btn primary" href={`/${app.slug}/`}>
                <span className="dot" />
                进入页面
              </Link>
              <Link className="btn" href={`/${app.slug}/privacy/`}>
                隐私政策
              </Link>
              <Link className="btn" href={`/${app.slug}/support/`}>
                支持与联系
              </Link>
              <Link className="btn" href={`/${app.slug}/terms/`}>
                服务条款
              </Link>
            </div>
          </article>
        ))}
      </section>

      <footer>
        {/* 备注：把 Cloudflare Pages 的域名填入 App Store Connect 的 Support URL / Privacy Policy URL 即可。 */}
      </footer>
    </main>
  );
}


