/**
 * scripts/createReferrer.js
 * (utility: create a test referrer user in Firestore; uses Firebase Admin)
 * NOTE: Only run this locally if you have service account or admin credentials.
 */
const admin = require("firebase-admin");
const fs = require("fs");

if (!fs.existsSync("./serviceAccountKey.json")) {
  console.error("serviceAccountKey.json not found - cannot create referrer via admin here.");
  process.exit(1);
}

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

async function createReferrer(id, email) {
  await db.collection("users").doc(id).set({
    email: email || "ref@example.com",
    balance: 1000,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
  console.log("Referrer created:", id);
}

createReferrer("referrer-test-1", "ref@example.com").then(()=>process.exit());
