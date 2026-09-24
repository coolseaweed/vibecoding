# Vercel과 Supabase 시작 가이드

이 문서는 자신의 `vibecoding` fork를 Vercel에 배포하고, 개발용 Supabase 프로젝트를 안전하게 준비하는 순서를 설명합니다. 계정·비용·데이터를 바꾸는 단계마다 대상 조직과 프로젝트를 다시 확인하세요.

## 시작 전 확인

- GitHub에서 `coolseaweed/vibecoding`을 자신의 계정으로 fork했다.
- 로컬 `origin`이 자신의 fork를 가리킨다.
- `bun run check`가 통과한다.
- GitHub, Vercel, Supabase 계정에 다중 인증을 설정했다.
- 수업용 개발 리소스와 실제 운영 리소스를 분리한다.

아직 fork하지 않았다면 [Git 시작 가이드](../git/README.md#이-저장소-fork하고-시작하기)부터 완료하세요.

## Vercel 계정 만들기

Vercel은 Next.js 웹사이트를 인터넷에 배포하는 서비스입니다.

1. [Vercel 가입](https://vercel.com/signup)을 엽니다.
2. **Continue with GitHub**를 선택합니다.
3. GitHub가 권한 승인을 요청하면 계정과 요청 범위를 확인한 뒤 승인합니다.
4. 개인 학습용 계정인지 팀 계정인지 묻는 화면에서 자신이 사용할 범위를 선택합니다.
5. 플랜 선택 화면에서 비용과 제한을 확인합니다. 결제가 필요한 선택은 이해한 뒤에만 진행합니다.
6. Vercel Dashboard가 열리면 계정 생성이 완료된 것입니다.

수업에서는 자신의 GitHub fork를 Vercel 프로젝트로 가져옵니다. 다른 사람의 원본 저장소를 직접 배포 대상으로 선택하지 않습니다.

## Vercel 프로젝트 만들기

### 1. GitHub 연결

1. [Vercel](https://vercel.com/)에 로그인합니다.
2. **Add New → Project**를 선택합니다.
3. GitHub 연동을 승인합니다.
4. 저장소 목록에서 **자신의 계정에 있는 `vibecoding` fork**를 선택합니다.

원본 `coolseaweed/vibecoding`에 대한 소유 권한이 없는 수강생은 원본 대신 자신의 fork를 import해야 합니다.

### 2. 빌드 설정 확인

Vercel이 다음 값을 감지하는지 확인합니다.

| 항목 | 기대값 |
| --- | --- |
| Framework Preset | Next.js |
| Install Command | `bun install` |
| Build Command | `bun run build` |
| Output Directory | Next.js 기본값, 직접 지정하지 않음 |

익명 채팅 체험에는 환경변수가 필요하지 않습니다. 메시지는 Vercel Function 한 인스턴스의 메모리에만 있고 최대 24시간 유지되므로, 서버가 재시작·절전·확장되면 더 일찍 사라지거나 사용자마다 다르게 보일 수 있습니다.

### 3. 첫 배포

**Deploy**를 누르고 빌드가 끝날 때까지 기다립니다. 성공하면 다음을 확인합니다.

1. 배포 URL의 홈이 열린다.
2. 홈페이지의 환경셋업, 네 가지 핵심 개념, 코딩 플로우, 익명 채팅이 열린다.
4. 데스크톱과 모바일 폭에서 메뉴와 문서가 읽힌다.

### 4. Preview와 Production 구분

- fork의 기본 브랜치 배포는 Production으로 연결될 수 있습니다.
- 기능 브랜치와 Pull Request는 Preview 배포로 먼저 검수합니다.
- Preview에서 lint, build, 핵심 사용자 흐름을 확인한 뒤 Production에 반영합니다.
- 문제가 생기면 Vercel의 이전 정상 Deployment를 선택해 즉시 롤백할 수 있습니다.

수업 중에는 Preview를 기본 검수 환경으로 사용하고, 명시적인 검수 통과 후에만 Production으로 반영하세요.

## Supabase 개발 프로젝트 만들기

Supabase는 데이터베이스, 로그인, 파일 저장 기능을 제공하는 서비스입니다. 이 보일러플레이트를 읽거나 실행하는 데에는 Supabase 계정이 필요하지 않습니다. 데이터 기능을 실습할 때 아래 단계를 진행합니다.

### 1. Supabase 계정 만들기

1. [Supabase Dashboard](https://supabase.com/dashboard)를 엽니다.
2. **Sign in with GitHub**를 선택합니다.
3. GitHub 권한 요청의 대상 계정과 범위를 확인한 뒤 승인합니다.
4. Dashboard가 열리면 **New organization**을 선택합니다.
5. 수업용임을 알 수 있는 조직 이름을 입력합니다.
6. 플랜 화면에서 비용과 제한을 확인하고 학습 목적에 맞는 선택을 합니다.

### 2. 개발 조직과 프로젝트

1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인합니다.
2. 수업 또는 개발용 조직을 선택하거나 새로 만듭니다.
3. **New project**를 선택합니다.
4. 프로젝트 이름에 개발용임을 알 수 있는 이름을 사용합니다.
5. 사용자와 가까운 리전을 선택합니다.
6. 데이터베이스 비밀번호는 비밀번호 관리자에 저장합니다.

프로젝트 생성 전 표시되는 플랜과 예상 비용을 확인하세요. 비용이 발생하는 선택은 이해하지 못한 상태에서 진행하지 않습니다.

### 3. project ref 확인

Dashboard의 Project Settings에서 project ref를 확인합니다. Project ref는 비밀번호는 아니지만 특정 환경을 식별하는 값이므로 소스에 임의로 하드코딩하지 않습니다.

Supabase MCP에서 데이터베이스 도구가 필요할 때 다음 구조로 **개발 프로젝트 하나만**, **읽기 전용**, **필요한 기능만** 연결합니다.

```text
https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF&read_only=true&features=database,docs
```

project ref를 아직 모르면 저장소의 docs-only 기본 설정을 그대로 유지합니다.

```text
https://mcp.supabase.com/mcp?read_only=true&features=docs
```

### 4. 데이터베이스 안전 기준

- 테이블을 공개하기 전에 Row Level Security 정책을 설계합니다.
- 브라우저 코드에 `service_role` 키를 넣지 않습니다.
- AI에게 마이그레이션이나 SQL 쓰기를 맡기기 전에 SQL을 직접 읽고 백업·롤백 방법을 확인합니다.
- 운영 데이터 복사본보다 빈 개발 프로젝트에서 먼저 검증합니다.
- 자동 실행 세션에는 데이터베이스 쓰기 도구를 연결하지 않습니다.

## 환경변수가 필요한 시점

현재 저장소는 Supabase SDK를 사용하지 않으므로 애플리케이션 환경변수가 없습니다. 로그인이나 데이터 기능을 실제로 구현하는 Goal이 승인된 뒤에만 필요한 변수 목록을 정합니다.

그때도 다음 원칙을 지킵니다.

1. 로컬 값은 Git에 포함되지 않는 `.env.local`에 둡니다.
2. 배포 값은 Vercel Project Settings의 Environment Variables에 둡니다.
3. Preview와 Production 값을 분리합니다.
4. 브라우저에 노출해도 되는 공개 값과 서버 전용 비밀값을 구분합니다.
5. 실제 값이나 토큰을 문서, 이슈, 프롬프트, 커밋에 붙여 넣지 않습니다.

## MCP와 실제 프로젝트 연결

저장소의 MCP 파일은 이 저장소에서만 로드되지만, 원격 서비스 권한까지 자동으로 한 프로젝트에 제한해 주지는 않습니다.

- Vercel: OAuth 승인 계정의 팀·프로젝트 권한을 확인하고 수동 승인 모드를 유지합니다.
- Supabase: `project_ref`, `read_only=true`, 최소 `features`를 사용합니다.
- 모든 도구: 배포·삭제·도메인·데이터 쓰기 전에 정확한 대상을 확인합니다.

## 배포 검수 체크리스트

- [ ] 내 GitHub fork를 Vercel에 연결했다.
- [ ] Preview와 Production의 차이를 이해했다.
- [ ] production build가 성공했다.
- [ ] 홈페이지가 HTTP 200으로 열리고 세 개의 강의 섹션이 보인다.
- [ ] 모바일 화면에서 가로 스크롤이나 겹침이 없다.
- [ ] Supabase는 개발 프로젝트를 사용한다.
- [ ] Supabase MCP를 특정 project ref와 읽기 전용으로 제한했거나 docs-only로 유지했다.
- [ ] 환경변수와 비밀값이 Git에 없다.
- [ ] 쓰기 작업의 수동 확인 설정을 직접 확인했다.
- [ ] 롤백할 이전 정상 배포 또는 복구 방법을 알고 있다.

## 공식 참고 자료

- [Vercel: GitHub 연결](https://vercel.com/docs/git/vercel-for-github)
- [Vercel: 배포 관리](https://vercel.com/docs/deployments/managing-deployments)
- [Supabase: 프로젝트 생성](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase MCP](https://supabase.com/docs/guides/ai-tools/mcp)
