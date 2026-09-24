export type DoctorStage = {
  id: string;
  title: string;
  description: string;
  checks: string[];
};

export const doctorStages: DoctorStage[] = [
  {
    id: "setup",
    title: "1. 환경셋업",
    description: "명령과 계정 상태로 개발 시작 가능 여부를 확인합니다.",
    checks: [
      "git --version과 bun --version이 오류 없이 버전을 출력한다.",
      "gh auth status에 내가 사용할 GitHub 계정이 표시된다.",
      "git remote -v의 origin이 내 vibecoding fork를 가리킨다.",
      "bun install --frozen-lockfile이 성공한다.",
      "bun run check가 lint, typecheck, build를 모두 통과한다.",
      "Codex CLI 또는 Claude Code가 저장소 루트에서 실행되고 AGENTS.md를 읽을 수 있다.",
      "사용할 때만 Vercel 개발 프로젝트와 Supabase 개발 프로젝트를 구분해 준비했다.",
    ],
  },
  {
    id: "ideation",
    title: "2. 아이디에이션",
    description: "구현 전에 사용자와 문제를 구체적으로 정의했는지 확인합니다.",
    checks: [
      "대상 사용자를 한 문장으로 적었다.",
      "사용자가 겪는 문제를 관찰 가능한 상황으로 적었다.",
      "서로 다른 해결 방향을 3개 이상 비교했다.",
      "이번 세션에서 선택한 방향과 선택 이유가 있다.",
      "이번 세션에서 하지 않을 일을 적었다.",
      "성공 여부를 사용자의 행동이나 결과로 확인할 수 있다.",
    ],
  },
  {
    id: "plan",
    title: "3. 플래닝 (Goal)",
    description: "Plan.md 또는 GitHub Issue 계획이 Goal을 구현하고 검증하기에 충분한지 확인합니다.",
    checks: [
      "Goal이 기능 이름이 아니라 사용자에게 생길 결과로 작성돼 있다.",
      "Plan.md 또는 GitHub Issue에 범위와 비범위가 모두 적혀 있다.",
      "기술, 보안, 권한, 비용 제약이 계획에 적혀 있다.",
      "완료 기준이 각각 참 또는 거짓으로 판정 가능하다.",
      "모든 구현 작업이 체크박스이며 각 작업에 대응하는 검증 방법이 있다.",
      "lint, typecheck, build, 브라우저 검수가 완료 기준에 포함돼 있다.",
      "비밀값, 배포, DB 쓰기, 삭제가 필요하면 사전 승인 단계가 있다.",
      "Goal 정보가 빠졌을 때 임의 구현 대신 중단하도록 계획돼 있다.",
    ],
  },
  {
    id: "review",
    title: "4. 검수",
    description: "코드와 실행 결과가 Goal의 완료 기준을 충족하는지 증거로 확인합니다.",
    checks: [
      "git diff를 읽고 모든 변경이 Goal 범위에 포함되는지 확인했다.",
      "bun run lint, bun run typecheck, bun run build가 모두 통과했다.",
      "핵심 사용자 흐름을 데스크톱과 모바일 브라우저에서 직접 확인했다.",
      "브라우저 콘솔 오류와 깨진 내부 링크가 없다.",
      "커밋 대상에 .env, 토큰, 비밀번호, 서비스 키가 없다.",
      "완료 기준마다 코드 또는 실행 결과 증거가 있다.",
      "배포가 요청된 경우 production URL이 열리고 주요 경로가 정상 응답한다.",
      "문제 발생 시 사용할 롤백 또는 복구 방법을 확인했다.",
    ],
  },
];
