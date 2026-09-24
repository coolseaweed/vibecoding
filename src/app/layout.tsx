import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vibe Coding Starter",
    template: "%s · Vibe Coding Starter",
  },
  description: "Windows와 macOS에서 바이브코딩을 시작하기 위한 환경 설정과 실전 워크플로우 가이드",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand" aria-label="Vibe Coding Starter 홈">
              <span>Vibe Coding Starter</span>
            </Link>
            <nav aria-label="주요 메뉴">
              <Link href="/#workflow">워크플로우</Link>
              <Link href="/#guides">가이드</Link>
              <Link href="/docs/git" className="nav-cta">처음 시작</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div>
            <Link href="/" className="brand footer-brand">Vibe Coding Starter</Link>
            <p>환경 설정과 바이브코딩 절차 문서</p>
          </div>
          <div className="footer-links">
            <Link href="/docs/workflow">워크플로우</Link>
            <Link href="/docs/git">Git</Link>
            <Link href="/docs/mcp">MCP</Link>
            <a href="https://github.com/coolseaweed/vibecoding" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
