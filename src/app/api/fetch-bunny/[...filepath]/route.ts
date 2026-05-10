import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filepath: string[] }> },
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { filepath } = await params;
  const filePath = filepath.join("/");

  if (!filePath) {
    return NextResponse.json({ error: "Missing filePath" }, { status: 400 });
  }

  if (filepath[0] === "courses" && filepath[1]) {
    const courseSlug = filepath[1];

    const { data: course } = await supabaseAdmin
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single();

    if (course) {
      const { data: enrollment } = await supabaseAdmin
        .from("enrollments")
        .select("user_id")
        .eq("user_id", userId)
        .eq("course_id", course.id)
        .single();

      if (!enrollment) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }
  }

  const bunnyUrl = `${process.env.BUNNY_STORAGE_PULL_ZONE_URL}/${filePath}`;

  try {
    const response = await fetch(bunnyUrl, {
      headers: {
        AccessKey: process.env.BUNNY_STORAGE_API_KEY as string,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return new NextResponse("File not found", { status: 404 });
    }

    return new NextResponse(response.body, {
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("BunnyCDN Proxy Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
