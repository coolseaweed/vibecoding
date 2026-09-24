import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { MarkdownContent } from "@/components/MarkdownContent";

export const metadata: Metadata = {
  title: "세션 Doctor",
  description: "환경셋업, 아이디에이션, Goal 플래닝, 검수를 객관적인 체크리스트로 진단합니다.",
};

export default async function DoctorPage() {
  const content = await readFile(path.join(process.cwd(), "docs", "doctor", "README.md"), "utf8");

  return (
    <main className="doctor-page">
      <Link href="/" className="back-link">← 가이드 홈</Link>
      <h1>세션 Doctor</h1>
      <p className="doctor-intro">
        에이전트에게 이 페이지 URL만 전달하세요. 아래 문서가 자가진단과 개선의 단일 기준입니다.
      </p>
      <article className="doc-article">
        <MarkdownContent content={content} />
      </article>
    </main>
  );
}
