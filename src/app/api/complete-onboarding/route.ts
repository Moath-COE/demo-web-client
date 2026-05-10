import { auth, clerkClient } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: Request) {
  try {
    console.log("Received request to complete onboarding");
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { institution_id, major_id, level } = body;

    if (!institution_id || !major_id || !level) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    console.log("Received data:", { institution_id, major_id, level });

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: userId,
        institution_id,
        major_id,
        level,
      });

    if (profileError) {
      if (profileError.code === "23505") {
        return NextResponse.json(
          { message: "Profile already exists" },
          { status: 409 },
        );
      }

      console.error("Supabase Error:", profileError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Onboarding completed" },
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
