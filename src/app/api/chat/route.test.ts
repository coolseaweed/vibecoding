import { expect, test } from "bun:test";
import { POST } from "./route";

function chatRequest(forwardedFor: string, text: string) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": forwardedFor,
    },
    body: JSON.stringify({ nickname: "다정한 고양이", text }),
  });
}

test("forged forwarding headers cannot bypass the send limit", async () => {
  expect((await POST(chatRequest("198.51.100.1", "첫 메시지"))).status).toBe(201);
  expect((await POST(chatRequest("203.0.113.2", "두 번째 메시지"))).status).toBe(429);
});
