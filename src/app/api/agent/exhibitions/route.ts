import { getAllExhibitions } from "@/lib/exhibitions";
import { withPayment } from "@/lib/x402";
import { AGENT_RESOURCES } from "@/lib/agent-resources";

export const runtime = "nodejs";

const resource = AGENT_RESOURCES.find((r) => r.path === "/api/agent/exhibitions")!;

/**
 * Agent-only structured exhibition data, gated by x402. Reuses the same
 * getAllExhibitions() data source that powers the public /exhibitions pages —
 * this endpoint just exposes it as machine-readable JSON instead of HTML, for
 * a price, per Markdown frontmatter in src/content/exhibitions.
 */
export async function GET(request: Request) {
  return withPayment(
    request,
    { price: resource.price, description: resource.description },
    async () => {
      const exhibitions = getAllExhibitions();
      return new Response(JSON.stringify({ exhibitions }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  );
}
