import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChecklistReview } from "@/components/ChecklistReview";
import { MarkdownContent } from "@/components/MarkdownContent";
import { docs, getDoc, isDocSlug } from "@/lib/docs";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isDocSlug(slug)) return {};
  const doc = docs.find((item) => item.slug === slug)!;
  return { title: doc.title, description: doc.description };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  if (!isDocSlug(slug)) notFound();
  const doc = await getDoc(slug);
  const articleContent = slug === "checklist"
    ? doc.content.replace(/^- \[[ xX]\]\s+.+$/gm, "")
    : doc.content;

  return (
    <main className="doc-page">
      <div className="doc-hero">
        <div>
          <Link href="/" className="back-link">← 가이드 홈</Link>
          <span className="eyebrow">{doc.eyebrow}</span>
          <h1>{doc.title}</h1>
          <p>{doc.description}</p>
        </div>
        <span className={`doc-orb accent-${doc.accent}`} aria-hidden="true">
          {String(docs.findIndex((item) => item.slug === slug) + 1).padStart(2, "0")}
        </span>
      </div>

      {slug === "checklist" && <ChecklistReview groups={doc.checklist} />}

      <div className="doc-layout">
        <aside className="doc-toc">
          <span>이 문서에서</span>
          <nav aria-label="문서 목차">
            {doc.sections.map((section) => (
              <a href={section.href} key={section.href}>{section.title}</a>
            ))}
          </nav>
          <Link href="/docs/checklist" className="toc-review">환경 설정 점검하기 →</Link>
        </aside>
        <article className="doc-article">
          <MarkdownContent content={articleContent} />
        </article>
      </div>
    </main>
  );
}
