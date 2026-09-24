import ChatRoom from "./chat-room";

function GitVisual() {
  return (
    <svg viewBox="0 0 320 176" role="img" aria-label="내 컴퓨터의 변경을 커밋해 GitHub에 저장하는 흐름">
      <rect className="visual-node" x="18" y="56" width="82" height="62" rx="10" />
      <text x="59" y="83" textAnchor="middle">MY PC</text>
      <text className="visual-small" x="59" y="101" textAnchor="middle">files</text>
      <path className="visual-line" d="M100 87H136" />
      <path className="visual-arrow" d="m132 80 9 7-9 7" />
      <circle className="visual-dot" cx="160" cy="87" r="22" />
      <text className="visual-small visual-invert" x="160" y="91" textAnchor="middle">commit</text>
      <path className="visual-line" d="M182 87H218" />
      <path className="visual-arrow" d="m214 80 9 7-9 7" />
      <rect className="visual-node visual-accent" x="222" y="44" width="80" height="86" rx="10" />
      <circle className="visual-branch" cx="244" cy="74" r="5" />
      <circle className="visual-branch" cx="280" cy="74" r="5" />
      <path className="visual-branch-line" d="M244 79v18c0 8 7 12 14 12h22V79" />
      <text className="visual-small" x="262" y="121" textAnchor="middle">GITHUB</text>
    </svg>
  );
}

function VercelVisual() {
  return (
    <svg viewBox="0 0 320 176" role="img" aria-label="GitHub 코드가 빌드되어 웹 주소로 배포되는 흐름">
      <rect className="visual-node" x="16" y="58" width="76" height="58" rx="10" />
      <text className="visual-small" x="54" y="91" textAnchor="middle">GITHUB</text>
      <path className="visual-line" d="M92 87h42" />
      <path className="visual-arrow" d="m130 80 9 7-9 7" />
      <rect className="visual-node visual-dark" x="140" y="45" width="64" height="84" rx="10" />
      <path className="visual-triangle" d="m172 63 17 31h-34z" />
      <text className="visual-small visual-invert" x="172" y="116" textAnchor="middle">BUILD</text>
      <path className="visual-line" d="M204 87h39" />
      <path className="visual-arrow" d="m239 80 9 7-9 7" />
      <rect className="visual-browser" x="249" y="55" width="55" height="65" rx="8" />
      <path className="visual-line thin" d="M249 72h55" />
      <circle className="visual-window-dot" cx="259" cy="64" r="2" />
      <circle className="visual-window-dot" cx="267" cy="64" r="2" />
      <text className="visual-small" x="277" y="94" textAnchor="middle">URL</text>
    </svg>
  );
}

function SupabaseVisual() {
  return (
    <svg viewBox="0 0 320 176" role="img" aria-label="앱이 Supabase의 로그인 데이터베이스 파일 저장소를 사용하는 구조">
      <rect className="visual-node visual-dark" x="20" y="56" width="72" height="64" rx="10" />
      <text className="visual-invert" x="56" y="92" textAnchor="middle">APP</text>
      <path className="visual-line" d="M92 88h47M139 88V38M139 88v50" />
      <path className="visual-line" d="M139 38h34M139 88h34M139 138h34" />
      <rect className="visual-node visual-green" x="174" y="18" width="126" height="40" rx="9" />
      <rect className="visual-node visual-green" x="174" y="68" width="126" height="40" rx="9" />
      <rect className="visual-node visual-green" x="174" y="118" width="126" height="40" rx="9" />
      <text className="visual-small" x="237" y="43" textAnchor="middle">AUTH</text>
      <text className="visual-small" x="237" y="93" textAnchor="middle">DATABASE</text>
      <text className="visual-small" x="237" y="143" textAnchor="middle">STORAGE</text>
    </svg>
  );
}

function McpVisual() {
  return (
    <svg viewBox="0 0 320 176" role="img" aria-label="AI 에이전트가 MCP를 통해 Vercel과 Supabase 도구에 연결되는 구조">
      <rect className="visual-node visual-dark" x="16" y="56" width="78" height="64" rx="10" />
      <text className="visual-invert" x="55" y="84" textAnchor="middle">AI</text>
      <text className="visual-small visual-invert" x="55" y="102" textAnchor="middle">AGENT</text>
      <path className="visual-line" d="M94 88h40" />
      <circle className="visual-dot visual-blue" cx="160" cy="88" r="27" />
      <text className="visual-small visual-invert" x="160" y="92" textAnchor="middle">MCP</text>
      <path className="visual-line" d="M187 88h28M215 88V52M215 88v36M215 52h18M215 124h18" />
      <rect className="visual-node" x="234" y="31" width="70" height="42" rx="9" />
      <rect className="visual-node visual-green" x="234" y="103" width="70" height="42" rx="9" />
      <text className="visual-small" x="269" y="57" textAnchor="middle">VERCEL</text>
      <text className="visual-small" x="269" y="129" textAnchor="middle">SUPABASE</text>
    </svg>
  );
}

const concepts = [
  { name: "Git", description: "코드의 변경 이력을 저장하고 GitHub로 공유합니다.", visual: <GitVisual /> },
  { name: "Vercel", description: "GitHub의 코드를 빌드해 접속 가능한 웹 주소로 배포합니다.", visual: <VercelVisual /> },
  { name: "Supabase", description: "앱에 필요한 로그인, 데이터베이스, 파일 저장소를 제공합니다.", visual: <SupabaseVisual /> },
  { name: "MCP", description: "AI 에이전트가 Vercel과 Supabase 도구를 사용하는 연결 규칙입니다.", visual: <McpVisual /> },
];

