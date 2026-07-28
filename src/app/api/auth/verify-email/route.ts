import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/?error=missing-token", req.url));
    }

    const user = await prisma.user.findUnique({ where: { verificationToken: token } });
    if (!user) {
      return NextResponse.redirect(new URL("/?error=invalid-token", req.url));
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
      },
    });

    return NextResponse.redirect(new URL("/email-verified", req.url));
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.redirect(new URL("/?error=verification-failed", req.url));
  }
}
