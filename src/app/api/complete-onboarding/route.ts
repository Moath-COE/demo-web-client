import { auth, clerkClient } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const SA_PHONE_E164_RE = /^\+9665\d{8}$/;

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber || typeof phoneNumber !== "string") {
      return NextResponse.json(
        { error: "يرجى إدخال رقم الجوال" },
        { status: 400 },
      );
    }

    const normalized = phoneNumber.replace(/[\s\-()]/g, "");

    if (!SA_PHONE_E164_RE.test(normalized)) {
      return NextResponse.json(
        { error: "رقم الجوال غير صالح. يرجى إدخال رقم سعودي صحيح." },
        { status: 400 },
      );
    }

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        { id: userId, phone_number: normalized },
        { onConflict: "id" },
      );

    if (profileError) {
      console.error("Supabase Error:", profileError);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 },
      );
    }

    const client = await clerkClient();
    const existingUser = await client.users.getUser(userId);

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        ...(existingUser.privateMetadata as Record<string, unknown>),
        phoneNumber: normalized,
      },
      publicMetadata: {
        ...(existingUser.publicMetadata as Record<string, unknown>),
        onboardingComplete: true,
        phoneNumberCollected: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Phone number saved" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
