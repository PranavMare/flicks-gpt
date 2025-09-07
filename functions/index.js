/* eslint-env node */

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.

setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const cors = require("cors")({
  origin: ["https://flicks-gpt-6d005.web.app", "https://flicks-gpt-6d005.firebaseapp.com", "http://localhost:5173"],
  methods: ["GET", "OPTIONS"],
});

// /api/tmdb/<anything>?<qs>
exports.tmdb = onRequest({ region: "us-central1", secrets: ["TMDB_BEARER"] }, async (req, res) => {
  return cors(req, res, async () => {
    if (req.method === "OPTIONS") return res.status(204).send();
    if (req.method !== "GET") return res.status(405).json({ error: "GET only" });

    const prefix = "/api/tmdb/";
    const tail = req.path.startsWith(prefix) ? req.path.slice(prefix.length) : "";
    if (!tail) return res.status(400).json({ error: "missing TMDB path" });

    const url = new URL(`https://api.themoviedb.org/3/${tail}`);
    for (const [k, v] of Object.entries(req.query)) url.searchParams.append(k, String(v));

    const r = await fetch(url.toString(), { headers: { Authorization: `Bearer ${process.env.TMDB_BEARER}` } });
    const data = await r.json();
    res.status(r.status).json(data);
  });
});

//OPENAI API Function export
exports.openaiChat = require("./openaiChat").openaiChat;
