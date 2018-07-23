import firebase from 'firebase'

// connects app to firebase
const config = {
    apiKey: process.env.FIREBASE_WEB_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// Initialize Firebase
firebase.initializeApp(config);

// exports necessary firebase functions
export const auth = firebase.auth()
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
export const database = firebase.database()