const firebase = require('firebase');

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: "chune-dev",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID

    // apiKey: "AIzaSyAq9AiCjXeGy8hvQOS24LxvToSHoZLLti0",
    // authDomain: "chune-dev.firebaseapp.com",
    // databaseURL: "https://chune-dev.firebaseio.com/",
    // projectId: "chune-dev",
    // storageBucket: "chune-dev.appspot.com",
    // messagingSenderId: "243198086936"

    // apiKey: "AIzaSyDuX7wruQ7Eg2MmPo15zGe2_ZJI-lbF4gE",
    // authDomain: "chune-5aefd.firebaseapp.com",
    // databaseURL: "https://chune-5aefd.firebaseio.com",
    // projectId: "chune-5aefd",
    // storageBucket: "chune-5aefd.appspot.com",
    // messagingSenderId: "268868502826"
};

// Initialize Firebase
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings)

module.exports = firestore;