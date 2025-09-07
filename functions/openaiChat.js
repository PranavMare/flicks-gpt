/* eslint-env node */
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");
let client = null;

exports.openaiChat = onRequest(
  {
    region: "us-central1",
    secrets: [OPENAI_API_KEY],
    cors: true,
  },
  async (req, res) => {
    try {
      if (req.method === "OPTIONS") return res.status(204).send(); // CORS preflight
      if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

      const prompt = req.body?.prompt?.trim();
      if (!prompt) return res.status(400).json({ error: "Missing prompt" });

      if (!client) client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

      const r = await client.responses.create({
        model: "gpt-4o-mini",
        instructions: "Return up to 20 movie titles that are strictly relevant to the prompt. Output exactly one line: comma-separated titles only.",
        input: prompt,
        max_output_tokens: 50,
      });

      const text = r.output_text ?? r.output?.[0]?.content?.[0]?.text?.value ?? "";

      res.json({ text: String(text).trim() });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message || String(e) });
    }
  }
);
