const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const OpenAI = require("openai");

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

const openaifn = onRequest({ secrets: [OPENAI_API_KEY], cors: true }, async (req, res) => {
  try {
    const client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });
    const prompt = req.body?.prompt ?? "Are semicolons optional in JavaScript?";
    const r = await client.responses.create({
      model: "gpt-4o",
      instructions: "You are a coding assistant that talks like a pirate",
      input: prompt,
    });
    res.json({ text: r.output_text });
  } catch (e) {
    res.status(500).json({ error: e.message || String(e) });
  }
});

module.exports = { openaifn };
