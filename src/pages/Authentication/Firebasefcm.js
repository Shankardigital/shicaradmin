// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyDPbR9B3EiyPl11d-F0H7x0UjHkqene6QM",
  authDomain: "leadinterio-1d483.firebaseapp.com",
  projectId: "leadinterio-1d483",
  storageBucket: "leadinterio-1d483.firebasestorage.app",
  messagingSenderId: "171531882586",
  appId: "1:171531882586:web:b8ed60c2bf005e90840863",
  measurementId: "G-M2EWCXSQFC",
};

// Vapid key for web push
const vapidKey = "BAZrYLilSMP32ZLcGYlg4C-DCuh1v4_d_sCuJFC1u2dieXVOCxzE-ZhUpaVuqoyn_xBXYXnoXsIQpQKd6qrhdpI";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request FCM Token
const requestFcmToken = () => {
  return Notification.requestPermission()
    .then((permission) => {
      if (permission !== "granted") {
        return getToken(messaging, { vapidKey });
      } else {
        throw new Error("Notification permission denied");
      }
    })
    .then((token) => {
      // Handle token (e.g., send it to the server)
      console.log("FCM Token:", token);
      return token;
    })
    .catch((error) => {
      console.error("FCM error:", error);
      throw error;
    });
};

// Export the function
export default requestFcmToken;
