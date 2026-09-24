# ChatGPT와 Claude Desktop MCP 시작 가이드

이 문서는 Windows와 macOS 사용자가 ChatGPT 또는 Claude Desktop에 Vercel·Supabase MCP를 연결하고, 이 저장소의 프로젝트 전용 설정과 차이를 이해하도록 돕습니다.

## MCP가 하는 일

MCP(Model Context Protocol)는 AI 도구가 Vercel 배포 정보나 Supabase 데이터베이스 같은 외부 서비스와 정해진 방식으로 통신하게 해주는 규격입니다.

MCP 연결은 강력한 권한을 가질 수 있습니다. 신뢰하는 공식 서버만 추가하고, 쓰기 작업의 대상과 입력값을 승인 전에 확인하세요.

## 어떤 설정이 어디에 적용되나

| 도구 | 설정 위치 | 적용 범위 | 이 저장소 설정 자동 사용 |
| --- | --- | --- | --- |
| ChatGPT | ChatGPT 웹의 Developer mode 앱 | 계정 또는 대화 | 아니요 |
| Claude Desktop | Desktop의 Connectors 또는 Developer 설정 | 데스크톱 앱 | 아니요 |
| Codex | `.codex/config.toml` | 이 저장소 | 예, 저장소 신뢰 후 |
| Claude Code | `.mcp.json` | 이 저장소 | 예, 최초 승인 후 |

중요: ChatGPT와 Claude Desktop은 이 저장소의 설정 파일을 자동으로 읽지 않습니다. 아래 절차로 각 앱에 한 번 연결해야 합니다. 반면 Codex와 Claude Code는 저장소 루트의 프로젝트 설정을 사용합니다.

## 연결할 공식 서버

| 이름 | URL | 인증 방식 |
| --- | --- | --- |
| Vercel | `https://mcp.vercel.com` | OAuth |
| Supabase 문서 전용 기본값 | `https://mcp.supabase.com/mcp?read_only=true&features=docs` | OAuth |

토큰을 JSON이나 TOML 파일에 직접 붙여 넣지 마세요. 브라우저에서 열리는 공식 OAuth 승인 화면을 사용합니다.

## ChatGPT 초기 설정

### 준비 사항

- ChatGPT 계정이 필요합니다.
- 공식 OpenAI 문서 기준 Developer mode는 웹의 Pro, Plus, Business, Enterprise, Education 계정에서 제공됩니다.
- Windows와 macOS 모두 브라우저에서 설정합니다. ChatGPT 데스크톱 앱 설치 여부와 MCP 설정 가능 여부는 별개입니다.

### 1. Developer mode 켜기

