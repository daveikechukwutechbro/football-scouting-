import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const position = searchParams.get("position") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { user: { email: { contains: search } } },
        { city: { contains: search } },
      ];
    }

    if (position) {
      where.footballProfile = { primaryPosition: position };
    }

    if (status) {
      where.applications = { some: { status } };
    }

    const [players, total] = await Promise.all([
      prisma.player.findMany({
        where,
        include: {
          user: { select: { email: true } },
          footballProfile: true,
          physicalProfile: true,
          careerStats: true,
          applications: { orderBy: { submittedAt: "desc" }, take: 1 },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.player.count({ where }),
    ]);

    return NextResponse.json({
      players,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
