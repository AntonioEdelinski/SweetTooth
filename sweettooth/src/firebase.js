// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjzm33y2QgViqTHeD374HuRQ8JFFBw38A",
  authDomain: "sweettooth-84f3c.firebaseapp.com",
  projectId: "sweettooth-84f3c",
  storageBucket: "sweettooth-84f3c.appspot.com",
  messagingSenderId: "590524353123",
  appId: "1:590524353123:web:59ca5272fde7e1dbd68656",
  measurementId: "G-0RYQTRHS32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);