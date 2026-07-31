import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "./firebase-admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "infoproscoutt@gmail.com";

export async function verifyAdmin(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  try {
    const decoded = await getAdminAuth().verifyIdToken(authHeader.slice(7));
    if (decoded.email !== ADMIN_EMAIL) return null;
    return decoded;
  } catch {
    return null;
  }
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
