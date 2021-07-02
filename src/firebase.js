import firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDU3m77ICfjOgfMYXpQvK53zvTCAU-ILnc",
    authDomain: "budgetbutlerlogin.firebaseapp.com",
    projectId: "budgetbutlerlogin",
    storageBucket: "budgetbutlerlogin.appspot.com",
    messagingSenderId: "727666401221",
    appId: "1:727666401221:web:f8101f5a85a3892e3035ac"
})

// const firebase = Firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = app.auth()


export {app, firebase, db };
// export default app