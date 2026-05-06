import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  const bootstrapToken = process.env.BOOTSTRAP_TOKEN;
  if (!bootstrapToken || token !== bootstrapToken) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const email = process.env.DEMO_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.DEMO_ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json(
      {
        ok: false,
        message: "DEMO_ADMIN_EMAIL and DEMO_ADMIN_PASSWORD are required",
      },
      { status: 400 },
    );
  }

  const hashedPassword = await hash(password, 10);

  const user = await db.user.upsert({
    where: { email },
    update: {
      role: "ADMIN",
      isActive: true,
      hashedPassword,
    },
    create: {
      name: "Admin User",
      email,
      role: "ADMIN",
      isActive: true,
      hashedPassword,
    },
    select: {
      id: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Admin user bootstrapped successfully",
    user,
  });
}
