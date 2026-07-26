import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
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
    const { status } = body;

    const validStatuses = ["submitted", "under_review", "shortlisted", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const application = await prisma.application.findFirst({
      where: { playerId: id },
      orderBy: { submittedAt: "desc" },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    await prisma.application.update({
      where: { id: application.id },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
