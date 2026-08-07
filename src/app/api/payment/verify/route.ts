import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { createPlayer } from "@/lib/player";

const FLW_BASE = "https://api.flutterwave.com/v3";
const REGISTRATION_FEE = 5;
const REGISTRATION_CURRENCY = "USD";

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.FLW_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    let decoded;
    try { decoded = await getAdminAuth().verifyIdToken(authHeader.slice(7)); }
    catch { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }

    const body = await req.json();
    const transactionId = body.transactionId;
    if (!transactionId) {
      return NextResponse.json({ error: "Missing transaction id" }, { status: 400 });
    }

    const flwRes = await fetch(`${FLW_BASE}/transactions/${transactionId}/verify`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });
    const flwData = await flwRes.json();

    const tx = flwData.data;
    const success =
      flwRes.ok &&
      tx &&
      (tx.status === "successful" || tx.status === "success") &&
      Number(tx.amount) === REGISTRATION_FEE &&
      String(tx.currency).toUpperCase() === REGISTRATION_CURRENCY;

    if (!success) {
      return NextResponse.json({ error: "Payment not verified" }, { status: 400 });
    }

    const result = await createPlayer(decoded.uid, decoded.email || "", body.formData || {}, {
      payment: {
        transactionId: String(transactionId),
        amount: tx.amount,
        currency: tx.currency,
        paidAt: tx.created_at || new Date().toISOString(),
      },
    });

    if (result.status === 409) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ success: true, refNumber: result.refNumber });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
