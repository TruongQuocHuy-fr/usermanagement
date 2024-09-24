import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyARKBSO9NWgq7CUaOF9d_B_m-atyv4wYnw",
  authDomain: "qlnv-3fb6b.firebaseapp.com",
  projectId: "qlnv-3fb6b",
  storageBucket: "qlnv-3fb6b.appspot.com",
  messagingSenderId: "358330538372",
  appId: "1:358330538372:web:5269bfa1e842822b2925d1"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };
