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
    if (!app || !c) return { title: "服务条款" };
    return {
      title: `服务条款 - ${c.appNameCn}（${c.appNameEn}）`,
      description: "服务条款（简版）：使用规则、免责声明与联系信息。"
    };
  })();
}

export default async function TermsPage({
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
          <h1 className="title">服务条款（简版）</h1>
          <p className="subtitle">
            适用于 {c.appNameCn}（{c.appNameEn}）
          </p>
        </div>
        <div className="pill">Terms</div>
      </header>

      <div className="actions" style={{ marginTop: 0, marginBottom: 10 }}>
        <Link className="btn" href={`/${slug}/`}>
          <span className="dot" />
          返回 {c.appNameCn}
        </Link>
        <Link className="btn" href={`/${slug}/privacy/`}>
          隐私政策
        </Link>
        <Link className="btn" href={`/${slug}/support/`}>
          支持与联系
        </Link>
        <Link className="btn" href={`/${slug}/en/terms/`}>
          English
        </Link>
      </div>

      <section className="card">
        <p>
          本条款为简版示例，用于满足审核与基本展示需要。若你的产品包含订阅/付费、账号体系、UGC、或更复杂的合规要求，
          建议补充更完整的条款内容。
        </p>

        <h2 style={{ marginTop: 18 }}>1. 服务说明</h2>
        <p>
          {c.appNameCn}（{c.appNameEn}）为离线冷钱包工具，用于在设备本地生成/导入助记词、派生地址，并对交易进行离线签名。
          本 App 不提供买卖/兑换/交易所服务，不提供法币相关功能。
        </p>

        <h2 style={{ marginTop: 18 }}>2. 用户责任</h2>
        <ul>
          <li>你应妥善保管助记词/私钥。我们无法为遗失助记词/私钥导致的资产损失承担责任。</li>
          <li>你应确保在进行任何链上操作前理解相关风险与费用（如矿工费/网络拥堵）。</li>
          <li>你不得利用本 App 从事违法违规活动。</li>
        </ul>

        <h2 style={{ marginTop: 18 }}>3. 免责声明</h2>
        <ul>
          <li>本 App 仅提供离线签名能力，不负责链上广播与交易最终结果。</li>
          <li>区块链网络及第三方服务不可控，我们不对其可用性、稳定性承担责任。</li>
        </ul>

        <h2 style={{ marginTop: 18 }}>4. 条款变更</h2>
        <p>我们可能适时更新本条款，并在本页面发布最新版本。</p>

        <h2 style={{ marginTop: 18 }}>5. 联系我们</h2>
        <p>
          如你对本条款有任何疑问，请联系：<strong>{c.support.email}</strong>
          <br />
          网站：<strong>{c.support.website}</strong>
        </p>

        <div className="note">
          <p style={{ margin: 0 }}>
            如你在使用过程中有任何问题或建议，请通过上面的联系方式与我们联系。
          </p>
        </div>
      </section>
    </main>
  );
}


