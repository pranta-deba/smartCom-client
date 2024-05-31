import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArsKOTyt6Kuh079505A09TvhBTfnMtgbs",
  authDomain: "smart-com-415d1.firebaseapp.com",
  projectId: "smart-com-415d1",
  storageBucket: "smart-com-415d1.appspot.com",
  messagingSenderId: "991890780225",
  appId: "1:991890780225:web:6bf3fec83a8ca2a182d6c0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
