import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function applyDailyBonus(userId) {
  try {
    const today = new Date().toDateString();
    const lastClaim = await AsyncStorage.getItem("lastDailyBonus");

    if (lastClaim === today) return { success: false, message: "Bonus already claimed today" };

    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return { success: false, message: "User not found" };

    const currentBalance = snap.data().balance || 0;
    await updateDoc(userRef, { balance: currentBalance + 20 });
    await AsyncStorage.setItem("lastDailyBonus", today);

    return { success: true, message: "Daily login bonus applied!" };
  } catch (err) {
    console.error("Daily Bonus error:", err);
    return { success: false, message: "Error applying bonus" };
  }
}
