# 환경 연결 Doctor

이 문서는 Git, Vercel, Supabase, MCP 연결 상태를 읽기 전용으로 진단하는 단일 기준(SSOT)입니다. 진단 중에는 설치, 로그인, 프로젝트 연결, 설정 변경을 하지 않습니다.

## Git

- [ ] `gh auth status`가 사용할 GitHub 계정을 표시합니다.
- [ ] `git remote get-url origin`이 사용자의 저장소를 가리키고 `git ls-remote origin HEAD`가 성공합니다.

## Vercel

- [ ] `vercel whoami`가 사용할 계정을 표시합니다.
- [ ] `.vercel/project.json`의 프로젝트를 `vercel project ls`에서도 확인할 수 있습니다.

## Supabase

- [ ] `supabase projects list`가 사용할 계정의 프로젝트를 표시합니다.
- [ ] `supabase/.temp/project-ref`가 존재하고 목록의 연결 대상 project ref와 일치합니다.

## MCP

- [ ] 현재 에이전트에서 Vercel MCP와 Supabase MCP가 인증 오류 없이 열립니다.
- [ ] 각 MCP의 읽기 전용 호출이 성공하고 응답의 프로젝트 식별자가 위 Vercel·Supabase 연결 대상과 일치합니다.

## 판정

각 항목을 `PASS`, `FAIL`, `미확인`으로 판정하고 명령 결과, 설정 파일 경로 또는 MCP 응답을 증거로 남깁니다. 비밀값은 출력하지 않습니다. 모든 항목에 증거가 있을 때만 전체 `PASS`입니다.
