import { getAllAppSlugs, getAppMeta, pageExists, type PageType } from "./content-loader";

export interface AppInfo {
  slug: string;
  meta: {
    appName: string;
    supportEmail: string;
    baseUrl: string;
    bundleId: string;
    privacyUpdatedAt: string;
  };
}

/**
 * 获取所有 App 信息
 */
export function getAllApps(): AppInfo[] {
  const slugs = getAllAppSlugs();
  return slugs
    .map((slug) => {
      const meta = getAppMeta(slug);
      if (!meta) return null;
      return { slug, meta };
    })
    .filter((app): app is AppInfo => app !== null);
}

/**
 * 获取单个 App 信息
 */
export function getApp(slug: string): AppInfo | null {
  const meta = getAppMeta(slug);
  if (!meta) return null;
  return { slug, meta };
}

/**
 * 生成静态路由参数（用于 generateStaticParams）
 */
export function generateAppParams() {
  return getAllAppSlugs().map((slug) => ({ app: slug }));
}

/**
 * 生成页面路由参数
 */
export function generatePageParams() {
  const apps = getAllAppSlugs();
  const pageTypes: PageType[] = ["privacy", "support", "terms", "review-notes"];
  const locales: ("zh" | "en")[] = ["zh", "en"];

  const params: Array<{ app: string; page: PageType; locale?: "en" }> = [];

  for (const app of apps) {
    for (const pageType of pageTypes) {
      // 中文页面（默认，不需要 locale）
      if (pageExists(app, pageType, "zh")) {
        params.push({ app, page: pageType });
      }
      // 英文页面（需要 locale=en）
      if (pageExists(app, pageType, "en")) {
        params.push({ app, page: pageType, locale: "en" });
      }
    }
  }

  return params;
}
