"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChecklistGroup } from "@/lib/docs";

const STORAGE_KEY = "vibecoding-setup-checklist";

export function ChecklistReview({ groups }: { groups: ChecklistGroup[] }) {
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const items = useMemo(
    () =>
      groups.flatMap((group) =>
        group.items.map((label) => ({ id: `${group.title}:${label}`, label, group: group.title })),
      ),
    [groups],
  );

  useEffect(() => {
    let savedItems: string[] = [];

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        savedItems = parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    const frame = window.requestAnimationFrame(() => {
      setChecked(savedItems);
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const completed = checked.filter((id) => items.some((item) => item.id === id)).length;
  const percent = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);

  function toggle(id: string) {
    const next = checked.includes(id) ? checked.filter((item) => item !== id) : [...checked, id];
    setChecked(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function reset() {
    setChecked([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <section className="review-panel" aria-labelledby="review-title">
      <div className="review-summary">
        <div>
          <span className="eyebrow">Interactive review</span>
          <h2 id="review-title">내 설정 진행률</h2>
          <p>체크 상태는 이 브라우저에만 저장되며 서버로 전송되지 않습니다.</p>
        </div>
        <div className="progress-number" aria-label={`${percent}% 완료`}>
          {ready ? percent : 0}<span>%</span>
        </div>
      </div>
      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${ready ? percent : 0}%` }} />
      </div>
      <div className="review-meta">
        <strong>{ready ? completed : 0} / {items.length} 완료</strong>
        {completed > 0 && (
          <button type="button" onClick={reset}>
            초기화
          </button>
        )}
      </div>
      <div className="review-groups">
        {groups.map((group) => (
          <details key={group.title} open={group === groups[0]}>
            <summary>
              {group.title}
              <span>
                {group.items.filter((label) => checked.includes(`${group.title}:${label}`)).length}/
                {group.items.length}
              </span>
            </summary>
            <div>
              {group.items.map((label) => {
                const id = `${group.title}:${label}`;
                return (
                  <label key={id} className={checked.includes(id) ? "is-checked" : ""}>
                    <input
                      type="checkbox"
                      checked={checked.includes(id)}
                      onChange={() => toggle(id)}
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
