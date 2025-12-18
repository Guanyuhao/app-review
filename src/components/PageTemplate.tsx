import Link from "next/link";
import type { PageType } from "@/lib/content-loader";

interface PageTemplateProps {
  appSlug: string;
  pageType: PageType;
  locale: "zh" | "en";
  title: string;
  html: string;
  meta: {
    appName: string;
    supportEmail: string;
    baseUrl: string;
    privacyUpdatedAt: string;
  };
}

const PAGE_LABELS: Record<PageType, { zh: string; en: string }> = {
  privacy: { zh: "隐私政策", en: "Privacy Policy" },
  support: { zh: "支持与联系", en: "Support & Contact" },
  terms: { zh: "服务条款", en: "Terms of Service" },
  "review-notes": { zh: "审核备注", en: "Review Notes" },
};

export default function PageTemplate({
  appSlug,
  pageType,
  locale,
  title,
  html,
  meta,
}: PageTemplateProps) {
  const isEn = locale === "en";
  const pageLabel = PAGE_LABELS[pageType][locale];
  const otherLocale = isEn ? "zh" : "en";
  const otherLocalePath = isEn ? `/${appSlug}/${pageType}/` : `/${appSlug}/en/${pageType}/`;

  const navPages: Array<{ type: PageType; label: string }> = [
    { type: "privacy", label: PAGE_LABELS.privacy[locale] },
    { type: "support", label: PAGE_LABELS.support[locale] },
    { type: "terms", label: PAGE_LABELS.terms[locale] },
    { type: "review-notes", label: PAGE_LABELS["review-notes"][locale] },
  ];

  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">{title}</h1>
          <p className="subtitle">
            {isEn ? "For" : "适用于"} {meta.appName}
          </p>
        </div>
        {pageType === "privacy" && (
          <div className="pill">
            {isEn ? "Updated" : "更新日期"}：{meta.privacyUpdatedAt}
          </div>
        )}
        {pageType !== "privacy" && <div className="pill">{pageLabel}</div>}
      </header>

      <div className="actions" style={{ marginTop: 0, marginBottom: 10 }}>
        <Link className="btn" href={`/${appSlug}/${isEn ? "en/" : ""}`}>
          <span className="dot" />
          {isEn ? "Back to" : "返回"} {meta.appName}
        </Link>
        {navPages
          .filter((p) => p.type !== pageType)
          .map((p) => (
            <Link
              key={p.type}
              className="btn"
              href={`/${appSlug}/${isEn ? "en/" : ""}${p.type}/`}
            >
              {p.label}
            </Link>
          ))}
        <Link className="btn" href={otherLocalePath}>
          {isEn ? "中文" : "English"}
        </Link>
      </div>

      <section className="card">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>

      <footer>
        {isEn ? (
          <p style={{ fontSize: "0.875rem", color: "#666", margin: 0 }}>
            Tip: Apple reviewers commonly check that privacy policy links are accessible, include
            contact email, and are consistent with app behavior.
          </p>
        ) : (
          <p style={{ fontSize: "0.875rem", color: "#666", margin: 0 }}>
            提示：苹果审核常见会检查&ldquo;隐私政策链接是否可访问、是否包含联系邮箱、是否与 App
            实际行为一致&rdquo;。
          </p>
        )}
      </footer>
    </main>
  );
}

