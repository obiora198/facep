// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getApp,getApps,initializeApp } from 'firebase/app'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbJ-tLudzjTT1Ngpvc1rZ_-ZyG5KK0ww0",
  authDomain: "facepal-1bb1d.firebaseapp.com",
  projectId: "facepal-1bb1d",
  storageBucket: "facepal-1bb1d.appspot.com",
  messagingSenderId: "791873849524",
  appId: "1:791873849524:web:f666edfa92c1c86cb5afe1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication,db }