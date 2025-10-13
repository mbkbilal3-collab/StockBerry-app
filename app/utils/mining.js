import { doc, getDoc, updateDoc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MINING_REWARD = 10; // har mining session pe 10 SBC

export async function mineCoins(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    let currentBalance = 0;
    if (userSnap.exists()) {
      currentBalance = userSnap.data().balance || 0;
    }

    const newBalance = currentBalance + MINING_REWARD;

    // Balance update
    await setDoc(userRef, { balance: newBalance }, { merge: true });

    // Transaction entry
    await addDoc(collection(db, "transactions"), {
      userId,
      type: "mining",
      amount: MINING_REWARD,
      timestamp: serverTimestamp(),
    });

    console.log("✅ Mining reward added:", MINING_REWARD);
    return { success: true, message: `+${MINING_REWARD} SBC mined!` };
  } catch (err) {
    console.error("Mining error:", err);
    return { success: false, message: "Mining failed" };
  }
}
