import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDU3m77ICfjOgfMYXpQvK53zvTCAU-ILnc",
    authDomain: "budgetbutlerlogin.firebaseapp.com",
    projectId: "budgetbutlerlogin",
    storageBucket: "budgetbutlerlogin.appspot.com",
    messagingSenderId: "727666401221",
    appId: "1:727666401221:web:f8101f5a85a3892e3035ac"
})

export const auth = app.auth()
export default app