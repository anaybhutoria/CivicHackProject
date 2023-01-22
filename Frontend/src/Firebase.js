import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ3wigtQiUY1tgLfiOG7k4mSy-G8PJXL0",
  authDomain: "tutoring-app-320817.firebaseapp.com",
  projectId: "tutoring-app-320817",
  storageBucket: "tutoring-app-320817.appspot.com",
  messagingSenderId: "477345924230",
  appId: "1:477345924230:web:4ae3264295cab7ceeb7d07",
  measurementId: "G-DS6WM70W7J"
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebase);

export default Firebase