# 바이브코딩 환경 설정 체크리스트

이 체크리스트는 새 프로젝트를 시작하기 전에 개발 도구, GitHub, Vercel, Supabase, MCP가 안전하게 준비됐는지 검토하는 기준입니다. 위에서 아래 순서로 진행하세요.

계정이 하나도 없다면 [Git 시작 가이드](../git/README.md#github-계정-만들기)에서 GitHub 계정을 먼저 만들고, [MCP 가이드의 원샷 구현 도구 준비](../mcp/README.md#원샷-구현-도구-준비)에서 Codex CLI 또는 Claude Code 하나를 설치합니다. 이후 필요한 경우 [Vercel과 Supabase 시작 가이드](../deploy/README.md)로 이동합니다. Supabase를 아직 사용하지 않는 수업이라면 해당 항목은 미완료로 두어도 됩니다.

## 1. 내 컴퓨터 준비

- [ ] Windows 또는 macOS가 최신 보안 업데이트 상태다.
- [ ] [원샷 구현 도구 준비](../mcp/README.md#원샷-구현-도구-준비)를 따라 Codex CLI 또는 Claude Code를 설치하고 로그인했다.
- [ ] `git --version`이 정상 출력된다.
- [ ] `bun --version`이 정상 출력된다.
- [ ] 브라우저에서 GitHub, Vercel, Supabase에 로그인할 수 있다.
- [ ] 비밀번호 관리자와 다중 인증을 사용한다.

막힌 항목이 있다면 먼저 [Git 시작 가이드](../git/README.md)를 확인하세요.

## 2. Git과 GitHub

- [ ] `git config --global user.name`이 내 이름으로 설정돼 있다.
- [ ] `git config --global user.email`이 의도한 이메일 또는 GitHub `noreply` 주소다.
- [ ] `git config --global init.defaultBranch main`을 설정했다.
- [ ] `gh auth status`에 사용할 GitHub 계정이 표시된다.
- [ ] `coolseaweed/vibecoding`을 내 GitHub 계정으로 fork했다.
- [ ] 내 fork를 clone했고 `git remote -v`의 `origin`이 내 계정이다.
- [ ] 저장소에서 `git status`를 실행할 수 있다.
- [ ] `.env`, 토큰, 서비스 키를 커밋하지 않는다는 원칙을 확인했다.

## 3. 프로젝트 실행

- [ ] 저장소 루트에서 `bun install`을 완료했다.
- [ ] `bun dev`로 [http://localhost:3000](http://localhost:3000)을 열었다.
- [ ] `bun run lint`가 통과한다.
- [ ] `bun run typecheck`가 통과한다.
- [ ] `bun run build`가 통과한다.
- [ ] `bun run test`가 통과한다.
- [ ] 위 검증을 묶은 `bun run check`가 통과한다.
- [ ] 작업 전 `git status`로 기존 변경을 확인하는 습관을 정했다.

익명 채팅 체험에는 별도 서비스나 환경변수가 필요하지 않습니다. 메시지는 Vercel Function 한 인스턴스의 메모리에만 있어 서버가 재시작·절전·확장되면 사라지거나 다른 인스턴스 사용자에게 보이지 않을 수 있습니다.

## 4. Vercel 준비

- [ ] [Vercel](https://vercel.com/) 계정을 만들고 GitHub 계정을 연결했다.
- [ ] Vercel에서 올바른 개인 계정 또는 팀을 선택했다.
- [ ] 새 프로젝트를 만들 때 내 계정의 `vibecoding` fork를 선택했다.
- [ ] Framework Preset이 Next.js로 감지되는지 확인했다.
- [ ] Install Command가 `bun install`, Build Command가 `bun run build`로 동작하는지 확인했다.
- [ ] 첫 배포가 성공하고 Preview URL을 열어봤다.
- [ ] Production과 Preview 환경을 구분한다는 원칙을 확인했다.
- [ ] Vercel MCP OAuth 승인 시 올바른 팀을 선택했다.

Vercel 프로젝트를 아직 만들지 않았다면 MCP가 계정의 여러 프로젝트를 볼 수 있습니다. 실제 프로젝트를 만든 뒤 대상 팀과 프로젝트가 맞는지 매번 확인하세요.

## 5. Supabase 준비

- [ ] [Supabase](https://supabase.com/) 계정을 만들고 개발용 조직을 선택했다.
- [ ] 프로덕션과 분리된 개발용 프로젝트를 만들었다.
- [ ] 프로젝트 이름, 리전, 데이터베이스 비밀번호를 비밀번호 관리자에 보관했다.
- [ ] Supabase Dashboard의 Project Settings에서 project ref를 확인했다.
- [ ] MCP URL을 `project_ref`로 특정 프로젝트에 제한할지 결정했다.
- [ ] 초기 탐색에는 `read_only=true`를 사용했다.
- [ ] Row Level Security(RLS) 없이 공개 테이블을 만들지 않기로 했다.
- [ ] `service_role` 키를 브라우저 코드나 Git 저장소에 넣지 않기로 했다.
- [ ] Supabase MCP는 개발 프로젝트 ref를 알기 전까지 docs-only 설정으로 유지했다.
- [ ] 데이터베이스 도구를 켤 때 `project_ref`, `read_only=true`, 최소 `features`를 적용했다.
- [ ] Supabase MCP OAuth 승인 시 올바른 조직과 프로젝트를 선택했다.

현재 보일러플레이트는 Supabase SDK를 사용하지 않으므로 Supabase 환경변수가 필요하지 않습니다. SDK와 실제 기능을 추가할 때만 필요한 변수의 이름과 노출 범위를 설계하고, 실제 값은 `.env.local` 또는 Vercel의 Environment Variables에 저장하세요.

## 6. ChatGPT와 Claude 연결

- [ ] [MCP 시작 가이드](../mcp/README.md)를 읽었다.
- [ ] ChatGPT에서 Developer mode 사용 가능 여부를 확인했다.
- [ ] Claude Desktop에서 Custom Connector 사용 가능 여부를 확인했다.
- [ ] Vercel MCP URL이 `https://mcp.vercel.com/coolseaweeds-projects/vibecoding`인지 확인했다.
- [ ] Supabase MCP URL이 공식 `https://mcp.supabase.com/mcp` 도메인과 필요한 제한 파라미터를 사용하는지 확인했다.
- [ ] Codex가 이 저장소의 `.codex/config.toml`을 신뢰 후 읽는지 확인했다.
- [ ] Claude Code가 이 저장소의 `.mcp.json`을 승인 후 읽는지 확인했다.
- [ ] 첫 테스트는 읽기 전용 요청으로 실행했다.

## 7. 보안 검토

- [ ] `.gitignore`가 `.env*`, `.vercel`, `node_modules`, `.next`를 제외한다.
- [ ] `git diff --staged`에 비밀값이 없는지 커밋 전에 확인한다.
- [ ] AI가 제안한 삭제·배포·DB 변경 명령은 실행 전 직접 읽는다.
- [ ] 운영 데이터에는 MCP를 바로 연결하지 않는다.
- [ ] 쓰기 도구의 승인 요청에서 대상과 입력 JSON을 검토한다.
- [ ] 사용하지 않는 OAuth 연결은 서비스 설정에서 해제한다.
- [ ] 공개 저장소에 개인 경로, 이메일, 계정 ID가 노출되지 않았는지 확인한다.

## 8. 시작 승인

아래 항목까지 확인되면 기능 개발을 시작할 준비가 된 것입니다.

- [ ] 로컬 개발 서버와 production build가 모두 성공한다.
- [ ] GitHub 원격 저장소와 현재 브랜치를 알고 있다.
- [ ] Vercel 배포 대상 계정과 팀을 알고 있다.
- [ ] Supabase 개발 프로젝트와 project ref를 알고 있다.
- [ ] AI 도구별 MCP 설정 범위를 설명할 수 있다.
- [ ] 비밀값 저장 위치와 커밋 금지 대상을 설명할 수 있다.
- [ ] 문제가 생겼을 때 강제 명령보다 `git status`, 로그, 공식 문서를 먼저 확인한다.

모든 항목을 한 번에 완료할 필요는 없습니다. 아직 사용하지 않는 서비스는 미완료로 두고, 기능에 도입하기 직전에 다시 검토하세요.
