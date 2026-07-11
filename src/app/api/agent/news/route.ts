import { getAllArticles } from "@/lib/markdown";
import { withPayment } from "@/lib/x402";
import { AGENT_RESOURCES } from "@/lib/agent-resources";

export const runtime = "nodejs";

const resource = AGENT_RESOURCES.find((r) => r.path === "/api/agent/news")!;

/**
 * Agent-only news index, gated by x402. Just the table of contents (title,
 * date, excerpt, slug) — full article content is priced separately per
 * article, see news/[slug]/route.ts. Reuses the same getAllArticles() data
 * source that powers the public /news pages.
 */
export async function GET(request: Request) {
  return withPayment(
    request,
    { price: resource.price, description: resource.description },
    async () => {
      const articles = getAllArticles().map(({ slug, title, date, excerpt }) => ({
        slug,
        title,
        date,
        excerpt,
      }));
      return new Response(JSON.stringify({ articles }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  );
}
