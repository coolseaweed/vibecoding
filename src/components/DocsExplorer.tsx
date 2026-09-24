"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchItem = {
  title: string;
  category: string;
  href: string;
  body: string;
};

export function DocsExplorer({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase("ko-KR");
  const results = useMemo(() => {
    if (!normalized) return [];

    return items
      .filter((item) =>
        `${item.title} ${item.category} ${item.body}`
          .toLocaleLowerCase("ko-KR")
          .includes(normalized),
      )
      .slice(0, 6);
  }, [items, normalized]);

  return (
    <div className="search-shell">
      <label htmlFor="guide-search" className="sr-only">
        가이드 검색
      </label>
      <span className="search-mark" aria-hidden="true">
        ⌕
      </span>
      <input
        id="guide-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Git 인증, Supabase, MCP처럼 검색해보세요"
        autoComplete="off"
      />
      {normalized && (
        <div className="search-results" role="region" aria-live="polite">
          {results.length > 0 ? (
            results.map((item) => (
              <Link key={item.href} href={item.href} className="search-result">
                <span>{item.category}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </Link>
            ))
          ) : (
            <p className="search-empty">일치하는 가이드가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}
