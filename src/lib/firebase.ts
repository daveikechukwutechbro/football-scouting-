import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuBg65wPb5wEtO2KyCWw3_vQ7Pl3Hc_dA",
  authDomain: "infoproscoutt-5e923.firebaseapp.com",
  projectId: "infoproscoutt-5e923",
  storageBucket: "infoproscoutt-5e923.firebasestorage.app",
  messagingSenderId: "1084313847923",
  appId: "1:1084313847923:web:f2cea940efb0a2550e0206",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
