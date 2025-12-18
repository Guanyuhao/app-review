import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageContent, type PageType } from "@/lib/content-loader";
import PageTemplate from "@/components/PageTemplate";

export function generateStaticParams() {
  const { generatePageParams } = require("@/lib/app-registry");
  return generatePageParams()
    .filter((p: { locale?: string }) => p.locale === "en")
    .map((p: { app: string; page: PageType }) => ({ app: p.app, page: p.page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; page: string }>;
}): Promise<Metadata> {
  const { app: appSlug, page: pageType } = await params;
  const content = await getPageContent(appSlug, pageType as PageType, "en");
  if (!content) {
    return { title: "Page Not Found" };
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
  const content = await getPageContent(appSlug, pageType as PageType, "en");
  if (!content) {
    notFound();
  }

  return (
    <PageTemplate
      appSlug={appSlug}
      pageType={pageType as PageType}
      locale="en"
      title={content.title}
      html={content.html}
      meta={content.meta}
    />
  );
}

