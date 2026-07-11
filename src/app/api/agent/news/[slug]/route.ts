import { getArticleBySlug } from "@/lib/markdown";
import { withPayment } from "@/lib/x402";
import { AGENT_RESOURCES } from "@/lib/agent-resources";

export const runtime = "nodejs";

/**
 * Agent-only individual news article content, gated by x402 — distinct from
 * news/route.ts (the free-standing index, priced separately). Content comes
 * straight from the same getArticleBySlug() data source that powers the
 * public /news/[slug] pages.
 */
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return new Response(JSON.stringify({ error: "Unknown article" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resource = AGENT_RESOURCES.find((r) => r.path === `/api/agent/news/${article.slug}`)!;

  return withPayment(
    request,
    { price: resource.price, description: resource.description },
    async () => {
      return new Response(JSON.stringify(article), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  );
}
