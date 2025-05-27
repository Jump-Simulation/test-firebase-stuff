import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdvU9v4X8LF8y1E8-QWLOfqK5NWZv7rJU",
  authDomain: "test-project-2d71d.firebaseapp.com",
  projectId: "test-project-2d71d",
  storageBucket: "test-project-2d71d.firebasestorage.app",
  messagingSenderId: "645583960307",
  appId: "1:645583960307:web:39f2780443225c82099f86",
  measurementId: "G-FMKT6KY0WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initiate App Check - must be done BEFORE all other products, such as Firestore.
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Ldx1UYrAAAAAKaVUZFXl4dubN9T5sxVv4GihEM-'),
  isTokenAutoRefreshEnabled: true,
});

const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export { app, appCheck, analytics, firestore };