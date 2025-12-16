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
  if (!app || !c) return { title: "Terms" };
  return {
    title: `Terms - ${c.appNameEn}`,
    description: "Brief terms of service for App Store review."
  };
}

export default async function TermsEn({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const app = getApp(slug);
  const c = getContent(slug);
  if (!app || !c) return null;

  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">Terms (Brief)</h1>
          <p className="subtitle">Applies to {c.appNameEn}</p>
        </div>
        <div className="pill">Terms</div>
      </header>

      <div className="actions" style={{ marginTop: 0, marginBottom: 10 }}>
        <Link className="btn" href={`/${slug}/en/`}>
          <span className="dot" />
          Back
        </Link>
        <Link className="btn" href={`/${slug}/en/privacy/`}>
          Privacy
        </Link>
        <Link className="btn" href={`/${slug}/en/support/`}>
          Support
        </Link>
        <Link className="btn" href={`/${slug}/terms/`}>
          中文
        </Link>
      </div>

      <section className="card">
        <p>
          This is a brief terms page for review and basic usage. If your product includes paid
          subscriptions, accounts, or more complex compliance requirements, consider adding a full
          version.
        </p>

        <h2 style={{ marginTop: 18 }}>1. Service</h2>
        <p>
          {c.appNameEn} is an offline cold wallet utility for local seed phrase management and
          offline transaction signing. It does not provide exchange or fiat-related services.
        </p>

        <h2 style={{ marginTop: 18 }}>2. User Responsibilities</h2>
        <ul>
          <li>
            You are responsible for safeguarding your seed phrase/private keys. We are not
            responsible for losses caused by lost credentials.
          </li>
          <li>You should understand the risks and fees before any on-chain actions.</li>
          <li>You must not use the app for illegal activities.</li>
        </ul>

        <h2 style={{ marginTop: 18 }}>3. Disclaimer</h2>
        <ul>
          <li>This app performs offline signing only and does not broadcast transactions on-chain.</li>
          <li>We are not responsible for availability or stability of blockchain networks.</li>
        </ul>

        <h2 style={{ marginTop: 18 }}>4. Changes</h2>
        <p>We may update these terms from time to time and publish the latest version on this page.</p>

        <h2 style={{ marginTop: 18 }}>5. Contact</h2>
        <p>
          Email: <strong>{c.support.email}</strong>
          <br />
          Website: <strong>{c.support.website}</strong>
        </p>
      </section>
    </main>
  );
}


