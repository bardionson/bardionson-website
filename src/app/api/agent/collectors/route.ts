import { withPayment } from "@/lib/x402";

export const runtime = "nodejs";

/**
 * Agent-only structured collector-vault data, gated by x402. Distinct from
 * the human-facing /collectors page (which is gated by a separate, weak
 * NextAuth demo password and is not touched by this endpoint). Content here
 * mirrors that page's current demo placeholders — replace with real data
 * once /collectors itself moves off placeholder content.
 */
export async function GET(request: Request) {
  return withPayment(
    request,
    {
      price: "$0.05",
      description: "Structured collector-vault notes and early-access drops as JSON",
    },
    async () => {
      const notes = [
        {
          title: "Field Note: Marfa Site Visit",
          date: "2025-10-02",
          body: "The light here is unlike anywhere else. The way it interacts with the dust creates almost algorithmic patterns in the air. I've been experimenting with using these natural atmospheric gradients as direct inputs for the GAN models. The results are startlingly organic.",
        },
        {
          title: "Early Access: Abstract 09",
          date: "current",
          body: "As a vault member, you get 24-hour early access to mint the next piece in the series before it hits the primary market.",
          mintPriceEth: 0.5,
        },
      ];
      return new Response(JSON.stringify({ notes }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  );
}
