import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "Eres un asistente útil dentro del panel administrativo." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("Error IA:", error);
    return new Response("Error en el servidor IA", { status: 500 });
  }
}
