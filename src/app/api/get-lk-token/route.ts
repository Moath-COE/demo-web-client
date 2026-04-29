import { AccessToken, AgentDispatchClient } from "livekit-server-sdk";
import { auth } from "@clerk/nextjs/server";
export async function GET(request: Request) {
  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;
  const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!; // e.g. wss://your-project.livekit.cloud
  if (!apiKey || !apiSecret || !livekitUrl) {
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
  // Build room name
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
  const roomName = `ss_${userId.slice(-10)}_${dateStr}_${timeStr}`;
  // 1. Generate user token
  const at = new AccessToken(apiKey, apiSecret, {
    identity: userId,
    name: userName,
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canUpdateOwnMetadata: true,
  });
  const token = await at.toJwt();
  // 2. Dispatch agent to the room with metadata
  const agentDispatch = new AgentDispatchClient(livekitUrl, apiKey, apiSecret);
  await agentDispatch.createDispatch(roomName, "tutor-agent-prd", {
    metadata: JSON.stringify({
      user_name: userName,
      course_id: courseId,
      chapter_id: chapterId,
      language,
    }),
  });
  return new Response(token);
}
