export const CHAT_LIFETIME_MS = 24 * 60 * 60 * 1000;

export type ChatMessage = {
  id: string;
  nickname: string;
  text: string;
  createdAt: number;
};

export function parseChatInput(input: unknown) {
  if (!input || typeof input !== "object") {
    throw new Error("잘못된 요청입니다.");
  }

  const { nickname, text } = input as Record<string, unknown>;
  const trimmedNickname = typeof nickname === "string" ? nickname.trim() : "";
  const trimmedText = typeof text === "string" ? text.trim() : "";

  if (!trimmedNickname || trimmedNickname.length > 20) {
    throw new Error("닉네임을 확인해 주세요.");
  }

  if (!trimmedText) {
    throw new Error("메시지를 입력해 주세요.");
  }

  if (trimmedText.length > 500) {
    throw new Error("메시지는 500자까지 입력할 수 있어요.");
  }

  return { nickname: trimmedNickname, text: trimmedText };
}
