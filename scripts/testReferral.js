import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { applyReferral } from "../app/utils/referral";

export async function testReferralFlow(email, password, referralCode) {
  try {
    const auth = getAuth();
    // 1. Naya user banaye
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCred.user;

    // 2. User ka Firestore me doc banaye
    await setDoc(doc(db, "users", newUser.uid), {
      balance: 0,
      email: newUser.email,
      createdAt: new Date(),
    });

    // 3. Referral apply kare
    await applyReferral(newUser.uid, referralCode);

    console.log("✅ Referral test completed for:", newUser.email);
  } catch (err) {
    console.error("Referral test failed:", err);
  }
}
