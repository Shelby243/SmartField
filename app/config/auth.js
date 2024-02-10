import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSSDz9uFUKDBIE_Bov0wXxT5Z5FZWTPYE",
  authDomain: "capstone-5fd04.firebaseapp.com",
  projectId: "capstone-5fd04",
  storageBucket: "capstone-5fd04.appspot.com",
  messagingSenderId: "22844054432",
  appId: "1:22844054432:web:e9867cf2e8cf9c8cad22c5",
  measurementId: "G-047RRCCJG4",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
