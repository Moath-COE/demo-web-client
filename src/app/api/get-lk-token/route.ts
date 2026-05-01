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
  const now = new Date();
  // 1. Format the Date (YYYYMMDD)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;
  // 2. Format the Time (Minutes and Seconds)
  const hours = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  const timeStr = `${hours}${mins}`;
  at.addGrant({
    roomJoin: true,
    room: `ss_${userId.slice(-10)}_${dateStr}_${timeStr}`,
    canUpdateOwnMetadata: true,
  });
  return new Response(await at.toJwt());
}
