import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap">
      <div className="card">
        <h2 style={{ margin: 0 }}>404 - 页面不存在</h2>
        <p style={{ marginTop: 8 }}>
          你访问的页面不存在。请返回首页选择正确的入口。
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


