import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

export async function getUserData() {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  } else {
    const data = { balance: 0, lastMine: null, referrals: 0 };
    await setDoc(ref, data);
    return data;
  }
}

export async function mineCoins() {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  const now = Date.now();
  const cooldown = 24 * 60 * 60 * 1000; // 24 hours

  if (snap.exists()) {
    const data = snap.data();
    if (data.lastMine && now - data.lastMine < cooldown) {
      throw new Error("⏳ Please wait 24 hours before mining again!");
    }

    await updateDoc(ref, {
      balance: increment(10), // add 10 coins
      lastMine: now,
    });

    return true;
  }
  return false;
}

export async function addReferral() {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  await updateDoc(ref, { referrals: increment(1) });
}
