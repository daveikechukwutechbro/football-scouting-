import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", folder);
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const url = `/${folder}/${filename}`;

    return NextResponse.json({ success: true, url, filename: file.name });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
