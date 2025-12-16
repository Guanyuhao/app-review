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
  if (!app || !c) return { title: "Support" };
  return {
    title: `Support - ${c.appNameEn}`,
    description: "Support and contact information for App Store review."
  };
}

export default async function SupportEn({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const app = getApp(slug);
  const c = getContent(slug);
  if (!app || !c) return null;

  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">Support</h1>
          <p className="subtitle">{c.appNameEn}</p>
        </div>
        <div className="pill">Contact</div>
      </header>

      <div className="actions" style={{ marginTop: 0, marginBottom: 10 }}>
        <Link className="btn" href={`/${slug}/en/`}>
          <span className="dot" />
          Back
        </Link>
        <Link className="btn" href={`/${slug}/en/privacy/`}>
          Privacy
        </Link>
        <Link className="btn" href={`/${slug}/en/terms/`}>
          Terms
        </Link>
        <Link className="btn" href={`/${slug}/support/`}>
          中文
        </Link>
      </div>

      <section className="grid">
        <article className="card half">
          <h2>Contact Us</h2>
          <p>
            Email: <strong>{c.support.email}</strong>
          </p>
          <p style={{ marginTop: 8 }}>
            Website: <strong>{c.support.website}</strong>
          </p>
          <div className="note">
            <p style={{ margin: 0 }}>
              For support and feedback, please email us and we will respond as soon as possible.
            </p>
          </div>
        </article>

        <article className="card half">
          <h2>FAQ</h2>
          <ul>
            <li>
              <strong>Is this an exchange / buy & sell app?</strong> No. This app focuses on offline
              signing and does not provide exchange or fiat-related services.
            </li>
            <li>
              <strong>Do you upload seed phrases or private keys?</strong> No. They are encrypted
              and stored only on your device.
            </li>
            <li>
              <strong>Why camera permission?</strong> To scan and display QR codes for offline/online
              interaction.
            </li>
          </ul>
        </article>

        <article className="card">
          <h2>Review Steps (Optional)</h2>
          <p>{c.reviewNotes.positioningEn}</p>
          <ul style={{ marginTop: 8 }}>
            {c.reviewNotes.stepsEn.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p style={{ marginTop: 8 }}>{c.reviewNotes.extraEn}</p>
        </article>
      </section>
    </main>
  );
}


