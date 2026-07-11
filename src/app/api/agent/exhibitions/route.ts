import { getAllExhibitions } from "@/lib/exhibitions";
import { withPayment } from "@/lib/x402";

export const runtime = "nodejs";

/**
 * Agent-only structured exhibition data, gated by x402. Reuses the same
 * getAllExhibitions() data source that powers the public /exhibitions pages —
 * this endpoint just exposes it as machine-readable JSON instead of HTML, for
 * a price, per Markdown frontmatter in src/content/exhibitions.
 */
export async function GET(request: Request) {
  return withPayment(
    request,
    {
      price: "$0.01",
      description: "Structured exhibition history (title, year, venue, dates, links) as JSON",
    },
    async () => {
      const exhibitions = getAllExhibitions();
      return new Response(JSON.stringify({ exhibitions }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  );
}
