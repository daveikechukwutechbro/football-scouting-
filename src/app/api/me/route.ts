import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const token = authHeader.slice(7);
    let decoded;
    try { decoded = await getAdminAuth().verifyIdToken(token); }
    catch { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }

    const snapshot = await getAdminDb().ref(`players/${decoded.uid}`).get();
    const registered = snapshot.exists();

    return NextResponse.json({ uid: decoded.uid, email: decoded.email, registered });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
