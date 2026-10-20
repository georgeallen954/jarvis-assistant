
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const expected = process.env.JARVIS_ACCESS_CODE;
  const supplied = req.headers["x-jarvis-access"];

  if (!expected || supplied !== expected) {
    return res.status(401).json({
      error: "Access code missing or incorrect. Check JARVIS Setup."
    });
  }

  const message =
    typeof req.body?.message === "string"
      ? req.body.message.trim()
      : "";

  if (!message) {
    return res.status(400).json({ error: "Please enter a message." });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions:
        "You are JARVIS, a helpful personal AI assistant. " +
        "Use clear British English. Help with planning, research, " +
        "productivity and business ideas. Never claim to have performed " +
        "actions unless you actually have. Ask for confirmation before " +
        "important external actions.",
      input: message,
      max_output_tokens: 700
    });

    return res.status(200).json({
      reply: response.output_text || "Please try again."
    });
  } catch (error) {
    console.error("JARVIS request failed:", error.message);

    return res.status(500).json({
      error: "AI request failed. Check server configuration and API billing."
    });
  }
}

