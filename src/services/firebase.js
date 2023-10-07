import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDv23g2IicQOru2t27HepgMTROsHel-WFM",
  authDomain: "capstone-sep.firebaseapp.com",
  projectId: "capstone-sep",
  storageBucket: "capstone-sep.appspot.com",
  messagingSenderId: "222814872209",
  appId: "1:222814872209:web:5cc73e43944113ff6e9530"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);