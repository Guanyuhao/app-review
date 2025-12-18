import Link from "next/link";
import { getAllApps } from "@/lib/app-registry";

export default function Home() {
  const apps = getAllApps();

  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">App 审核信息</h1>
          <p className="subtitle">App Store Review Pages</p>
        </div>
        <div className="pill">Static Pages</div>
      </header>

      <section className="grid">
        {apps.map((app) => (
          <article key={app.slug} className="card half">
            <h2>{app.meta.appName}</h2>
            <p>Bundle ID: {app.meta.bundleId || "N/A"}</p>
            <div className="actions">
              <Link className="btn primary" href={`/${app.slug}/`}>
                <span className="dot" />
                进入页面
              </Link>
            </div>
          </article>
        ))}
      </section>

      <footer>
        <p style={{ fontSize: "0.875rem", color: "#666", margin: 0 }}>
          提示：这些页面用于 App Store Connect 审核，包含隐私政策、支持与联系、服务条款、审核备注。
        </p>
      </footer>
    </main>
  );
}
