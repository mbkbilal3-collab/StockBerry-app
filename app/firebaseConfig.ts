// app/firebaseConfig.ts (Expo Go compatible fix)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBcVkigGvNMFALswJ7GnNq3poscfXKfvEE",
  authDomain: "stockberry-63325.firebaseapp.com",
  projectId: "stockberry-63325",
  storageBucket: "stockberry-63325.appspot.com",
  messagingSenderId: "863660416352",
  appId: "1:863660416352:web:1efcfd66b4103c01f41205",
  measurementId: "G-ZCXBE71MRC"
};

// ✅ Initialize Firebase (prevent multiple instances)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Use basic getAuth (Expo Go safe — no TurboModule required)
const auth = getAuth(app);

// ✅ Export services
export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth, app };
