import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { parseChatInput } from "@/lib/chat";
import { ChatRateLimitError, chatStore } from "@/lib/chat-store";

export const runtime = "nodejs";

const CLIENT_COOKIE = "chat-client";
const CLIENT_SECRET = randomBytes(32);

function signature(clientId: string) {
  return createHmac("sha256", CLIENT_SECRET).update(clientId).digest("hex");
}

function validClientId(value: string | undefined) {
  if (!value) return undefined;

  const [clientId, suppliedSignature] = value.split(".");
  if (!clientId || !suppliedSignature || !/^[a-f0-9]{64}$/.test(suppliedSignature)) return undefined;

  const expected = Buffer.from(signature(clientId), "hex");
  const supplied = Buffer.from(suppliedSignature, "hex");
  return timingSafeEqual(expected, supplied) ? clientId : undefined;
}

function clientIdentity(request: Request) {
  const cookieValue = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CLIENT_COOKIE}=`))
    ?.slice(CLIENT_COOKIE.length + 1);
  const existingClientId = validClientId(cookieValue);

  if (existingClientId) return { clientId: existingClientId };

  const clientId = randomUUID();
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return {
    clientId,
    cookie: `${CLIENT_COOKIE}=${clientId}.${signature(clientId)}; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax${secure}`,
  };
}

function responseHeaders(cookie: string | undefined, cacheControl = false) {
  return {
    ...(cacheControl ? { "Cache-Control": "no-store" } : {}),
    ...(cookie ? { "Set-Cookie": cookie } : {}),
  };
}

export async function GET(request: Request) {
  const identity = clientIdentity(request);
  return Response.json(
    { messages: chatStore.list() },
    { headers: responseHeaders(identity.cookie, true) },
  );
}

export async function POST(request: Request) {
  const identity = clientIdentity(request);
  let input: ReturnType<typeof parseChatInput>;

  try {
    input = parseChatInput(await request.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : "잘못된 요청입니다.";
    return Response.json({ error: message }, { status: 400, headers: responseHeaders(identity.cookie) });
  }

  try {
    const message = chatStore.add(input, identity.clientId);

    return Response.json({ message }, { status: 201, headers: responseHeaders(identity.cookie) });
  } catch (error) {
    if (error instanceof ChatRateLimitError) {
      return Response.json({ error: error.message }, { status: 429, headers: responseHeaders(identity.cookie) });
    }

    return Response.json(
      { error: "메시지를 보내지 못했어요." },
      { status: 500, headers: responseHeaders(identity.cookie) },
    );
  }
}
