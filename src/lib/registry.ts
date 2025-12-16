import type { AppInfo, AppSlug } from "./apps";
import { APPS } from "./apps";
import { coldWalletContent } from "./content/cold-wallet";

export type AppContent = typeof coldWalletContent;

export const CONTENT_BY_APP: Record<AppSlug, AppContent> = {
  "cold-wallet": coldWalletContent
};

export function getApp(slug: string): AppInfo | null {
  return APPS.find((a) => a.slug === slug) ?? null;
}

export function getContent(slug: string): AppContent | null {
  // runtime safe for unknown slug
  return (CONTENT_BY_APP as Record<string, AppContent | undefined>)[slug] ?? null;
}

export function getAllAppSlugs(): AppSlug[] {
  return APPS.map((a) => a.slug);
}