const flow = [
  { number: "01", title: "Plan.md", body: "목표, 범위, 완료 기준을 한 파일에 적습니다." },
  { number: "02", title: "goal", body: <>Codex 대화창에 <code>Plan.md를 읽고 goal로 실행해</code>라고 입력합니다.</> },
  { number: "03", title: "오래 실행", body: "Codex가 완료 기준까지 구현과 확인을 반복합니다." },
  { number: "04", title: "검수", body: "코드, 브라우저, 배포 결과를 직접 확인합니다." },
];

const setups = [
  {
    os: "Windows",
    mark: "⊞",
    terminal: "PowerShell",
    tools: <>설치 파일은 <a href="https://git-scm.com/download/win" target="_blank" rel="noreferrer">Git for Windows</a>와 <a href="https://code.visualstudio.com/download" target="_blank" rel="noreferrer">VS Code Stable</a>만 사용합니다.</>,
    commands: [
      'powershell -c "irm bun.sh/install.ps1|iex"',
      'powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"',
      "irm https://claude.ai/install.ps1 | iex",
    ],
  },
  {
    os: "macOS",
    mark: "●",
    terminal: "Terminal",
    tools: <><code>git --version</code>을 실행해 안내되는 Git을 설치하고, <a href="https://code.visualstudio.com/download" target="_blank" rel="noreferrer">VS Code Stable</a>을 Applications에 넣습니다. VS Code 명령 팔레트에서 <b>Shell Command: Install &apos;code&apos; command in PATH</b>를 한 번 실행합니다.</>,
    commands: [
      "curl -fsSL https://bun.com/install | bash",
      "curl -fsSL https://chatgpt.com/codex/install.sh | sh",
      "curl -fsSL https://claude.ai/install.sh | bash",
    ],
  },
];

const projectCommands = [
  "cd vibecoding",
  "bun install --frozen-lockfile",
  "code .",
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">VIBE CODING STARTER</p>
        <h1>바이브코딩 시작 구조</h1>
        <p>환경을 한 번 설정하고, 네 가지 연결과 하나의 코딩 플로우만 익힙니다.</p>
      </section>

      <section className="setup-section" id="setup" aria-labelledby="setup-title">
        <div className="section-title">
          <span>00</span>
          <div>
            <h2 id="setup-title">환경셋업: 이것만 따라하세요</h2>
            <p>VS Code Stable과 기본 터미널만 사용합니다. 다른 설치 방법은 선택하지 않습니다.</p>
          </div>
        </div>
        <div className="setup-grid">
          {setups.map((setup) => (
            <article className="setup-card" key={setup.os}>
              <header>
                <span>{setup.mark}</span>
                <div>
                  <h3>{setup.os}</h3>
                  <p>{setup.terminal} 기준</p>
                </div>
              </header>
              <ol>
                <li>
                  <strong>1. 계정 만들기</strong>
                  <p><a href="https://github.com/signup" target="_blank" rel="noreferrer">GitHub</a> 계정을 만들고 <a href="https://vercel.com/signup" target="_blank" rel="noreferrer">Vercel</a>과 <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">Supabase</a>는 <b>Continue with GitHub</b>로 가입합니다. <a href="https://chatgpt.com" target="_blank" rel="noreferrer">ChatGPT</a>와 <a href="https://claude.ai" target="_blank" rel="noreferrer">Claude</a> 계정도 준비합니다.</p>
                </li>
                <li>
                  <strong>2. Git · VS Code · AI 도구 설치</strong>
                  <p>{setup.tools}</p>
                  <pre><code>{setup.commands.join("\n")}</code></pre>
                </li>
                <li>
                  <strong>3. 터미널 다시 열고 확인</strong>
                  <p>열려 있는 {setup.terminal}을 모두 닫고 새로 엽니다. <code>git --version</code>, <code>bun --version</code>, <code>codex --version</code>, <code>claude --version</code>, <code>code --version</code>이 모두 버전을 출력해야 합니다.</p>
                </li>
                <li>
                  <strong>4. 프로젝트 받기</strong>
                  <p><a href="https://github.com/coolseaweed/vibecoding" target="_blank" rel="noreferrer">이 저장소</a>에서 <b>Fork</b>를 누릅니다. 내 Fork의 <b>Code → HTTPS</b> 주소를 복사한 뒤, 터미널에 <code>git clone </code>을 입력하고 주소를 붙여넣습니다.</p>
                  <pre><code>{projectCommands.join("\n")}</code></pre>
                </li>
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="concept-section" id="core" aria-labelledby="core-title">
        <div className="section-title">
          <span>01</span>
          <div>
            <h2 id="core-title">네 가지 핵심 개념</h2>
            <p>코드가 저장되고, 배포되고, 데이터를 사용하고, AI와 연결되는 구조입니다.</p>
          </div>
        </div>
        <div className="concept-grid">
          {concepts.map((concept) => (
            <article className="concept-card" key={concept.name}>
              <figure>{concept.visual}</figure>
              <h3>{concept.name}</h3>
              <p>{concept.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-section" id="flow" aria-labelledby="flow-title">
        <div className="section-title flow-heading">
          <span>02</span>
          <div>
            <h2 id="flow-title">코딩을 시작하는 방법</h2>
            <p>Plan.md를 기준으로 실행하고, 검수에서 끝냅니다.</p>
          </div>
        </div>
        <ol className="flow-list">
          {flow.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="chat-section" id="chat" aria-labelledby="chat-title">
        <div className="section-title">
          <span>03</span>
          <div>
            <h2 id="chat-title">수강생 익명 채팅</h2>
            <p>랜덤 닉네임으로 수업 중 질문과 유용한 링크를 가볍게 나눕니다.</p>
          </div>
        </div>
        <ChatRoom />
      </section>
    </main>
  );
}
