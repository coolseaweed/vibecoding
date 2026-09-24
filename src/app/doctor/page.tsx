import type { Metadata } from "next";
import Link from "next/link";
import { SessionDoctor } from "@/components/SessionDoctor";
import { doctorStages } from "@/lib/doctor";

export const metadata: Metadata = {
  title: "세션 Doctor",
  description: "환경셋업, 아이디에이션, Goal 플래닝, 검수를 객관적인 체크리스트로 진단합니다.",
};

export default function DoctorPage() {
  return (
    <main className="doctor-page">
      <Link href="/" className="back-link">← 가이드 홈</Link>
      <h1>세션 Doctor</h1>
      <p className="doctor-intro">
        프로젝트를 연 에이전트에게 이 페이지 URL만 보내세요. 에이전트는 아래 기준으로 현재 상태를
        진단하고, 안전한 범위에서 개선한 뒤 다시 검사해야 합니다.
      </p>

      <section className="agent-instructions" aria-labelledby="agent-instructions-title">
        <h2 id="agent-instructions-title">에이전트 실행 규칙</h2>
        <ol>
          <li>현재 작업 디렉터리의 저장소 루트에서 AGENTS.md, Goal, Plan.md 또는 계획 문서를 먼저 찾는다.</li>
          <li>Goal, 범위 또는 완료 기준이 없으면 BLOCKED로 보고하고 파일과 외부 시스템을 변경하지 않는다.</li>
          <li>아래 항목을 순서대로 검사하고 각 항목을 PASS, FAIL, 미확인으로 판정한다.</li>
          <li>명령 결과나 파일 위치가 있는 경우에만 PASS로 판정한다. 추측하지 않는다.</li>
          <li>Goal 범위 안의 안전한 FAIL은 개선하고 같은 검사를 다시 실행한다.</li>
          <li>배포, 비밀값, DB 쓰기, 삭제가 필요하면 실행하지 말고 사용자 승인을 요청한다.</li>
          <li>마지막에 단계별 결과, 확인한 증거, 남은 FAIL과 다음 행동을 짧게 보고한다.</li>
        </ol>
      </section>

      <p className="doctor-note">
        사람이 직접 사용할 때는 각 항목의 판정과 증거를 기록하세요. 모든 항목이 증거 있는 PASS여야
        단계가 통과되며, 진단 상태는 현재 브라우저에만 저장됩니다.
      </p>
      <SessionDoctor stages={doctorStages} />
    </main>
  );
}
