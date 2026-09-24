import Link from "next/link";
import { DocsExplorer } from "@/components/DocsExplorer";
import { WorkflowLesson } from "@/components/WorkflowLesson";
import { docs, getDoc, getSearchSections } from "@/lib/docs";

export default async function Home() {
  const [searchItems, workflow] = await Promise.all([
    getSearchSections(),
    getDoc("workflow"),
  ]);

  return (
    <main className="home-page">
      <section className="intro">
        <p className="label">VIBE CODING STARTER</p>
        <h1>바이브코딩 시작 가이드</h1>
        <p>
          Windows와 macOS 사용자를 위한 환경 설정, 작업 절차, 검수, 배포 문서입니다.
          아래 순서대로 진행하세요.
        </p>
        <div className="intro-actions">
          <Link href="/docs/git" className="button button-primary">1. Git부터 시작</Link>
          <Link href="/docs/workflow" className="button">전체 워크플로우</Link>
        </div>
      </section>

      <section className="start-section" aria-labelledby="start-title">
        <h2 id="start-title">시작 순서</h2>
        <ol>
          <li><Link href="/docs/git">Git, GitHub, Bun 설치</Link></li>
          <li><Link href="/docs/checklist">환경 설정 체크리스트 검토</Link></li>
          <li><Link href="/docs/deploy">필요한 경우 Vercel과 Supabase 개발 환경 준비</Link></li>
          <li><Link href="/docs/workflow">4단계 바이브코딩 워크플로우 진행</Link></li>
        </ol>
      </section>

      <section className="search-section" aria-labelledby="search-title">
        <h2 id="search-title">문서 검색</h2>
        <DocsExplorer items={searchItems} />
      </section>

      <WorkflowLesson sections={workflow.sections} />

      <section className="guides-section" id="guides" aria-labelledby="guides-title">
        <h2 id="guides-title">전체 문서</h2>
        <div className="guide-list">
          {docs.map((doc) => (
            <Link href={`/docs/${doc.slug}`} className="guide-row" key={doc.slug}>
              <div>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
              </div>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="platform-section">
        <h2>운영체제별 설치</h2>
        <div>
          <Link href="/docs/git#windows에서-설치하기">Windows 설치 안내 →</Link>
          <Link href="/docs/git#macos에서-설치하기">macOS 설치 안내 →</Link>
        </div>
      </section>
    </main>
  );
}
