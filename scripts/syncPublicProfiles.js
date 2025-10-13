import admin from "firebase-admin";
import { readFileSync } from "fs";

// Service account JSON load karo
const serviceAccount = JSON.parse(
  readFileSync("C:/Users/Bilal/Desktop/stockberry-app/serviceAccountKey.json", "utf8")
);

// Firebase Admin initialize karo (projectId force set karke)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "stockberry-63325", // apna project ID yahan hardcode
  });
}

const db = admin.firestore();

async function syncPublicProfiles() {
  try {
    const usersSnap = await db.collection("users").get();

    const batch = db.batch();
    usersSnap.forEach((doc) => {
      const data = doc.data();
      const publicRef = db.collection("publicProfiles").doc(doc.id);
      batch.set(publicRef, {
        email: data.email || null,
        balance: data.balance || 0,
      });
    });

    await batch.commit();
    console.log("✅ All public profiles synced successfully!");
  } catch (err) {
    console.error("❌ Sync error:", err);
  }
}

syncPublicProfiles();
