// app/api/token/route.ts
import { AccessToken } from "livekit-server-sdk";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  // Debug check: This helps you identify if the .env is working
  if (!apiKey || !apiSecret) {
    return new Response(
      JSON.stringify({ error: "Server misconfigured: API keys missing" }),
      { status: 500 }
    );
  }

  const { userId } = await auth(); // Get user from Clerk
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const at = new AccessToken(apiKey, apiSecret, {
    identity: userId,
  });

  at.addGrant({ roomJoin: true, room: "test-room" });

  return new Response(await at.toJwt());
}
