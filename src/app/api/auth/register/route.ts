import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, dateOfBirth, nationality, country, city, phoneNumber } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "player",
        name: `${firstName || ""} ${lastName || ""}`.trim(),
      },
    });

    if (firstName && lastName) {
      await prisma.player.create({
        data: {
          userId: user.id,
          firstName,
          lastName,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
          nationality: nationality || "",
          countryOfResidence: country || "",
          city: city || "",
          phoneNumber: phoneNumber || "",
        },
      });
    }

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
