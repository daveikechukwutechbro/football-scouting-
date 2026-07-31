import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorized } from "@/lib/admin-auth";

export async function GET() {
  try {
    const snapshot = await getAdminDb().collection("players").get();
    const players = snapshot.docs.map((doc) => doc.data() as any);

    const totalPlayers = players.length;
    const totalApplications = players.filter((p) => p.refNumber).length;
    const statusCounts: Record<string, number> = {};
    const positionCounts: Record<string, number> = {};

    players.forEach((p) => {
      const st = p.status || "submitted";
      statusCounts[st] = (statusCounts[st] || 0) + 1;
      const pos = p.footballProfile?.primaryPosition || p.primaryPosition || p.currentPosition;
      if (pos) positionCounts[pos] = (positionCounts[pos] || 0) + 1;
    });

    const recentApplications = players
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
      .slice(0, 10)
      .map((p) => ({
        id: p.uid || "",
        status: p.status || "submitted",
        submittedAt: p.createdAt || "",
        player: { firstName: p.firstName, lastName: p.lastName, city: p.city, nationality: p.nationality },
      }));

    return NextResponse.json({
      totalPlayers,
      totalApplications,
      statusCounts,
      positionCounts,
      recentApplications,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
