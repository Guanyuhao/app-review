import type { Metadata } from "next";
import Link from "next/link";
import { getAllAppSlugs, getApp, getContent } from "@/lib/registry";

export function generateStaticParams() {
  return getAllAppSlugs().map((app) => ({ app }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app: slug } = await params;
  const app = getApp(slug);
  const c = getContent(slug);
  if (!app || !c) return { title: "App 审核信息" };
  return {
    title: `${c.appNameCn}（${c.appNameEn}）审核信息`,
    description: "用于 App Store 审核的信息页面：隐私政策、支持与联系、服务条款。"
  };
}

export default async function AppHome({
  params
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: slug } = await params;
  const app = getApp(slug);
  const c = getContent(slug);
  if (!app || !c) return null;

  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">
            {c.appNameCn}（{c.appNameEn}）
          </h1>
          <p className="subtitle">{c.tagline}</p>
        </div>
        <div className="pill">静态页面 · 审核用</div>
      </header>

      <section className="grid">
        <article className="card">
          <h2>语言 / Language</h2>
          <p>本页面支持中英文。英文版用于国际审核/沟通更方便。</p>
          <div className="actions">
            <Link className="btn" href={`/${slug}/en/`}>
              English version →
            </Link>
          </div>
        </article>

        <article className="card half">
          <h2>隐私政策</h2>
          <p>说明收集的信息、用途、权限、数据安全、联系信息等。</p>
          <div className="actions">
            <Link className="btn primary" href={`/${app.slug}/privacy/`}>
              <span className="dot" />
              查看隐私政策
            </Link>
          </div>
        </article>

        <article className="card half">
          <h2>支持与联系</h2>
          <p>提供客服邮箱、FAQ、订阅/退款说明（如适用）。</p>
          <div className="actions">
            <Link className="btn primary" href={`/${app.slug}/support/`}>
              <span className="dot green" />
              打开支持页面
            </Link>
          </div>
        </article>

        <article className="card">
          <h2>服务条款（可选）</h2>
          <p>如果你的 App 有订阅/付费、用户规则约束，建议提供条款页。</p>
          <div className="actions">
            <Link className="btn" href={`/${app.slug}/terms/`}>
              查看服务条款
            </Link>
          </div>
        </article>

        <article className="card">
          <h2>商店文案（摘要）</h2>
          <p style={{ marginBottom: 8 }}>{c.promotionalText}</p>
          <ul>
            {c.features.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <div className="note">
            <p style={{ margin: 0 }}>重要说明：{c.importantNotes.join("；")}。</p>
          </div>
        </article>
      </section>

      <footer>
        <Link href="/" className="mono">
          ← 返回 App 列表
        </Link>
      </footer>
    </main>
  );
}


