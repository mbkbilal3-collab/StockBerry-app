import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const STREAK_BONUS = 100; // reward on 7-day streak

export async function updateStreak(userId) {
  try {
    const today = new Date().toDateString();

    // Last mined date local storage me save hoti hai
    const lastMined = await AsyncStorage.getItem("lastMinedDate");
    let streak = parseInt((await AsyncStorage.getItem("streak")) || "0");

    if (lastMined === today) {
      return { success: false, message: "Already mined today!" };
    }

    if (lastMined) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (new Date(lastMined).toDateString() === yesterday.toDateString()) {
        streak += 1;
      } else {
        streak = 1; // reset
      }
    } else {
      streak = 1; // first time
    }

    await AsyncStorage.setItem("lastMinedDate", today);
    await AsyncStorage.setItem("streak", streak.toString());

    // Firestore me streak save
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      await updateDoc(userRef, {
        streak,
      });
    }

    let bonusMessage = "";
    if (streak % 7 === 0) {
      const newBalance = (snap.data().balance || 0) + STREAK_BONUS;
      await updateDoc(userRef, { balance: newBalance });
      bonusMessage = ` 🎉 7-day streak bonus: +${STREAK_BONUS} SBC!`;
    }

    return { success: true, message: `Streak: ${streak} days.${bonusMessage}` };
  } catch (err) {
    console.error("Streak error:", err);
    return { success: false, message: "Streak update failed" };
  }
}
