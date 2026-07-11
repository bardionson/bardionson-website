/**
 * Single source of truth for this app's x402-gated agent endpoints: each
 * route.ts imports its own entry here for price/description instead of
 * hardcoding it inline, and the /.well-known/x402.json manifest endpoint
 * (src/app/.well-known/x402.json/route.ts) generates its listing from this
 * same array — so the manifest can never drift out of sync with what the
 * real endpoints actually charge.
 */
export interface AgentResourceDef {
  /** Path relative to site root, e.g. "/api/agent/exhibitions" */
  path: string;
  /** Dollar-denominated price string, e.g. "$0.01" */
  price: string;
  description: string;
}

export const AGENT_RESOURCES: AgentResourceDef[] = [
  {
    path: "/api/agent/exhibitions",
    price: "$0.01",
    description: "Structured exhibition history (title, year, venue, dates, links) as JSON",
  },
  {
    path: "/api/agent/collectors",
    price: "$0.05",
    description: "Structured collector-vault notes and early-access drops as JSON",
  },
];
