import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const content = await readFile(path.join(process.cwd(), "llms.txt"), "utf8");
  return new Response(content, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
