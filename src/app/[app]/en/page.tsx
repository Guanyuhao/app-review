import type { Metadata } from "next";
import Link from "next/link";
import { getAllAppSlugs, getApp, getContent } from "@/lib/registry";

export function generateStaticParams() {
  return getAllAppSlugs().map((app) => ({ app }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app: slug } = await params;
  const app = getApp(slug);
  const c = getContent(slug);
  if (!app || !c) return { title: "App Review Pages" };
  return {
    title: `${c.appNameEn} Review Pages`,
    description: "Public pages for App Store review: Privacy Policy, Support, and Terms."
  };
}

export default async function AppHomeEn({
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
          <h1 className="title">{c.appNameEn}</h1>
          <p className="subtitle">{c.taglineEn}</p>
        </div>
        <div className="pill">
          <Link href={`/${slug}/`} style={{ textDecoration: "none" }}>
            中文
          </Link>{" "}
          / <strong>English</strong>
        </div>
      </header>

      <section className="grid">
        <article className="card half">
          <h2>Privacy Policy</h2>
          <p>How data is handled, permissions, security, and contact info.</p>
          <div className="actions">
            <Link className="btn primary" href={`/${slug}/en/privacy/`}>
              <span className="dot" />
              View Privacy Policy
            </Link>
          </div>
        </article>

        <article className="card half">
          <h2>Support</h2>
          <p>Contact email, FAQs, and review steps (if needed).</p>
          <div className="actions">
            <Link className="btn primary" href={`/${slug}/en/support/`}>
              <span className="dot green" />
              Open Support Page
            </Link>
          </div>
        </article>

        <article className="card">
          <h2>Terms (Brief)</h2>
          <p>A brief terms page for review and basic usage rules.</p>
          <div className="actions">
            <Link className="btn" href={`/${slug}/en/terms/`}>
              View Terms
            </Link>
          </div>
        </article>

        <article className="card">
          <h2>App Summary</h2>
          <p style={{ marginBottom: 8 }}>{c.promotionalTextEn}</p>
          <ul>
            {c.featuresEn.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <div className="note">
            <p style={{ margin: 0 }}>Notes: {c.importantNotesEn.join("; ")}.</p>
          </div>
        </article>
      </section>

      <footer>
        <Link href="/" className="mono">
          ← Back to app list
        </Link>
      </footer>
    </main>
  );
}


