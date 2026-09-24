import Link from "next/link";
import type { DocSection } from "@/lib/docs";

export function WorkflowLesson({ sections }: { sections: DocSection[] }) {
  const steps = sections.filter((section) => /^\d+\./.test(section.title)).slice(0, 4);

  return (
    <section className="workflow-section" id="workflow" aria-labelledby="workflow-title">
      <div className="section-heading">
        <h2 id="workflow-title">바이브코딩 세션 4단계</h2>
        <p>
          1단계부터 순서대로 진행합니다. 검수에서 문제가 확인되면 원인이 발생한 단계로 돌아갑니다.
        </p>
      </div>
      <div className="workflow-grid">
        {steps.map((step, index) => (
          <Link href={step.href} className="workflow-step" key={step.href}>
            <div className="step-topline">
              <span className="step-number">{index + 1}</span>
            </div>
            <h3>{step.title.replace(/^\d+\.\s*/, "")}</h3>
            <p>{step.body}</p>
            <span className="step-link">상세 절차 보기 →</span>
          </Link>
        ))}
      </div>
      <div className="workflow-return" aria-label="검수 후 반복">
        <span>환경셋업</span>
        <i>→</i>
        <span>아이디에이션</span>
        <i>→</i>
        <span>플래닝</span>
        <i>→</i>
        <span>검수</span>
        <i className="return-arrow">↺</i>
      </div>
    </section>
  );
}
