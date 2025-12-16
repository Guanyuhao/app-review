export type AppSlug = "cold-wallet";

export type AppInfo = {
  slug: AppSlug;
  displayName: string;
  shortDescription: string;
};

export const APPS: AppInfo[] = [
  {
    slug: "cold-wallet",
    displayName: "冷钱包（Cold Wallet）",
    shortDescription: "离线签名 · 多链支持"
  }
];


