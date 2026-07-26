import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        user: { select: { email: true, createdAt: true } },
        guardian: true,
        footballProfile: true,
        physicalProfile: true,
        careerStats: true,
        playingStyle: true,
        media: true,
        availability: true,
        socialLinks: true,
        documents: true,
        applications: { orderBy: { submittedAt: "desc" } },
      },
    });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { notes, ...playerData } = body;

    if (notes !== undefined) {
      const application = await prisma.application.findFirst({
        where: { playerId: id },
        orderBy: { submittedAt: "desc" },
      });
      if (application) {
        await prisma.application.update({
          where: { id: application.id },
          data: { notes },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const player = await prisma.player.findUnique({ where: { id } });
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id: player.userId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
