// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPbR9B3EiyPl11d-F0H7x0UjHkqene6QM",
    authDomain: "leadinterio-1d483.firebaseapp.com",
    projectId: "leadinterio-1d483",
    storageBucket: "leadinterio-1d483.firebasestorage.app",
    messagingSenderId: "171531882586",
    appId: "1:171531882586:web:b8ed60c2bf005e90840863",
      measurementId: "G-M2EWCXSQFC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

//   // Customize notification
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/firebase-logo.png", // Optional icon for the notification
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
});
