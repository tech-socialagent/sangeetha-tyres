import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC4MJcc_w8-gey3yxafh3QPJdIRUSc-pZw",
  authDomain: "sangeetha-tyres.firebaseapp.com",
  projectId: "sangeetha-tyres",
  storageBucket: "sangeetha-tyres.appspot.com",
  messagingSenderId: "682724932851",
  appId: "1:682724932851:web:58d379c8556e2a414ecb86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;