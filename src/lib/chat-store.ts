import { CHAT_LIFETIME_MS, type ChatMessage } from "./chat";

const MAX_MESSAGES = 100;
const RATE_LIMIT_MS = 2_000;

export class ChatRateLimitError extends Error {}

export function createChatStore() {
  let messages: ChatMessage[] = [];
  let lastSentAt = new Map<string, number>();

  function activeMessages(now: number) {
    return messages.filter((message) => message.createdAt > now - CHAT_LIFETIME_MS);
  }

  return {
    list(now = Date.now()) {
      messages = activeMessages(now);
      return [...messages];
    },
    add(input: Pick<ChatMessage, "nickname" | "text">, clientId: string, now = Date.now()) {
      const previousSentAt = lastSentAt.get(clientId);

      if (previousSentAt !== undefined && now - previousSentAt < RATE_LIMIT_MS) {
        throw new ChatRateLimitError("잠시 후 다시 보내 주세요.");
      }

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: now,
      };

      messages = [...activeMessages(now), message].slice(-MAX_MESSAGES);
      lastSentAt = new Map([...lastSentAt].filter(([, sentAt]) => now - sentAt < RATE_LIMIT_MS));
      lastSentAt.set(clientId, now);

      return message;
    },
  };
}

export const chatStore = createChatStore();
