/**
 * Checkout stub — Stripe-ready seam for direct ticket sales.
 *
 * Today: resolves instantly in "demo wallet" mode so the club economy works
 * without money moving. With indie partner #1 (Veezi token + Stripe account):
 *   1. Backend endpoint creates a stripe.checkout.sessions with the seat
 *      line items and the partner theater's connected account
 *      (Stripe Connect, destination charge, club keeps the convenience fee).
 *   2. This function redirects to session.url and the success webhook
 *      confirms the Veezi booking before issuing the ticket + points.
 */

export interface CheckoutLine {
  filmTitle: string;
  theaterName: string;
  time: string;
  seats: string[];
  unitPrice: number;
}

export interface CheckoutResult {
  ok: boolean;
  mode: 'demo-wallet' | 'stripe';
  total: number;
}

export const CONVENIENCE_FEE = 0; // per ticket; set with partner #1 (target $1–2, below Fandango)

export async function createCheckout(line: CheckoutLine): Promise<CheckoutResult> {
  const total = +(line.seats.length * (line.unitPrice + CONVENIENCE_FEE)).toFixed(2);
  // TODO(partner #1): POST /api/checkout -> stripe.checkout.sessions.create(...)
  return { ok: true, mode: 'demo-wallet', total };
}
