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
    if (!app || !c) return { title: "隐私政策" };
    return {
      title: `隐私政策 - ${c.appNameCn}（${c.appNameEn}）`,
      description: "隐私政策：信息收集、权限说明、数据安全、用户权利与联系我们方式。"
    };
  })();
}

export default async function PrivacyPage({
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
          <h1 className="title">隐私政策</h1>
          <p className="subtitle">
            适用于 {c.appNameCn}（{c.appNameEn}）
          </p>
        </div>
        <div className="pill">更新日期：{c.privacy.updatedAt}</div>
      </header>

      <div className="actions" style={{ marginTop: 0, marginBottom: 10 }}>
        <Link className="btn" href={`/${app.slug}/`}>
          <span className="dot" />
          返回 {c.appNameCn}
        </Link>
        <Link className="btn" href={`/${app.slug}/support/`}>
          支持与联系
        </Link>
        <Link className="btn" href={`/${app.slug}/terms/`}>
          服务条款
        </Link>
      </div>

      <section className="card">
        <p>
          本隐私政策适用于 {c.appNameCn}（{c.appNameEn}）（以下简称“本 App”）。
          我们非常重视用户的隐私与个人信息保护。本政策将说明我们如何收集、使用、共享、保存与保护你的信息，
          以及你享有的权利。
        </p>

        <div className="note">
          <p style={{ margin: 0 }}>
            联系方式：
              <br />
              {c.support.email} <br /> {c.support.website}
          </p>
        </div>

        <h2 style={{ marginTop: 18 }}>1. 我们收集哪些数据</h2>
        <ul>
          {c.privacy.highlights.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>2. 设备本地存储（仅在你的设备上）</h2>
        <p>
          为实现钱包功能，我们会在你的设备上本地保存以下内容（不会上传至我们的服务器）：
        </p>
        <ul>
          {c.privacy.localStorageItems.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>3. 权限使用说明</h2>
        <ul>
          {c.privacy.permissions.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong>：{p.purpose}
            </li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>4. 数据安全</h2>
        <p>
          我们采取合理的技术措施保护你的数据安全，例如关键数据加密存储、使用系统安全机制（如 iOS Keychain /
          Android Keystore）等。
        </p>

        <h2 style={{ marginTop: 18 }}>5. 第三方服务</h2>
        <ul>
          {c.privacy.thirdParty.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>6. 儿童隐私</h2>
        <p>{c.privacy.children}</p>

        <h2 style={{ marginTop: 18 }}>7. 联系我们</h2>
        <p>
          如你对本隐私政策有任何疑问，请联系：<strong>{c.support.email}</strong>
          <br />
          网站：<strong>{c.support.website}</strong>
        </p>
      </section>

      <footer>
        提示：苹果审核常见会检查“隐私政策链接是否可访问、是否包含联系邮箱、是否与 App 实际行为一致”。
      </footer>
    </main>
  );
}


