const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyDuX7wruQ7Eg2MmPo15zGe2_ZJI-lbF4gE",
    authDomain: "chune-5aefd.firebaseapp.com",
    databaseURL: "https://chune-5aefd.firebaseio.com",
    projectId: "chune-5aefd",
    storageBucket: "chune-5aefd.appspot.com",
    messagingSenderId: "268868502826"
};

// Initialize Firebase
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings)

module.exports = firestore;