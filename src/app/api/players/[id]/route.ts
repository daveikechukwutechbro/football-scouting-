import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorized } from "@/lib/admin-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorized();

    const { id } = await params;
    const snapshot = await getAdminDb().ref(`players/${id}`).get();
    if (!snapshot.exists()) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    return NextResponse.json({ id, ...snapshot.val() });
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
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorized();

    const { id } = await params;
    const body = await req.json();

    if (body.notes !== undefined) {
      await getAdminDb().ref(`players/${id}/applications/0/notes`).set(body.notes);
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
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorized();

    const { id } = await params;
    await getAdminDb().ref(`players/${id}`).remove();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
