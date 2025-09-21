// App Router example (Edge or Node handler)
export async function POST(req: Request) {
  const { voiceID, text } = await req.json();

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!, // Not prefixed with NEXT_PUBLIC
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
      }),
    }
  );

  const audioBlob = await response.arrayBuffer();

  return new Response(audioBlob, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}
