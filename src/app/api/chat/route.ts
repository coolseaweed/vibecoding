import { parseChatInput } from "@/lib/chat";
import { ChatRateLimitError, chatStore } from "@/lib/chat-store";

export const runtime = "nodejs";

export async function GET() {
  return Response.json({ messages: chatStore.list() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let input: ReturnType<typeof parseChatInput>;

  try {
    input = parseChatInput(await request.json());
  } catch (error) {
    const message = error instanceof Error ? error.message : "잘못된 요청입니다.";
    return Response.json({ error: message }, { status: 400 });
  }

  try {
    const clientId = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const message = chatStore.add(input, clientId);

    return Response.json({ message }, { status: 201 });
  } catch (error) {
    if (error instanceof ChatRateLimitError) {
      return Response.json({ error: error.message }, { status: 429 });
    }

    return Response.json({ error: "메시지를 보내지 못했어요." }, { status: 500 });
  }
}
