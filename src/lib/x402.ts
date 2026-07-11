import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { x402HTTPResourceServer } from "@x402/core/http";
import type { HTTPAdapter, HTTPRequestContext, RoutesConfig } from "@x402/core/http";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { facilitator as coinbaseFacilitator } from "@coinbase/x402";

// @x402/core doesn't re-export its `Network` type from any public subpath;
// it's a CAIP-2 id shaped `${namespace}:${reference}` (e.g. "eip155:84532").
export type Network = `${string}:${string}`;

/**
 * Shared x402 "seller" gate for agent-only API routes, built directly on
 * @x402/core rather than @x402/next — @x402/next@2.x requires Next >=16.2.6
 * as a peer dependency, and this app is on Next 14. This module works with
 * plain Fetch API Request/Response, so it's portable to any framework whose
 * route handlers use the Web standard Request/Response (Next.js App Router,
 * Astro endpoints, etc.) without depending on a framework-specific x402
 * adapter package at all.
 *
 * Network/wallet are env-driven so flipping from Base Sepolia testnet to Base
 * mainnet later is a config change, not a code change:
 * - X402_NETWORK (CAIP-2 id, e.g. "eip155:84532" for Base Sepolia, "eip155:8453" for Base mainnet)
 * - X402_PAY_TO_ADDRESS (receiving wallet)
 * - CDP_API_KEY_ID / CDP_API_KEY_SECRET — read directly by @coinbase/x402's
 *   default `facilitator` export (imported below), which already points at
 *   the CDP-hosted facilitator (https://api.cdp.coinbase.com) for both
 *   networks under one account. No separate facilitator-URL env var needed;
 *   unauthenticated calls only work for the facilitator's /list endpoint —
 *   /verify and /settle require the CDP key pair.
 */

export const NETWORK = (process.env.X402_NETWORK ?? "eip155:84532") as Network;
export const PAY_TO = process.env.X402_PAY_TO_ADDRESS;

let cachedServer: x402ResourceServer | null = null;
let initPromise: Promise<void> | null = null;

/**
 * The underlying x402ResourceServer (and its one-time facilitator discovery
 * call via .initialize()) is process-lifetime state, not per-request state —
 * each new x402HTTPResourceServer built per route reuses this same instance
 * rather than re-running facilitator discovery on every request.
 */
async function getInitializedResourceServer(): Promise<x402ResourceServer> {
  if (!cachedServer) {
    const facilitatorClient = new HTTPFacilitatorClient(coinbaseFacilitator);
    cachedServer = new x402ResourceServer(facilitatorClient).register(
      NETWORK,
      new ExactEvmScheme(),
    );
  }
  if (!initPromise) {
    initPromise = cachedServer.initialize().catch((err) => {
      // Let the next call retry rather than caching a permanent failure —
      // useful if CDP keys get set after the process is already running.
      initPromise = null;
      throw err;
    });
  }
  await initPromise;
  return cachedServer;
}

function adaptRequest(req: Request, path: string): HTTPAdapter {
  return {
    getHeader: (name: string) => req.headers.get(name) ?? undefined,
    getMethod: () => req.method,
    getPath: () => path,
    getUrl: () => req.url,
    getAcceptHeader: () => req.headers.get("accept") ?? "*/*",
    getUserAgent: () => req.headers.get("user-agent") ?? "",
  };
}

export interface AgentRouteConfig {
  /** Dollar-denominated price string, e.g. "$0.01" */
  price: string;
  description: string;
}

/**
 * Wraps a Next.js Route Handler with x402 payment gating. Settlement is only
 * attempted AFTER the handler runs and only if it returned a non-error status
 * — mirrors the recommended `withX402` behavior from @x402/next (never charge
 * for a failed response), reimplemented manually since that package isn't in
 * use here.
 */
