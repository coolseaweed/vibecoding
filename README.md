# Vibe Coding Starter

Windows와 macOS 사용자가 바이브코딩을 안전하게 시작하도록 돕는 Next.js 문서 사이트이자 보일러플레이트입니다.

웹 가이드: https://vibecoding-pied-ten.vercel.app
세션 진단: https://vibecoding-pied-ten.vercel.app/doctor

## 가이드

- [바이브코딩 워크플로우](docs/workflow/README.md) — 환경셋업 → 아이디에이션 → 플래닝(Goal) → 검수
- [환경 연결 Doctor](docs/doctor/README.md) — Git, Vercel, Supabase, MCP 연결을 진단하는 SSOT
- [환경 설정 체크리스트](docs/checklist/README.md) — Git, Vercel, Supabase, MCP, 보안 점검
- [Git 시작 가이드](docs/git/README.md) — Windows·macOS 설치, GitHub 인증, 기본 흐름
- [ChatGPT와 Claude Desktop MCP](docs/mcp/README.md) — Vercel·Supabase 연결 및 프로젝트 설정
- [Vercel과 Supabase 시작](docs/deploy/README.md) — fork 배포, 개발 프로젝트, 최소 권한, 롤백

`docs/*/README.md`가 문서의 원본이며 웹사이트는 이 파일을 빌드 시 직접 읽어 렌더링합니다.
AI 에이전트는 먼저 [llms.txt](llms.txt)를 읽으면 저장소 구조와 완료 기준을 빠르게 확인할 수 있습니다.

## 로컬 실행

```bash
bun install --frozen-lockfile
bun dev
```

[http://localhost:3000](http://localhost:3000)을 엽니다.

## 검증

```bash
bun run lint
bun run typecheck
bun run build
```

## 기술 구성

- Next.js App Router + TypeScript
- Tailwind CSS
- React Markdown + GitHub Flavored Markdown
- Codex와 Claude Code를 위한 저장소 범위 MCP 설정

## MCP 설정

- Codex: `.codex/config.toml`
- Claude Code: `.mcp.json`

ChatGPT와 Claude Desktop은 저장소의 프로젝트 설정을 자동으로 읽지 않습니다. 자세한 연결 방법은 [MCP 가이드](docs/mcp/README.md)를 확인하세요.
저장소 범위 설정은 클라우드 서비스 권한을 자동으로 한 프로젝트에 제한하지 않습니다. Supabase 기본 설정은 실제 개발 project ref가 생길 때까지 docs-only와 read-only로 유지합니다.
