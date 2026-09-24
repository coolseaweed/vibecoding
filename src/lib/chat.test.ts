import { describe, expect, test } from "bun:test";
import { CHAT_LIFETIME_MS, parseChatInput } from "./chat";

describe("parseChatInput", () => {
  test("trims a valid nickname and message", () => {
    expect(parseChatInput({ nickname: "  익명 해달  ", text: "  안녕하세요  " })).toEqual({
      nickname: "익명 해달",
      text: "안녕하세요",
    });
  });

  test.each([
    [{ nickname: "익명 해달", text: "   " }, "메시지를 입력해 주세요."],
    [{ nickname: "", text: "안녕하세요" }, "닉네임을 확인해 주세요."],
    [{ nickname: "가".repeat(21), text: "안녕하세요" }, "닉네임을 확인해 주세요."],
    [{ nickname: "익명 해달", text: "가".repeat(501) }, "메시지는 500자까지 입력할 수 있어요."],
  ])("rejects invalid input", (input, message) => {
    expect(() => parseChatInput(input)).toThrow(message);
  });

  test("rejects non-object input", () => {
    expect(() => parseChatInput(null)).toThrow("잘못된 요청입니다.");
  });
});

test("chat messages live for exactly 24 hours", () => {
  expect(CHAT_LIFETIME_MS).toBe(24 * 60 * 60 * 1000);
});
