import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCAhR6A1fn7mQoxEeaL_tmuH5wiEiZjito",
    authDomain: "jura-72f68.firebaseapp.com",
    databaseURL: "https://jura-72f68.firebaseio.com",
    projectId: "jura-72f68",
    storageBucket: "jura-72f68.appspot.com",
    messagingSenderId: "894821337289",
    appId: "1:894821337289:web:8d4299d4ac617412"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  export default db;