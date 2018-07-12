const credentials = require('./firebaseAdminCredentials');
const admin = require('firebase-admin');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "https://chune-5aefd.firebaseio.com/"
});

module.exports = admin;