import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalPlayers,
      totalApplications,
      statusCounts,
      positionCounts,
      recentApplications,
    ] = await Promise.all([
      prisma.player.count(),
      prisma.application.count(),
      prisma.application.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.footballProfile.groupBy({
        by: ["primaryPosition"],
        _count: true,
        orderBy: { _count: { primaryPosition: "desc" } },
        take: 11,
      }),
      prisma.application.findMany({
        take: 10,
        orderBy: { submittedAt: "desc" },
        include: {
          player: {
            select: { firstName: true, lastName: true, city: true, nationality: true },
          },
        },
      }),
    ]);

    const statusMap: Record<string, number> = {};
    statusCounts.forEach((s) => {
      statusMap[s.status] = s._count;
    });

    const positionMap: { position: string; count: number }[] = [];
    positionCounts.forEach((p) => {
      positionMap.push({
        position: p.primaryPosition,
        count: p._count,
      });
    });

    return NextResponse.json({
      totalPlayers,
      totalApplications,
      statusCounts: statusMap,
      positionCounts: positionMap,
      recentApplications,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
