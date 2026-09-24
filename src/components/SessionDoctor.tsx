"use client";

import { useEffect, useMemo, useState } from "react";
import type { DoctorStage } from "@/lib/doctor";

const STORAGE_KEY = "vibecoding-doctor";

export function SessionDoctor({ stages }: { stages: DoctorStage[] }) {
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const allIds = useMemo(
    () => stages.flatMap((stage) => stage.checks.map((_, index) => `${stage.id}:${index}`)),
    [stages],
  );

  useEffect(() => {
    let saved: string[] = [];
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(parsed)) saved = parsed.filter((item): item is string => typeof item === "string");
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    const frame = window.requestAnimationFrame(() => {
      setChecked(saved);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const completed = checked.filter((id) => allIds.includes(id)).length;
  const percent = allIds.length ? Math.round((completed / allIds.length) * 100) : 0;

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
    <div className="doctor-panel">
      <div className="doctor-overall" aria-live="polite">
        <div>
          <strong>전체 진단</strong>
          <p>{completed} / {allIds.length} 항목 완료</p>
        </div>
        <b>{ready ? percent : 0}%</b>
      </div>
      <div className="doctor-progress" aria-hidden="true">
        <span style={{ width: `${ready ? percent : 0}%` }} />
      </div>

      <div className="doctor-stages">
        {stages.map((stage) => {
          const stageIds = stage.checks.map((_, index) => `${stage.id}:${index}`);
          const stageCompleted = stageIds.filter((id) => checked.includes(id)).length;
          const passed = stageCompleted === stageIds.length;

          return (
            <section key={stage.id} className="doctor-stage">
              <header>
                <div>
                  <h2>{stage.title}</h2>
                  <p>{stage.description}</p>
                </div>
                <span className={passed ? "passed" : "pending"}>
                  {passed ? "통과" : `${stageCompleted}/${stageIds.length}`}
                </span>
              </header>
              <div className="doctor-checks">
                {stage.checks.map((label, index) => {
                  const id = `${stage.id}:${index}`;
                  return (
                    <label key={id} className={checked.includes(id) ? "checked" : ""}>
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
            </section>
          );
        })}
      </div>

      <button type="button" className="doctor-reset" onClick={reset}>진단 초기화</button>
    </div>
  );
}
