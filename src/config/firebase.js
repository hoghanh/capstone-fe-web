import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCfHUlADHMP3cCFpq9gGAHhtjcQ48IX0K8',
  authDomain: 'fpt-sep-fe-eb227.firebaseapp.com',
  projectId: 'fpt-sep-fe-eb227',
  storageBucket: 'fpt-sep-fe-eb227.appspot.com',
  messagingSenderId: '49603623548',
  appId: '1:49603623548:web:f5b9aebeccb9115f3967f9',
  measurementId: 'G-F0F1S6716H',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
