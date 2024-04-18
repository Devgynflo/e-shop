import { initializeApp } from "firebase/app";

const firebaseConfig = {
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;
