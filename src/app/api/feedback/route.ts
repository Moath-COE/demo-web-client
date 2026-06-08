import { NextRequest, NextResponse } from "next/server";
import { Langfuse } from "langfuse";

async function findTraceIdBySessionId(
  langfuseHost: string,
  publicKey: string,
  secretKey: string,
  sessionId: string,
): Promise<string | null> {
  const url = `${langfuseHost}/api/public/traces?sessionId=${encodeURIComponent(sessionId)}&limit=1&orderBy=timestamp.desc&fields=core`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${publicKey}:${secretKey}`).toString("base64")}`,
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data?.data?.[0]?.id ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, sessionExperience, notes } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 },
      );
    }

    const publicKey = process.env.LANGFUSE_PUBLIC_KEY!;
    const secretKey = process.env.LANGFUSE_SECRET_KEY!;
    const langfuseHost = process.env.LANGFUSE_HOST!;
    const environment = process.env.NODE_ENV || "development";

    const langfuse = new Langfuse({
      publicKey,
      secretKey,
      baseUrl: langfuseHost,
      environment,
    });

    const existingTraceId = await findTraceIdBySessionId(
      langfuseHost,
      publicKey,
      secretKey,
      sessionId,
    );

    const trace = existingTraceId
      ? langfuse.trace({ id: existingTraceId })
      : langfuse.trace({
          id: `feedback-${sessionId}-${Date.now()}`,
          sessionId,
          name: "session-feedback",
        });

    if (sessionExperience != null) {
      trace.score({
        name: "session-experience-rating",
        value: sessionExperience,
        dataType: "NUMERIC",
      });
    }

    if (notes && notes.trim()) {
      trace.score({
        name: "session-notes",
        value: notes.trim(),
        dataType: "CATEGORICAL",
      });
    }

    await langfuse.flushAsync();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
