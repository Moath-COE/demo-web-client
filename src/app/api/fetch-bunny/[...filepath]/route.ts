import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filepath: string[] }> },
) {
  const { filepath } = await params;
  const filePath = filepath.join("/");

  if (!filePath) {
    return NextResponse.json({ error: "Missing filePath" }, { status: 400 });
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
