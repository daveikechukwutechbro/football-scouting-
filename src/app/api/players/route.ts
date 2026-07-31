import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorized } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorized();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const position = searchParams.get("position") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20);

    const snapshot = await getAdminDb().collection("players").get();
    let players = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (search) {
      const q = search.toLowerCase();
      players = players.filter(
        (p: any) =>
          (p.firstName || "").toLowerCase().includes(q) ||
          (p.lastName || "").toLowerCase().includes(q) ||
          (p.email || "").toLowerCase().includes(q) ||
          (p.city || "").toLowerCase().includes(q) ||
          (p.nationality || "").toLowerCase().includes(q)
      );
    }

    if (status) {
      players = players.filter((p: any) => (p.status || "submitted") === status);
    }

    if (position) {
      players = players.filter((p: any) => p.footballProfile?.primaryPosition === position);
    }

    players.sort((a: any, b: any) => (b.createdAt || "").localeCompare(a.createdAt || ""));

    const total = players.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const paged = players.slice(start, start + limit);

    return NextResponse.json({ players: paged, pagination: { total, page, limit, totalPages } });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
