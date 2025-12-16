import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App 审核信息",
  description: "用于 App Store 审核的静态页面集合（隐私政策、支持与联系、服务条款）。",
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
      <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
    </html>
  );
}


