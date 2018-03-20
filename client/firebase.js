import firebase from 'firebase'

// connects app to firebase
const config = {
    apiKey: "AIzaSyAipCj8AhUCTx6c06MuXlYKlMzNXG0tLpA",
    authDomain: "grocr-a1096.firebaseapp.com",
    databaseURL: "https://grocr-a1096.firebaseio.com",
    storageBucket: "grocr-a1096.appspot.com",
};
firebase.initializeApp(config);

// exports necessary firebase functions
export const auth = firebase.auth()
export const database = firebase.database()