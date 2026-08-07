import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { createPlayer } from "@/lib/player";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const token = authHeader.slice(7);
    let decoded;
    try { decoded = await getAdminAuth().verifyIdToken(token); }
    catch { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }

    const body = await req.json();

    if (!body.payment?.transactionId) {
      return NextResponse.json(
        { error: "Payment required before registration" },
        { status: 402 }
      );
    }

    const result = await createPlayer(decoded.uid, decoded.email || "", body);
    if (result.status === 409) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    return NextResponse.json({ success: true, refNumber: result.refNumber }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
