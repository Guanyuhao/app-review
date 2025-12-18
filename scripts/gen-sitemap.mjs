#!/usr/bin/env node

import { writeFileSync, readdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const APPSTORE_DIR = join(ROOT, "appstore");

const PAGE_TYPES = ["privacy", "support", "terms", "review-notes"];

function getAllAppSlugs() {
  if (!existsSync(APPSTORE_DIR)) return [];
  return readdirSync(APPSTORE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((n) => !n.startsWith("."));
}

function getAppMeta(appSlug) {
  const metaFile = join(APPSTORE_DIR, appSlug, "content", "_meta.md");
  if (existsSync(metaFile)) {
    const { data } = matter(readFileSync(metaFile, "utf8"));
    return data;
  }
  return null;
}

function getAllApps() {
  return getAllAppSlugs()
    .map((slug) => {
      const meta = getAppMeta(slug);
      return meta ? { slug, meta } : null;
    })
    .filter((app) => app !== null);
}

function pageExists(appSlug, pageType, locale) {
  const fileName = locale === "en" ? `${pageType}.en.md` : `${pageType}.md`;
  const contentFile = join(APPSTORE_DIR, appSlug, "content", fileName);
  return existsSync(contentFile);
}

function generateSitemap() {
  const apps = getAllApps();
  const baseUrl = apps.length > 0 ? apps[0].meta.baseUrl : "https://your-domain.com";
  const urls = [];

  // 首页
  urls.push({ loc: baseUrl, changefreq: "monthly", priority: "1.0" });

  for (const app of apps) {
    // App 首页
    urls.push({
      loc: `${baseUrl}/${app.slug}/`,
      changefreq: "monthly",
      priority: "0.9",
    });

    // 各页面（中英文）
    for (const pageType of PAGE_TYPES) {
      if (pageExists(app.slug, pageType, "zh")) {
        urls.push({
          loc: `${baseUrl}/${app.slug}/${pageType}/`,
          changefreq: "monthly",
          priority: "0.8",
        });
      }
      if (pageExists(app.slug, pageType, "en")) {
        urls.push({
          loc: `${baseUrl}/${app.slug}/en/${pageType}/`,
          changefreq: "monthly",
          priority: "0.8",
        });
      }
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const outputPath = join(ROOT, "public", "sitemap.xml");
  writeFileSync(outputPath, sitemap, "utf8");
  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
}

generateSitemap();
