import type { Metadata } from "next";
import Link from "next/link";
import { getAllAppSlugs, getApp, getContent } from "@/lib/registry";

export function generateStaticParams() {
  return getAllAppSlugs().map((app) => ({ app }));
}

export function generateMetadata({
  params
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { app: slug } = await params;
    const app = getApp(slug);
    const c = getContent(slug);
    if (!app || !c) return { title: "支持与联系" };
    return {
      title: `支持与联系 - ${c.appNameCn}（${c.appNameEn}）`,
      description: "支持与联系：客服邮箱、常见问题与说明。"
    };
  })();
}

export default async function SupportPage({
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
          <h1 className="title">支持与联系</h1>
          <p className="subtitle">
            {c.appNameCn}（{c.appNameEn}）
          </p>
        </div>
        <div className="pill">Support</div>
      </header>

      <div className="actions" style={{ marginTop: 0, marginBottom: 10 }}>
        <Link className="btn" href={`/${slug}/`}>
          <span className="dot" />
          返回 {c.appNameCn}
        </Link>
        <Link className="btn" href={`/${slug}/privacy/`}>
          隐私政策
        </Link>
        <Link className="btn" href={`/${slug}/terms/`}>
          服务条款
        </Link>
        <Link className="btn" href={`/${slug}/en/support/`}>
          English
        </Link>
      </div>

      <section className="grid">
        <article className="card half">
          <h2>联系我们</h2>
          <p>
            客服邮箱：<strong>{c.support.email}</strong>
          </p>
          <p style={{ marginTop: 8 }}>
            网站：<strong>{c.support.website}</strong>
          </p>
          <div className="note">
            <p style={{ margin: 0 }}>
              如需支持与反馈，请通过上述邮箱联系我们；我们会尽快回复。
            </p>
          </div>
        </article>

        <article className="card half">
          <h2>常见问题</h2>
          <ul>
            <li>
              <strong>这是不是交易所/买卖功能？</strong> 不是。本 App 仅用于本地生成/保存助记词并进行离线签名，不提供买卖/兑换/交易所服务。
            </li>
            <li>
              <strong>会上传助记词/私钥吗？</strong> 不会。助记词/私钥仅在设备本地加密存储。
            </li>
            <li>
              <strong>为什么需要相机权限？</strong> 用于扫描二维码导入未签名交易/地址，以及展示签名结果二维码给另一端扫描。
            </li>
          </ul>
        </article>

        <article className="card">
          <h2>审核员测试提示（可选放这里）</h2>
          <p>{c.reviewNotes.positioning}</p>
          <ul style={{ marginTop: 8 }}>
            {c.reviewNotes.steps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p style={{ marginTop: 8 }}>{c.reviewNotes.extra}</p>
        </article>
      </section>
    </main>
  );
}


