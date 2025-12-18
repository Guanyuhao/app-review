import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApp } from "@/lib/app-registry";
import { pageExists, type PageType } from "@/lib/content-loader";

export function generateStaticParams() {
  const { generateAppParams } = require("@/lib/app-registry");
  return generateAppParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app: slug } = await params;
  const app = getApp(slug);
  if (!app) {
    return { title: "App 审核信息" };
  }
  return {
    title: `${app.meta.appName} - 审核信息`,
    description: `用于 App Store 审核的信息页面：隐私政策、支持与联系、服务条款、审核备注。`,
  };
}

const PAGE_TYPES: Array<{ type: PageType; zh: string; en: string }> = [
  { type: "privacy", zh: "隐私政策", en: "Privacy Policy" },
  { type: "support", zh: "支持与联系", en: "Support & Contact" },
  { type: "terms", zh: "服务条款", en: "Terms of Service" },
  { type: "review-notes", zh: "审核备注", en: "Review Notes" },
];

export default async function AppHome({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: slug } = await params;
  const app = getApp(slug);
  if (!app) {
    notFound();
  }

  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">{app.meta.appName}</h1>
          <p className="subtitle">静态页面 · 审核用</p>
        </div>
        <div className="pill">App Review</div>
      </header>

      <section className="grid">
        {PAGE_TYPES.map((page) => {
          const hasZh = pageExists(slug, page.type, "zh");
          const hasEn = pageExists(slug, page.type, "en");
          if (!hasZh && !hasEn) return null;

          return (
            <article key={page.type} className="card half">
              <h2>{page.zh}</h2>
              <p>{page.en}</p>
              <div className="actions">
                {hasZh && (
                  <Link className="btn primary" href={`/${slug}/${page.type}/`}>
                    <span className="dot" />
                    {page.zh}
                  </Link>
                )}
                {hasEn && (
                  <Link className="btn primary" href={`/${slug}/en/${page.type}/`}>
                    <span className="dot green" />
                    {page.en}
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <footer>
        <Link href="/" className="mono">
          ← 返回 App 列表
        </Link>
      </footer>
    </main>
  );
}
