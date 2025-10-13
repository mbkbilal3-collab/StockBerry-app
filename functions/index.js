import functions from "firebase-functions";
import admin from "firebase-admin";
import fetch from "node-fetch";

admin.initializeApp();
const db = admin.firestore();

export const aiChat = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "Login required");
    }

    const prompt = data.prompt;
    if (!prompt) {
      throw new functions.https.HttpsError("invalid-argument", "Prompt missing");
    }

    const apiKey = functions.config().openai.key;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const result = await response.json();
    return { reply: result.choices?.[0]?.message?.content || "No reply" };
  } catch (err) {
    console.error("AI Chat error:", err);
    throw new functions.https.HttpsError("internal", "AI chat failed");
  }
});