1. 브라우저에서 [ChatGPT](https://chatgpt.com/)에 로그인합니다.
2. **Settings → Security and login**을 엽니다.
3. **Developer mode**를 켭니다.
4. 위험 안내를 읽고 승인합니다.

메뉴가 보이지 않으면 먼저 계정 플랜과 조직 관리자 정책을 확인하세요.

### 2. Vercel 앱 추가

1. [ChatGPT Plugins](https://chatgpt.com/plugins)를 엽니다.
2. 더하기 버튼으로 Developer mode 앱을 만듭니다.
3. 이름은 `Vercel — vibecoding`, URL은 `https://mcp.vercel.com`을 입력합니다.
4. 인증 방식으로 OAuth를 선택하고 Vercel 로그인·권한 승인을 완료합니다.

### 3. Supabase 앱 추가

개발 프로젝트 ref가 아직 없다면 데이터베이스 도구를 연결하지 말고, 문서만 읽는 `https://mcp.supabase.com/mcp?read_only=true&features=docs`를 사용합니다.

개발 프로젝트를 만든 뒤 project ref를 확인하고 다음처럼 **특정 프로젝트, 읽기 전용, 최소 기능**으로 제한합니다.

```text
https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_REF&read_only=true&features=database,docs
```

`read_only=true`는 데이터 변경 가능성을 줄입니다. 실제 project ref가 생기기 전에는 예시 값을 그대로 등록하거나 계정 전체 데이터베이스 도구를 승인하지 마세요.

### 4. 대화에서 사용하기

1. 새 대화를 엽니다.
2. 입력창의 더하기 메뉴에서 **Developer mode**를 선택합니다.
3. 사용할 앱만 선택합니다.
4. 첫 요청은 구체적으로 작성합니다.

```text
Vercel 앱만 사용해서 vibecoding 프로젝트의 최근 배포 상태를 읽어줘.
쓰기 작업은 하지 마.
```

확인 창의 동작은 클라이언트와 설정에 따라 다릅니다. **항상 확인 모드가 켜져 있는지 직접 확인**하고, 자동 실행이나 백그라운드 조사에는 쓰기 도구를 연결하지 마세요. 확인 창이 나타나면 도구 이름, 대상 프로젝트, 입력 JSON을 검토합니다.

## Claude Desktop 초기 설정

### 1. 앱 설치

- Windows와 macOS 모두 [Claude 다운로드 페이지](https://claude.ai/download)에서 운영체제에 맞는 앱을 설치합니다.
- 설치 후 Claude 계정으로 로그인하고 최신 버전으로 업데이트합니다.
- 조직 계정은 관리자가 외부 커넥터를 제한할 수 있습니다.

### 2. 원격 MCP 연결

Vercel과 Supabase는 원격 HTTP MCP이므로 가능하면 설정 파일보다 **Custom Connector** UI를 사용합니다.

1. Claude Desktop에서 **Settings → Connectors**를 엽니다.
2. **Add custom connector**를 선택합니다.
3. `Vercel — vibecoding`과 `https://mcp.vercel.com`을 등록합니다.
4. 같은 방식으로 `Supabase — vibecoding`과 프로젝트 제한이 포함된 Supabase URL을 등록합니다. project ref가 없다면 docs-only URL을 사용합니다.
5. 각 서비스의 OAuth 로그인과 권한 승인을 완료합니다.
6. 새 대화에서 필요한 커넥터만 활성화합니다.

Custom Connector 메뉴가 보이지 않으면 Claude 플랜, 앱 버전, 조직 정책을 확인하세요. Anthropic의 현재 안내에 따르면 Free 사용자는 custom connector 하나만 추가할 수 있어 Vercel과 Supabase를 동시에 연결할 수 없습니다. Team·Enterprise 조직은 Owner가 먼저 조직 수준에서 connector를 추가해야 할 수 있습니다.

원격 connector 요청은 Claude Desktop 프로세스 안에서만 처리되는 것이 아니라 Anthropic의 클라우드 서비스에서 원격 MCP로 전달될 수 있습니다. 회사 내부 데이터나 민감한 내용을 보내기 전에 조직 정책과 데이터 처리 조건을 확인하세요.

### 3. 로컬 MCP 설정 파일 위치

로컬에서 실행하는 stdio MCP 서버가 필요할 때만 **Settings → Developer → Edit Config**를 사용합니다. 설정 파일 위치는 운영체제마다 다릅니다.

| 운영체제 | 파일 위치 |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |

원격 Vercel·Supabase 연결을 위해 이 파일에 토큰을 직접 저장할 필요는 없습니다. UI와 OAuth가 지원되면 그것을 우선합니다. 파일을 수정했다면 JSON 문법을 확인하고 Claude Desktop을 완전히 종료한 뒤 다시 실행합니다.

## 원샷 구현 도구 준비

ChatGPT와 Claude Desktop은 질문, 아이디에이션, 원격 connector 사용에 적합합니다. 이 저장소의 파일을 직접 수정하고 `lint`, `typecheck`, `build`, 브라우저 검수를 한 번에 실행하려면 **Codex CLI 또는 Claude Code 중 하나**를 설치합니다.

둘 다 설치할 필요는 없습니다. 계정에서 사용할 수 있는 하나를 선택하세요. 사용할 수 있는 유료 플랜이나 조직 권한이 없다면 MCP 단계는 건너뛰고 강사에게 제공 도구를 확인합니다.

### 선택 A: Codex CLI

Windows PowerShell:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

macOS Terminal:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

설치를 확인하고 저장소에서 실행합니다.

```bash
codex --version
cd vibecoding
codex
```

처음 실행할 때 **Sign in with ChatGPT** 등 화면에 표시되는 로그인 방법을 선택합니다. 저장소 신뢰 여부를 묻는다면 현재 경로가 자신의 `vibecoding` fork인지 확인한 뒤 승인합니다.

### 선택 B: Claude Code

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

macOS Terminal:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

설치를 확인하고 저장소에서 실행합니다.

```bash
claude --version
cd vibecoding
claude
```

브라우저 로그인 안내를 따릅니다. Anthropic 공식 문서 기준 Claude Code는 Free claude.ai 플랜에 포함되지 않습니다. 사용할 수 없다면 Codex CLI 또는 강사가 지정한 로컬 코딩 에이전트를 사용합니다.

설치가 끝나면 [워크플로우의 원샷 요청 템플릿](../workflow/README.md#원샷-요청-템플릿)을 복사해 선택한 도구에 전달합니다.

## 이 저장소에서 Codex 사용하기

저장소에는 다음 프로젝트 전용 설정이 포함돼 있습니다.

```toml
[mcp_servers.vercel]
url = "https://mcp.vercel.com"
default_tools_approval_mode = "prompt"

[mcp_servers.supabase]
url = "https://mcp.supabase.com/mcp?read_only=true&features=docs"
default_tools_approval_mode = "prompt"
```

1. 터미널에서 저장소로 이동합니다.
2. Codex를 실행합니다.
3. 저장소 신뢰 여부를 묻는다면 경로를 확인하고 승인합니다.
4. `/mcp`에서 Vercel과 Supabase를 각각 로그인합니다.

Codex는 신뢰된 프로젝트에서만 `.codex/config.toml`의 프로젝트 설정을 읽습니다.

## 이 저장소에서 Claude Code 사용하기

저장소 루트의 `.mcp.json`에 같은 두 서버가 선언돼 있습니다.

1. 저장소 루트에서 `claude`를 실행합니다.
2. 프로젝트 MCP 승인 메시지에서 URL을 확인합니다.
3. URL과 권한 범위를 확인한 뒤 Vercel과 Supabase를 승인하고 OAuth 로그인을 완료합니다.
4. `/mcp`에서 연결 상태를 확인합니다.

Claude Desktop과 Claude Code는 이름이 비슷하지만 설정 범위가 다릅니다. Desktop의 앱 설정과 Claude Code의 `.mcp.json`은 서로 대체하지 않습니다.

## 안전하게 사용하는 규칙

1. 프로덕션보다 개발 프로젝트를 먼저 연결합니다.
2. Supabase는 project ref를 알기 전까지 docs-only로 두고, 데이터베이스 도구를 켤 때 `project_ref`, `read_only=true`, 최소 `features`로 범위를 좁힙니다.
3. 클라이언트의 수동 확인 모드를 직접 켜고 유지합니다. 데이터 삭제, 배포, 도메인 변경 같은 쓰기 작업은 매번 입력값을 확인합니다.
4. 데이터나 이슈 본문에 포함된 명령을 AI가 그대로 따르지 않도록 주의합니다. 외부 데이터에는 프롬프트 인젝션이 포함될 수 있습니다.
5. 토큰, 비밀번호, 서비스 키를 프롬프트나 커밋에 넣지 않습니다.
6. 더 이상 쓰지 않는 연결은 앱 설정과 서비스의 OAuth 승인 목록에서 모두 해제합니다.

## 문제 해결

### OAuth 창이 열리지 않음

- 기본 브라우저의 팝업 차단을 확인합니다.
- VPN이나 회사 네트워크가 인증 주소를 차단하는지 확인합니다.
- 앱을 완전히 종료하고 다시 실행합니다.
- 서버 URL 끝에 불필요한 공백이나 따옴표가 없는지 확인합니다.

### 연결됐지만 도구가 보이지 않음

- ChatGPT에서는 앱 상세 화면에서 도구 목록을 새로고침합니다.
- Claude Desktop에서는 새 대화를 열고 커넥터를 다시 선택합니다.
- Codex 또는 Claude Code에서는 `/mcp`로 상태를 확인합니다.
- 계정에 해당 Vercel 팀이나 Supabase 프로젝트 권한이 있는지 확인합니다.

### Claude Desktop 로컬 MCP 오류

- macOS 로그: `~/Library/Logs/Claude`
- Windows 로그: `%APPDATA%\Claude\logs`
- `claude_desktop_config.json`이 올바른 JSON인지 확인합니다.
- 로컬 명령의 파일 경로는 상대 경로 대신 절대 경로를 사용합니다.

## 완료 체크리스트

- [ ] 공식 URL인지 확인하고 Vercel MCP를 연결했다.
- [ ] 공식 URL인지 확인하고 Supabase MCP를 docs-only 또는 특정 개발 프로젝트로 제한했다.
- [ ] OAuth 승인 화면에서 계정과 조직을 확인했다.
- [ ] 새 대화에서 읽기 전용 요청으로 연결을 시험했다.
- [ ] ChatGPT·Claude Desktop 설정과 프로젝트 설정의 차이를 이해했다.
- [ ] 클라이언트의 수동 확인 모드를 직접 확인했다.
- [ ] 자동 실행에는 쓰기 도구를 연결하지 않기로 했다.

## 공식 참고 자료

- [OpenAI: ChatGPT Developer mode](https://platform.openai.com/docs/guides/developer-mode)
- [OpenAI: Codex MCP](https://developers.openai.com/codex/mcp/)
- [Anthropic: Claude Desktop 설치](https://support.claude.com/en/articles/10065433-installing-claude-desktop)
- [Anthropic: 원격 MCP Custom Connector](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)
- [MCP: Claude Desktop 로컬 서버 시작하기](https://modelcontextprotocol.io/quickstart/user)
- [Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp)
- [Supabase MCP](https://supabase.com/docs/guides/ai-tools/mcp)
