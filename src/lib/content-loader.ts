import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const APPSTORE_DIR = path.join(process.cwd(), "appstore");

export interface AppMeta {
  appName: string;
  supportEmail: string;
  baseUrl: string;
  bundleId: string;
  privacyUpdatedAt: string;
}

export interface PageContent {
  meta: AppMeta;
  html: string;
  title: string;
  description?: string;
}

const PAGE_TYPES = ["privacy", "support", "terms", "review-notes"] as const;
export type PageType = (typeof PAGE_TYPES)[number];

/**
 * 获取所有 App slug（扫描 appstore/ 目录，只返回有 content/ 目录的）
 */
export function getAllAppSlugs(): string[] {
  if (!fs.existsSync(APPSTORE_DIR)) {
    return [];
  }
  return fs
    .readdirSync(APPSTORE_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => !name.startsWith("."))
    .filter((name) => {
      // 只返回有 content/ 目录的（真正的 app）
      const contentDir = path.join(APPSTORE_DIR, name, "content");
      return fs.existsSync(contentDir);
    });
}

/**
 * 读取 App 元数据（从 _meta.md 或从第一个 content 文件推断）
 */
function ensureStringDate(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString().split("T")[0];
  return new Date().toISOString().split("T")[0];
}

export function getAppMeta(appSlug: string): AppMeta | null {
  const appDir = path.join(APPSTORE_DIR, appSlug);
  const metaFile = path.join(appDir, "content", "_meta.md");

  if (fs.existsSync(metaFile)) {
    const fileContents = fs.readFileSync(metaFile, "utf8");
    const { data } = matter(fileContents);
    return {
      appName: String(data.appName || ""),
      supportEmail: String(data.supportEmail || ""),
      baseUrl: String(data.baseUrl || ""),
      bundleId: String(data.bundleId || ""),
      privacyUpdatedAt: ensureStringDate(data.privacyUpdatedAt),
    };
  }

  // 回退：从第一个 content 文件读取 frontmatter
  for (const pageType of PAGE_TYPES) {
    const contentFile = path.join(appDir, "content", `${pageType}.md`);
    if (fs.existsSync(contentFile)) {
      const fileContents = fs.readFileSync(contentFile, "utf8");
      const { data } = matter(fileContents);
      if (data.appName && data.supportEmail && data.baseUrl) {
        return {
          appName: String(data.appName),
          supportEmail: String(data.supportEmail),
          baseUrl: String(data.baseUrl),
          bundleId: String(data.bundleId || ""),
          privacyUpdatedAt: ensureStringDate(data.privacyUpdatedAt),
        };
      }
    }
  }

  return null;
}

/**
 * 读取并渲染页面内容
 */
export async function getPageContent(
  appSlug: string,
  pageType: PageType,
  locale: "zh" | "en" = "zh"
): Promise<PageContent | null> {
  const appDir = path.join(APPSTORE_DIR, appSlug);
  const meta = getAppMeta(appSlug);
  if (!meta) {
    return null;
  }

  const fileName = locale === "en" ? `${pageType}.en.md` : `${pageType}.md`;
  const contentFile = path.join(appDir, "content", fileName);

  if (!fs.existsSync(contentFile)) {
    return null;
  }

  const fileContents = fs.readFileSync(contentFile, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  // 合并 frontmatter 和 meta（frontmatter 优先级更高）
  // 确保 privacyUpdatedAt 是字符串（gray-matter 可能解析为 Date）
  const finalMeta: AppMeta = {
    ...meta,
    ...frontmatter,
    privacyUpdatedAt:
      typeof frontmatter.privacyUpdatedAt === "string"
        ? frontmatter.privacyUpdatedAt
        : frontmatter.privacyUpdatedAt instanceof Date
          ? frontmatter.privacyUpdatedAt.toISOString().split("T")[0]
          : meta.privacyUpdatedAt,
  };

  // 渲染 Markdown 到 HTML
  const processor = remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeStringify);

  const result = await processor.process(content);
  const html = result.toString();

  // 生成页面标题和描述
  const titleMap: Record<PageType, { zh: string; en: string }> = {
    privacy: { zh: "隐私政策", en: "Privacy Policy" },
    support: { zh: "支持与联系", en: "Support & Contact" },
    terms: { zh: "服务条款", en: "Terms of Service" },
    "review-notes": { zh: "审核备注", en: "Review Notes" },
  };

  const title = frontmatter.title || `${titleMap[pageType][locale]} - ${finalMeta.appName}`;
  const description =
    frontmatter.description ||
    (locale === "zh"
      ? `${titleMap[pageType].zh}：${finalMeta.appName}`
      : `${titleMap[pageType].en}: ${finalMeta.appName}`);

  return {
    meta: finalMeta,
    html,
    title,
    description,
  };
}

/**
 * 检查页面是否存在
 */
export function pageExists(appSlug: string, pageType: PageType, locale: "zh" | "en" = "zh"): boolean {
  const appDir = path.join(APPSTORE_DIR, appSlug);
  const fileName = locale === "en" ? `${pageType}.en.md` : `${pageType}.md`;
  const contentFile = path.join(appDir, "content", fileName);
  return fs.existsSync(contentFile);
}
