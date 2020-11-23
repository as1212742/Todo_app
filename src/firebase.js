import firebase from 'firebase'


const firebaseApp = firebase.initializeApp({ 
  apiKey: "AIzaSyDOy7Jcya06CSCvrnccSA0rmiSPqtPx3Is",
  authDomain: "todo-app-29174.firebaseapp.com",
  databaseURL: "https://todo-app-29174.firebaseio.com",
  projectId: "todo-app-29174",
  storageBucket: "todo-app-29174.appspot.com",
  messagingSenderId: "665467891735",
  appId: "1:665467891735:web:3dfd6dc6ea278107296c52",
  measurementId: "G-WPQC4G9TPK"
})

const db = firebaseApp.firestore();

export {db};