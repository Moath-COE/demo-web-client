import { WebhookReceiver } from "livekit-server-sdk";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(request: Request) {
  let body: string;
  try {
    body = await request.text();
  } catch {
    return new Response("Invalid body", { status: 400 });
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new Response("Missing Authorization header", { status: 401 });
  }

  let event;
  try {
    event = await receiver.receive(body, authHeader);
  } catch {
    return new Response("Invalid webhook signature", { status: 401 });
  }

  const eventId = event.id;
  const eventType = event.event;
  const roomName = event.room?.name ?? undefined;

  if (!eventId) {
    return new Response("Missing event ID", { status: 400 });
  }

  const { data: isNew, error: dedupError } = await supabaseAdmin.rpc(
    "record_webhook_event",
    {
      p_event_id: eventId,
      p_event_type: eventType,
      p_room_name: roomName,
    },
  );

  if (dedupError) {
    console.error("Webhook dedup error:", dedupError);
    return new Response("Dedup check failed", { status: 500 });
  }

  if (!isNew) {
    return new Response("Already processed", { status: 200 });
  }

  if (eventType === "room_finished" && roomName) {
    const { data: session, error: sessionError } = await supabaseAdmin
      .from("agent_sessions")
      .select("user_id")
      .eq("room_name", roomName)
      .eq("status", "active")
      .single();

    if (sessionError || !session) {
      console.error("Session lookup error:", sessionError);
      return new Response("Session not found", { status: 200 });
    }

    const { error: recordError } = await supabaseAdmin.rpc(
      "record_session_end",
      {
        p_user_id: session.user_id,
        p_room_name: roomName,
      },
    );

    if (recordError) {
      console.error("Record session end error:", recordError);
      return new Response("Failed to record session", { status: 500 });
    }
  }

  return new Response("OK", { status: 200 });
}
