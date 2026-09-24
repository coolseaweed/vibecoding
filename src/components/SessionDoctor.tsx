"use client";

import { useEffect, useMemo, useState } from "react";
import type { DoctorStage } from "@/lib/doctor";

const STORAGE_KEY = "vibecoding-doctor-v2";

type Status = "unknown" | "pass" | "fail";
type Result = { status: Status; evidence: string };
type Results = Record<string, Result>;

function readSavedResults(): Results {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, Result] => {
        const value = entry[1];
        return Boolean(
          value &&
          typeof value === "object" &&
          "status" in value &&
          ["unknown", "pass", "fail"].includes(String(value.status)) &&
          "evidence" in value &&
          typeof value.evidence === "string",
        );
      }),
    );
  } catch {
    return {};
  }
}

export function SessionDoctor({ stages }: { stages: DoctorStage[] }) {
  const [results, setResults] = useState<Results>({});
  const [ready, setReady] = useState(false);
  const allIds = useMemo(
    () => stages.flatMap((stage) => stage.checks.map((_, index) => `${stage.id}:${index}`)),
    [stages],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const shouldReset = new URLSearchParams(window.location.search).has("reset");
      if (shouldReset) {
        window.localStorage.removeItem(STORAGE_KEY);
        window.history.replaceState(null, "", "/doctor");
      }
      setResults(shouldReset ? {} : readSavedResults());
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isPassed = (id: string) => results[id]?.status === "pass" && Boolean(results[id].evidence.trim());
  const passedCount = allIds.filter(isPassed).length;
  const failedCount = allIds.filter((id) => results[id]?.status === "fail").length;
  const percent = allIds.length ? Math.round((passedCount / allIds.length) * 100) : 0;

  function update(id: string, patch: Partial<Result>) {
    setResults((current) => {
      const next = {
        ...current,
        [id]: { ...(current[id] ?? { status: "unknown", evidence: "" }), ...patch },
      } satisfies Results;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
    setResults({});
  }

  return (
    <div className="doctor-panel">
      <div className="doctor-overall" aria-live="polite">
        <div>
          <strong>전체 진단</strong>
          <p>{passedCount} / {allIds.length} PASS · {failedCount} FAIL</p>
        </div>
        <b>{ready ? percent : 0}%</b>
      </div>
      <div className="doctor-progress" aria-hidden="true">
        <span style={{ width: `${ready ? percent : 0}%` }} />
      </div>

      <div className="doctor-stages">
        {stages.map((stage) => {
          const stageIds = stage.checks.map((_, index) => `${stage.id}:${index}`);
          const stagePassed = stageIds.filter(isPassed).length;
          const stageFailed = stageIds.filter((id) => results[id]?.status === "fail").length;

          return (
            <section key={stage.id} className="doctor-stage">
              <header>
                <div>
                  <h2>{stage.title}</h2>
                  <p>{stage.description}</p>
                </div>
                <span className={stagePassed === stageIds.length ? "passed" : stageFailed ? "failed" : "pending"}>
                  {stagePassed === stageIds.length ? "PASS" : stageFailed ? `FAIL ${stageFailed}` : `${stagePassed}/${stageIds.length}`}
                </span>
              </header>
              <div className="doctor-checks">
                {stage.checks.map((label, index) => {
                  const id = `${stage.id}:${index}`;
                  const result = results[id] ?? { status: "unknown", evidence: "" };
                  const needsEvidence = result.status === "pass" && !result.evidence.trim();

                  return (
                    <div key={id} className="doctor-check">
                      <p>{label}</p>
                      <div>
                        <label>
                          <span>판정</span>
                          <select value={result.status} onChange={(event) => update(id, { status: event.target.value as Status })}>
                            <option value="unknown">미확인</option>
                            <option value="pass">PASS</option>
                            <option value="fail">FAIL</option>
                          </select>
                        </label>
                        <label>
                          <span>증거</span>
                          <input
                            value={result.evidence}
                            onChange={(event) => update(id, { evidence: event.target.value })}
                            placeholder="명령 결과, 파일 경로 또는 URL"
                          />
                        </label>
                      </div>
                      {needsEvidence && <small>증거를 입력해야 PASS로 집계됩니다.</small>}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <a className="doctor-reset" href="/doctor?reset=1" onClick={reset}>진단 초기화</a>
    </div>
  );
}
