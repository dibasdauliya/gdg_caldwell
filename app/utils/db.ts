import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_FIRE_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_FIRE_PROJECT_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_FIRE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.NEXT_PUBLIC_FIRE_MESSAGING_SENDER_ID),
  appId: String(process.env.NEXT_PUBLIC_FIRE_APP_ID),
  databaseURL: String(process.env.NEXT_PUBLIC_FIRE_DATABASE_URL),
  measurementId: "G-G756NPCV9X",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const realtimeDB = getDatabase(firebaseApp);

function callIt() {
  // console.log('called')
  initializeApp(firebaseConfig);
}

export { firebaseApp, auth, provider, firebaseDB, realtimeDB, callIt };
