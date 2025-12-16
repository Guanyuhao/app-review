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
  if (!app || !c) return { title: "Privacy Policy" };
  return {
    title: `Privacy Policy - ${c.appNameEn}`,
    description: "Privacy Policy: data handling, permissions, security, and contact."
  };
}

export default async function PrivacyEn({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const app = getApp(slug);
  const c = getContent(slug);
  if (!app || !c) return null;

  return (
    <main className="wrap">
      <header className="top">
        <div>
          <h1 className="title">Privacy Policy</h1>
          <p className="subtitle">Applies to {c.appNameEn}</p>
        </div>
        <div className="pill">Updated: {c.privacy.updatedAt}</div>
      </header>

      <div className="actions" style={{ marginTop: 0, marginBottom: 10 }}>
        <Link className="btn" href={`/${slug}/en/`}>
          <span className="dot" />
          Back
        </Link>
        <Link className="btn" href={`/${slug}/en/support/`}>
          Support
        </Link>
        <Link className="btn" href={`/${slug}/en/terms/`}>
          Terms
        </Link>
        <Link className="btn" href={`/${slug}/privacy/`}>
          中文
        </Link>
      </div>

      <section className="card">
        <p>
          This Privacy Policy applies to {c.appNameEn} (the “App”). We value your privacy and
          explain how information is handled, used, stored, and protected.
        </p>

        <div className="note">
          <p style={{ margin: 0 }}>
            Contact: {c.support.email} / {c.support.website}
          </p>
        </div>

        <h2 style={{ marginTop: 18 }}>1. Data We Collect</h2>
        <ul>
          {c.privacy.highlightsEn.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>2. On-device Storage</h2>
        <p>The following items may be stored locally on your device and are not uploaded to us:</p>
        <ul>
          {c.privacy.localStorageItemsEn.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>3. Permissions</h2>
        <ul>
          {c.privacy.permissionsEn.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong>: {p.purpose}
            </li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>4. Security</h2>
        <p>
          We use reasonable security measures such as encrypted storage and OS-provided secure
          mechanisms (e.g., iOS Keychain / Android Keystore).
        </p>

        <h2 style={{ marginTop: 18 }}>5. Third-party Services</h2>
        <ul>
          {c.privacy.thirdPartyEn.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h2 style={{ marginTop: 18 }}>6. Children’s Privacy</h2>
        <p>{c.privacy.childrenEn}</p>
      </section>
    </main>
  );
}


