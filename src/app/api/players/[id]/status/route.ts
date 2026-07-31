import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorized } from "@/lib/admin-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) return unauthorized();

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["submitted", "under_review", "shortlisted", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await getAdminDb().collection("players").doc(id).update({
      status,
      "applications.0.status": status,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
