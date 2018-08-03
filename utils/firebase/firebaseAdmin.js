const credentials = require('./firebaseAdminCredentials');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(credentials),
    // databaseURL: "https://chune-5aefd.firebaseio.com/"
    databaseURL: process.env.FIREBASE_DB_URL
});

module.exports = admin;