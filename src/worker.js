export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 浏览器常会请求 /favicon.ico；我们只提供 svg，统一重定向到 svg（避免 404/500）
    if (pathname === "/favicon.ico") {
      const icoToSvg = new URL(request.url);
      icoToSvg.pathname = "/favicon.svg";
      return Response.redirect(icoToSvg.toString(), 301);
    }

    // Next 静态导出配置了 trailingSlash: true
    // 为了避免访问 /cold-wallet/privacy 变 404，这里统一补齐尾斜杠
    const last = pathname.split("/").pop() || "";
    const hasExt = last.includes(".");
    if (!hasExt && pathname !== "/" && !pathname.endsWith("/")) {
      url.pathname = `${pathname}/`;
      return Response.redirect(url.toString(), 301);
    }

    // 先尝试直接命中静态资源
    let resp = await env.ASSETS.fetch(request);

    // 兜底：如果 404，则返回导出的 404.html（更像 Pages 的行为）
    if (resp.status === 404) {
      const nf = new URL(request.url);
      nf.pathname = "/404.html";
      resp = await env.ASSETS.fetch(new Request(nf.toString(), request));
    }

    // 统一加安全头/缓存策略
    const out = new Response(resp.body, resp);
    out.headers.set("X-Content-Type-Options", "nosniff");
    out.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    out.headers.set("X-Frame-Options", "DENY");
    out.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    const p = pathname;
    if (p.startsWith("/_next/static/")) {
      out.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (p.endsWith(".html") || p.endsWith("/")) {
      out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    }

    return out;
  }
};


