import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDXNzstx3YaPqoscCLCqKPBExZaZmZ7hGc",
    authDomain: "learn-global-a693b.firebaseapp.com",
    projectId: "learn-global-a693b",
    storageBucket: "learn-global-a693b.appspot.com",
    messagingSenderId: "212517885967",
    appId: "1:212517885967:web:fda41803ac88e5eca82b7a",
    measurementId: "G-Q7C3DPYH76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
const messaging = getMessaging(app);

// export const fbDatabase = getDatabase(app);
// export const fStore = getFirestore(app);
// export const fStorage = getStorage(app);

export const requestForToken = async () => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: "BAq-uIBK3o_UK42fhkOTk_osiWt-EdA-h2WthPY4YJRq4qmyHDOy7--5b6YlsTYFbNnquwVa9QIUzBpt1mE87Bk" });
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            return currentToken;
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            return "FALSE"
        }
    } catch (err) {
        return "FALSE"
        console.log('An error occurred while retrieving token. ', err);
    }
};


export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload);
        });
    });
}
// onMessageListener()