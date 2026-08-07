import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";

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
    const email = decoded.email || body.email;
    const name = `${body.firstName || ""} ${body.lastName || ""}`.trim() || undefined;

    const tx_ref = `PS-${crypto.randomBytes(8).toString("hex").toUpperCase()}`;
    const redirect_url = `${req.nextUrl.origin}/payment/callback`;

    const flwRes = await fetch(`${FLW_BASE}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref,
        amount: REGISTRATION_FEE,
        currency: REGISTRATION_CURRENCY,
        redirect_url,
        customer: { email, name },
        customizations: {
          title: "ProScout Registration",
          description: "Player registration fee ($5 USD)",
          logo: `${req.nextUrl.origin}/logo.svg`,
        },
      }),
    });

    const flwData = await flwRes.json();
    if (!flwRes.ok || !flwData.data?.link) {
      console.error("Flutterwave init error:", JSON.stringify(flwData));
      return NextResponse.json({ error: flwData.message || "Payment gateway error" }, { status: 502 });
    }

    return NextResponse.json({ tx_ref, checkout_url: flwData.data.link });
  } catch (error) {
    console.error("Payment init error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
