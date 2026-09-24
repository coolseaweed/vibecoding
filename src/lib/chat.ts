import { z } from "zod";

export const CHAT_LIFETIME_MS = 24 * 60 * 60 * 1000;

const chatInputSchema = z.object({
  nickname: z.string({ error: "닉네임을 확인해 주세요." }).trim().min(1, "닉네임을 확인해 주세요.").max(20, "닉네임을 확인해 주세요."),
  text: z.string({ error: "메시지를 입력해 주세요." }).trim().min(1, "메시지를 입력해 주세요.").max(500, "메시지는 500자까지 입력할 수 있어요."),
});

export type ChatMessage = {
  id: string;
  nickname: string;
  text: string;
  createdAt: number;
};

export function parseChatInput(input: unknown) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("잘못된 요청입니다.");
  }

  const result = chatInputSchema.safeParse(input);
  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || "잘못된 요청입니다.");
  }

  return result.data;
}