export async function withPayment(
  req: Request,
  routeConfig: AgentRouteConfig,
  handler: () => Promise<Response>,
): Promise<Response> {
  // Never let an unexpected throw escape to the framework — fail closed with
  // a JSON error carrying the real message so live failures are diagnosable
  // from the response body, not just server logs.
  try {
    return await withPaymentInner(req, routeConfig, handler);
  } catch (err) {
    console.error("x402 withPayment unexpected failure:", err);
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: "x402 processing failed", detail: message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

async function withPaymentInner(
  req: Request,
  routeConfig: AgentRouteConfig,
  handler: () => Promise<Response>,
): Promise<Response> {
  if (!PAY_TO) {
    return new Response(
      JSON.stringify({ error: "X402_PAY_TO_ADDRESS is not configured on this server" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const url = new URL(req.url);
  // A bare RouteConfig (not path-keyed) is valid RoutesConfig — this server
  // instance is scoped to exactly one route handler already, so there's no
  // path pattern to match against.
  const routes: RoutesConfig = {
    accepts: {
      scheme: "exact",
      price: routeConfig.price,
      network: NETWORK,
      payTo: PAY_TO,
    },
    description: routeConfig.description,
    // resource/mimeType are Bazaar discovery metadata: the CDP facilitator
    // catalogs a route the first time it settles a payment for it (no
    // separate registration step) using whatever's declared here.
    resource: req.url,
    mimeType: "application/json",
  };

  // NB: x402ResourceServer.initialize() unconditionally clears and re-fetches
  // supported kinds from the facilitator on every call (verified by reading
  // the installed package source — it is not internally idempotent/cached).
  // Route through the module-level cache below instead of ever calling
  // x402HTTPResourceServer's own .initialize(), or every request would hit
  // the facilitator's discovery endpoint.
  let resourceServer: x402ResourceServer;
  try {
    resourceServer = await getInitializedResourceServer();
  } catch (err) {
    // Most likely cause: CDP_API_KEY_ID/CDP_API_KEY_SECRET missing or invalid.
    // Confirmed live against the real CDP facilitator during development —
    // its discovery/getSupported call itself returns 401 without valid CDP
    // keys, despite @coinbase/x402's README describing that endpoint as
    // unauthenticated. Fail closed with a clear message instead of leaking a
    // framework stack trace.
    console.error("x402 facilitator initialize() failed:", err);
    return new Response(
      JSON.stringify({
        error: "Payment facilitator unavailable — check CDP_API_KEY_ID/CDP_API_KEY_SECRET.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const httpServer = new x402HTTPResourceServer(resourceServer, routes);

  const context: HTTPRequestContext = {
    adapter: adaptRequest(req, url.pathname),
    path: url.pathname,
    method: req.method,
    paymentHeader: req.headers.get("PAYMENT-SIGNATURE") ?? undefined,
  };

  const result = await httpServer.processHTTPRequest(context);

  if (result.type === "payment-error") {
    // The lib's response instructions are already spec-complete: status
    // (402/412), headers (PAYMENT-REQUIRED challenge + Content-Type), and a
    // body that is either a JSON-able object (API clients) or a paywall HTML
    // string (browser requests, isHtml=true). Serve them verbatim — in
    // particular do NOT JSON.stringify a string body, which would wrap the
    // paywall HTML in quotes and escape it.
    const body =
      typeof result.response.body === "string"
        ? result.response.body
        : JSON.stringify(result.response.body ?? {});
    return new Response(body, {
      status: result.response.status,
      headers: result.response.headers,
    });
  }

  if (result.type === "no-payment-required") {
    // Every route configured here always requires payment; this branch is
    // unreachable in practice but kept for type-safety / defensive coding.
    return handler();
  }

  const response = await handler();
  if (response.status >= 400) {
    // Don't settle for a failed response — let the client retry with payment.
    return response;
  }

  const settlement = await httpServer.processSettlement(
    result.paymentPayload,
    result.paymentRequirements,
    result.declaredExtensions,
  );

  if (!settlement.success) {
    // ProcessSettleFailureResponse carries a spec-built 402 re-challenge in
    // .response (PAYMENT-REQUIRED header + failure details) — serve that
    // rather than a hand-rolled body so paying clients get a machine-readable
    // retry challenge.
    const failureBody =
      typeof settlement.response.body === "string"
        ? settlement.response.body
        : JSON.stringify(settlement.response.body ?? { error: settlement.errorReason });
    return new Response(failureBody, {
      status: settlement.response.status,
      headers: settlement.response.headers,
    });
  }

  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(settlement.headers)) {
    headers.set(key, value);
  }
  return new Response(response.body, { status: response.status, headers });
}
