# Git 시작 가이드

이 문서는 Git을 처음 쓰는 사람이 Windows 또는 macOS에서 설치를 마치고, GitHub의 저장소를 내려받아 안전하게 작업을 시작할 수 있도록 돕습니다.

## 먼저 알아둘 것

- **Git**은 내 컴퓨터에서 파일 변경 이력을 관리하는 도구입니다.
- **GitHub**는 Git 저장소를 인터넷에서 보관하고 협업하는 서비스입니다.
- Git을 설치했다고 GitHub 로그인이 끝난 것은 아닙니다. 설치, 사용자 정보 등록, GitHub 인증을 각각 진행해야 합니다.
- 비밀번호, API 키, `.env` 파일은 커밋하지 않습니다.
- 수강생은 원본 저장소에 직접 push할 권한이 없습니다. 먼저 자신의 GitHub 계정으로 fork해야 합니다.

## GitHub 계정 만들기

GitHub 계정이 없다면 다음 순서로 만듭니다.

1. [GitHub 가입](https://github.com/signup)을 엽니다.
2. 이메일, 비밀번호, 사용할 사용자 이름을 입력합니다.
3. 이메일로 받은 인증 코드를 입력합니다.
4. 로그인한 뒤 프로필 메뉴의 **Settings → Password and authentication**을 엽니다.
5. 다중 인증을 설정하고 복구 코드를 안전한 곳에 보관합니다.
6. 자신의 GitHub 사용자 이름을 메모합니다. 이후 `YOUR_GITHUB_ID` 자리에 사용합니다.

GitHub는 Git 저장소를 인터넷에 보관하는 서비스입니다. 이 가이드의 원본 저장소를 자신의 계정으로 복사하는 작업을 **fork**라고 합니다.

## Windows에서 설치하기

### 1. Git 설치

PowerShell을 열고 다음 명령을 실행합니다.

```powershell
winget install --id Git.Git -e --source winget
```

설치가 끝나면 열려 있던 PowerShell과 VS Code를 모두 닫았다가 다시 엽니다. 명령이 인식되는지 확인합니다.

```powershell
git --version
```

`git version 2.x.x`처럼 버전이 출력되면 완료입니다. `winget`을 사용할 수 없다면 [Git for Windows](https://gitforwindows.org/) 설치 프로그램을 사용하세요. 처음이라면 설치 프로그램의 기본 옵션을 유지해도 됩니다.

### 2. GitHub CLI 설치

GitHub 로그인을 브라우저로 안전하게 처리하기 위해 GitHub CLI를 권장합니다.

```powershell
winget install --id GitHub.cli -e --source winget
```

터미널을 다시 연 뒤 확인합니다.

```powershell
gh --version
```

## macOS에서 설치하기

### 1. Git 설치

가장 단순한 방법은 Apple의 Command Line Tools를 설치하는 것입니다.

```bash
xcode-select --install
```

안내 창에서 설치를 완료한 뒤 확인합니다.

```bash
git --version
```

Homebrew를 이미 사용하고 있다면 다음 방법도 가능합니다.

```bash
brew install git
```

### 2. GitHub CLI 설치

Homebrew가 설치돼 있다면 다음 명령을 실행합니다.

```bash
brew install gh
gh --version
```

Homebrew를 사용하지 않는다면 [GitHub CLI 설치 페이지](https://cli.github.com/)에서 macOS 설치 방법을 확인하세요.

## 공통 초기 설정

### 1. 커밋 작성자 등록

아래 예시를 자신의 이름과 GitHub 이메일로 바꿔 실행합니다. 공개 저장소에서 이메일을 숨기고 싶다면 GitHub의 `noreply` 이메일을 사용할 수 있습니다.

```bash
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL"
```

등록 결과를 확인합니다.

```bash
git config --global --list
```

### 2. 기본 브랜치를 main으로 설정

새 저장소의 기본 브랜치 이름을 `main`으로 통일합니다.

```bash
git config --global init.defaultBranch main
```

### 3. GitHub 로그인

다음 명령을 실행하고 화면의 선택지를 따릅니다.

```bash
gh auth login
```

처음이라면 다음 조합이 가장 간단합니다.

1. `GitHub.com`
2. `HTTPS`
3. 브라우저로 로그인
4. 표시된 일회용 코드를 GitHub 승인 화면에 입력

인증 상태를 확인합니다.

```bash
gh auth status
```

토큰 문자열을 문서나 소스 코드에 복사하지 마세요. `gh`가 운영체제의 안전한 자격 증명 저장소를 사용하도록 둡니다.

## Bun 설치하기

이 프로젝트는 Bun을 패키지 매니저로 사용합니다. 다른 패키지 매니저와 lockfile을 섞지 않습니다.

### Windows

PowerShell에서 Bun 공식 설치 스크립트를 실행합니다.

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### macOS

Terminal에서 Bun 공식 설치 스크립트를 실행합니다.

```bash
curl -fsSL https://bun.sh/install | bash
```

터미널을 다시 열고 확인합니다.

```bash
bun --version
```

이 저장소가 고정한 Bun 버전은 `1.3.8`입니다. 다른 버전이 출력되면 [공식 설치 문서](https://bun.sh/docs/installation)에서 업데이트 방법과 운영체제 요구사항을 확인하세요.

## 이 저장소 fork하고 시작하기

1. [원본 저장소](https://github.com/coolseaweed/vibecoding)를 엽니다.
2. 오른쪽 위 **Fork**를 눌러 자신의 GitHub 계정 아래에 복사합니다.
3. 아래의 `YOUR_GITHUB_ID`를 자신의 계정명으로 바꿔 실행합니다.


```bash
git clone https://github.com/YOUR_GITHUB_ID/vibecoding.git
cd vibecoding
git remote -v
bun install --frozen-lockfile
bun dev
```

`origin`이 `YOUR_GITHUB_ID/vibecoding`을 가리켜야 합니다. 원본의 업데이트도 받고 싶다면 upstream을 추가합니다.

```bash
git remote add upstream https://github.com/coolseaweed/vibecoding.git
git remote -v
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 매일 사용하는 기본 흐름

### 먼저 알아둘 용어

| 용어 | 뜻 |
| --- | --- |
| branch | 원본을 안전하게 유지하면서 작업하는 별도 작업 줄기 |
| origin | 내가 clone한 내 GitHub fork의 별명 |
| upstream | 원본 `coolseaweed/vibecoding` 저장소의 별명 |
| stage 또는 staged | 다음 커밋에 포함하기로 선택한 변경 |
| commit | 선택한 변경에 설명을 붙여 저장한 기록 |
| push | 내 컴퓨터의 커밋을 GitHub로 보내는 작업 |
| Pull Request | 작업 브랜치를 기본 브랜치에 합쳐 달라고 요청하는 화면 |

작업을 시작하기 전에 원격 변경을 받습니다.

```bash
git pull --ff-only
```

파일을 수정한 뒤 변경 내용을 확인합니다.

```bash
git status
git diff
```

첫 작업 브랜치 이름을 `first-page`로 정한 예시입니다.

```bash
git switch -c first-page
```

관련된 파일만 스테이징하고 커밋합니다. `git status`에 표시된 실제 파일 이름을 `README.md` 자리에 사용하세요.

```bash
git add README.md
git commit -m "변경 내용을 설명하는 메시지"
git push -u origin first-page
```

`git add .`은 의도하지 않은 파일까지 포함할 수 있습니다. 처음에는 `git status`에 나온 파일 이름을 복사해 직접 지정하세요. push가 끝나면 GitHub 저장소 화면에 나타나는 **Compare & pull request** 버튼으로 Pull Request를 만들 수 있습니다.

## 자주 쓰는 명령

| 명령 | 의미 |
| --- | --- |
| `git status` | 현재 브랜치와 변경 파일 확인 |
| `git diff` | 아직 스테이징하지 않은 변경 확인 |
| `git diff --staged` | 커밋될 변경 확인 |
| `git log --oneline -10` | 최근 커밋 10개 확인 |
| `git pull --ff-only` | 충돌을 숨기지 않고 원격 변경 받기 |
| `git switch -c 이름` | 새 브랜치를 만들고 이동 |
| `git push -u origin 이름` | 새 브랜치를 처음 push하고 upstream 설정 |
| `git restore 파일` | 커밋하지 않은 파일 변경 되돌리기 |

`git restore`는 변경을 잃을 수 있습니다. 되돌릴 파일이 정확한지 `git diff`로 먼저 확인하세요.

## 문제 해결

### git 명령을 찾을 수 없음

- 설치 후 터미널과 편집기를 완전히 재시작합니다.
- Windows에서는 시작 메뉴의 **Git Bash**에서도 `git --version`을 확인합니다.
- macOS에서는 `xcode-select --install` 완료 여부를 확인합니다.

### push할 때 인증 실패

```bash
gh auth status
gh auth login
```

회사 계정과 개인 계정을 함께 쓴다면 현재 활성 계정을 반드시 확인하세요.

### pull할 때 충돌 발생

추가 명령으로 덮어쓰지 말고 먼저 다음 정보를 저장합니다.

```bash
git status
git diff
```

충돌 표시가 있는 파일을 직접 해결하거나, 팀원에게 위 두 명령의 출력을 공유해 도움을 요청하세요. 원인을 모르는 상태에서 `reset --hard`나 강제 push를 사용하지 않습니다.

## 완료 체크리스트

- [ ] `git --version`이 출력된다.
- [ ] `git config --global user.name`과 `user.email`이 올바르다.
- [ ] `gh auth status`에서 원하는 GitHub 계정이 표시된다.
- [ ] 원본을 내 GitHub 계정으로 fork했다.
- [ ] 내 fork를 clone하고 `origin`이 내 계정을 가리킨다.
- [ ] `bun install --frozen-lockfile`을 완료했다.
- [ ] `bun dev`로 로컬 웹사이트를 열었다.
- [ ] `.env`나 비밀값을 커밋하지 않는다는 원칙을 이해했다.

## 공식 참고 자료

- [Git 설치](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Git 최초 설정](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
- [GitHub CLI 시작하기](https://docs.github.com/en/github-cli/github-cli/quickstart)
- [GitHub 이메일 공개 범위 관리](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)
