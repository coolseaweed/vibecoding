import { describe, expect, test } from "bun:test";
import { CHAT_LIFETIME_MS } from "./chat";
import { ChatRateLimitError, createChatStore } from "./chat-store";

describe("in-memory chat store", () => {
  test("shares new messages within one server instance", () => {
    const store = createChatStore();
    const message = store.add({ nickname: "다정한 고양이", text: "안녕하세요" }, 1_000);

    expect(store.list(1_001)).toEqual([message]);
  });

  test("removes messages after 24 hours", () => {
    const store = createChatStore();
    store.add({ nickname: "다정한 고양이", text: "곧 사라져요" }, 1_000);

    expect(store.list(1_000 + CHAT_LIFETIME_MS)).toEqual([]);
  });

  test("keeps only the latest 100 messages", () => {
    const store = createChatStore();

    for (let index = 0; index < 101; index += 1) {
      store.add({ nickname: "다정한 고양이", text: `메시지 ${index}` }, index * 3_000);
    }

    const messages = store.list(303_000);
    expect(messages).toHaveLength(100);
    expect(messages[0]?.text).toBe("메시지 1");
  });

  test("limits repeated sends across the server instance", () => {
    const store = createChatStore();
    store.add({ nickname: "다정한 고양이", text: "첫 메시지" }, 1_000);

    expect(() => store.add({ nickname: "다정한 고양이", text: "두 번째" }, 2_999)).toThrow(
      ChatRateLimitError,
    );
    expect(() => store.add({ nickname: "다정한 고양이", text: "두 번째" }, 3_000)).not.toThrow();
  });
});
