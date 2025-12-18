import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageContent, type PageType } from "@/lib/content-loader";
import PageTemplate from "@/components/PageTemplate";

export function generateStaticParams() {
  const { generatePageParams } = require("@/lib/app-registry");
  return generatePageParams().filter((p: { locale?: string }) => !p.locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; page: string }>;
}): Promise<Metadata> {
  const { app: appSlug, page: pageType } = await params;
  const content = await getPageContent(appSlug, pageType as PageType, "zh");
  if (!content) {
    return { title: "页面不存在" };
  }
  return {
    title: content.title,
    description: content.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ app: string; page: string }>;
}) {
  const { app: appSlug, page: pageType } = await params;
  const content = await getPageContent(appSlug, pageType as PageType, "zh");
  if (!content) {
    notFound();
  }

  return (
    <PageTemplate
      appSlug={appSlug}
      pageType={pageType as PageType}
      locale="zh"
      title={content.title}
      html={content.html}
      meta={content.meta}
    />
  );
}

