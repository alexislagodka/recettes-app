// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD9HCFnHMDcyfGNR0C7cL5Kp60MqJY4fuE',
  authDomain: 'recettes-app-6d1d6.firebaseapp.com',
  databaseURL: 'https://recettes-app-6d1d6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'recettes-app-6d1d6',
  storageBucket: 'recettes-app-6d1d6.appspot.com',
  messagingSenderId: '702856678005',
  appId: '1:702856678005:web:468a2dae2a5395d55e063c'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
