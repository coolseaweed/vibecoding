import { readFile } from "node:fs/promises";
import path from "node:path";

export const docs = [
  {
    slug: "workflow",
    title: "바이브코딩 워크플로우",
    eyebrow: "Core course",
    description: "환경셋업부터 아이디에이션, Goal 플래닝, 검수까지 한 세션의 전체 흐름을 익힙니다.",
    accent: "orange",
  },
  {
    slug: "checklist",
    title: "환경 설정 체크리스트",
    eyebrow: "Start here",
    description: "Git부터 Vercel, Supabase, MCP, 보안까지 개발 시작 전에 빠짐없이 검토합니다.",
    accent: "lime",
  },
  {
    slug: "git",
    title: "Git 시작 가이드",
    eyebrow: "Foundation",
    description: "Windows와 macOS에서 Git을 설치하고 GitHub 인증과 기본 작업 흐름을 익힙니다.",
    accent: "blue",
  },
  {
    slug: "mcp",
    title: "ChatGPT · Claude MCP",
    eyebrow: "AI tools",
    description: "ChatGPT, Claude Desktop, Codex, Claude Code에 Vercel과 Supabase를 안전하게 연결합니다.",
    accent: "purple",
  },
  {
    slug: "deploy",
    title: "Vercel · Supabase 시작",
    eyebrow: "Ship safely",
    description: "내 fork를 Vercel에 배포하고 개발용 Supabase 프로젝트를 최소 권한으로 준비합니다.",
    accent: "teal",
  },
] as const;

export type DocSlug = (typeof docs)[number]["slug"];
export type DocMeta = (typeof docs)[number];

export type DocSection = {
  title: string;
  href: string;
  body: string;
};

export type ChecklistGroup = {
  title: string;
  items: string[];
};

export function isDocSlug(value: string): value is DocSlug {
  return docs.some((doc) => doc.slug === value);
}

export async function getDoc(slug: DocSlug) {
  const meta = docs.find((doc) => doc.slug === slug)!;
  const filePath = path.join(process.cwd(), "docs", slug, "README.md");
  const content = await readFile(filePath, "utf8");

  return {
    ...meta,
    content,
    sections: extractSections(slug, content),
    checklist: extractChecklist(content),
  };
}

export async function getSearchSections() {
  const documents = await Promise.all(docs.map((doc) => getDoc(doc.slug)));

  return documents.flatMap((doc) => [
    {
      title: doc.title,
      category: doc.eyebrow,
      href: `/docs/${doc.slug}`,
      body: doc.description,
    },
    ...doc.sections.map((section) => ({
      title: section.title,
      category: doc.title,
      href: section.href,
      body: section.body,
    })),
  ]);
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractSections(slug: DocSlug, markdown: string): DocSection[] {
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const title = match[1].trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    const body = toPlainText(markdown.slice(start, end)).slice(0, 140);

    return {
      title,
      href: `/docs/${slug}#${slugify(title)}`,
      body,
    };
  });
}

function extractChecklist(markdown: string): ChecklistGroup[] {
  const groups: ChecklistGroup[] = [];
  let current: ChecklistGroup | undefined;

  for (const line of markdown.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = { title: heading[1].trim(), items: [] };
      groups.push(current);
      continue;
    }

    const item = line.match(/^- \[[ xX]\]\s+(.+)$/);
    if (item && current) {
      current.items.push(item[1].trim());
    }
  }

  return groups.filter((group) => group.items.length > 0);
}

function toPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^- \[[ xX]\]\s*/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
