import { expect, test } from "bun:test";
import { GET, POST } from "./route";

async function issueClientCookie() {
  const response = await GET(new Request("http://localhost/api/chat"));
  return response.headers.get("Set-Cookie")?.split(";")[0] || "";
}

function chatRequest(cookie: string, forwardedFor: string, text: string) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
      "X-Forwarded-For": forwardedFor,
    },
    body: JSON.stringify({ nickname: "다정한 고양이", text }),
  });
}

test("separate clients can send while one client cannot bypass the limit", async () => {
  const firstClient = await issueClientCookie();
  const secondClient = await issueClientCookie();

  expect(firstClient).not.toBe("");
  expect(secondClient).not.toBe(firstClient);
  expect((await POST(chatRequest(firstClient, "198.51.100.1", "첫 메시지"))).status).toBe(201);
  expect((await POST(chatRequest(secondClient, "198.51.100.1", "두 번째 메시지"))).status).toBe(201);
  expect((await POST(chatRequest(firstClient, "203.0.113.2", "반복 메시지"))).status).toBe(429);
});
