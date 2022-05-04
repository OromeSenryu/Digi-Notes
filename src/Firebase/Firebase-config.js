import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBssX7T2bvmVuCKZr5iHBY2qmz9VenfGRg",
    authDomain: "digi-notes-545db.firebaseapp.com",
    projectId: "digi-notes-545db",
    storageBucket: "digi-notes-545db.appspot.com",
    messagingSenderId: "780235481334",
    appId: "1:780235481334:web:e5062687c014f4c454ccd7",
    measurementId: "G-H6281WKX4V"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);