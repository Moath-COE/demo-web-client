// app/api/token/route.ts
import { AccessToken } from "livekit-server-sdk";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  // Debug check: This helps you identify if the .env is working
  if (!apiKey || !apiSecret) {
    return new Response(
      JSON.stringify({ error: "Server misconfigured: API keys missing" }),
      { status: 500 },
    );
  }

  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const url = new URL(request.url);
  const courseId = url.searchParams.get("course_id") ?? "";
  const chapterId = url.searchParams.get("chapter_id") ?? "";
  const language = url.searchParams.get("language") ?? "Arabic";
  const userName = url.searchParams.get("user_name") ?? "undefined";

  const at = new AccessToken(apiKey, apiSecret, {
    identity: userId,
    name: userName,
    attributes: {
      course_id: courseId,
      chapter_id: chapterId,
      language,
      user_name: userName,
    },
  });

  at.addGrant({
    roomJoin: true,
    room: "study-session-" + userId + "-" + Date.now(),
    canUpdateOwnMetadata: true,
  });

  return new Response(await at.toJwt());
}
