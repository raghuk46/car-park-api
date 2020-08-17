import admin from 'firebase-admin';

const serviceAccount = require('secrets/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://car-park-store.firebaseio.com',
});
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

module.exports = db;
