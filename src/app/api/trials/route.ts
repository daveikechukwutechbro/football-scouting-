import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorized } from "@/lib/admin-auth";

const SAMPLE_TRIALS = [
  { id: "t1", title: "London Elite Academy Trials", location: "London, UK", date: "2026-09-15", deadline: "2026-09-01", description: "Open trials for U18-U23 players.", positions: ["Striker", "Winger", "Midfielder"], active: true },
  { id: "t2", title: "European Showcase Camp", location: "Madrid, Spain", date: "2026-10-20", deadline: "2026-10-05", description: "Showcase camp with 20+ scouts attending.", positions: ["Goalkeeper", "Defender", "Midfielder"], active: true },
  { id: "t3", title: "Africa Talent Expo", location: "Lagos, Nigeria", date: "2026-11-10", deadline: "2026-10-25", description: "Regional talent showcase for African players.", positions: ["Striker", "Midfielder", "Winger"], active: true },
];

export async function GET() {
  return NextResponse.json(SAMPLE_TRIALS);
}

export async function POST(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorized();

    const body = await req.json();
    const { title, location, date, deadline, description } = body;

    if (!title || !location || !date || !deadline) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const docRef = getAdminDb().ref("trials").push();
    await docRef.set({
      title,
      location,
      date,
      deadline,
      description: description || "",
      positions: body.positions || [],
      active: true,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.key, ...body }, { status: 201 });
  } catch (error) {
    console.error("Error creating trial:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
