import Link from "next/link";

export default function AppNotFound() {
  return (
    <main className="wrap">
      <div className="card">
        <h2 style={{ margin: 0 }}>页面不存在</h2>
        <p style={{ marginTop: 8 }}>
          你访问的 App 或页面不存在。请从首页选择正确的 App。
        </p>
        <div className="actions">
          <Link className="btn primary" href="/">
            <span className="dot" />
            返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}


