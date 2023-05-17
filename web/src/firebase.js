// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4N0mD-wMsv4t6MVWAv1g5cg_OiH_81dk",
  authDomain: "old-cars-garage-62699.firebaseapp.com",
  projectId: "old-cars-garage-62699",
  storageBucket: "old-cars-garage-62699.appspot.com",
  messagingSenderId: "701516277017",
  appId: "1:701516277017:web:27938acd67fe7c928ad188",
  measurementId: "G-T5MNKRMK1W",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.analytics().logEvent("screen_view");
export const auth = getAuth();
