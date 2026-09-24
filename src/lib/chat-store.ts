import { CHAT_LIFETIME_MS, type ChatMessage } from "./chat";

const MAX_MESSAGES = 100;
const RATE_LIMIT_MS = 2_000;
const MAX_SENDS_PER_WINDOW = 10;

export class ChatRateLimitError extends Error {}

export function createChatStore() {
  let messages: ChatMessage[] = [];
  let lastSentAtByClient = new Map<string, number>();
  let recentSentAt: number[] = [];

  function activeMessages(now: number) {
    return messages.filter((message) => message.createdAt > now - CHAT_LIFETIME_MS);
  }

  return {
    list(now = Date.now()) {
      messages = activeMessages(now);
      return [...messages];
    },
    add(input: Pick<ChatMessage, "nickname" | "text">, clientId: string, now = Date.now()) {
      const lastSentAt = lastSentAtByClient.get(clientId);
      const activeSends = recentSentAt.filter((sentAt) => now - sentAt < RATE_LIMIT_MS);

      if (lastSentAt !== undefined && now - lastSentAt < RATE_LIMIT_MS) {
        throw new ChatRateLimitError("잠시 후 다시 보내 주세요.");
      }

      if (activeSends.length >= MAX_SENDS_PER_WINDOW) {
        throw new ChatRateLimitError("잠시 후 다시 보내 주세요.");
      }

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        ...input,
        createdAt: now,
      };

      messages = [...activeMessages(now), message].slice(-MAX_MESSAGES);
      lastSentAtByClient = new Map(
        [...lastSentAtByClient].filter(([, sentAt]) => now - sentAt < RATE_LIMIT_MS),
      );
      lastSentAtByClient.set(clientId, now);
      recentSentAt = [...activeSends, now];

      return message;
    },
  };
}

export const chatStore = createChatStore();
