import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Coding Starter",
  description: "Git, Vercel, Supabase, MCP와 Plan.md 기반 코딩 흐름을 한눈에 설명합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand">Vibe Coding Starter</Link>
            <nav aria-label="주요 메뉴">
              <Link href="/#setup">환경셋업</Link>
              <Link href="/#core">핵심 개념</Link>
              <Link href="/#flow">코딩 플로우</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <span>Vibe Coding Starter</span>
          <a href="https://github.com/coolseaweed/vibecoding" target="_blank" rel="noreferrer">GitHub</a>
        </footer>
      </body>
    </html>
  );
}
