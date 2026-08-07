import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    let decoded;
    try { decoded = await getAdminAuth().verifyIdToken(authHeader.slice(7)); }
    catch { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }

    const db = getAdminDb();
    const snap = await db.ref(`players/${decoded.uid}`).get();

    if (!snap.exists()) {
      return NextResponse.json({ registered: false }, { status: 404 });
    }

    return NextResponse.json({ registered: true, profile: snap.val() });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
