import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCDcxcD2ldDpe0mZWXwVXnXv1vSojD3y7I",
    authDomain: "ecommerce-1fba9.firebaseapp.com",
    projectId: "ecommerce-1fba9",
    storageBucket: "ecommerce-1fba9.appspot.com",
    messagingSenderId: "752949151532",
    appId: "1:752949151532:web:baf5023bc2f63ae9148e89"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()

  export {auth}