// App Router example (Edge or Node handler)
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { voiceID, text } = await req.json();

  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    return new Response(JSON.stringify({ error: "Missing Convex URL" }), { status: 500 });
  }

  const { userId, getToken } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const client = new ConvexHttpClient(convexUrl);
  const token = await getToken({ template: "convex" });
  if (token) client.setAuth(token);

  // Check remaining credits before generating
  const remaining = await client.query(api.credits.getRemaining, {});
  if (!remaining || remaining <= 0) {
    return new Response(JSON.stringify({ error: "Insufficient credits" }), { status: 402 });
  }

  // Generate audio via ElevenLabs
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
      }),
    }
  );

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Synthesis failed" }), { status: 502 });
  }

  // Decrement credits after successful generation
  try {
    await client.mutation(api.credits.decrement, { amount: 1 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Insufficient credits" }), { status: 402 });
  }

  const audioBlob = await response.arrayBuffer();
  return new Response(audioBlob, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
