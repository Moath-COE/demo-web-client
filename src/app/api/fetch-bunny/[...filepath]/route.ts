import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { filepath: string[] } },
) {
  // 1. Authenticate the request using Clerk
  // This reads the session cookies sent by the browser
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Parse the Request Body to get filePath
  const { filepath } = await params; // Await params first
  const filePath = filepath.join("/"); // Then access the property // Join the array of path segments into a single string

  if (!filePath) {
    return NextResponse.json({ error: `"Missing filePath"` }, { status: 400 });
  }
  const bunnyUrl = `${process.env.BUNNY_STORAGE_PULL_ZONE_URL}/${filePath}`;

  try {
    // 3. Fetch the file securely from your Bunny Pull Zone
    const response = await fetch(bunnyUrl, {
      headers: {
        AccessKey: process.env.BUNNY_STORAGE_API_KEY as string,
      },
      // Important: Do not cache this fetch request so users always get fresh auth checks
      cache: "no-store",
    });

    if (!response.ok) {
      return new NextResponse("File not found", { status: 404 });
    }

    // 4. Stream the file back to the authenticated client
    return new NextResponse(response.body, {
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
        "Cache-Control": "private, max-age=3600", // Cache in the user's browser, but NOT on shared CDNs
      },
    });
  } catch (error) {
    console.error("BunnyCDN Proxy Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
