import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCk0-4dXCdavl7Y956EJpMHCxKGh1uzMa0",
    authDomain: "team-19bb.firebaseapp.com",
    projectId: "team-19bb",
    storageBucket: "team-19bb.appspot.com",
    messagingSenderId: "325824132828",
    appId: "1:325824132828:web:175822ab9fbcddf88b2619",
    measurementId: "G-93V8ME062H"
  };


const firebase = Firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };