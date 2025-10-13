import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import * as Clipboard from "expo-clipboard";

const db = getFirestore();
const auth = getAuth();

export default function ReferralScreen() {
  const [referralCode, setReferralCode] = useState("");
  const [myCode, setMyCode] = useState("");
  const [refCount, setRefCount] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const code = user.uid.slice(0, 6).toUpperCase();
      setMyCode(code);
      loadReferralData(user.uid, code);
    }
  }, []);

  const loadReferralData = async (uid, code) => {
    try {
      const refDoc = doc(db, "referrals", uid);
      const snap = await getDoc(refDoc);
      if (snap.exists()) {
        setRefCount(snap.data().count || 0);
      } else {
        await setDoc(refDoc, { code, count: 0 });
        setRefCount(0);
      }
    } catch (e) {
      console.error("Error loading referral data", e);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(myCode);
    Alert.alert("Copied!", "Your referral code has been copied.");
  };

  const handleRedeem = async () => {
    const user = auth.currentUser;
    if (!referralCode || referralCode === myCode) {
      Alert.alert("Invalid", "Please enter a valid referral code.");
      return;
    }
    try {
      const refSnap = await getDoc(doc(db, "referrals", referralCode));
      if (!refSnap.exists()) {
        Alert.alert("Not Found", "Referral code not found.");
        return;
      }
      await updateDoc(doc(db, "referrals", referralCode), {
        count: (refSnap.data().count || 0) + 1,
      });
      Alert.alert("Success", "Referral applied!");
    } catch (e) {
      console.error("Error redeeming referral", e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Referral System</Text>
      <Text>Your Code: {myCode}</Text>
      <Text>Total Referrals: {refCount}</Text>

      <TouchableOpacity
        onPress={handleCopy}
        style={{ marginTop: 10, padding: 10, backgroundColor: "#4CAF50", borderRadius: 8 }}
      >
        <Text style={{ color: "white" }}>Copy My Code</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter referral code"
        value={referralCode}
        onChangeText={setReferralCode}
        style={{ borderWidth: 1, borderColor: "#aaa", marginTop: 20, padding: 10, width: "80%", borderRadius: 8 }}
      />

      <TouchableOpacity
        onPress={handleRedeem}
        style={{ marginTop: 10, padding: 10, backgroundColor: "#2196F3", borderRadius: 8 }}
      >
        <Text style={{ color: "white" }}>Redeem Code</Text>
      </TouchableOpacity>
    </View>
  );
}
