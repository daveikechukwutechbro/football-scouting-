import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trials = await prisma.trial.findMany({
      where: { active: true },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(trials);
  } catch (error) {
    console.error("Error fetching trials:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, location, date, positions, deadline, description } = body;

    if (!title || !location || !date || !deadline) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trial = await prisma.trial.create({
      data: {
        title,
        location,
        date: new Date(date),
        positions: JSON.stringify(positions || []),
        deadline: new Date(deadline),
        description: description || "",
      },
    });

    return NextResponse.json(trial, { status: 201 });
  } catch (error) {
    console.error("Error creating trial:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
